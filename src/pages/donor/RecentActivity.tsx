import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  Heart, 
  Clock, 
  MapPin, 
  Calendar, 
  Award,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const RecentActivity = () => {
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('6months');

  const activities = [
    {
      id: 'ACT-001',
      type: 'donation',
      title: 'Blood Donation',
      bloodType: 'O-',
      location: 'City General Hospital',
      date: '2024-03-15',
      time: '14:30',
      amount: '450ml',
      status: 'completed',
      impact: 'Helped 3 patients',
      reward: 'Health Points +50'
    },
    {
      id: 'ACT-002',
      type: 'sos_response',
      title: 'Emergency SOS Response',
      bloodType: 'O-',
      location: 'Memorial Medical Center',
      date: '2024-03-10',
      time: '09:15',
      amount: '350ml',
      status: 'completed',
      impact: 'Saved 1 life (Critical)',
      reward: 'Hero Badge + Priority Status'
    },
    {
      id: 'ACT-003',
      type: 'platelet_donation',
      title: 'Platelet Donation',
      bloodType: 'O-',
      location: 'Regional Blood Bank',
      date: '2024-02-28',
      time: '11:00',
      amount: '2 units',
      status: 'completed',
      impact: 'Helped cancer patient',
      reward: 'Recognition Badge'
    },
    {
      id: 'ACT-004',
      type: 'sos_response',
      title: 'Emergency SOS Response',
      bloodType: 'O-',
      location: 'University Hospital',
      date: '2024-02-20',
      time: '16:45',
      amount: '400ml',
      status: 'responded',
      impact: 'Response declined by hospital',
      reward: 'Participation Points +10'
    },
    {
      id: 'ACT-005',
      type: 'plasma_donation',
      title: 'Plasma Donation',
      bloodType: 'O-',
      location: 'City Blood Center',
      date: '2024-02-10',
      time: '13:20',
      amount: '600ml',
      status: 'completed',
      impact: 'Helped COVID recovery',
      reward: 'Community Points +30'
    }
  ];

  const donationStats = [
    { month: 'Oct', donations: 2, sos: 1 },
    { month: 'Nov', donations: 1, sos: 2 },
    { month: 'Dec', donations: 2, sos: 0 },
    { month: 'Jan', donations: 1, sos: 1 },
    { month: 'Feb', donations: 3, sos: 2 },
    { month: 'Mar', donations: 1, sos: 1 }
  ];

  const impactStats = [
    { type: 'Lives Saved', count: 15, color: 'hsl(var(--blood))' },
    { type: 'Patients Helped', count: 45, color: 'hsl(var(--health))' },
    { type: 'SOS Responses', count: 8, color: 'hsl(var(--warning))' },
    { type: 'Total Donations', count: 24, color: 'hsl(var(--primary))' }
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      'donation': Heart,
      'sos_response': AlertTriangle,
      'platelet_donation': Activity,
      'plasma_donation': Activity
    };
    return icons[type as keyof typeof icons] || Activity;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'bg-health text-health-foreground',
      'responded': 'bg-primary text-primary-foreground',
      'cancelled': 'bg-destructive text-destructive-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'donation': 'text-blood',
      'sos_response': 'text-warning',
      'platelet_donation': 'text-primary',
      'plasma_donation': 'text-health'
    };
    return colors[type as keyof typeof colors] || 'text-muted-foreground';
  };

  const filteredActivities = filterType === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recent Activity</h1>
          <p className="text-muted-foreground">Track your donation history and impact</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {impactStats.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-sm text-muted-foreground">{stat.type}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-health" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Donation Activity (6 months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={donationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="hsl(var(--blood))" 
                  strokeWidth={2}
                  name="Regular Donations"
                />
                <Line 
                  type="monotone" 
                  dataKey="sos" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="SOS Responses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Impact Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-health" />
              Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={impactStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            Filter Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="donation">Blood Donations</SelectItem>
                <SelectItem value="sos_response">SOS Responses</SelectItem>
                <SelectItem value="platelet_donation">Platelet Donations</SelectItem>
                <SelectItem value="plasma_donation">Plasma Donations</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Activity Timeline
            </div>
            <Badge variant="outline">
              {filteredActivities.length} activities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className={`h-6 w-6 ${getTypeColor(activity.type)}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.id}</p>
                        <p className="text-sm font-medium">{activity.location}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-blood" />
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Type</p>
                        <p className="font-mono font-semibold">{activity.bloodType}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date & Time</p>
                        <p className="font-semibold">{activity.date} {activity.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-health" />
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-semibold">{activity.amount}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-warning" />
                      <div>
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="font-semibold text-sm">{activity.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-warning" />
                      <span className="font-semibold text-sm">Reward: </span>
                      <span className="text-sm">{activity.reward}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;