import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Phone, 
  MapPin, 
  Calendar,
  Heart,
  Eye,
  Edit
} from 'lucide-react';

const DonorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const donors = [
    {
      id: 'D001',
      name: 'John Smith',
      bloodType: 'O-',
      organDonor: true,
      phone: '+1 234-567-8901',
      email: 'john.smith@email.com',
      location: '2.3 km away',
      lastDonation: '2024-02-15',
      totalDonations: 12,
      status: 'active',
      eligibleDate: '2024-05-15'
    },
    {
      id: 'D002',
      name: 'Sarah Johnson',
      bloodType: 'A+',
      organDonor: false,
      phone: '+1 234-567-8902',
      email: 'sarah.j@email.com',
      location: '4.7 km away',
      lastDonation: '2024-03-20',
      totalDonations: 8,
      status: 'eligible',
      eligibleDate: '2024-04-20'
    },
    {
      id: 'D003',
      name: 'Mike Wilson',
      bloodType: 'B+',
      organDonor: true,
      phone: '+1 234-567-8903',
      email: 'mike.w@email.com',
      location: '1.8 km away',
      lastDonation: '2024-01-10',
      totalDonations: 15,
      status: 'waiting',
      eligibleDate: '2024-04-10'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-health text-health-foreground',
      'eligible': 'bg-primary text-primary-foreground',
      'waiting': 'bg-warning text-warning-foreground',
      'unavailable': 'bg-destructive text-destructive-foreground'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donor Management</h1>
          <p className="text-muted-foreground">Manage and search registered donors</p>
        </div>
        <Button variant="default" className="shadow-medical">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Donor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-primary" />
            Search & Filter Donors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, blood type, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Donors</SelectItem>
                <SelectItem value="blood">Blood Donors Only</SelectItem>
                <SelectItem value="organ">Organ Donors Only</SelectItem>
                <SelectItem value="both">Blood & Organ</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Blood Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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
        </CardContent>
      </Card>

      {/* Donors List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Registered Donors
            </div>
            <Badge variant="outline">{donors.length} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donors.map((donor) => (
              <div key={donor.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{donor.name}</h3>
                      <p className="text-sm text-muted-foreground">{donor.id}</p>
                      <p className="text-sm text-muted-foreground">{donor.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(donor.status)}>
                    {donor.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blood" />
                    <span className="font-mono text-sm">{donor.bloodType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">{donor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-warning" />
                    <span className="text-sm">{donor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-health" />
                    <span className="text-sm">Last: {donor.lastDonation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">{donor.totalDonations} donations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {donor.organDonor && (
                      <Badge variant="outline" className="text-xs">
                        Organ Donor
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="default" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
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

export default DonorManagement;