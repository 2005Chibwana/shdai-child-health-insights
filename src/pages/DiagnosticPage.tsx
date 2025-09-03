import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { FileText, TestTube, Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DiagnosticTest {
  id: string;
  name: string;
  indication: string;
  imciCriteria: string;
  urgency: 'routine' | 'urgent' | 'immediate';
  cost: number;
}

interface TestResult {
  testId: string;
  result: string;
  status: 'pending' | 'completed' | 'abnormal';
  interpretation: string;
}

const DiagnosticPage = () => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState('selection');

  const commonSymptoms = [
    { id: 'fever', label: 'Fever >37.5°C', imciLink: 'Fever assessment' },
    { id: 'cough', label: 'Cough/Difficult breathing', imciLink: 'Pneumonia protocol' },
    { id: 'diarrhea', label: 'Diarrhea', imciLink: 'Diarrhea management' },
    { id: 'vomiting', label: 'Vomiting', imciLink: 'Dehydration assessment' },
    { id: 'poor-feeding', label: 'Poor feeding', imciLink: 'Feeding problems' },
    { id: 'lethargy', label: 'Lethargy', imciLink: 'Danger signs' }
  ];

  const diagnosticTests: DiagnosticTest[] = [
    {
      id: 'malaria-rdt',
      name: 'Malaria Rapid Test (RDT)',
      indication: 'Fever without obvious cause',
      imciCriteria: 'Fever + malaria area + no pneumonia',
      urgency: 'urgent',
      cost: 15
    },
    {
      id: 'malaria-microscopy',
      name: 'Malaria Microscopy',
      indication: 'Confirm malaria species',
      imciCriteria: 'RDT positive or high suspicion',
      urgency: 'routine',
      cost: 25
    },
    {
      id: 'fbc',
      name: 'Full Blood Count (FBC)',
      indication: 'Anemia, infection assessment',
      imciCriteria: 'Severe pallor or prolonged fever',
      urgency: 'urgent',
      cost: 35
    },
    {
      id: 'stool-analysis',
      name: 'Stool Analysis',
      indication: 'Diarrhea >14 days',
      imciCriteria: 'Persistent diarrhea or blood in stool',
      urgency: 'routine',
      cost: 20
    },
    {
      id: 'urine-analysis',
      name: 'Urine Analysis',
      indication: 'UTI suspected',
      imciCriteria: 'Fever + urinary symptoms',
      urgency: 'routine',
      cost: 15
    },
    {
      id: 'chest-xray',
      name: 'Chest X-ray',
      indication: 'Pneumonia complications',
      imciCriteria: 'Severe pneumonia or treatment failure',
      urgency: 'urgent',
      cost: 50
    },
    {
      id: 'hiv-test',
      name: 'HIV Test',
      indication: 'Recurrent infections',
      imciCriteria: 'Per national guidelines',
      urgency: 'routine',
      cost: 30
    }
  ];

  const getTestsBySymptom = (symptomId: string): DiagnosticTest[] => {
    const testMap: { [key: string]: string[] } = {
      'fever': ['malaria-rdt', 'malaria-microscopy', 'fbc', 'urine-analysis'],
      'cough': ['chest-xray', 'fbc'],
      'diarrhea': ['stool-analysis', 'fbc'],
      'vomiting': ['fbc', 'urine-analysis'],
      'poor-feeding': ['fbc', 'hiv-test'],
      'lethargy': ['malaria-rdt', 'fbc', 'hiv-test']
    };

    return diagnosticTests.filter(test => testMap[symptomId]?.includes(test.id));
  };

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSymptoms(prev => [...prev, symptomId]);
      // Auto-suggest tests based on IMCI criteria
      const suggestedTests = getTestsBySymptom(symptomId);
      const newTests = suggestedTests.filter(test => !selectedTests.includes(test.id));
      setSelectedTests(prev => [...prev, ...newTests.map(test => test.id)]);
    } else {
      setSymptoms(prev => prev.filter(s => s !== symptomId));
    }
  };

  const handleTestSelection = (testId: string, checked: boolean) => {
    if (checked) {
      setSelectedTests(prev => [...prev, testId]);
    } else {
      setSelectedTests(prev => prev.filter(t => t !== testId));
    }
  };

  const orderTests = () => {
    const newResults: TestResult[] = selectedTests.map(testId => ({
      testId,
      result: 'Pending',
      status: 'pending',
      interpretation: 'Test ordered - awaiting results'
    }));
    
    setTestResults(newResults);
    setActiveTab('results');
    
    toast({
      title: "Tests Ordered",
      description: `${selectedTests.length} diagnostic tests have been ordered.`
    });

    // Simulate test completion after 3 seconds
    setTimeout(() => {
      simulateTestResults();
    }, 3000);
  };

  const simulateTestResults = () => {
    const mockResults: { [key: string]: { result: string; status: 'completed' | 'abnormal'; interpretation: string } } = {
      'malaria-rdt': { 
        result: 'Positive for P. falciparum', 
        status: 'abnormal', 
        interpretation: 'Malaria infection confirmed. Initiate antimalarial treatment per IMCI guidelines.' 
      },
      'fbc': { 
        result: 'Hb: 8.5g/dL, WBC: 12,000/μL', 
        status: 'abnormal', 
        interpretation: 'Moderate anemia present. Monitor response to treatment.' 
      },
      'stool-analysis': { 
        result: 'No parasites seen', 
        status: 'completed', 
        interpretation: 'Normal findings. Consider other causes if diarrhea persists.' 
      }
    };

    setTestResults(prev => prev.map(test => ({
      ...test,
      ...mockResults[test.testId] || { 
        result: 'Normal', 
        status: 'completed', 
        interpretation: 'No abnormalities detected.' 
      }
    })));

    toast({
      title: "Test Results Available",
      description: "Laboratory results have been received and are ready for review."
    });
  };

  const getTotalCost = () => {
    return selectedTests.reduce((total, testId) => {
      const test = diagnosticTests.find(t => t.id === testId);
      return total + (test?.cost || 0);
    }, 0);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-100 text-red-800 border-red-300';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'routine': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <TestTube className="h-8 w-8 text-primary" />
              IMCI Diagnostic Center
            </CardTitle>
            <CardDescription>
              Evidence-based test ordering for pediatric patients
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="selection">Test Selection</TabsTrigger>
            <TabsTrigger value="criteria">IMCI Decision Rules</TabsTrigger>
            <TabsTrigger value="results">Results & Interpretation</TabsTrigger>
          </TabsList>

          <TabsContent value="selection">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Symptom-Based Test Selection
                    </CardTitle>
                    <CardDescription>
                      Select symptoms to get IMCI-guided test recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Present Symptoms:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {commonSymptoms.map((symptom) => (
                          <div key={symptom.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom.id}
                              checked={symptoms.includes(symptom.id)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                            />
                            <Label htmlFor={symptom.id} className="text-sm">
                              {symptom.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Recommended Tests:</h3>
                      <div className="space-y-3">
                        {diagnosticTests.map((test) => (
                          <div 
                            key={test.id} 
                            className={`p-3 border rounded-lg ${selectedTests.includes(test.id) ? 'border-primary bg-primary/5' : 'border-input'}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={test.id}
                                  checked={selectedTests.includes(test.id)}
                                  onCheckedChange={(checked) => handleTestSelection(test.id, checked as boolean)}
                                />
                                <div>
                                  <Label htmlFor={test.id} className="font-medium text-sm">
                                    {test.name}
                                  </Label>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {test.indication}
                                  </p>
                                  <p className="text-xs text-primary mt-1">
                                    IMCI: {test.imciCriteria}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <Badge className={getUrgencyColor(test.urgency)}>
                                  {test.urgency}
                                </Badge>
                                <span className="text-sm font-medium">ZMW {test.cost}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Tests Selected:</span>
                        <span className="font-medium">{selectedTests.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Cost:</span>
                        <span className="font-medium">ZMW {getTotalCost()}</span>
                      </div>
                    </div>

                    {selectedTests.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Selected Tests:</h4>
                        {selectedTests.map(testId => {
                          const test = diagnosticTests.find(t => t.id === testId);
                          return (
                            <div key={testId} className="text-xs p-2 bg-secondary/20 rounded">
                              {test?.name}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <Button 
                      onClick={orderTests} 
                      disabled={selectedTests.length === 0}
                      className="w-full"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      Order Tests
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="criteria">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  IMCI Decision Rules for Diagnostics
                </CardTitle>
                <CardDescription>
                  When to order specific tests based on IMCI protocols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-4 text-primary">Laboratory Tests</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-400 pl-4">
                        <h4 className="font-medium">Malaria Testing</h4>
                        <p className="text-sm text-muted-foreground">
                          Order when: Fever + lives in malaria area + no signs of pneumonia
                        </p>
                        <p className="text-xs text-orange-600 mt-1">
                          RDT first choice, microscopy for confirmation
                        </p>
                      </div>

                      <div className="border-l-4 border-red-400 pl-4">
                        <h4 className="font-medium">Full Blood Count</h4>
                        <p className="text-sm text-muted-foreground">
                          Order when: Severe pallor + prolonged fever + poor feeding
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          Check for anemia and infection markers
                        </p>
                      </div>

                      <div className="border-l-4 border-blue-400 pl-4">
                        <h4 className="font-medium">Stool Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Order when: Diarrhea &gt;14 days OR blood in stool
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Look for parasites and bacterial pathogens
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-4 text-primary">Imaging Studies</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-400 pl-4">
                        <h4 className="font-medium">Chest X-ray</h4>
                        <p className="text-sm text-muted-foreground">
                          Order when: Severe pneumonia OR pneumonia not improving after 2 days
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          Look for complications like effusion
                        </p>
                      </div>

                      <div className="border-l-4 border-green-400 pl-4">
                        <h4 className="font-medium">Abdominal Ultrasound</h4>
                        <p className="text-sm text-muted-foreground">
                          Order when: Persistent abdominal pain + mass palpable
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Assess for organomegaly or masses
                        </p>
                      </div>
                    </div>

                    <Alert className="mt-6">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Remember:</strong> Always treat based on clinical signs. Tests should support, not replace, clinical judgment.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Test Results & Interpretation
                </CardTitle>
                <CardDescription>
                  Clinical interpretation based on IMCI guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tests ordered yet. Go to Test Selection to order diagnostic tests.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testResults.map((result, index) => {
                      const test = diagnosticTests.find(t => t.id === result.testId);
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{test?.name}</h4>
                              <p className="text-sm text-muted-foreground">{test?.indication}</p>
                            </div>
                            <Badge 
                              variant={result.status === 'abnormal' ? 'destructive' : result.status === 'completed' ? 'default' : 'secondary'}
                            >
                              {result.status}
                            </Badge>
                          </div>
                          
                          <div className="bg-secondary/10 p-3 rounded mb-3">
                            <p className="font-medium text-sm">Result:</p>
                            <p className="text-sm">{result.result}</p>
                          </div>
                          
                          <div className="bg-primary/5 p-3 rounded">
                            <p className="font-medium text-sm text-primary">Clinical Interpretation:</p>
                            <p className="text-sm">{result.interpretation}</p>
                          </div>
                          
                          {result.status === 'pending' && (
                            <div className="mt-3">
                              <Progress value={33} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">Processing...</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DiagnosticPage;