import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Filter, Download } from 'lucide-react';

const Index = () => {
  const { user, userRole } = useAuth();
  const [filters, setFilters] = useState({
    facility: 'all',
    vendor: 'all',
    team: 'all'
  });

  // Mock data for demonstration
  const teams = [
    {
      id: 1,
      name: 'Customer Support',
      facility: 'Building A',
      floor: '1st Floor',
      totalLines: 13,
      allocatedLines: 13,
      availableLines: 0,
      location: 'B1(CPS) – 1st Floor',
      status: 'critical'
    },
    {
      id: 2,
      name: 'Sales Team',
      facility: 'Building B',
      floor: '2nd Floor',
      totalLines: 8,
      allocatedLines: 6,
      availableLines: 2,
      location: 'B2(SALES) – 2nd Floor',
      status: 'good'
    },
    {
      id: 3,
      name: 'Technical Support',
      facility: 'Building A',
      floor: '3rd Floor',
      totalLines: 10,
      allocatedLines: 9,
      availableLines: 1,
      location: 'B1(TECH) – 3rd Floor',
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-error text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'good':
        return 'bg-success text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAllocationPercentage = (allocated: number, total: number) => {
    return (allocated / total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground-secondary">Team-wise phone line allocation overview</p>
      </div>

      {/* Filters Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Facility
              </label>
              <Select value={filters.facility} onValueChange={(value) => setFilters(prev => ({ ...prev, facility: value }))}>
                <SelectTrigger className="bg-background-secondary border-border">
                  <SelectValue placeholder="All Facilities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Facilities</SelectItem>
                  <SelectItem value="building-a">Building A</SelectItem>
                  <SelectItem value="building-b">Building B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Vendor
              </label>
              <Select value={filters.vendor} onValueChange={(value) => setFilters(prev => ({ ...prev, vendor: value }))}>
                <SelectTrigger className="bg-background-secondary border-border">
                  <SelectValue placeholder="All Vendors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="vendor1">Vendor 1</SelectItem>
                  <SelectItem value="vendor2">Vendor 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Team
              </label>
              <Select value={filters.team} onValueChange={(value) => setFilters(prev => ({ ...prev, team: value }))}>
                <SelectTrigger className="bg-background-secondary border-border">
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="sales">Sales Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-gradient-primary hover:opacity-90">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => {
          const allocationPercentage = getAllocationPercentage(team.allocatedLines, team.totalLines);
          
          return (
            <Card key={team.id} className="bg-card border-border card-glow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">{team.name}</CardTitle>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {team.location}
                    </p>
                  </div>
                  <Badge 
                    className={`ml-2 ${getStatusColor(team.status)}`}
                  >
                    {allocationPercentage.toFixed(0)}% allocated
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{team.totalLines}</p>
                    <p className="text-xs text-foreground-secondary">Total Lines</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{team.allocatedLines}</p>
                    <p className="text-xs text-foreground-secondary">Allocated</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${team.availableLines === 0 ? 'text-error' : 'text-success'}`}>
                      {team.availableLines}
                    </p>
                    <p className="text-xs text-foreground-secondary">Available</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-secondary">Allocation Progress</span>
                    <span className="text-foreground">{allocationPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={allocationPercentage} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Welcome message for new users */}
      {userRole && (
        <Card className="bg-gradient-primary border-0 text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              Welcome to Phone Line Manager, {user?.email}!
            </h2>
            <p className="opacity-90">
              You're logged in as a {userRole.replace('_', ' ')}. 
              {userRole === 'super_admin' 
                ? ' You have full access to manage all aspects of the system.'
                : ' You can view and allocate phone lines within your permissions.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
