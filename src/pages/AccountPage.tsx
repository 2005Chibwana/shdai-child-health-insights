import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react';

const AccountPage = () => {
  // Mock user data from localStorage or props
  const userData = {
    name: "Sarah Mwansa",
    email: "sarah.mwansa@email.com",
    phone: "+260 97 123 4567",
    role: localStorage.getItem('userRole') || 'caregiver',
    joinDate: "March 2024",
    location: "Lusaka, Zambia",
    profilePicture: null,
    children: 2,
    lastLogin: "2 hours ago"
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    alert('Edit profile functionality would open here');
  };

  const handleViewActivity = () => {
    console.log('View activity clicked');
    alert('Activity log would be displayed here');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your SHDAI profile and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal details and account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userData.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{userData.name}</h3>
                <Badge variant={userData.role === 'healthWorker' ? 'default' : 'secondary'}>
                  {userData.role === 'healthWorker' ? 'Healthcare Worker' : 'Caregiver'}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {userData.joinDate}</span>
              </div>
            </div>

            <Button onClick={handleEditProfile} className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Statistics
            </CardTitle>
            <CardDescription>Your activity and usage summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userData.children}</div>
                <div className="text-sm text-muted-foreground">Children Registered</div>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Health Checks</div>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Appointments</div>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Health Score</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Last login:</span> {userData.lastLogin}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Account status:</span>
                <Badge variant="default" className="ml-2">Active</Badge>
              </div>
            </div>

            <Button variant="outline" onClick={handleViewActivity} className="w-full">
              View Activity Log
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <User className="h-6 w-6" />
                <span className="text-sm">Update Profile</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-sm">Privacy Settings</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Mail className="h-6 w-6" />
                <span className="text-sm">Notifications</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Phone className="h-6 w-6" />
                <span className="text-sm">Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountPage;