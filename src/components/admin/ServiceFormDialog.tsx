import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Service } from '@/contexts/DataStoreContext';
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

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onSave: (service: Service) => void;
}

export const ServiceFormDialog = ({ open, onOpenChange, service, onSave }: ServiceFormDialogProps) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<Service>({
    defaultValues: service || {
      name: '',
      description: '',
      category: '',
      priceLabel: '',
      showOnHome: false,
      displayOrder: 0,
      covered: []
    }
  });

  useEffect(() => {
    if (service) {
      reset(service);
    } else {
      reset({
        name: '',
        description: '',
        category: '',
        priceLabel: '',
        showOnHome: false,
        displayOrder: 0,
        covered: []
      });
    }
  }, [service, reset]);

  const onSubmit = (data: Service) => {
    onSave({
      ...data,
      id: service?.id || `svc-${Date.now()}`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          <DialogDescription>
            {service ? 'Update service details below' : 'Enter service details below'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Service name is required' })}
              placeholder="e.g., Split AC - Deep Cleaning"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register('category')}
              placeholder="e.g., AC Servicing, Installation, Repair"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Brief description of the service"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceLabel">Price Label *</Label>
            <Input
              id="priceLabel"
              {...register('priceLabel', { required: 'Price label is required' })}
              placeholder="e.g., ₹799 or ₹799 - ₹1,499"
            />
            {errors.priceLabel && (
              <p className="text-sm text-destructive">{errors.priceLabel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="covered">What's Covered (one per line)</Label>
            <Textarea
              id="covered"
              placeholder="Indoor coil deep cleaning&#10;Outdoor condenser coil cleaning&#10;Gas pressure check"
              rows={4}
              onChange={(e) => {
                const lines = e.target.value.split('\n').filter(line => line.trim());
                setValue('covered', lines as any);
              }}
              value={Array.isArray(watch('covered')) ? watch('covered').join('\n') : ''}
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
                id="showOnHome"
                checked={watch('showOnHome')}
                onCheckedChange={(checked) => setValue('showOnHome', checked as boolean)}
              />
              <Label htmlFor="showOnHome" className="cursor-pointer">
                Show on Home Page
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {service ? 'Update' : 'Add'} Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
