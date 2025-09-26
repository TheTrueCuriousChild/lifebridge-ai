import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  Heart, 
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Globe,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+234 this month",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Hospitals",
      value: "127",
      change: "+5 new",
      icon: Building2,
      color: "text-blood"
    },
    {
      title: "Registered Donors",
      value: "8,943",
      change: "+189 this week",
      icon: Heart,
      color: "text-health"
    },
    {
      title: "System Uptime",
      value: "99.97%",
      change: "Last 30 days",
      icon: Activity,
      color: "text-warning"
    }
  ];

  const platformActivity = [
    { month: 'Jan', users: 8500, donations: 1200, requests: 890 },
    { month: 'Feb', users: 9200, donations: 1100, requests: 950 },
    { month: 'Mar', users: 10100, donations: 1350, requests: 1100 },
    { month: 'Apr', users: 11000, donations: 1450, requests: 1200 },
    { month: 'May', users: 11800, donations: 1600, requests: 1350 },
    { month: 'Jun', users: 12847, donations: 1750, requests: 1480 }
  ];

  const userDistribution = [
    { name: 'Donors', value: 8943, color: 'hsl(var(--health))' },
    { name: 'Hospitals', value: 127, color: 'hsl(var(--blood))' },
    { name: 'Blood Banks', value: 89, color: 'hsl(var(--primary))' },
    { name: 'Admins', value: 23, color: 'hsl(var(--warning))' }
  ];

  const systemAlerts = [
    {
      id: "SYS-001",
      type: "Security",
      message: "Multiple failed login attempts detected",
      severity: "High",
      time: "5 minutes ago",
      resolved: false
    },
    {
      id: "SYS-002",
      type: "Performance",
      message: "Database query response time increased by 15%",
      severity: "Medium",
      time: "23 minutes ago",
      resolved: false
    },
    {
      id: "SYS-003",
      type: "System",
      message: "Scheduled maintenance completed successfully",
      severity: "Low",
      time: "2 hours ago",
      resolved: true
    },
    {
      id: "SYS-004",
      type: "Data",
      message: "Backup verification completed - all systems normal",
      severity: "Info",
      time: "4 hours ago", 
      resolved: true
    }
  ];

  const recentActivity = [
    {
      id: "ACT-001",
      action: "New hospital registration",
      details: "Metro General Hospital completed verification",
      user: "System",
      time: "12 minutes ago"
    },
    {
      id: "ACT-002",
      action: "Emergency SOS resolved",
      details: "Critical O- request fulfilled in 4.2 minutes",
      user: "Emergency System",
      time: "28 minutes ago"
    },
    {
      id: "ACT-003",
      action: "Bulk donor import",
      details: "234 new donors added from blood drive campaign",
      user: "Admin User",
      time: "1 hour ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      'High': 'bg-blood text-blood-foreground',
      'Medium': 'bg-warning text-warning-foreground',
      'Low': 'bg-primary text-primary-foreground',
      'Info': 'bg-health text-health-foreground'
    };
    return colors[severity as keyof typeof colors] || 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">Platform monitoring and management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Backup System
          </Button>
          <Button variant="blood" className="shadow-blood">
            <Shield className="h-4 w-4 mr-2" />
            Security Scan
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Platform Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={platformActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Total Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="hsl(var(--health))" 
                  strokeWidth={2}
                  name="Donations"
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="hsl(var(--blood))" 
                  strokeWidth={2}
                  name="Requests"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              User Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blood" />
              System Alerts & Notifications
            </div>
            <Badge variant="outline" className="text-blood">
              {systemAlerts.filter(alert => !alert.resolved).length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {alert.resolved ? (
                      <CheckCircle className="h-5 w-5 text-health" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-blood animate-pulse" />
                    )}
                    <div>
                      <h4 className="font-semibold">{alert.type} Alert</h4>
                      <p className="text-sm text-muted-foreground">{alert.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    {alert.resolved && (
                      <Badge variant="outline" className="text-health">
                        Resolved
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm mb-2">{alert.message}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </span>
                  {!alert.resolved && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                      <Button size="sm" variant="health">
                        Mark Resolved
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            Recent System Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-muted-foreground">
                      by {activity.user}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;