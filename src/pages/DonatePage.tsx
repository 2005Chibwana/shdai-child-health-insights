import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, Stethoscope, Globe, ArrowLeft, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';
import shdaiLogo from '@/assets/shdai-logo.jpg';

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const predefinedAmounts = ['25', '50', '100', '250', '500', '1000'];
  const currentGoal = 75000;
  const currentRaised = 42500;
  const progressPercentage = (currentRaised / currentGoal) * 100;

  const impactAreas = [
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: "Medical Equipment",
      description: "Provide essential diagnostic tools and medical equipment to rural healthcare facilities",
      impact: "$100 = 1 digital thermometer for accurate fever detection"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Healthcare Training",
      description: "Train healthcare workers in IMCI protocols and AI-assisted diagnostics",
      impact: "$250 = Train 1 healthcare worker for 6 months"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Technology Access",
      description: "Expand SHDAI platform access to underserved communities",
      impact: "$50 = 1 month of platform access for rural clinic"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Expansion",
      description: "Scale SHDAI to reach more children across Africa and beyond",
      impact: "$500 = Support system deployment in 1 new region"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-lg">
              <img 
                src={shdaiLogo} 
                alt="SHDAI Logo" 
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Support Child Healthcare
              </h1>
              <p className="text-sm text-muted-foreground">Help us save more children's lives</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Donation Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Progress */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <CardTitle className="text-primary">Emergency Healthcare Fund</CardTitle>
                </div>
                <CardDescription>
                  Help us reach our goal to provide AI-powered healthcare diagnostics to 10,000 children in rural Zambia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Raised: ${currentRaised.toLocaleString()}</span>
                  <span className="font-semibold">Goal: ${currentGoal.toLocaleString()}</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-medium">{progressPercentage.toFixed(1)}% Complete</span>
                  <span className="text-muted-foreground">1,247 supporters</span>
                </div>
              </CardContent>
            </Card>

            {/* Donation Amount Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Donation Amount</CardTitle>
                <CardDescription>Every contribution helps save children's lives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount ? "default" : "outline"}
                      className="h-12"
                      onClick={() => {
                        setDonationAmount(amount);
                        setCustomAmount('');
                      }}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="pl-8"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount('');
                      }}
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Donor Information (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    />
                  </div>
                  <Textarea
                    placeholder="Message or dedication (optional)"
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                  />
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="h-16 flex-col">
                      <CreditCard className="h-6 w-6 mb-1" />
                      <span className="text-xs">Credit/Debit Card</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Smartphone className="h-6 w-6 mb-1" />
                      <span className="text-xs">Mobile Money</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Banknote className="h-6 w-6 mb-1" />
                      <span className="text-xs">Bank Transfer</span>
                    </Button>
                  </div>
                </div>

                <Button className="w-full h-12 text-lg font-semibold" size="lg">
                  Donate ${donationAmount || customAmount || '0'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Impact Areas Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Your Impact</CardTitle>
                <CardDescription>See how your donation makes a difference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {impactAreas.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      {area.icon}
                      <h4 className="font-semibold text-sm">{area.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{area.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {area.impact}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Donors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Supporters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Dr. Sarah M.", amount: 250, time: "2 hours ago" },
                  { name: "Anonymous", amount: 100, time: "4 hours ago" },
                  { name: "James K.", amount: 500, time: "6 hours ago" },
                  { name: "Mary L.", amount: 75, time: "8 hours ago" }
                ].map((donor, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-xs text-muted-foreground">{donor.time}</p>
                    </div>
                    <Badge variant="outline">${donor.amount}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;