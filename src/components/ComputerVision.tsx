
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Eye, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';

const ComputerVision = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
        toast.success('Image uploaded successfully');
        console.log('Image uploaded:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsAnalyzing(true);
    console.log('Analyzing image with computer vision...');

    // Simulate AI computer vision analysis
    setTimeout(() => {
      const mockAnalysis = {
        detectedConditions: [
          {
            condition: 'Skin Rash (Viral Exanthem)',
            confidence: 78,
            severity: 'Mild',
            location: 'Face and torso',
            characteristics: ['Maculopapular', 'Non-confluent', 'Pink coloration']
          }
        ],
        vitalSigns: {
          dehydrationSigns: 'None detected',
          jaundiceLevel: 'Not present',
          nutritionalStatus: 'Normal appearance'
        },
        recommendations: [
          'Monitor rash progression',
          'Keep skin clean and dry',
          'Avoid scratching',
          'Consult pediatrician if fever develops'
        ],
        urgencyLevel: 'Low',
        followUpRequired: 'If symptoms worsen or persist beyond 7 days'
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast.success('Computer vision analysis completed');
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Image cleared');
  };

  const commonConditions = [
    { name: 'Skin Rashes', icon: '🔴', accuracy: '85%' },
    { name: 'Jaundice', icon: '🟡', accuracy: '92%' },
    { name: 'Dehydration Signs', icon: '💧', accuracy: '78%' },
    { name: 'Malnutrition', icon: '📏', accuracy: '81%' },
    { name: 'Eye Conditions', icon: '👁️', accuracy: '76%' },
    { name: 'Wound Assessment', icon: '🩹', accuracy: '88%' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Computer Vision Diagnostics
        </h1>
        <p className="text-gray-600 text-lg">
          AI-powered image analysis for rapid health assessment
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Image Upload Section */}
        <Card className="border-green-100 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-green-600" />
              <span>Image Upload & Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedImage ? (
              <div
                className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center cursor-pointer hover:border-green-300 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Child's Photo</h3>
                <p className="text-gray-500 mb-4">
                  Take or upload a clear photo of the affected area
                </p>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  Choose Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded for analysis"
                    className="w-full h-64 object-cover rounded-lg border border-green-200"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={clearImage}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={handleAnalyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Change Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detectable Conditions */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span>Detectable Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {commonConditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{condition.icon}</span>
                    <span className="font-medium text-sm">{condition.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {condition.accuracy}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                📱 Works best with clear, well-lit photos taken from 1-2 feet away
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <span>Computer Vision Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Detected Conditions */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span>Detected Conditions</span>
              </h4>
              {analysis.detectedConditions.map((condition: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-lg">{condition.condition}</h5>
                    <Badge className="bg-orange-100 text-orange-800">
                      {condition.confidence}% confidence
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Severity:</span> {condition.severity}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {condition.location}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-sm">Characteristics:</span>
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-600">
                      {condition.characteristics.map((char: string, idx: number) => (
                        <li key={idx}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Vital Signs Assessment */}
            <div>
              <h4 className="font-medium mb-3">Visual Health Indicators</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-sm text-green-800">Dehydration</div>
                  <div className="text-sm text-green-600">{analysis.vitalSigns.dehydrationSigns}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="font-medium text-sm text-yellow-800">Jaundice</div>
                  <div className="text-sm text-yellow-600">{analysis.vitalSigns.jaundiceLevel}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-sm text-blue-800">Nutrition</div>
                  <div className="text-sm text-blue-600">{analysis.vitalSigns.nutritionalStatus}</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium mb-3">Care Recommendations</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow-up */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Follow-up Required</span>
              </div>
              <p className="text-blue-700">{analysis.followUpRequired}</p>
            </div>

            <div className="text-xs text-gray-500 border-t pt-3">
              <p>⚠️ Computer vision analysis is a screening tool. Always consult healthcare professionals for accurate diagnosis and treatment.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComputerVision;
