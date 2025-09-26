import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Heart, Building2, Droplets, Shield, Activity, Users, Clock, MapPin } from 'lucide-react';

const Landing = () => {
  const roleCards = [
    {
      role: 'hospital',
      title: 'Hospital',
      description: 'Manage patients, find donors, and coordinate emergency requests',
      icon: Building2,
      features: ['Patient Management', 'AI Donor Matching', 'Emergency SOS', 'Real-time Updates']
    },
    {
      role: 'bloodbank',
      title: 'Blood Bank',
      description: 'Manage inventory, process requests, and coordinate deliveries',
      icon: Droplets,
      features: ['Inventory Management', 'Request Processing', 'Stock Alerts', 'Emergency Response']
    },
    {
      role: 'donor',
      title: 'Donor',
      description: 'Register as a donor and respond to emergency requests',
      icon: Heart,
      features: ['Profile Management', 'SOS Alerts', 'Donation History', 'Location Updates']
    },
    {
      role: 'admin',
      title: 'Admin',
      description: 'System administration and monitoring platform',
      icon: Shield,
      features: ['User Management', 'System Reports', 'Data Analytics', 'Platform Monitoring']
    }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Registered Donors' },
    { icon: Activity, value: '99.9%', label: 'System Uptime' },
    { icon: Clock, value: '<5min', label: 'Average Response' },
    { icon: MapPin, value: '500+', label: 'Connected Hospitals' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blood" />
            <h1 className="text-2xl font-bold bg-gradient-medical bg-clip-text text-transparent">
              LifeLink
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-blood px-6 py-2 rounded-full text-blood-foreground text-sm font-medium mb-6">
            <Activity className="h-4 w-4" />
            <span>AI-Powered Emergency Response</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connecting Lives Through
            <span className="bg-gradient-blood bg-clip-text text-transparent block">
              Smart Donation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered platform connecting hospitals, blood banks, and donors for life-saving emergency response
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleCards.map((roleCard, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center">
                  <roleCard.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">{roleCard.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {roleCard.description}
                  </p>
                  <ul className="space-y-2">
                    {roleCard.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <Button 
                      asChild 
                      className="flex-1" 
                      variant={roleCard.role === 'hospital' ? 'blood' : roleCard.role === 'donor' ? 'health' : 'default'}
                    >
                      <Link to={`/auth/login/${roleCard.role}`}>Login</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to={`/auth/signup/${roleCard.role}`}>Sign Up</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms match donors with recipients based on compatibility, location, and urgency
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-blood rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blood-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Live inventory tracking and instant emergency notifications for critical situations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-health rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-health-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Logistics</h3>
              <p className="text-muted-foreground">
                Optimized routing and delivery coordination for fastest possible emergency response
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-card/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-blood" />
            <span className="text-xl font-bold">LifeLink</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Connecting lives through smart donation management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;