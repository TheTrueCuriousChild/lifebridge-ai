import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Activity,
  TrendingUp,
  FileText,
  Truck,
  ThermometerSun
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const BloodBankDashboard = () => {
  const stats = [
    {
      title: "Total Inventory",
      value: "2,847 units",
      change: "+134 today",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Critical Alerts",
      value: "7 types",
      change: "Low stock",
      icon: AlertTriangle,
      color: "text-blood"
    },
    {
      title: "Pending Requests",
      value: "23",
      change: "From 12 hospitals",
      icon: FileText,
      color: "text-warning"
    },
    {
      title: "Processing Time",
      value: "12 min",
      change: "Average today",
      icon: Clock,
      color: "text-health"
    }
  ];

  const bloodInventory = [
    { type: 'O+', units: 245, threshold: 100, status: 'good' },
    { type: 'O-', units: 67, threshold: 150, status: 'critical' },
    { type: 'A+', units: 189, threshold: 80, status: 'good' },
    { type: 'A-', units: 78, threshold: 60, status: 'good' },
    { type: 'B+', units: 134, threshold: 70, status: 'good' },
    { type: 'B-', units: 45, threshold: 50, status: 'warning' },
    { type: 'AB+', units: 89, threshold: 40, status: 'good' },
    { type: 'AB-', units: 23, threshold: 30, status: 'warning' }
  ];

  const requestsData = [
    { time: '00:00', requests: 12, processed: 10 },
    { time: '04:00', requests: 8, processed: 8 },
    { time: '08:00', requests: 15, processed: 13 },
    { time: '12:00', requests: 22, processed: 20 },
    { time: '16:00', requests: 18, processed: 16 },
    { time: '20:00', requests: 14, processed: 12 }
  ];

  const requestTypes = [
    { name: 'Emergency', value: 35, color: 'hsl(var(--blood))' },
    { name: 'Surgery', value: 28, color: 'hsl(var(--warning))' },
    { name: 'Treatment', value: 22, color: 'hsl(var(--primary))' },
    { name: 'Research', value: 15, color: 'hsl(var(--health))' }
  ];

  const pendingRequests = [
    {
      id: "REQ-H001",
      hospital: "City General Hospital",
      bloodType: "O-",
      units: 8,
      priority: "Critical",
      timeAgo: "23 minutes",
      deadline: "1 hour"
    },
    {
      id: "REQ-H002",
      hospital: "Memorial Medical Center",
      bloodType: "A+",
      units: 4,
      priority: "High",
      timeAgo: "1.2 hours",
      deadline: "6 hours"
    },
    {
      id: "REQ-H003",
      hospital: "Regional Health Center",
      bloodType: "B+",
      units: 12,
      priority: "Medium",
      timeAgo: "2.1 hours",
      deadline: "24 hours"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'good': 'text-health',
      'warning': 'text-warning',
      'critical': 'text-blood'
    };
    return colors[status as keyof typeof colors] || 'text-muted-foreground';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Critical': 'bg-blood text-blood-foreground',
      'High': 'bg-warning text-warning-foreground',
      'Medium': 'bg-primary text-primary-foreground',
      'Low': 'bg-health text-health-foreground'
    };
    return colors[priority as keyof typeof colors] || 'bg-muted';
  };

  const getInventoryPercentage = (units: number, threshold: number) => {
    return Math.min((units / threshold) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blood Bank Dashboard</h1>
          <p className="text-muted-foreground">Inventory management and request processing</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <ThermometerSun className="h-4 w-4 mr-2" />
            Temperature Log
          </Button>
          <Button variant="blood" className="shadow-blood">
            <Truck className="h-4 w-4 mr-2" />
            Schedule Delivery
          </Button>
        </div>
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
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blood Inventory Status */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-primary" />
            Blood Type Inventory Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodInventory.map((blood) => (
              <div key={blood.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-lg">{blood.type}</span>
                  <Badge variant="outline" className={getStatusColor(blood.status)}>
                    {blood.units} units
                  </Badge>
                </div>
                <Progress 
                  value={getInventoryPercentage(blood.units, blood.threshold)} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Threshold: {blood.threshold}</span>
                  <span className={getStatusColor(blood.status)}>{blood.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Processing */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Request Processing (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={requestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="hsl(var(--blood))" 
                  strokeWidth={2}
                  name="Requests Received"
                />
                <Line 
                  type="monotone" 
                  dataKey="processed" 
                  stroke="hsl(var(--health))" 
                  strokeWidth={2}
                  name="Requests Processed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Request Types */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Request Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => 
                    name && percent ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                  }
                >
                  {requestTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blood" />
              Pending Hospital Requests
            </div>
            <Badge variant="outline" className="text-blood">
              {pendingRequests.length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div>
                      <h4 className="font-semibold">{request.hospital}</h4>
                      <p className="text-sm text-muted-foreground">{request.id}</p>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-mono font-bold text-lg">{request.bloodType}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Units Needed</p>
                    <p className="font-bold text-lg">{request.units}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Requested</p>
                    <p className="text-sm">{request.timeAgo} ago</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="text-sm font-medium">{request.deadline}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="health" size="sm" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Request
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Delay
                  </Button>
                  <Button variant="destructive" size="sm">
                    Decline
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

export default BloodBankDashboard;