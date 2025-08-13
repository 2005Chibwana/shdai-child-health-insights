import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Ruler, Weight, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface GrowthMeasurement {
  age: number; // in months
  weight: number; // in kg
  height: number; // in cm
  muac?: number; // mid-upper arm circumference in cm
  date: string;
}

interface WHOReference {
  month: number;
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

const ChildGrowthChart: React.FC = () => {
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [childGender, setChildGender] = useState<'male' | 'female'>('male');
  const [currentAge, setCurrentAge] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentHeight, setCurrentHeight] = useState('');
  const [currentMuac, setCurrentMuac] = useState('');
  const [activeTab, setActiveTab] = useState('weight-for-age');

  // WHO reference data (simplified - in real app would be comprehensive)
  const whoWeightForAge: WHOReference[] = [
    { month: 0, p3: 2.1, p15: 2.5, p50: 3.3, p85: 4.2, p97: 5.1 },
    { month: 6, p3: 6.0, p15: 6.7, p50: 7.9, p85: 9.3, p97: 10.9 },
    { month: 12, p3: 7.7, p15: 8.6, p50: 10.2, p85: 12.0, p97: 14.1 },
    { month: 24, p3: 9.7, p15: 10.8, p50: 12.9, p85: 15.3, p97: 18.1 },
    { month: 36, p3: 11.3, p15: 12.7, p50: 15.1, p85: 18.0, p97: 21.5 },
    { month: 48, p3: 12.7, p15: 14.3, p50: 17.1, p85: 20.6, p97: 24.9 },
    { month: 60, p3: 14.1, p15: 15.8, p50: 19.0, p85: 23.1, p97: 28.0 }
  ];

  const whoHeightForAge: WHOReference[] = [
    { month: 0, p3: 44.2, p15: 46.1, p50: 49.9, p85: 53.7, p97: 56.7 },
    { month: 6, p3: 61.7, p15: 63.3, p50: 67.6, p85: 71.9, p97: 75.0 },
    { month: 12, p3: 69.2, p15: 71.0, p50: 76.1, p85: 81.2, p97: 85.1 },
    { month: 24, p3: 78.0, p15: 80.0, p50: 86.4, p85: 92.9, p97: 97.8 },
    { month: 36, p3: 83.6, p15: 85.7, p50: 93.9, p85: 102.1, p97: 108.0 },
    { month: 48, p3: 88.0, p15: 90.2, p50: 99.9, p85: 109.9, p97: 116.6 },
    { month: 60, p3: 91.9, p15: 94.1, p50: 105.3, p85: 116.8, p97: 124.4 }
  ];

  const addMeasurement = useCallback(() => {
    if (!currentAge || !currentWeight || !currentHeight) {
      toast.error('Please fill in age, weight, and height');
      return;
    }

    const newMeasurement: GrowthMeasurement = {
      age: parseFloat(currentAge),
      weight: parseFloat(currentWeight),
      height: parseFloat(currentHeight),
      muac: currentMuac ? parseFloat(currentMuac) : undefined,
      date: new Date().toISOString().split('T')[0]
    };

    setMeasurements(prev => [...prev, newMeasurement].sort((a, b) => a.age - b.age));
    
    // Clear inputs
    setCurrentAge('');
    setCurrentWeight('');
    setCurrentHeight('');
    setCurrentMuac('');
    
    toast.success('Measurement added successfully');
  }, [currentAge, currentWeight, currentHeight, currentMuac]);

  const getPercentile = (value: number, age: number, references: WHOReference[]): string => {
    // Find closest age references
    const lowerRef = references.reduce((prev, curr) => 
      curr.month <= age ? curr : prev
    );
    const upperRef = references.find(ref => ref.month > age) || lowerRef;

    // Simple interpolation for percentile calculation
    if (value < lowerRef.p3) return '<3rd';
    if (value < lowerRef.p15) return '3rd-15th';
    if (value < lowerRef.p50) return '15th-50th';
    if (value < lowerRef.p85) return '50th-85th';
    if (value < lowerRef.p97) return '85th-97th';
    return '>97th';
  };

  const getGrowthStatus = (measurement: GrowthMeasurement): {
    weightStatus: string;
    heightStatus: string;
    overallStatus: 'normal' | 'at-risk' | 'severe';
    alerts: string[];
  } => {
    const weightPercentile = getPercentile(measurement.weight, measurement.age, whoWeightForAge);
    const heightPercentile = getPercentile(measurement.height, measurement.age, whoHeightForAge);
    
    const alerts: string[] = [];
    let overallStatus: 'normal' | 'at-risk' | 'severe' = 'normal';

    // Weight status
    let weightStatus = 'Normal weight';
    if (weightPercentile === '<3rd') {
      weightStatus = 'Severely underweight';
      overallStatus = 'severe';
      alerts.push('Severe acute malnutrition - refer urgently');
    } else if (weightPercentile === '3rd-15th') {
      weightStatus = 'Underweight';
      overallStatus = 'at-risk';
      alerts.push('Monitor nutrition and feeding practices');
    } else if (weightPercentile === '>97th') {
      weightStatus = 'Overweight';
      overallStatus = 'at-risk';
      alerts.push('Monitor for obesity - check feeding practices');
    }

    // Height status
    let heightStatus = 'Normal height';
    if (heightPercentile === '<3rd') {
      heightStatus = 'Severely stunted';
      overallStatus = 'severe';
      alerts.push('Chronic malnutrition - requires intervention');
    } else if (heightPercentile === '3rd-15th') {
      heightStatus = 'Stunted';
      if (overallStatus === 'normal') overallStatus = 'at-risk';
      alerts.push('Chronic undernutrition - improve diet quality');
    }

    // MUAC assessment (for children 6-59 months)
    if (measurement.muac && measurement.age >= 6 && measurement.age < 60) {
      if (measurement.muac < 11.5) {
        alerts.push('MUAC indicates severe acute malnutrition');
        overallStatus = 'severe';
      } else if (measurement.muac < 12.5) {
        alerts.push('MUAC indicates moderate acute malnutrition');
        if (overallStatus === 'normal') overallStatus = 'at-risk';
      }
    }

    return { weightStatus, heightStatus, overallStatus, alerts };
  };

  const getChartData = (type: 'weight' | 'height') => {
    const references = type === 'weight' ? whoWeightForAge : whoHeightForAge;
    const measurementData = measurements.map(m => ({
      age: m.age,
      value: type === 'weight' ? m.weight : m.height,
      measurement: m
    }));

    const referenceData = references.map(ref => ({
      age: ref.month,
      p3: ref.p3,
      p15: ref.p15,
      p50: ref.p50,
      p85: ref.p85,
      p97: ref.p97
    }));

    // Combine and sort data
    const allAges = [...new Set([...measurementData.map(d => d.age), ...referenceData.map(d => d.age)])].sort((a, b) => a - b);
    
    return allAges.map(age => {
      const measurement = measurementData.find(d => d.age === age);
      const reference = referenceData.find(d => d.age === age) || 
                       interpolateReference(age, referenceData);
      
      return {
        age,
        value: measurement?.value,
        ...reference
      };
    });
  };

  const interpolateReference = (age: number, references: any[]): any => {
    const lowerRef = references.reduce((prev, curr) => curr.age <= age ? curr : prev);
    const upperRef = references.find(ref => ref.age > age) || lowerRef;
    
    if (lowerRef.age === upperRef.age) return lowerRef;
    
    const ratio = (age - lowerRef.age) / (upperRef.age - lowerRef.age);
    
    return {
      p3: lowerRef.p3 + (upperRef.p3 - lowerRef.p3) * ratio,
      p15: lowerRef.p15 + (upperRef.p15 - lowerRef.p15) * ratio,
      p50: lowerRef.p50 + (upperRef.p50 - lowerRef.p50) * ratio,
      p85: lowerRef.p85 + (upperRef.p85 - lowerRef.p85) * ratio,
      p97: lowerRef.p97 + (upperRef.p97 - lowerRef.p97) * ratio
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'severe': return 'bg-red-500';
      case 'at-risk': return 'bg-orange-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const latestMeasurement = measurements[measurements.length - 1];
  const latestStatus = latestMeasurement ? getGrowthStatus(latestMeasurement) : null;

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <TrendingUp className="h-5 w-5 text-primary" />
            WHO Child Growth Charts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Child Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Child Gender</Label>
              <Select value={childGender} onValueChange={(value: 'male' | 'female') => setChildGender(value)}>
                <SelectTrigger className="border-accent/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Measurement */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Age (months)</Label>
              <Input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="e.g., 24"
                className="border-accent/30"
              />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder="e.g., 12.5"
                className="border-accent/30"
              />
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input
                type="number"
                step="0.1"
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
                placeholder="e.g., 87.5"
                className="border-accent/30"
              />
            </div>
            <div className="space-y-2">
              <Label>MUAC (cm)</Label>
              <Input
                type="number"
                step="0.1"
                value={currentMuac}
                onChange={(e) => setCurrentMuac(e.target.value)}
                placeholder="e.g., 13.2"
                className="border-accent/30"
              />
            </div>
          </div>

          <Button
            onClick={addMeasurement}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Weight className="h-4 w-4 mr-2" />
            Add Measurement
          </Button>

          {/* Latest Status */}
          {latestStatus && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(latestStatus.overallStatus)} text-white`}>
                  {latestStatus.overallStatus.toUpperCase()}
                </Badge>
                <span className="text-sm font-medium text-black">
                  Latest Assessment ({latestMeasurement.age} months)
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-black">Weight Status:</span>
                  <span className="ml-2 text-gray-700">{latestStatus.weightStatus}</span>
                </div>
                <div>
                  <span className="font-medium text-black">Height Status:</span>
                  <span className="ml-2 text-gray-700">{latestStatus.heightStatus}</span>
                </div>
              </div>

              {latestStatus.alerts.length > 0 && (
                <div className="space-y-1">
                  <h4 className="font-medium text-black flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Alerts:
                  </h4>
                  <ul className="space-y-1">
                    {latestStatus.alerts.map((alert, index) => (
                      <li key={index} className="text-sm text-orange-700 ml-5">
                        • {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Growth Charts */}
          {measurements.length > 0 && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="weight-for-age">Weight for Age</TabsTrigger>
                <TabsTrigger value="height-for-age">Height for Age</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weight-for-age" className="space-y-4">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getChartData('weight')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="age" 
                        label={{ value: 'Age (months)', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip />
                      
                      {/* WHO Reference Lines */}
                      <Line type="monotone" dataKey="p3" stroke="#dc2626" strokeDasharray="5 5" name="3rd percentile" />
                      <Line type="monotone" dataKey="p15" stroke="#f97316" strokeDasharray="3 3" name="15th percentile" />
                      <Line type="monotone" dataKey="p50" stroke="#059669" strokeWidth={2} name="50th percentile (median)" />
                      <Line type="monotone" dataKey="p85" stroke="#f97316" strokeDasharray="3 3" name="85th percentile" />
                      <Line type="monotone" dataKey="p97" stroke="#dc2626" strokeDasharray="5 5" name="97th percentile" />
                      
                      {/* Child's measurements */}
                      <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={3} name="Child's weight" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="height-for-age" className="space-y-4">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getChartData('height')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="age" 
                        label={{ value: 'Age (months)', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip />
                      
                      {/* WHO Reference Lines */}
                      <Line type="monotone" dataKey="p3" stroke="#dc2626" strokeDasharray="5 5" name="3rd percentile" />
                      <Line type="monotone" dataKey="p15" stroke="#f97316" strokeDasharray="3 3" name="15th percentile" />
                      <Line type="monotone" dataKey="p50" stroke="#059669" strokeWidth={2} name="50th percentile (median)" />
                      <Line type="monotone" dataKey="p85" stroke="#f97316" strokeDasharray="3 3" name="85th percentile" />
                      <Line type="monotone" dataKey="p97" stroke="#dc2626" strokeDasharray="5 5" name="97th percentile" />
                      
                      {/* Child's measurements */}
                      <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={3} name="Child's height" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildGrowthChart;