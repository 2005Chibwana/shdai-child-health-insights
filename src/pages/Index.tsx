
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Stethoscope, Shield, Heart, Brain, Camera, Activity, MapPin } from 'lucide-react';
import RoleSelector from '@/components/RoleSelector';
import SymptomChecker from '@/components/SymptomChecker';
import ComputerVision from '@/components/ComputerVision';
import HealthDashboard from '@/components/HealthDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import DiseaseSurveillance from '@/components/DiseaseSurveillance';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    console.log('Role selected:', role);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    console.log('Section changed to:', section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'symptom-checker':
        return <SymptomChecker />;
      case 'computer-vision':
        return <ComputerVision />;
      case 'health-dashboard':
        return <HealthDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'disease-surveillance':
        return <DiseaseSurveillance />;
      default:
        return <HomeContent onSectionChange={handleSectionChange} selectedRole={selectedRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  SHDAI
                </h1>
                <p className="text-sm text-gray-600">Smart Health Data Analytics Initiative</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => handleSectionChange('home')}
                className="text-sm"
              >
                Home
              </Button>
              <Button 
                variant={activeSection === 'symptom-checker' ? 'default' : 'ghost'}
                onClick={() => handleSectionChange('symptom-checker')}
                className="text-sm"
              >
                Symptom Checker
              </Button>
              <Button 
                variant={activeSection === 'computer-vision' ? 'default' : 'ghost'}
                onClick={() => handleSectionChange('computer-vision')}
                className="text-sm"
              >
                Vision Diagnostics
              </Button>
              {selectedRole === 'healthWorker' && (
                <Button 
                  variant={activeSection === 'health-dashboard' ? 'default' : 'ghost'}
                  onClick={() => handleSectionChange('health-dashboard')}
                  className="text-sm"
                >
                  Dashboard
                </Button>
              )}
              {selectedRole === 'admin' && (
                <Button 
                  variant={activeSection === 'admin-dashboard' ? 'default' : 'ghost'}
                  onClick={() => handleSectionChange('admin-dashboard')}
                  className="text-sm"
                >
                  Admin
                </Button>
              )}
              <Button 
                variant={activeSection === 'disease-surveillance' ? 'default' : 'ghost'}
                onClick={() => handleSectionChange('disease-surveillance')}
                className="text-sm"
              >
                Disease Map
              </Button>
            </nav>

            <RoleSelector onRoleSelect={handleRoleSelect} selectedRole={selectedRole} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

const HomeContent = ({ onSectionChange, selectedRole }: { onSectionChange: (section: string) => void, selectedRole: string | null }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            AI-Powered Child Health Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Reducing Child Mortality with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            SHDAI empowers caregivers and health workers in Zambia with AI-driven diagnostics, 
            predictive risk assessment, and real-time disease surveillance to save children's lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onSectionChange('symptom-checker')}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              <Brain className="mr-2 h-5 w-5" />
              Start Symptom Check
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onSectionChange('computer-vision')}
            >
              <Camera className="mr-2 h-5 w-5" />
              Upload Image for Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 border-blue-100 hover:border-blue-200">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-blue-900">AI Symptom Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Voice-enabled symptom analysis using IMCI algorithms and machine learning for accurate diagnosis.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSectionChange('symptom-checker')}
            >
              Try Now
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-200">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Camera className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Computer Vision Diagnostics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Upload photos to detect skin conditions, jaundice, dehydration, and malnutrition signs.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSectionChange('computer-vision')}
            >
              Upload Image
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-purple-100 hover:border-purple-200">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-purple-900">Predictive Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              AI-powered risk scoring for malaria, anemia, and other conditions based on multiple factors.
            </p>
            <Badge variant="secondary" className="text-xs">
              Coming Soon
            </Badge>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-teal-100 hover:border-teal-200">
          <CardHeader>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle className="text-teal-900">Vaccination Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Track immunization schedules, send SMS reminders, and monitor vaccine coverage.
            </p>
            <Badge variant="secondary" className="text-xs">
              Coming Soon
            </Badge>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-orange-100 hover:border-orange-200">
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-orange-900">Disease Surveillance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Real-time outbreak tracking and hotspot identification for rapid public health response.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSectionChange('disease-surveillance')}
            >
              View Map
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-indigo-100 hover:border-indigo-200">
          <CardHeader>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle className="text-indigo-900">Child AI-PHR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Comprehensive digital health records integrated with national health systems.
            </p>
            <Badge variant="secondary" className="text-xs">
              Coming Soon
            </Badge>
          </CardContent>
        </Card>
      </section>

      {/* Impact Statistics */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Impact in Zambia</h2>
          <p className="text-blue-100">Reducing child mortality through AI-powered healthcare</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">2,500+</div>
            <div className="text-blue-100">Children Screened</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-blue-100">Health Workers Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-100">Diagnostic Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Offline Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
