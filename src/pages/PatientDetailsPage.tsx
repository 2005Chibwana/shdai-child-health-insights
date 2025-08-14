import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { User, MapPin, Calendar, Thermometer, Stethoscope, Droplets, AlertTriangle } from 'lucide-react';

const PatientDetailsPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    location: '',
    age: '',
    ageUnit: 'months',
    pastIllnesses: '',
    eatingHabits: '',
    breastfeeding: '',
    vaccinations: '',
    additionalInfo: ''
  });

  // Check if user is healthcare worker
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'healthWorker') {
      navigate('/');
    }
  }, [navigate]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const symptoms = [
    { id: 'fever', name: 'Fever', icon: Thermometer, color: 'bg-red-100 text-red-800' },
    { id: 'cough', name: 'Cough', icon: Stethoscope, color: 'bg-blue-100 text-blue-800' },
    { id: 'diarrhea', name: 'Diarrhea', icon: Droplets, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'vomiting', name: 'Vomiting', icon: AlertTriangle, color: 'bg-orange-100 text-orange-800' }
  ];

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const patientData = {
      ...formData,
      symptoms: selectedSymptoms,
      timestamp: new Date().toISOString()
    };
    console.log('Patient details submitted:', patientData);
    alert('Patient details recorded successfully!');
    // Reset form or navigate to next page
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter patient's location (e.g., Lusaka, Kitwe)"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age-unit">Age Unit</Label>
                <Select value={formData.ageUnit} onValueChange={(value) => handleInputChange('ageUnit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.age && parseInt(formData.age) < 24 && formData.ageUnit === 'months' && (
              <div className="space-y-2">
                <Label htmlFor="breastfeeding">Breastfeeding Status</Label>
                <Select value={formData.breastfeeding} onValueChange={(value) => handleInputChange('breastfeeding', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select breastfeeding status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exclusive">Exclusive breastfeeding</SelectItem>
                    <SelectItem value="mixed">Mixed feeding</SelectItem>
                    <SelectItem value="none">Not breastfeeding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical History</h3>
            
            <div className="space-y-2">
              <Label htmlFor="past-illnesses">Past Illnesses</Label>
              <Textarea
                id="past-illnesses"
                placeholder="List any previous illnesses, hospitalizations, or medical conditions"
                value={formData.pastIllnesses}
                onChange={(e) => handleInputChange('pastIllnesses', e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vaccinations">Vaccination History</Label>
              <Textarea
                id="vaccinations"
                placeholder="List recent vaccinations or mention if vaccination card is available"
                value={formData.vaccinations}
                onChange={(e) => handleInputChange('vaccinations', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nutrition & Eating Habits</h3>
            
            <div className="space-y-2">
              <Label htmlFor="eating-habits">Eating Habits</Label>
              <Select value={formData.eatingHabits} onValueChange={(value) => handleInputChange('eatingHabits', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select eating pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal appetite and eating</SelectItem>
                  <SelectItem value="reduced">Reduced appetite</SelectItem>
                  <SelectItem value="unable">Unable to eat or drink</SelectItem>
                  <SelectItem value="vomiting">Vomiting everything</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.eatingHabits === 'reduced' && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Reduced appetite may indicate illness. Monitor closely and assess for other danger signs.
                </AlertDescription>
              </Alert>
            )}

            {formData.eatingHabits === 'unable' && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>DANGER SIGN:</strong> Unable to eat or drink requires immediate medical attention.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Symptoms</h3>
            <p className="text-sm text-muted-foreground">Select all symptoms the patient is currently experiencing</p>
            
            <div className="grid grid-cols-2 gap-3">
              {symptoms.map((symptom) => {
                const Icon = symptom.icon;
                const isSelected = selectedSymptoms.includes(symptom.id);
                
                return (
                  <Button
                    key={symptom.id}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleSymptomToggle(symptom.id)}
                    className="h-auto p-4 flex flex-col gap-2"
                  >
                    <Icon className="h-6 w-6" />
                    <span>{symptom.name}</span>
                  </Button>
                );
              })}
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Selected Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptomId => {
                    const symptom = symptoms.find(s => s.id === symptomId);
                    return (
                      <Badge key={symptomId} variant="secondary">
                        {symptom?.name}
                      </Badge>
                    );
                  })}
                </div>

                <Accordion type="single" collapsible className="border rounded-lg">
                  {selectedSymptoms.includes('fever') && (
                    <AccordionItem value="fever">
                      <AccordionTrigger className="px-4">Fever Assessment</AccordionTrigger>
                      <AccordionContent className="px-4 space-y-3">
                        <div className="space-y-2">
                          <Label>Duration of fever</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="How long has the fever lasted?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-day">Less than 1 day</SelectItem>
                              <SelectItem value="1-3-days">1-3 days</SelectItem>
                              <SelectItem value="more-3-days">More than 3 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Temperature if measured</Label>
                          <Input placeholder="e.g., 38.5°C (if available)" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {selectedSymptoms.includes('cough') && (
                    <AccordionItem value="cough">
                      <AccordionTrigger className="px-4">Cough Assessment</AccordionTrigger>
                      <AccordionContent className="px-4 space-y-3">
                        <div className="space-y-2">
                          <Label>Type of cough</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Describe the cough" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dry">Dry cough</SelectItem>
                              <SelectItem value="productive">Cough with phlegm</SelectItem>
                              <SelectItem value="barking">Barking cough</SelectItem>
                              <SelectItem value="whooping">Whooping cough</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input placeholder="How long has the cough lasted?" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {selectedSymptoms.includes('diarrhea') && (
                    <AccordionItem value="diarrhea">
                      <AccordionTrigger className="px-4">Diarrhea Assessment</AccordionTrigger>
                      <AccordionContent className="px-4 space-y-3">
                        <div className="space-y-2">
                          <Label>Frequency</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="How many times per day?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3-5">3-5 times per day</SelectItem>
                              <SelectItem value="6-10">6-10 times per day</SelectItem>
                              <SelectItem value="more-10">More than 10 times per day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Appearance</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Describe the stool" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="watery">Watery</SelectItem>
                              <SelectItem value="bloody">Contains blood</SelectItem>
                              <SelectItem value="mucus">Contains mucus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                placeholder="Any other relevant information about the patient's condition"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Patient Details</h1>
        <p className="text-muted-foreground">Enter comprehensive patient information for IMCI assessment</p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Step {currentStep}: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Medical History' :
              currentStep === 3 ? 'Nutrition & Eating' :
              'Current Symptoms'
            }
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Basic demographic and location information"}
            {currentStep === 2 && "Previous medical conditions and vaccination history"}
            {currentStep === 3 && "Current eating patterns and nutritional status"}
            {currentStep === 4 && "Present symptoms and clinical assessment"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Complete Assessment
          </Button>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsPage;