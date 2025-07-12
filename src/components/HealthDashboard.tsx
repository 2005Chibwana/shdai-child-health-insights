
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Search,
  FileText,
  Camera,
  Activity
} from 'lucide-react';

const HealthDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const recentDiagnoses = [
    {
      id: 1,
      patientName: 'Sarah K.',
      age: '3 years',
      diagnosis: 'Pneumonia (Suspected)',
      urgency: 'High',
      urgencyColor: 'bg-red-100 text-red-800',
      timestamp: '2 hours ago',
      confidence: 85
    },
    {
      id: 2,
      patientName: 'David M.',
      age: '18 months',
      diagnosis: 'Viral Gastroenteritis',
      urgency: 'Medium',
      urgencyColor: 'bg-yellow-100 text-yellow-800',
      timestamp: '4 hours ago',
      confidence: 78
    },
    {
      id: 3,
      patientName: 'Grace L.',
      age: '5 years',
      diagnosis: 'Skin Rash (Allergic)',
      urgency: 'Low',
      urgencyColor: 'bg-green-100 text-green-800',
      timestamp: '6 hours ago',
      confidence: 72
    }
  ];

  const criticalCases = [
    {
      id: 1,
      patientName: 'Michael T.',
      age: '2 years',
      condition: 'Severe Dehydration',
      location: 'Ward 3',
      flaggedTime: '30 minutes ago',
      riskScore: 95
    },
    {
      id: 2,
      patientName: 'Emma R.',
      age: '4 years',
      condition: 'High Fever (40°C)',
      location: 'Emergency',
      flaggedTime: '1 hour ago',
      riskScore: 88
    }
  ];

  const todayStats = {
    totalDiagnoses: 47,
    criticalCases: 3,
    avgConfidence: 82,
    responseTime: '12 min'
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Healthcare Dashboard
          </h1>
          <p className="text-gray-600">Clinical decision support and patient management</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Stethoscope className="h-4 w-4 mr-2" />
            New Diagnosis
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Diagnoses</p>
                <p className="text-2xl font-bold text-blue-600">{todayStats.totalDiagnoses}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Cases</p>
                <p className="text-2xl font-bold text-red-600">{todayStats.criticalCases}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-green-600">{todayStats.avgConfidence}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-purple-600">{todayStats.responseTime}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Diagnoses</TabsTrigger>
          <TabsTrigger value="critical">Critical Cases</TabsTrigger>
          <TabsTrigger value="tools">Diagnostic Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Recent Diagnoses</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiagnoses
                  .filter(diagnosis => 
                    diagnosis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    diagnosis.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((diagnosis) => (
                  <div key={diagnosis.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-medium">
                        {diagnosis.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{diagnosis.patientName}</h4>
                        <p className="text-sm text-gray-600">{diagnosis.age}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{diagnosis.diagnosis}</p>
                        <p className="text-sm text-gray-500">{diagnosis.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-blue-100 text-blue-800">
                        {diagnosis.confidence}%
                      </Badge>
                      <Badge className={diagnosis.urgencyColor}>
                        {diagnosis.urgency}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Critical Cases Requiring Immediate Attention</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalCases.map((case_) => (
                  <div key={case_.id} className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-medium">
                          <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-900">{case_.patientName}</h4>
                          <p className="text-sm text-red-700">{case_.age} • {case_.location}</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-red-900">{case_.condition}</p>
                          <p className="text-sm text-red-600">Flagged {case_.flaggedTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-red-200 text-red-800">
                          Risk: {case_.riskScore}%
                        </Badge>
                        <Button className="bg-red-600 hover:bg-red-700">
                          Respond Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  <span>AI Symptom Checker</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  IMCI-based diagnostic tool with voice input capability for rapid assessment.
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  Start New Diagnosis
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <span>Computer Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Image analysis for skin conditions, dehydration signs, and malnutrition detection.
                </p>
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Upload Image
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthDashboard;
