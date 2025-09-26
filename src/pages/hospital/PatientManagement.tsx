import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  UserCheck, 
  Search, 
  Heart, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Trash2,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const patients = [
    {
      id: 'P001',
      name: 'Emily Davis',
      disease: 'Acute Leukemia',
      bloodType: 'O-',
      organNeeded: null,
      urgency: 'Critical',
      waitTime: '2 hours',
      dateAdded: '2024-03-25',
      status: 'unfulfilled',
      familyContact: '+1 234-567-9001',
      familyName: 'Robert Davis (Father)',
      notes: 'Patient requires immediate transfusion'
    },
    {
      id: 'P002', 
      name: 'Michael Brown',
      disease: 'Liver Cirrhosis',
      bloodType: 'A+',
      organNeeded: 'Liver',
      urgency: 'High',
      waitTime: '6 hours',
      dateAdded: '2024-03-24',
      status: 'searching',
      familyContact: '+1 234-567-9002',
      familyName: 'Lisa Brown (Wife)',
      notes: 'Compatible liver donor needed urgently'
    },
    {
      id: 'P003',
      name: 'Jennifer Wilson',
      disease: 'Kidney Failure',
      bloodType: 'B+',
      organNeeded: 'Kidney',
      urgency: 'Medium',
      waitTime: '12 hours',
      dateAdded: '2024-03-23',
      status: 'fulfilled',
      familyContact: '+1 234-567-9003',
      familyName: 'Mark Wilson (Husband)',
      notes: 'Successfully matched with donor'
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
      'fulfilled': 'bg-health text-health-foreground',
      'searching': 'bg-primary text-primary-foreground',
      'unfulfilled': 'bg-warning text-warning-foreground',
      'expired': 'bg-destructive text-destructive-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient requests and find matches</p>
        </div>
        <Button variant="default" className="shadow-medical">
          <UserCheck className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-primary" />
            Search & Filter Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, disease, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                <SelectItem value="searching">Searching</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Urgency Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-primary" />
              Patient Requests
            </div>
            <Badge variant="outline">{patients.length} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.id}</p>
                      <p className="text-sm font-medium text-primary">{patient.disease}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getUrgencyColor(patient.urgency)}>
                      {patient.urgency}
                    </Badge>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blood" />
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Type</p>
                      <p className="font-mono font-semibold">{patient.bloodType}</p>
                    </div>
                  </div>
                  
                  {patient.organNeeded && (
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-4 w-4 text-health" />
                      <div>
                        <p className="text-xs text-muted-foreground">Organ Needed</p>
                        <p className="font-semibold">{patient.organNeeded}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <div>
                      <p className="text-xs text-muted-foreground">Wait Time</p>
                      <p className="font-semibold">{patient.waitTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date Added</p>
                      <p className="font-semibold">{patient.dateAdded}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold text-sm mb-2">Family Contact</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{patient.familyName}</p>
                      <p className="text-sm text-muted-foreground">{patient.familyContact}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Family
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                  <p className="text-sm">{patient.notes}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm" className="shadow-medical">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Find AI Best Match
                  </Button>
                  
                  {patient.status === 'fulfilled' ? (
                    <Button variant="health" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Fulfilled
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Fulfilled
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Mark Unfulfilled
                  </Button>

                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Request
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

export default PatientManagement;