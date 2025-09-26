import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  AlertTriangle, 
  Clock, 
  MapPin,
  Activity,
  Award,
  Bell,
  CheckCircle,
  Phone,
  Navigation
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DonorDashboard = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "24",
      change: "+3 this year",
      icon: Heart,
      color: "text-blood"
    },
    {
      title: "Lives Saved",
      value: "72",
      change: "Estimated impact", 
      icon: Award,
      color: "text-health"
    },
    {
      title: "Response Rate",
      value: "94%",
      change: "Emergency SOS",
      icon: Activity,
      color: "text-primary"
    },
    {
      title: "Next Eligible",
      value: "42 days",
      change: "Blood donation",
      icon: Clock,
      color: "text-warning"
    }
  ];

  const sosAlerts = [
    {
      id: "SOS-001",
      hospital: "City General Hospital",
      bloodType: "O-", 
      urgency: "Critical",
      distance: "2.3 km",
      timeLeft: "1h 23m",
      reward: "Priority status"
    },
    {
      id: "SOS-002",
      hospital: "Memorial Medical Center", 
      bloodType: "O-",
      urgency: "High",
      distance: "4.7 km", 
      timeLeft: "3h 45m",
      reward: "Recognition badge"
    },
    {
      id: "SOS-003",
      hospital: "Regional Blood Bank",
      bloodType: "O+",
      urgency: "Medium",
      distance: "6.1 km",
      timeLeft: "8h 12m", 
      reward: "Health points"
    }
  ];

  const donationHistory = [
    { month: 'Jan', donations: 2, responses: 8 },
    { month: 'Feb', donations: 1, responses: 5 },
    { month: 'Mar', donations: 3, responses: 12 },
    { month: 'Apr', donations: 2, responses: 7 },
    { month: 'May', donations: 1, responses: 4 },
    { month: 'Jun', donations: 2, responses: 9 }
  ];

  const impactData = [
    { name: 'Blood Donations', value: 24, color: 'hsl(var(--blood))' },
    { name: 'Organ Pledges', value: 3, color: 'hsl(var(--health))' },
    { name: 'Platelet Donations', value: 8, color: 'hsl(var(--primary))' },
    { name: 'Plasma Donations', value: 12, color: 'hsl(var(--warning))' }
  ];

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'Critical': 'bg-blood text-blood-foreground animate-pulse',
      'High': 'bg-warning text-warning-foreground',
      'Medium': 'bg-primary text-primary-foreground',
      'Low': 'bg-health text-health-foreground'
    };
    return colors[urgency as keyof typeof colors] || 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donor Dashboard</h1>
          <p className="text-muted-foreground">Your donation journey and impact</p>
        </div>
        <Button variant="health" className="shadow-medical">
          <Bell className="h-4 w-4 mr-2" />
          Enable SOS Alerts
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
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Donation Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={donationHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stackId="1"
                  stroke="hsl(var(--blood))" 
                  fill="hsl(var(--blood))"
                  name="Donations"
                />
                <Area 
                  type="monotone" 
                  dataKey="responses" 
                  stackId="1"
                  stroke="hsl(var(--health))" 
                  fill="hsl(var(--health))"
                  name="SOS Responses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impact Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-health" />
              Donation Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={impactData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* SOS Alerts */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blood" />
              Emergency SOS Alerts
            </div>
            <Badge variant="outline" className="text-blood">
              3 active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sosAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blood rounded-full animate-pulse" />
                    <div>
                      <h4 className="font-semibold">{alert.hospital}</h4>
                      <p className="text-sm text-muted-foreground">{alert.id}</p>
                    </div>
                  </div>
                  <Badge className={getUrgencyColor(alert.urgency)}>
                    {alert.urgency}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blood" />
                    <span className="font-mono text-sm">{alert.bloodType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{alert.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm">{alert.timeLeft}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-health" />
                    <span className="text-sm">{alert.reward}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="blood" size="sm" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Respond
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eligibility Status */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Donation Eligibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Blood Donation</span>
              <span className="font-medium">Next eligible: 42 days</span>
            </div>
            <Progress value={72} className="h-2" />
            <p className="text-xs text-muted-foreground">Last donation: March 15, 2024</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Platelet Donation</span>
              <span className="font-medium text-health">Available now</span>
            </div>
            <Progress value={100} className="h-2" />
            <p className="text-xs text-muted-foreground">Last donation: February 28, 2024</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Plasma Donation</span>
              <span className="font-medium text-health">Available now</span>
            </div>
            <Progress value={100} className="h-2" />
            <p className="text-xs text-muted-foreground">Last donation: February 20, 2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorDashboard;