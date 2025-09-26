import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  TrendingDown, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Heart,
  History,
  Bell
} from 'lucide-react';

const Inventory = () => {
  const inventory = [
    { type: 'O+', units: 85, minLevel: 50, lastUpdated: '2024-03-25' },
    { type: 'O-', units: 23, minLevel: 30, lastUpdated: '2024-03-25' },
    { type: 'A+', units: 67, minLevel: 40, lastUpdated: '2024-03-25' },
    { type: 'A-', units: 34, minLevel: 25, lastUpdated: '2024-03-25' },
    { type: 'B+', units: 45, minLevel: 35, lastUpdated: '2024-03-25' },
    { type: 'B-', units: 18, minLevel: 20, lastUpdated: '2024-03-25' },
    { type: 'AB+', units: 28, minLevel: 15, lastUpdated: '2024-03-25' },
    { type: 'AB-', units: 12, minLevel: 10, lastUpdated: '2024-03-25' }
  ];

  const getStockStatus = (units: number, minLevel: number) => {
    const percentage = (units / minLevel) * 100;
    if (percentage < 50) return { status: 'critical', color: 'text-blood', bgColor: 'bg-blood/10' };
    if (percentage < 80) return { status: 'low', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { status: 'good', color: 'text-health', bgColor: 'bg-health/10' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blood Inventory</h1>
          <p className="text-muted-foreground">Monitor and manage blood stock levels</p>
        </div>
        <Button variant="default" className="shadow-medical">
          <History className="h-4 w-4 mr-2" />
          View Log
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {inventory.map((item) => {
          const stockStatus = getStockStatus(item.units, item.minLevel);
          const percentage = (item.units / (item.minLevel * 2)) * 100;
          
          return (
            <Card key={item.type} className={`shadow-card ${stockStatus.bgColor} border-l-4 border-l-current`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="font-mono text-lg">{item.type}</span>
                  {stockStatus.status === 'critical' && (
                    <AlertTriangle className="h-5 w-5 text-blood animate-pulse" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{item.units}</p>
                    <p className="text-sm text-muted-foreground">units available</p>
                  </div>
                  
                  <Progress value={percentage} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {item.minLevel}</span>
                    <span className={stockStatus.color}>{stockStatus.status}</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;