import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell,
  Save,
  Edit,
  Camera,
  Award
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234-567-8901',
    bloodType: 'O-',
    dateOfBirth: '1990-05-15',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'Jane Smith - +1 234-567-8902',
    organDonor: true,
    availableForEmergency: true,
    preferredDistance: '10',
    medicalConditions: 'None',
    allergies: 'Penicillin',
    lastDonation: '2024-02-15',
    totalDonations: 24,
    weight: '70',
    height: '175'
  });

  const achievements = [
    { name: 'Life Saver', description: '10+ donations', icon: Heart, color: 'text-blood' },
    { name: 'Emergency Hero', description: '5+ emergency responses', icon: Shield, color: 'text-primary' },
    { name: 'Dedicated Donor', description: '2+ years active', icon: Award, color: 'text-health' },
    { name: 'Community Champion', description: 'Referred 5+ donors', icon: User, color: 'text-warning' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donor Profile</h1>
          <p className="text-muted-foreground">Manage your donation profile and preferences</p>
        </div>
        <Button 
          variant={isEditing ? "health" : "outline"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? "shadow-medical" : ""}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-16 w-16 text-primary" />
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" className="absolute bottom-4 right-1/2 transform translate-x-1/2">
                    <Camera className="h-4 w-4 mr-2" />
                    Change
                  </Button>
                )}
              </div>
              <h3 className="font-semibold text-lg">{profileData.name}</h3>
              <p className="text-muted-foreground mb-2">Donor ID: D001</p>
              <Badge variant="outline" className="mb-4">
                Blood Type: {profileData.bloodType}
              </Badge>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Total Donations:</span>
                  <span className="font-semibold">{profileData.totalDonations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Donation:</span>
                  <span className="font-semibold">{profileData.lastDonation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lives Saved:</span>
                  <span className="font-semibold text-health">{profileData.totalDonations * 3}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-health" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                    <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                    <div>
                      <p className="font-semibold text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    value={profileData.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    value={profileData.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input 
                    value={profileData.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input 
                    type="date"
                    value={profileData.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    value={profileData.weight}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Height (cm)</label>
                  <Input 
                    value={profileData.height}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea 
                  value={profileData.address}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Emergency Contact</label>
                <Input 
                  value={profileData.emergencyContact}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-blood" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Select 
                    value={profileData.bloodType} 
                    disabled={!isEditing}
                    onValueChange={(value) => setProfileData({...profileData, bloodType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Donation</label>
                  <Input 
                    type="date"
                    value={profileData.lastDonation}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({...profileData, lastDonation: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Medical Conditions</label>
                <Textarea 
                  placeholder="List any medical conditions..."
                  value={profileData.medicalConditions}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, medicalConditions: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Allergies</label>
                <Textarea 
                  placeholder="List any allergies..."
                  value={profileData.allergies}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({...profileData, allergies: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                Preferences & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Organ Donor</h4>
                  <p className="text-sm text-muted-foreground">Allow organ donation registration</p>
                </div>
                <Switch 
                  checked={profileData.organDonor}
                  disabled={!isEditing}
                  onCheckedChange={(checked) => setProfileData({...profileData, organDonor: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Emergency SOS Alerts</h4>
                  <p className="text-sm text-muted-foreground">Receive emergency donation requests</p>
                </div>
                <Switch 
                  checked={profileData.availableForEmergency}
                  disabled={!isEditing}
                  onCheckedChange={(checked) => setProfileData({...profileData, availableForEmergency: checked})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Distance (km)</label>
                <Select 
                  value={profileData.preferredDistance}
                  disabled={!isEditing}
                  onValueChange={(value) => setProfileData({...profileData, preferredDistance: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Within 5 km</SelectItem>
                    <SelectItem value="10">Within 10 km</SelectItem>
                    <SelectItem value="20">Within 20 km</SelectItem>
                    <SelectItem value="50">Within 50 km</SelectItem>
                    <SelectItem value="unlimited">No limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;