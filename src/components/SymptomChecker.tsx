
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, AlertTriangle, CheckCircle, Clock, Thermometer, Activity } from 'lucide-react';
import { toast } from 'sonner';

const SymptomChecker = () => {
  const [isListening, setIsListening] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [childAge, setChildAge] = useState('');
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleVoiceToggle = () => {
    if (!isListening) {
      // Start voice recognition
      setIsListening(true);
      toast.success('Voice recognition started. Please speak clearly.');
      
      // Simulate voice input after 3 seconds
      setTimeout(() => {
        setSymptoms('Child has fever, cough, and difficulty breathing for 2 days');
        setIsListening(false);
        toast.success('Voice input captured successfully');
      }, 3000);
    } else {
      setIsListening(false);
      toast.info('Voice recognition stopped');
    }
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim() || !childAge.trim()) {
      toast.error('Please provide symptoms and child age');
      return;
    }

    setIsAnalyzing(true);
    console.log('Analyzing symptoms:', symptoms, 'Age:', childAge);

    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnosis = {
        primaryDiagnosis: 'Pneumonia (Suspected)',
        confidence: 85,
        urgency: 'High',
        urgencyColor: 'text-red-600',
        recommendations: [
          'Seek immediate medical attention',
          'Monitor breathing rate and temperature',
          'Ensure child stays hydrated',
          'Do not give aspirin to children'
        ],
        imciClassification: 'Pneumonia - Fast Breathing',
        riskFactors: ['Age under 5', 'Respiratory symptoms', 'Fever duration'],
        nextSteps: 'Visit nearest health facility within 2 hours'
      };

      setDiagnosis(mockDiagnosis);
      setIsAnalyzing(false);
      toast.success('Symptom analysis completed');
    }, 2000);
  };

  const clearForm = () => {
    setSymptoms('');
    setChildAge('');
    setDiagnosis(null);
    toast.info('Form cleared');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          AI-Powered Symptom Checker
        </h1>
        <p className="text-gray-600 text-lg">
          Voice-enabled IMCI-based diagnosis for children under 5
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Symptom Input</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Child's Age</label>
              <Input
                type="text"
                placeholder="e.g., 2 years, 18 months"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center justify-between">
                <span>Describe Symptoms</span>
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleVoiceToggle}
                  className="text-xs"
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-3 w-3 mr-1" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Mic className="h-3 w-3 mr-1" />
                      Voice
                    </>
                  )}
                </Button>
              </label>
              <Textarea
                placeholder="Describe the child's symptoms, duration, and any other relevant details..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                className="border-blue-200 focus:border-blue-400"
              />
              {isListening && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span>Listening... Speak clearly</span>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>
              <Button variant="outline" onClick={clearForm}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-green-600" />
              <span>Diagnosis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {diagnosis ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{diagnosis.primaryDiagnosis}</h3>
                    <Badge className="bg-blue-100 text-blue-800">
                      {diagnosis.confidence}% confidence
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`h-4 w-4 ${diagnosis.urgencyColor}`} />
                    <span className={`font-medium ${diagnosis.urgencyColor}`}>
                      {diagnosis.urgency} Priority
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>IMCI Classification</span>
                  </h4>
                  <p className="text-gray-600 bg-green-50 p-3 rounded-lg">
                    {diagnosis.imciClassification}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Immediate Recommendations</h4>
                  <ul className="space-y-2">
                    {diagnosis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Next Steps</span>
                  </div>
                  <p className="text-orange-700">{diagnosis.nextSteps}</p>
                </div>

                <div className="text-xs text-gray-500 border-t pt-3">
                  <p>⚠️ This is an AI-powered preliminary assessment. Always consult with qualified healthcare professionals for proper diagnosis and treatment.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Enter symptoms above to get AI-powered diagnosis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;
