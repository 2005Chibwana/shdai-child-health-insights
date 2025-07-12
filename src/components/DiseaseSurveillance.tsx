
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

const DiseaseSurveillance = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    {
      name: 'Lusaka',
      coordinates: { lat: -15.4067, lng: 28.2871 },
      cases: 45,
      trend: '+12%',
      trendColor: 'text-red-600',
      severity: 'High',
      diseases: ['Malaria: 23', 'Pneumonia: 12', 'Diarrhea: 10']
    },
    {
      name: 'Copperbelt',
      coordinates: { lat: -12.8389, lng: 28.2294 },
      cases: 28,
      trend: '-5%',
      trendColor: 'text-green-600',
      severity: 'Medium',
      diseases: ['Malaria: 15', 'Pneumonia: 8', 'Diarrhea: 5']
    },
    {
      name: 'Southern',
      coordinates: { lat: -16.8000, lng: 27.8583 },
      cases: 19,
      trend: '+3%',
      trendColor: 'text-yellow-600',
      severity: 'Low',
      diseases: ['Malaria: 8', 'Pneumonia: 6', 'Diarrhea: 5']
    },
    {
      name: 'Eastern',
      coordinates: { lat: -13.4667, lng: 32.6500 },
      cases: 67,
      trend: '+18%',
      trendColor: 'text-red-600',
      severity: 'Critical',
      diseases: ['Malaria: 35', 'Pneumonia: 20', 'Diarrhea: 12']
    }
  ];

  const outbreakAlerts = [
    {
      id: 1,
      disease: 'Malaria Outbreak',
      region: 'Eastern Province',
      cases: 67,
      status: 'Critical',
      timeframe: '7 days',
      description: 'Significant increase in malaria cases, likely due to heavy rains'
    },
    {
      id: 2,
      disease: 'Pneumonia Cluster',
      region: 'Lusaka Urban',
      cases: 12,
      status: 'Monitoring',
      timeframe: '3 days',
      description: 'Pneumonia cases concentrated in Kalingalinga compound'
    }
  ];

  const diseaseStats = {
    totalCases: 159,
    weeklyChange: '+8%',
    activeOutbreaks: 2,
    regionsAffected: 8
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(regionName);
    toast.info(`Viewing data for ${regionName} Province`);
    console.log('Selected region:', regionName);
  };

  const handleOutbreakResponse = (outbreakId: number) => {
    toast.success('Public health response team notified');
    console.log('Responding to outbreak:', outbreakId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Real-Time Disease Surveillance
        </h1>
        <p className="text-gray-600 text-lg">
          Monitoring disease patterns and outbreak detection across Zambia
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cases (7 days)</p>
                <p className="text-2xl font-bold text-orange-600">{diseaseStats.totalCases}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Change</p>
                <p className="text-2xl font-bold text-red-600">{diseaseStats.weeklyChange}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Outbreaks</p>
                <p className="text-2xl font-bold text-purple-600">{diseaseStats.activeOutbreaks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Regions Affected</p>
                <p className="text-2xl font-bold text-blue-600">{diseaseStats.regionsAffected}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Regional Map</TabsTrigger>
          <TabsTrigger value="outbreaks">Active Outbreaks</TabsTrigger>
          <TabsTrigger value="trends">Disease Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Simulated Map */}
            <Card className="lg:col-span-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Zambia Disease Surveillance Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 h-96 relative">
                  <div className="text-center text-gray-600 mb-4">
                    <p className="text-lg font-medium">Interactive Disease Map</p>
                    <p className="text-sm">Click on regions to view detailed data</p>
                  </div>
                  
                  {/* Simulated map regions */}
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {regions.map((region, index) => (
                      <div
                        key={region.name}
                        onClick={() => handleRegionClick(region.name)}
                        className={`
                          relative p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105
                          ${region.severity === 'Critical' ? 'bg-red-200 border-2 border-red-400' :
                            region.severity === 'High' ? 'bg-orange-200 border-2 border-orange-400' :
                            region.severity === 'Medium' ? 'bg-yellow-200 border-2 border-yellow-400' :
                            'bg-green-200 border-2 border-green-400'}
                          ${selectedRegion === region.name ? 'ring-4 ring-blue-300' : ''}
                        `}
                      >
                        <div className="text-center">
                          <h3 className="font-semibold text-gray-800">{region.name}</h3>
                          <p className="text-sm text-gray-600">{region.cases} cases</p>
                          <span className={`text-xs font-medium ${region.trendColor}`}>
                            {region.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Region Details */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  <span>Region Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRegion ? (
                  <div className="space-y-4">
                    {(() => {
                      const region = regions.find(r => r.name === selectedRegion);
                      if (!region) return null;
                      return (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">{region.name} Province</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Total Cases:</span>
                                <span className="font-medium">{region.cases}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Weekly Trend:</span>
                                <span className={`font-medium ${region.trendColor}`}>{region.trend}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Severity:</span>
                                <Badge className={
                                  region.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                                  region.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                  region.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }>
                                  {region.severity}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Disease Breakdown:</h4>
                            <ul className="space-y-1">
                              {region.diseases.map((disease, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  <span>{disease}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a region on the map to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="outbreaks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Active Disease Outbreaks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outbreakAlerts.map((outbreak) => (
                  <div key={outbreak.id} className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white">
                          <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-900">{outbreak.disease}</h4>
                          <p className="text-sm text-red-700">{outbreak.region}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-900">
                            {outbreak.cases} cases in {outbreak.timeframe}
                          </p>
                          <p className="text-xs text-red-600">{outbreak.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={
                          outbreak.status === 'Critical' ? 'bg-red-200 text-red-800' :
                          'bg-yellow-200 text-yellow-800'
                        }>
                          {outbreak.status}
                        </Badge>
                        <Button 
                          onClick={() => handleOutbreakResponse(outbreak.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Weekly Disease Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Malaria</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-red-600" />
                      <span className="text-red-600 font-medium">+15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Pneumonia</span>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">-8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Diarrheal Diseases</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                      <span className="text-yellow-600 font-medium">+3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Seasonal Patterns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-medium text-purple-900 mb-2">Rainy Season Alert</div>
                    <p className="text-sm text-purple-700">
                      Expected increase in malaria and diarrheal diseases during December-March period
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-medium text-orange-900 mb-2">Cold Season</div>
                    <p className="text-sm text-orange-700">
                      Respiratory infections typically peak during May-July
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiseaseSurveillance;
