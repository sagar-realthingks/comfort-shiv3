import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AMCPlan } from '@/contexts/DataStoreContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AMCPlanFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: AMCPlan | null;
  onSave: (plan: AMCPlan) => void;
}

export const AMCPlanFormDialog = ({ open, onOpenChange, plan, onSave }: AMCPlanFormDialogProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<AMCPlan>({
    defaultValues: plan || {
      name: '',
      visitsPerYear: 2,
      targetCustomer: 'Home',
      priceLabel: '',
      features: [],
      displayOrder: 0,
      isActive: true
    }
  });

  useEffect(() => {
    if (plan) {
      reset(plan);
    } else {
      reset({
        name: '',
        visitsPerYear: 2,
        targetCustomer: 'Home',
        priceLabel: '',
        features: [],
        displayOrder: 0,
        isActive: true
      });
    }
  }, [plan, reset]);

  const onSubmit = (data: AMCPlan) => {
    onSave({
      ...data,
      id: plan?.id || `amc-${Date.now()}`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit AMC Plan' : 'Add New AMC Plan'}</DialogTitle>
          <DialogDescription>
            {plan ? 'Update AMC plan details below' : 'Enter AMC plan details below'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Plan name is required' })}
              placeholder="e.g., Basic Plan"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetCustomer">Target Customer</Label>
              <Select
                value={watch('targetCustomer')}
                onValueChange={(value) => setValue('targetCustomer', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitsPerYear">Visits per Year</Label>
              <Input
                id="visitsPerYear"
                type="number"
                {...register('visitsPerYear', { valueAsNumber: true, min: 1 })}
                placeholder="2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceLabel">Price Label *</Label>
            <Input
              id="priceLabel"
              {...register('priceLabel', { required: 'Price label is required' })}
              placeholder="e.g., From ₹2,999/year"
            />
            {errors.priceLabel && (
              <p className="text-sm text-destructive">{errors.priceLabel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              placeholder="2 scheduled service visits per year&#10;Filter cleaning & sanitization&#10;Priority booking"
              rows={5}
              onChange={(e) => {
                const lines = e.target.value.split('\n').filter(line => line.trim());
                setValue('features', lines as any);
              }}
              value={Array.isArray(watch('features')) ? watch('features').join('\n') : ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                {...register('displayOrder', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="isActive"
                checked={watch('isActive')}
                onCheckedChange={(checked) => setValue('isActive', checked as boolean)}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active Plan
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {plan ? 'Update' : 'Add'} Plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
