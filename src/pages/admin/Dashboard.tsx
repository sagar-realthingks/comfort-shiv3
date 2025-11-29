import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';
import { ServicesManager } from '@/components/admin/ServicesManager';
import { AMCPlansManager } from '@/components/admin/AMCPlansManager';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cts_admin_auth');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Comfort Technical Service – Admin</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Note: Admin changes are stored locally in this browser (localStorage). They will not sync across devices.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="services">Services & Pricing</TabsTrigger>
            <TabsTrigger value="amc">AMC Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="amc">
            <AMCPlansManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
