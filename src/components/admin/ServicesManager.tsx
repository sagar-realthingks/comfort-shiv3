import { useState } from 'react';
import { useServices, Service } from '@/contexts/DataStoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { ServiceFormDialog } from './ServiceFormDialog';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const ServicesManager = () => {
  const [services, updateServices] = useServices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sortedServices = [...services].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleAdd = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleSave = (service: Service) => {
    if (editingService) {
      // Update existing
      const updated = services.map(s => s.id === service.id ? service : s);
      updateServices(updated);
      toast.success('Service updated successfully');
    } else {
      // Add new
      const newService = {
        ...service,
        id: `svc-${Date.now()}`
      };
      updateServices([...services, newService]);
      toast.success('Service added successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      const updated = services.filter(s => s.id !== deleteId);
      updateServices(updated);
      toast.success('Service deleted');
      setDeleteId(null);
    }
  };

  const handleToggleHome = (id: string, showOnHome: boolean) => {
    const updated = services.map(s => s.id === id ? { ...s, showOnHome } : s);
    updateServices(updated);
    toast.success(showOnHome ? 'Service will show on home page' : 'Service hidden from home page');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Services & Pricing</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price Label</TableHead>
                <TableHead className="text-center">Show on Home</TableHead>
                <TableHead className="text-center">Display Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.priceLabel}</TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={service.showOnHome}
                      onCheckedChange={(checked) => handleToggleHome(service.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-center">{service.displayOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <ServiceFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        service={editingService}
        onSave={handleSave}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
