import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Thermometer, Weight, Heart, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface VitalSigns {
  temperature: number;
  weight: number;
  height: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  heartRate: number;
  muac: number;
}

interface IMCIRanges {
  [key: string]: {
    normal: { min: number; max: number };
    warning: { min: number; max: number };
    danger: { min: number; max: number };
  };
}

const TriagePage = () => {
  const [activeTab, setActiveTab] = useState('vitals');
  const [vitals, setVitals] = useState<VitalSigns>({
    temperature: 0,
    weight: 0,
    height: 0,
    oxygenSaturation: 0,
    respiratoryRate: 0,
    heartRate: 0,
    muac: 0
  });

  const [ageGroup, setAgeGroup] = useState('2-12-months');
  const [dangerSigns, setDangerSigns] = useState<string[]>([]);

  // IMCI normal ranges by age group
  const imciRanges: IMCIRanges = {
    'temperature': {
      normal: { min: 36.0, max: 37.4 },
      warning: { min: 37.5, max: 38.4 },
      danger: { min: 38.5, max: 45.0 }
    },
    'oxygenSaturation': {
      normal: { min: 95, max: 100 },
      warning: { min: 90, max: 94 },
      danger: { min: 0, max: 89 }
    },
    'respiratoryRate': {
      normal: { min: 30, max: 50 },
      warning: { min: 51, max: 60 },
      danger: { min: 61, max: 100 }
    },
    'heartRate': {
      normal: { min: 100, max: 160 },
      warning: { min: 161, max: 180 },
      danger: { min: 181, max: 300 }
    }
  };

  const getVitalStatus = (vital: string, value: number) => {
    const ranges = imciRanges[vital];
    if (!ranges) return 'normal';
    
    if (value >= ranges.normal.min && value <= ranges.normal.max) return 'normal';
    if (value >= ranges.warning.min && value <= ranges.warning.max) return 'warning';
    return 'danger';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'danger': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleVitalChange = (field: keyof VitalSigns, value: string) => {
    const numValue = parseFloat(value) || 0;
    setVitals(prev => ({ ...prev, [field]: numValue }));
  };

  const checkDangerSigns = () => {
    const signs = [];
    if (vitals.temperature >= 38.5) signs.push('High fever (≥38.5°C)');
    if (vitals.oxygenSaturation < 90) signs.push('Severe hypoxia (O2 <90%)');
    if (vitals.respiratoryRate > 60) signs.push('Severe tachypnea (RR >60)');
    if (vitals.muac < 11.5) signs.push('Severe acute malnutrition (MUAC <11.5cm)');
    
    setDangerSigns(signs);
    
    if (signs.length > 0) {
      toast({
        title: "⚠️ IMCI Danger Signs Detected",
        description: `${signs.length} danger sign(s) identified. Immediate assessment required.`,
        variant: "destructive"
      });
    }
  };

  // Growth chart data for visualization
  const growthData = [
    { age: 0, weight: 3.3, percentile50: 3.3 },
    { age: 2, weight: 5.6, percentile50: 5.6 },
    { age: 6, weight: 7.9, percentile50: 7.9 },
    { age: 12, weight: vitals.weight || 9.6, percentile50: 9.6 },
    { age: 24, weight: 12.2, percentile50: 12.2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Activity className="h-8 w-8 text-primary" />
              IMCI Triage Assessment
            </CardTitle>
            <CardDescription>
              Systematic assessment of child under 5 years using IMCI protocols
            </CardDescription>
          </CardHeader>
        </Card>

        {dangerSigns.length > 0 && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>URGENT - IMCI Danger Signs Detected:</strong>
              <ul className="list-disc list-inside mt-2">
                {dangerSigns.map((sign, index) => (
                  <li key={index}>{sign}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="growth">Growth Monitoring</TabsTrigger>
            <TabsTrigger value="referral">Referral Criteria</TabsTrigger>
          </TabsList>

          <TabsContent value="vitals">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    Vital Signs Input
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temperature">Temperature (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        value={vitals.temperature || ''}
                        onChange={(e) => handleVitalChange('temperature', e.target.value)}
                        placeholder="36.5"
                      />
                      <Badge 
                        variant="secondary" 
                        className={`mt-1 ${getStatusColor(getVitalStatus('temperature', vitals.temperature))}`}
                      >
                        {getVitalStatus('temperature', vitals.temperature).toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <Label htmlFor="oxygenSaturation">O2 Saturation (%)</Label>
                      <Input
                        id="oxygenSaturation"
                        type="number"
                        value={vitals.oxygenSaturation || ''}
                        onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
                        placeholder="98"
                      />
                      <Badge 
                        variant="secondary" 
                        className={`mt-1 ${getStatusColor(getVitalStatus('oxygenSaturation', vitals.oxygenSaturation))}`}
                      >
                        {getVitalStatus('oxygenSaturation', vitals.oxygenSaturation).toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <Label htmlFor="respiratoryRate">Respiratory Rate (/min)</Label>
                      <Input
                        id="respiratoryRate"
                        type="number"
                        value={vitals.respiratoryRate || ''}
                        onChange={(e) => handleVitalChange('respiratoryRate', e.target.value)}
                        placeholder="40"
                      />
                      <Badge 
                        variant="secondary" 
                        className={`mt-1 ${getStatusColor(getVitalStatus('respiratoryRate', vitals.respiratoryRate))}`}
                      >
                        {getVitalStatus('respiratoryRate', vitals.respiratoryRate).toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <Label htmlFor="heartRate">Heart Rate (/min)</Label>
                      <Input
                        id="heartRate"
                        type="number"
                        value={vitals.heartRate || ''}
                        onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                        placeholder="120"
                      />
                      <Badge 
                        variant="secondary" 
                        className={`mt-1 ${getStatusColor(getVitalStatus('heartRate', vitals.heartRate))}`}
                      >
                        {getVitalStatus('heartRate', vitals.heartRate).toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <Button onClick={checkDangerSigns} className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Check IMCI Danger Signs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>IMCI Normal Ranges</CardTitle>
                  <CardDescription>Reference values for children 2-12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="font-medium">Vital Sign</div>
                      <div className="font-medium">Normal Range</div>
                      <div className="font-medium">Danger Signs</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>Temperature</div>
                      <div className="text-green-600">36.0-37.4°C</div>
                      <div className="text-red-600">≥38.5°C</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>O2 Saturation</div>
                      <div className="text-green-600">95-100%</div>
                      <div className="text-red-600">&lt;90%</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>Respiratory Rate</div>
                      <div className="text-green-600">30-50/min</div>
                      <div className="text-red-600">&gt;60/min</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>Heart Rate</div>
                      <div className="text-green-600">100-160/min</div>
                      <div className="text-red-600">&gt;180/min</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="growth">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5" />
                    Growth Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={vitals.weight || ''}
                        onChange={(e) => handleVitalChange('weight', e.target.value)}
                        placeholder="9.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="height">Height/Length (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        value={vitals.height || ''}
                        onChange={(e) => handleVitalChange('height', e.target.value)}
                        placeholder="75"
                      />
                    </div>

                    <div>
                      <Label htmlFor="muac">MUAC (cm)</Label>
                      <Input
                        id="muac"
                        type="number"
                        step="0.1"
                        value={vitals.muac || ''}
                        onChange={(e) => handleVitalChange('muac', e.target.value)}
                        placeholder="13.5"
                      />
                      {vitals.muac > 0 && (
                        <Badge 
                          variant="secondary" 
                          className={`mt-1 ${vitals.muac < 11.5 ? 'text-red-600 bg-red-50' : vitals.muac < 12.5 ? 'text-orange-600 bg-orange-50' : 'text-green-600 bg-green-50'}`}
                        >
                          {vitals.muac < 11.5 ? 'SAM (Severe)' : vitals.muac < 12.5 ? 'MAM (Moderate)' : 'Normal'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      <strong>WHO Growth Standards:</strong> MUAC &lt;11.5cm indicates severe acute malnutrition requiring immediate intervention.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weight-for-Age Chart</CardTitle>
                  <CardDescription>WHO growth percentiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" label={{ value: 'Age (months)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <ReferenceLine y={vitals.weight} stroke="red" strokeDasharray="5 5" label="Current Weight" />
                      <Line type="monotone" dataKey="percentile50" stroke="#8884d8" strokeWidth={2} name="50th Percentile" />
                      <Line type="monotone" dataKey="weight" stroke="#82ca9d" strokeWidth={2} name="Child's Weight" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="referral">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  IMCI Urgent Referral Criteria
                </CardTitle>
                <CardDescription>Immediate referral indicators for children under 5</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-red-600 mb-3">General Danger Signs</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Unable to drink or breastfeed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Vomits everything</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Convulsions/seizures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Lethargic or unconscious</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-red-600 mb-3">Specific Conditions</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Severe pneumonia (chest indrawing)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Severe dehydration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Severe acute malnutrition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Severe anemia (Hb &lt;5g/dL)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Action Required:</h4>
                  <p className="text-red-700 text-sm">
                    If any danger signs are present, refer IMMEDIATELY to hospital. Give first dose of appropriate antibiotic if available and child is not able to take oral medication.
                  </p>
                </div>

                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Initiate Emergency Referral
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TriagePage;