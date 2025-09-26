import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  AlertTriangle, 
  Clock, 
  Activity,
  TrendingUp,
  Heart,
  Phone
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const HospitalDashboard = () => {
  const stats = [
    {
      title: "Active Donors",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-health"
    },
    {
      title: "Pending Requests",
      value: "23",
      change: "+5",
      icon: UserPlus,
      color: "text-blood"
    },
    {
      title: "Emergency Cases",
      value: "7",
      change: "-2",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Response Time",
      value: "4.2min",
      change: "-0.8min",
      icon: Clock,
      color: "text-primary"
    }
  ];

  const recentRequests = [
    {
      id: "REQ-001",
      patient: "John Doe",
      bloodType: "O-",
      urgency: "Critical",
      timeRemaining: "2 hours",
      status: "searching"
    },
    {
      id: "REQ-002", 
      patient: "Jane Smith",
      bloodType: "A+",
      urgency: "High",
      timeRemaining: "6 hours",
      status: "matched"
    },
    {
      id: "REQ-003",
      patient: "Bob Johnson",
      bloodType: "B+",
      urgency: "Medium", 
      timeRemaining: "12 hours",
      status: "fulfilled"
    }
  ];

  const bloodTypeData = [
    { type: 'O+', available: 85, needed: 45 },
    { type: 'O-', available: 23, needed: 67 },
    { type: 'A+', available: 67, needed: 34 },
    { type: 'A-', available: 34, needed: 23 },
    { type: 'B+', available: 45, needed: 28 },
    { type: 'B-', available: 18, needed: 15 },
    { type: 'AB+', available: 28, needed: 12 },
    { type: 'AB-', available: 12, needed: 8 }
  ];

  const responseTimeData = [
    { time: '00:00', response: 4.2 },
    { time: '04:00', response: 3.8 },
    { time: '08:00', response: 5.1 },
    { time: '12:00', response: 4.5 },
    { time: '16:00', response: 3.9 },
    { time: '20:00', response: 4.2 }
  ];

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'Critical': 'bg-blood text-blood-foreground',
      'High': 'bg-warning text-warning-foreground',
      'Medium': 'bg-primary text-primary-foreground',
      'Low': 'bg-health text-health-foreground'
    };
    return colors[urgency as keyof typeof colors] || 'bg-muted';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'searching': 'text-warning',
      'matched': 'text-primary', 
      'fulfilled': 'text-health',
      'expired': 'text-destructive'
    };
    return colors[status as keyof typeof colors] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage donation requests</p>
        </div>
        <Button variant="blood" className="shadow-blood">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Create Emergency Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Type Availability */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Blood Type Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bloodTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="available" fill="hsl(var(--health))" name="Available" />
                <Bar dataKey="needed" fill="hsl(var(--blood))" name="Needed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Response Time (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="response" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Response Time (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-blood" />
            Recent Patient Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div>
                    <p className="font-medium">{request.patient}</p>
                    <p className="text-sm text-muted-foreground">{request.id}</p>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {request.bloodType}
                  </Badge>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{request.timeRemaining}</p>
                    <p className={`text-xs capitalize ${getStatusColor(request.status)}`}>
                      {request.status}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalDashboard;