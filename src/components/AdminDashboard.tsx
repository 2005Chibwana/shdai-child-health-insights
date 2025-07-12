
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Activity, 
  TrendingUp, 
  Server, 
  AlertTriangle,
  UserPlus,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const systemStats = {
    totalUsers: 324,
    activeUsers: 89,
    systemUptime: '99.8%',
    dataUsage: '2.4 GB'
  };

  const users = [
    {
      id: 1,
      name: 'Dr. Sarah Mwamba',
      role: 'Health Worker',
      location: 'Lusaka General Hospital',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastActive: '2 hours ago',
      diagnoses: 23
    },
    {
      id: 2,
      name: 'Mary Banda',
      role: 'Caregiver',
      location: 'Copperbelt Province',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastActive: '1 hour ago',
      diagnoses: 5
    },
    {
      id: 3,
      name: 'Dr. John Phiri',
      role: 'Health Worker',
      location: 'Kitwe Central Hospital',
      status: 'Inactive',
      statusColor: 'bg-gray-100 text-gray-800',
      lastActive: '2 days ago',
      diagnoses: 45
    }
  ];

  const diseaseData = [
    {
      disease: 'Malaria',
      cases: 156,
      trend: '+12%',
      trendColor: 'text-red-600',
      severity: 'High',
      regions: ['Lusaka', 'Copperbelt', 'Eastern']
    },
    {
      disease: 'Pneumonia',
      cases: 89,
      trend: '-5%',
      trendColor: 'text-green-600',
      severity: 'Medium',
      regions: ['Southern', 'Western']
    },
    {
      disease: 'Diarrhea',
      cases: 234,
      trend: '+8%',
      trendColor: 'text-yellow-600',
      severity: 'Medium',
      regions: ['Northern', 'Luapula']
    }
  ];

  const handleUserStatusToggle = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    toast.success(`User status changed to ${newStatus}`);
    console.log(`Toggling user ${userId} status to ${newStatus}`);
  };

  const handleAddUser = () => {
    toast.success('New user invitation sent');
    console.log('Adding new user to SHDAI system');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">System management and surveillance oversight</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={handleAddUser}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-purple-600">{systemStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-blue-600">{systemStats.systemUptime}</p>
              </div>
              <Server className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Usage</p>
                <p className="text-2xl font-bold text-orange-600">{systemStats.dataUsage}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="surveillance">Disease Surveillance</TabsTrigger>
          <TabsTrigger value="system">System Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>User Management</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users
                  .filter(user => 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.location.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.location}</p>
                        <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-blue-100 text-blue-800">
                        {user.diagnoses} diagnoses
                      </Badge>
                      <Badge className={user.statusColor}>
                        {user.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserStatusToggle(user.id, user.status)}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surveillance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Real-Time Disease Surveillance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseaseData.map((disease, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{disease.disease}</h4>
                        <p className="text-sm text-gray-600">{disease.cases} reported cases</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${disease.trendColor}`}>
                            {disease.trend} this week
                          </span>
                          <Badge className={
                            disease.severity === 'High' ? 'bg-red-100 text-red-800' :
                            disease.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {disease.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Active regions: {disease.regions.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Generate Alert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-blue-600" />
                  <span>System Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Response Time</span>
                  <Badge className="bg-green-100 text-green-800">142ms</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database Queries</span>
                  <Badge className="bg-blue-100 text-blue-800">2,456/hr</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Connections</span>
                  <Badge className="bg-purple-100 text-purple-800">89</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Error Rate</span>
                  <Badge className="bg-green-100 text-green-800">0.02%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Model Status</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Computer Vision</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SMS Gateway</span>
                  <div className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Maintenance</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup System</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
