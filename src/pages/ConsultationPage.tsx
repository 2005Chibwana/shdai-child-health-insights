import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Stethoscope, FileText, Camera, BookOpen, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface HistoryData {
  chiefComplaint: string;
  feverDuration: string;
  coughType: string;
  diarrheaDuration: string;
  feedingPattern: string;
  vaccinationStatus: string;
  birthHistory: string;
  familyHistory: string;
}

interface ExaminationFindings {
  respiratory: string[];
  cardiovascular: string[];
  abdominal: string[];
  ent: string[];
  skin: string[];
  neurological: string[];
  classification: string;
}

const ConsultationPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [history, setHistory] = useState<HistoryData>({
    chiefComplaint: '',
    feverDuration: '',
    coughType: '',
    diarrheaDuration: '',
    feedingPattern: '',
    vaccinationStatus: '',
    birthHistory: '',
    familyHistory: ''
  });

  const [examination, setExamination] = useState<ExaminationFindings>({
    respiratory: [],
    cardiovascular: [],
    abdominal: [],
    ent: [],
    skin: [],
    neurological: [],
    classification: ''
  });

  const [showIMCIReference, setShowIMCIReference] = useState(false);

  const imciQuestions = [
    {
      category: 'General',
      questions: [
        { id: 'fever', label: 'Does the child have fever?', type: 'radio', options: ['Yes', 'No'] },
        { id: 'cough', label: 'Does the child have cough or difficult breathing?', type: 'radio', options: ['Yes', 'No'] },
        { id: 'diarrhea', label: 'Does the child have diarrhea?', type: 'radio', options: ['Yes', 'No'] }
      ]
    },
    {
      category: 'Fever Assessment',
      questions: [
        { id: 'feverDuration', label: 'How many days has the child had fever?', type: 'number' },
        { id: 'feverHistory', label: 'Has the child had fever every day?', type: 'radio', options: ['Yes', 'No'] },
        { id: 'malariaArea', label: 'Does the child live in or has recently visited a malaria area?', type: 'radio', options: ['Yes', 'No'] }
      ]
    },
    {
      category: 'Feeding Assessment',
      questions: [
        { id: 'breastfeeding', label: 'Is the child breastfeeding?', type: 'radio', options: ['Yes', 'No'] },
        { id: 'feedingProblems', label: 'Has feeding changed during illness?', type: 'radio', options: ['Increased', 'Decreased', 'Same'] },
        { id: 'appetite', label: 'How is the child\'s appetite?', type: 'radio', options: ['Good', 'Poor', 'Unable to feed'] }
      ]
    }
  ];

  const examinationSections = [
    {
      system: 'respiratory',
      title: 'Respiratory System',
      icon: '🫁',
      findings: [
        'Clear chest sounds',
        'Wheeze present',
        'Crackles/rales',
        'Chest indrawing',
        'Fast breathing',
        'Stridor'
      ]
    },
    {
      system: 'cardiovascular',
      title: 'Cardiovascular',
      icon: '❤️',
      findings: [
        'Normal heart sounds',
        'Murmur present',
        'Irregular rhythm',
        'Weak pulse',
        'Capillary refill >3s'
      ]
    },
    {
      system: 'abdominal',
      title: 'Abdominal',
      icon: '🤰',
      findings: [
        'Soft abdomen',
        'Distended',
        'Tender',
        'Mass palpable',
        'Hepatomegaly',
        'Splenomegaly'
      ]
    },
    {
      system: 'ent',
      title: 'ENT',
      icon: '👂',
      findings: [
        'Normal ears',
        'Ear discharge',
        'Red eardrum',
        'Throat normal',
        'Throat red',
        'Tonsillar exudate'
      ]
    }
  ];

  const imciClassifications = [
    'Pneumonia',
    'Severe pneumonia',
    'Malaria',
    'Severe malaria',
    'Diarrhea with dehydration',
    'Severe dehydration',
    'Acute malnutrition',
    'Severe acute malnutrition',
    'Ear infection',
    'Very severe disease'
  ];

  const handleHistoryChange = (field: keyof HistoryData, value: string) => {
    setHistory(prev => ({ ...prev, [field]: value }));
  };

  const handleExaminationChange = (system: keyof ExaminationFindings, finding: string, checked: boolean) => {
    if (system === 'classification') {
      setExamination(prev => ({ ...prev, classification: finding }));
    } else {
      setExamination(prev => ({
        ...prev,
        [system]: checked 
          ? [...(prev[system] as string[]), finding]
          : (prev[system] as string[]).filter(f => f !== finding)
      }));
    }
  };

  const generateAssessment = () => {
    console.log('History:', history);
    console.log('Examination:', examination);
    toast({
      title: "Assessment Complete",
      description: "IMCI-based consultation documented successfully."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Stethoscope className="h-8 w-8 text-primary" />
              IMCI Consultation Wizard
            </CardTitle>
            <CardDescription>
              Systematic assessment following WHO/UNICEF IMCI protocols
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">History Taking</TabsTrigger>
                <TabsTrigger value="examination">Physical Exam</TabsTrigger>
                <TabsTrigger value="classification">IMCI Classification</TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      IMCI History Taking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="space-y-2">
                      {imciQuestions.map((category, categoryIndex) => (
                        <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`}>
                          <AccordionTrigger className="text-left">
                            {category.category}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {category.questions.map((question, questionIndex) => (
                                <div key={questionIndex} className="space-y-2">
                                  <Label className="text-sm font-medium">{question.label}</Label>
                                  {question.type === 'radio' && question.options && (
                                    <RadioGroup defaultValue="">
                                      {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center space-x-2">
                                          <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                                          <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                                        </div>
                                      ))}
                                    </RadioGroup>
                                  )}
                                  {question.type === 'number' && (
                                    <Input 
                                      type="number" 
                                      placeholder="Enter number of days"
                                      className="max-w-xs"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                        <Textarea
                          id="chiefComplaint"
                          value={history.chiefComplaint}
                          onChange={(e) => handleHistoryChange('chiefComplaint', e.target.value)}
                          placeholder="Describe the main reason for the visit..."
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="familyHistory">Family & Birth History</Label>
                        <Textarea
                          id="familyHistory"
                          value={history.familyHistory}
                          onChange={(e) => handleHistoryChange('familyHistory', e.target.value)}
                          placeholder="Include birth weight, gestational age, family medical history..."
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examination">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Physical Examination
                    </CardTitle>
                    <CardDescription>
                      Step-by-step examination following IMCI guidelines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="space-y-2">
                      {examinationSections.map((section, index) => (
                        <AccordionItem key={index} value={`exam-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{section.icon}</span>
                              {section.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-2">
                              {section.findings.map((finding, findingIndex) => (
                                <div key={findingIndex} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${section.system}-${findingIndex}`}
                                    checked={(examination[section.system as keyof ExaminationFindings] as string[])?.includes(finding)}
                                    onCheckedChange={(checked) => 
                                      handleExaminationChange(section.system as keyof ExaminationFindings, finding, checked as boolean)
                                    }
                                  />
                                  <Label htmlFor={`${section.system}-${findingIndex}`} className="text-sm">
                                    {finding}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo of Findings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classification">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      IMCI Classification
                    </CardTitle>
                    <CardDescription>
                      Select the appropriate IMCI classification based on findings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Primary Classification:</Label>
                      <RadioGroup 
                        value={examination.classification}
                        onValueChange={(value) => handleExaminationChange('classification', value, true)}
                      >
                        {imciClassifications.map((classification, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={classification} id={`class-${index}`} />
                            <Label htmlFor={`class-${index}`} className="text-sm">
                              {classification}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {examination.classification && (
                        <Alert className="mt-4">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Selected Classification:</strong> {examination.classification}
                            <br />
                            Please refer to IMCI treatment guidelines for this classification.
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button onClick={generateAssessment} className="w-full mt-6">
                        Complete Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4" />
                  IMCI Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Danger Signs</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Unable to drink/breastfeed</li>
                    <li>• Vomits everything</li>
                    <li>• Convulsions</li>
                    <li>• Lethargic/unconscious</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Fast Breathing</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• 2-11 months: ≥50/min</li>
                    <li>• 12-59 months: ≥40/min</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Dehydration Signs</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Sunken eyes</li>
                    <li>• Skin pinch ≥2 seconds</li>
                    <li>• Restless/irritable</li>
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowIMCIReference(!showIMCIReference)}
                >
                  <BookOpen className="h-3 w-3 mr-2" />
                  View Full IMCI Charts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;