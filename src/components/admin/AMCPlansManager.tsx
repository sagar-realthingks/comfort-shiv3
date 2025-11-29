import { useState } from 'react';
import { useAmcPlans, AMCPlan } from '@/contexts/DataStoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AMCPlanFormDialog } from './AMCPlanFormDialog';
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

export const AMCPlansManager = () => {
  const [amcPlans, updateAmcPlans] = useAmcPlans();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AMCPlan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sortedPlans = [...amcPlans].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleAdd = () => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const handleEdit = (plan: AMCPlan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleSave = (plan: AMCPlan) => {
    if (editingPlan) {
      const updated = amcPlans.map(p => p.id === plan.id ? plan : p);
      updateAmcPlans(updated);
      toast.success('AMC plan updated successfully');
    } else {
      const newPlan = {
        ...plan,
        id: `amc-${Date.now()}`
      };
      updateAmcPlans([...amcPlans, newPlan]);
      toast.success('AMC plan added successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      const updated = amcPlans.filter(p => p.id !== deleteId);
      updateAmcPlans(updated);
      toast.success('AMC plan deleted');
      setDeleteId(null);
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    const updated = amcPlans.map(p => p.id === id ? { ...p, isActive } : p);
    updateAmcPlans(updated);
    toast.success(isActive ? 'Plan activated' : 'Plan deactivated');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Annual Maintenance Plans (AMC)</CardTitle>
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Target Customer</TableHead>
                <TableHead className="text-center">Visits/Year</TableHead>
                <TableHead>Price Label</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-center">Display Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.targetCustomer}</TableCell>
                  <TableCell className="text-center">{plan.visitsPerYear}</TableCell>
                  <TableCell>{plan.priceLabel}</TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={plan.isActive}
                      onCheckedChange={(checked) => handleToggleActive(plan.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-center">{plan.displayOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(plan.id)}
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

      <AMCPlanFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        plan={editingPlan}
        onSave={handleSave}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete AMC Plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the AMC plan.
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
