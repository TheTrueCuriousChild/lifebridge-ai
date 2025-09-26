import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  Navigation, 
  Phone, 
  Plus,
  Trash2,
  MapPin,
  Heart,
  Bell,
  Target
} from 'lucide-react';

const EmergencySOS = () => {
  const [isCreating, setIsCreating] = useState(false);

  const emergencyRequests = [
    {
      id: 'SOS-001',
      patientName: 'Emily Davis',
      bloodType: 'O-',
      organType: null,
      timeRemaining: '1h 23m',
      created: '2024-03-25 14:30',
      status: 'active',
      notifiedDonors: 45,
      matches: 12,
      location: 'Emergency Room - Block A',
      priority: 'Critical',
      notes: 'Severe blood loss from accident'
    },
    {
      id: 'SOS-002',
      patientName: 'Michael Brown',
      bloodType: 'A+',
      organType: 'Liver',
      timeRemaining: '3h 45m',
      created: '2024-03-25 12:15',
      status: 'active',
      notifiedDonors: 28,
      matches: 5,
      location: 'ICU - Floor 3',
      priority: 'High',
      notes: 'Liver failure progression'
    },
    {
      id: 'SOS-003',
      patientName: 'Sarah Johnson',
      bloodType: 'B+',
      organType: null,
      timeRemaining: 'Expired',
      created: '2024-03-24 18:20',
      status: 'fulfilled',
      notifiedDonors: 67,
      matches: 18,
      location: 'Surgery - OR 2',
      priority: 'Medium',
      notes: 'Successfully matched and completed'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-blood text-blood-foreground animate-pulse',
      'fulfilled': 'bg-health text-health-foreground',
      'expired': 'bg-destructive text-destructive-foreground',
      'cancelled': 'bg-muted text-muted-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Emergency SOS</h1>
          <p className="text-muted-foreground">Create and manage emergency donor requests</p>
        </div>
        <Button 
          variant="blood" 
          className="shadow-blood" 
          onClick={() => setIsCreating(!isCreating)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Emergency Request
        </Button>
      </div>

      {/* Create Emergency Form */}
      {isCreating && (
        <Card className="shadow-card border-blood/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blood" />
              Create New Emergency SOS Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Patient Name</label>
                <Input placeholder="Enter patient name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Blood Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="o-">O-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organ Type (Optional)</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organ type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Blood Only</SelectItem>
                    <SelectItem value="kidney">Kidney</SelectItem>
                    <SelectItem value="liver">Liver</SelectItem>
                    <SelectItem value="heart">Heart</SelectItem>
                    <SelectItem value="lung">Lung</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="e.g., Emergency Room - Block A" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Limit (Hours)</label>
                <Input type="number" placeholder="Enter hours" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Additional details about the emergency..." />
            </div>
            <div className="flex space-x-2">
              <Button variant="blood" className="shadow-blood">
                <Bell className="h-4 w-4 mr-2" />
                Create & Notify Donors
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Emergency Requests */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blood" />
              Emergency Requests
            </div>
            <Badge variant="outline" className="text-blood">
              {emergencyRequests.filter(req => req.status === 'active').length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blood/10 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-blood" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{request.patientName}</h3>
                      <p className="text-sm text-muted-foreground">{request.id}</p>
                      <p className="text-sm text-muted-foreground">Created: {request.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blood" />
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Type</p>
                      <p className="font-mono font-semibold">{request.bloodType}</p>
                    </div>
                  </div>

                  {request.organType && (
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-health" />
                      <div>
                        <p className="text-xs text-muted-foreground">Organ</p>
                        <p className="font-semibold">{request.organType}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time Left</p>
                      <p className="font-semibold">{request.timeRemaining}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Notified</p>
                      <p className="font-semibold">{request.notifiedDonors} donors</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-health" />
                    <div>
                      <p className="text-xs text-muted-foreground">Matches</p>
                      <p className="font-semibold">{request.matches} found</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-semibold text-xs">{request.location}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <p className="text-sm">{request.notes}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {request.status === 'active' && (
                    <>
                      <Button variant="default" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        View Matches ({request.matches})
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Notify More Donors
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Fastest Route
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Donors
                      </Button>
                    </>
                  )}
                  
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel Request
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

export default EmergencySOS;