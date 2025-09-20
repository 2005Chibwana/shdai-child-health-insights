import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Send,
  Globe,
  Users,
  Stethoscope,
  MessageSquare,
  FileText,
  Bug
} from 'lucide-react';
import { Link } from 'react-router-dom';
import shdaiLogo from '@/assets/shdai-logo.jpg';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "info@shdai.org",
      description: "General inquiries and support"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+260 123 456 789",
      description: "Emergency healthcare support"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "Lusaka, Zambia",
      description: "SHDAI Headquarters"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Hours",
      value: "24/7 Emergency Support",
      description: "Mon-Fri 8AM-6PM for general inquiries"
    }
  ];

  const departments = [
    {
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      title: "Clinical Support",
      email: "clinical@shdai.org",
      description: "IMCI protocols, diagnostic questions, medical guidance"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Training & Education",
      email: "training@shdai.org", 
      description: "Healthcare worker training, educational resources"
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Partnerships",
      email: "partnerships@shdai.org",
      description: "Collaboration opportunities, institutional partnerships"
    },
    {
      icon: <Bug className="h-6 w-6 text-primary" />,
      title: "Technical Support",
      email: "support@shdai.org",
      description: "Platform issues, technical troubleshooting"
    }
  ];

  const inquiryTypes = [
    { value: "clinical", label: "Clinical Question", icon: <Stethoscope className="h-4 w-4" /> },
    { value: "technical", label: "Technical Support", icon: <Bug className="h-4 w-4" /> },
    { value: "training", label: "Training Request", icon: <Users className="h-4 w-4" /> },
    { value: "partnership", label: "Partnership", icon: <Globe className="h-4 w-4" /> },
    { value: "feedback", label: "Feedback", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "media", label: "Media Inquiry", icon: <FileText className="h-4 w-4" /> }
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
                Contact SHDAI
              </h1>
              <p className="text-sm text-muted-foreground">Get in touch with our healthcare team</p>
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
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Send us a Message</CardTitle>
                <CardDescription>
                  We're here to help improve child healthcare. Reach out with any questions or feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address *</label>
                      <Input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+260 123 456 789"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Organization</label>
                      <Input
                        placeholder="Hospital, clinic, NGO, etc."
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Inquiry Type *</label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                {type.icon}
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General inquiry</SelectItem>
                          <SelectItem value="medium">Medium - Standard support</SelectItem>
                          <SelectItem value="high">High - Urgent clinical question</SelectItem>
                          <SelectItem value="emergency">Emergency - Critical patient case</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject *</label>
                    <Input
                      required
                      placeholder="Brief summary of your inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <Textarea
                      required
                      placeholder="Please provide detailed information about your inquiry..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Get in Touch</CardTitle>
                <CardDescription>Multiple ways to reach our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{info.label}</p>
                      <p className="text-sm text-primary">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Department Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Department Contacts</CardTitle>
                <CardDescription className="text-xs">Direct lines to specialized teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {dept.icon}
                      <h4 className="font-semibold text-sm">{dept.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{dept.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {dept.email}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive text-sm">Medical Emergency?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  For immediate medical emergencies, contact your local emergency services or nearest healthcare facility.
                </p>
                <div className="flex space-x-2">
                  <Badge variant="destructive" className="text-xs">
                    Emergency: 911
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    SHDAI Hotline: +260 999 000
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;