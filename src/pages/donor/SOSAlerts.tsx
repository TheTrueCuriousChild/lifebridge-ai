import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Heart, 
  CheckCircle, 
  X, 
  Phone, 
  Navigation,
  Bell,
  Award,
  Filter
} from 'lucide-react';

const SOSAlerts = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const sosAlerts = [
    {
      id: 'SOS-001',
      hospital: 'City General Hospital',
      patient: 'Emergency Patient #1',
      bloodType: 'O-',
      organType: null,
      urgency: 'Critical',
      distance: '2.3 km',
      timeLeft: '1h 23m',
      created: '2024-03-25 14:30',
      reward: 'Priority status + Recognition',
      status: 'pending',
      estimatedTime: '15 minutes',
      hospitalContact: '+1 234-567-1000'
    },
    {
      id: 'SOS-002',
      hospital: 'Memorial Medical Center',
      patient: 'Emergency Patient #2',
      bloodType: 'O-',
      organType: null,
      urgency: 'High',
      distance: '4.7 km',
      timeLeft: '3h 45m',
      created: '2024-03-25 12:15',
      reward: 'Recognition badge + Health points',
      status: 'responded',
      estimatedTime: '25 minutes',
      hospitalContact: '+1 234-567-2000'
    },
    {
      id: 'SOS-003',
      hospital: 'Regional Blood Bank',
      patient: 'Emergency Patient #3',
      bloodType: 'O+',
      organType: null,
      urgency: 'Medium',
      distance: '6.1 km',
      timeLeft: '8h 12m',
      created: '2024-03-25 09:20',
      reward: 'Health points + Community recognition',
      status: 'completed',
      estimatedTime: '35 minutes',
      hospitalContact: '+1 234-567-3000'
    },
    {
      id: 'SOS-004',
      hospital: 'University Hospital',
      patient: 'Emergency Patient #4',
      bloodType: 'A+',
      organType: 'Kidney',
      urgency: 'High',
      distance: '8.2 km',
      timeLeft: '2h 15m',
      created: '2024-03-25 13:45',
      reward: 'Hero badge + Priority status',
      status: 'declined',
      estimatedTime: '45 minutes',
      hospitalContact: '+1 234-567-4000'
    }
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

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-warning text-warning-foreground',
      'responded': 'bg-primary text-primary-foreground',
      'completed': 'bg-health text-health-foreground',
      'declined': 'bg-destructive text-destructive-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  const filteredAlerts = filterStatus === 'all' 
    ? sosAlerts 
    : sosAlerts.filter(alert => alert.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SOS Alerts</h1>
          <p className="text-muted-foreground">View and respond to emergency donation requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-blood">
            {sosAlerts.filter(alert => alert.status === 'pending').length} pending
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-blood" />
              <div>
                <p className="text-2xl font-bold">{sosAlerts.filter(a => a.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-health" />
              <div>
                <p className="text-2xl font-bold">{sosAlerts.filter(a => a.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{sosAlerts.filter(a => a.status === 'responded').length}</p>
                <p className="text-sm text-muted-foreground">Responded</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* SOS Alerts List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blood" />
              Emergency SOS Alerts
            </div>
            <Badge variant="outline">
              {filteredAlerts.length} alerts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blood/10 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-blood" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{alert.hospital}</h3>
                      <p className="text-sm text-muted-foreground">{alert.id}</p>
                      <p className="text-sm text-muted-foreground">Created: {alert.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getUrgencyColor(alert.urgency)}>
                      {alert.urgency}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blood" />
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Type</p>
                      <p className="font-mono font-semibold">{alert.bloodType}</p>
                    </div>
                  </div>

                  {alert.organType && (
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-health" />
                      <div>
                        <p className="text-xs text-muted-foreground">Organ</p>
                        <p className="font-semibold">{alert.organType}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-semibold">{alert.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time Left</p>
                      <p className="font-semibold">{alert.timeLeft}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Navigation className="h-4 w-4 text-health" />
                    <div>
                      <p className="text-xs text-muted-foreground">ETA</p>
                      <p className="font-semibold">{alert.estimatedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-sm">Reward</span>
                  </div>
                  <p className="text-sm">{alert.reward}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {alert.status === 'pending' && (
                    <>
                      <Button variant="health" size="sm" className="shadow-medical">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Respond to SOS
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Hospital
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button variant="destructive" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </>
                  )}

                  {alert.status === 'responded' && (
                    <>
                      <Button variant="default" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate to Hospital
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Hospital: {alert.hospitalContact}
                      </Button>
                    </>
                  )}

                  {alert.status === 'completed' && (
                    <Badge variant="outline" className="text-health">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Donation Completed Successfully
                    </Badge>
                  )}

                  {alert.status === 'declined' && (
                    <Badge variant="outline" className="text-muted-foreground">
                      <X className="h-4 w-4 mr-2" />
                      Request Declined
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSAlerts;