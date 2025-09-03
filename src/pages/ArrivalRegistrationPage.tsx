import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Baby, Users, CreditCard, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RegistrationData {
  childName: string;
  ageGroup: string;
  gender: string;
  dateOfBirth: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  nationalId: string;
  insuranceNumber: string;
  patientType: 'first-time' | 'returning';
  paymentMethod: string;
}

const ArrivalRegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    childName: '',
    ageGroup: '',
    gender: '',
    dateOfBirth: '',
    guardianName: '',
    guardianPhone: '',
    address: '',
    nationalId: '',
    insuranceNumber: '',
    patientType: 'first-time',
    paymentMethod: ''
  });

  const ageGroups = [
    { value: '0-2-months', label: '0-2 months', imciGroup: 'Young Infant' },
    { value: '2-12-months', label: '2-12 months', imciGroup: 'Infant' },
    { value: '12-24-months', label: '12-24 months', imciGroup: 'Child 12-24m' },
    { value: '2-5-years', label: '2-5 years', imciGroup: 'Child 2-5 years' }
  ];

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Registration submitted:', formData);
    toast({
      title: "Registration Complete",
      description: "Child patient has been registered successfully."
    });
  };

  const getFeeStructure = () => {
    const fees = {
      'first-time': { consultation: 50, registration: 25 },
      'returning': { consultation: 30, registration: 0 }
    };
    return fees[formData.patientType];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Baby className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Child Patient Registration</CardTitle>
            </div>
            <CardDescription>
              IMCI-guided registration for children under 5 years
            </CardDescription>
            <Progress value={(step / 3) * 100} className="mt-4" />
          </CardHeader>
        </Card>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Baby className="h-4 w-4" />
          <AlertDescription>
            <strong>IMCI Protocol:</strong> Ensure all children under 5 years are assessed for general danger signs during registration.
          </AlertDescription>
        </Alert>

        <Tabs value={`step-${step}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1" disabled={step < 1}>Patient Demographics</TabsTrigger>
            <TabsTrigger value="step-2" disabled={step < 2}>Medical Information</TabsTrigger>
            <TabsTrigger value="step-3" disabled={step < 3}>Payment & Confirmation</TabsTrigger>
          </TabsList>

          <TabsContent value="step-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Demographics Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="childName">Child's Full Name</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => handleInputChange('childName', e.target.value)}
                      placeholder="Enter child's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ageGroup">IMCI Age Group</Label>
                    <Select onValueChange={(value) => handleInputChange('ageGroup', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((group) => (
                          <SelectItem key={group.value} value={group.value}>
                            {group.label} - {group.imciGroup}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guardianName">Guardian/Parent Name</Label>
                    <Input
                      id="guardianName"
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      placeholder="Enter guardian's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianPhone">Guardian Contact</Label>
                    <Input
                      id="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Home Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                  />
                </div>
                <Button onClick={() => setStep(2)} className="w-full">
                  Continue to Medical Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="step-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical Card & Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nationalId">National Health ID</Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      placeholder="Enter national ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceNumber">Insurance Number (Optional)</Label>
                    <Input
                      id="insuranceNumber"
                      value={formData.insuranceNumber}
                      onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                      placeholder="Enter insurance number"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Patient Type</Label>
                  <div className="flex gap-4 mt-2">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer ${formData.patientType === 'first-time' ? 'border-primary bg-primary/5' : 'border-input'}`}
                      onClick={() => handleInputChange('patientType', 'first-time')}
                    >
                      <h3 className="font-medium">First-time Patient</h3>
                      <p className="text-sm text-muted-foreground">New registration required</p>
                      <Badge variant="secondary" className="mt-2">Registration Fee: ZMW 25</Badge>
                    </div>
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer ${formData.patientType === 'returning' ? 'border-primary bg-primary/5' : 'border-input'}`}
                      onClick={() => handleInputChange('patientType', 'returning')}
                    >
                      <h3 className="font-medium">Returning Patient</h3>
                      <p className="text-sm text-muted-foreground">Has previous records</p>
                      <Badge variant="secondary" className="mt-2">No Registration Fee</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="step-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment & Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Fee Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Consultation Fee:</span>
                      <span>ZMW {getFeeStructure().consultation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration Fee:</span>
                      <span>ZMW {getFeeStructure().registration}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>ZMW {getFeeStructure().consultation + getFeeStructure().registration}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <Select onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash Payment</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="insurance">Insurance Coverage</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Alert>
                  <Baby className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Next Step:</strong> After registration, the child will proceed to IMCI-based triage assessment.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    Complete Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArrivalRegistrationPage;