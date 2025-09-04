
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 shadow-lg">
                <img 
                  src="/lovable-uploads/0e038066-6702-4388-bdb0-9774a0033d24.png" 
                  alt="SHDAI Logo" 
                  className="w-8 h-8 object-contain filter brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  SHDAI Child Health
                </h1>
                <p className="text-sm font-medium text-green-700">❤️ Saving Young Lives</p>
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
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 text-lg px-4 py-2 rounded-full">
            🩺 WHO/UNICEF IMCI-Powered Platform
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-blue-700 bg-clip-text text-transparent leading-tight">
            🌟 Every Child Deserves to Thrive
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Empowering Zambian families and health workers with AI-powered child health diagnostics. 
            Quick symptom checks, growth monitoring, and life-saving alerts - all in your local language.
          </p>
          {/* Role-Based Quick Actions */}
          {!selectedRole ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-green-200 shadow-lg">
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">👋 Welcome! Choose your role to get started:</h3>
              <div className="text-center text-sm text-gray-600 mb-4">
                Select your role above ↗️ to access personalized features
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => onSectionChange('symptom-checker')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg min-h-[60px] text-lg rounded-xl"
              >
                <Brain className="mr-3 h-6 w-6" />
                🔍 Check Child's Symptoms
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onSectionChange('computer-vision')}
                className="border-2 border-green-500 text-green-700 hover:bg-green-500 hover:text-white shadow-lg min-h-[60px] text-lg rounded-xl"
              >
                <Camera className="mr-3 h-6 w-6" />
                📸 Photo Health Check
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Health Insights Dashboard */}
      {selectedRole && (
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            📊 Health Insights Dashboard
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">🌡️</div>
              <div className="text-sm text-green-800 font-medium">Temperature Check</div>
              <div className="text-2xl font-bold text-green-700">Normal</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">📏</div>
              <div className="text-sm text-blue-800 font-medium">Growth Status</div>
              <div className="text-2xl font-bold text-blue-700">On Track</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">💉</div>
              <div className="text-sm text-yellow-800 font-medium">Vaccinations</div>
              <div className="text-2xl font-bold text-yellow-700">Up to Date</div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-blue-900 text-lg">🧠 Smart Symptom Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 leading-relaxed">
              IMCI-guided symptom analysis with voice support in local languages. Get instant health advice for your child.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSectionChange('symptom-checker')}
              className="w-full border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white"
            >
              🔍 Start Check
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Camera className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-green-900 text-lg">📸 Photo Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Take photos to detect jaundice, skin conditions, malnutrition, and dehydration signs using AI vision.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSectionChange('computer-vision')}
              className="w-full border-green-500 text-green-700 hover:bg-green-500 hover:text-white"
            >
              📷 Upload Photo
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
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-green-700 rounded-2xl p-8 text-white shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">🌍 Our Impact in Zambia</h2>
          <p className="text-green-100 text-lg">Together, we're saving young lives with AI-powered healthcare</p>
        </div>
        
          <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold mb-2">👶 2,500+</div>
            <div className="text-green-100 font-medium">Children Screened</div>
          </div>
          <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold mb-2">👩‍⚕️ 150+</div>
            <div className="text-green-100 font-medium">Health Workers Trained</div>
          </div>
          <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold mb-2">🎯 95%</div>
            <div className="text-green-100 font-medium">Diagnostic Accuracy</div>
          </div>
          <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold mb-2">🌙 24/7</div>
            <div className="text-green-100 font-medium">Offline Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
