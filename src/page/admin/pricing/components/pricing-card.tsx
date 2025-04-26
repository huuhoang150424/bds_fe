import { useState } from 'react';
import { Check, X, Edit, Trash2, DollarSign, Tag } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

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
import { formatCurrency, PricingLevel } from './column';

interface PricingCardProps {
  pricing: {
    id: string;
    name: PricingLevel;
    description: string;
    price: number;
    discountPercent: number;
    displayDay: number;
    hasReport: boolean;
    maxPost: number;
    boostDays: number;
    expiredDay: number;
    createdAt: string;
    updatedAt: string;
    userCount?: number;
  };
  className?: string;
  onDelete?: () => void;
  featured?: boolean;
}

export default function PricingCard({ pricing, className, onDelete, featured = false }: PricingCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const calculateDiscountedPrice = (price: number, discountPercent: number) => {
    return price - (price * discountPercent) / 100;
  };

  const handleDelete = async () => {
    setIsDeleting(true);

  };

  // Get color scheme based on pricing level
  const getColorScheme = () => {
    switch (pricing.name) {
      case PricingLevel.FREE:
        return {
          badge: 'bg-gray-100 text-gray-700',
          border: featured ? 'border-gray-300' : 'border-gray-100',
          header: featured ? 'bg-gray-50' : '',
        };
      case PricingLevel.BASIC:
        return {
          badge: 'bg-blue-100 text-blue-700',
          border: featured ? 'border-blue-300' : 'border-blue-100',
          header: featured ? 'bg-blue-50' : '',
        };
      case PricingLevel.STANDARD:
        return {
          badge: 'bg-green-100 text-green-700',
          border: featured ? 'border-green-300' : 'border-green-100',
          header: featured ? 'bg-green-50' : '',
        };
      case PricingLevel.PREMIUM:
        return {
          badge: 'bg-purple-100 text-purple-700',
          border: featured ? 'border-purple-300' : 'border-purple-100',
          header: featured ? 'bg-purple-50' : '',
        };
      case PricingLevel.ENTERPRISE:
        return {
          badge: 'bg-red-100 text-red-700',
          border: featured ? 'border-red-300' : 'border-red-100',
          header: featured ? 'bg-red-50' : '',
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-700',
          border: featured ? 'border-gray-300' : 'border-gray-100',
          header: featured ? 'bg-gray-50' : '',
        };
    }
  };

  const colorScheme = getColorScheme();

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all',
        colorScheme.border,
        featured && 'shadow-md transform hover:-translate-y-1',
        className,
      )}
    >
      <CardHeader className={cn('p-4', colorScheme.header)}>
        <div className='flex items-center justify-between'>
          <Badge className={`text-[10px] font-medium ${colorScheme.badge}`}>{pricing.name}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-6 w-6'>
                <Tag className='h-3 w-3' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
              <DropdownMenuItem className='text-xs cursor-pointer'>
                <Edit className='mr-1.5 h-3 w-3' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive text-xs cursor-pointer'
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className='mr-1.5 h-3 w-3' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='mt-2'>
          <h3 className='text-lg font-bold'>{pricing.name}</h3>
          <p className='text-xs text-muted-foreground mt-1'>{pricing.description}</p>
        </div>
        <div className='mt-3'>
          {pricing.discountPercent > 0 ? (
            <div className='flex items-center gap-2'>
              <span className='line-through text-sm text-muted-foreground'>{formatCurrency(pricing.price)}</span>
              <span className='text-xl font-bold'>
                {formatCurrency(calculateDiscountedPrice(pricing.price, pricing.discountPercent))}
              </span>
              <Badge className='text-[10px] bg-red-100 text-red-700'>-{pricing.discountPercent}%</Badge>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <span className='text-xl font-bold'>{formatCurrency(pricing.price)}</span>
              {pricing.price === 0 && <Badge className='text-[10px] bg-green-100 text-green-700'>Free</Badge>}
            </div>
          )}
          <p className='text-[10px] text-muted-foreground mt-1'>per {pricing.expiredDay} days</p>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <Separator className='my-3' />
        <ul className='space-y-2'>
          <li className='flex items-center gap-2 text-xs'>
            <Check className='h-3.5 w-3.5 text-green-500 flex-shrink-0' />
            <span>{pricing.displayDay} days content display</span>
          </li>
          <li className='flex items-center gap-2 text-xs'>
            <Check className='h-3.5 w-3.5 text-green-500 flex-shrink-0' />
            <span>Up to {pricing.maxPost} posts</span>
          </li>
          <li className='flex items-center gap-2 text-xs'>
            <Check className='h-3.5 w-3.5 text-green-500 flex-shrink-0' />
            <span>{pricing.boostDays} days of content boosting</span>
          </li>
          <li className='flex items-center gap-2 text-xs'>
            {pricing.hasReport ? (
              <>
                <Check className='h-3.5 w-3.5 text-green-500 flex-shrink-0' />
                <span>Detailed analytics reports</span>
              </>
            ) : (
              <>
                <X className='h-3.5 w-3.5 text-red-500 flex-shrink-0' />
                <span className='text-muted-foreground'>No analytics reports</span>
              </>
            )}
          </li>
          <li className='flex items-center gap-2 text-xs'>
            <Check className='h-3.5 w-3.5 text-green-500 flex-shrink-0' />
            <span>{pricing.expiredDay} days validity</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex flex-col'>
        <Button className='w-full mt-4' size='sm'>
          <DollarSign className='mr-1.5 h-3 w-3' />
          {pricing.price === 0 ? 'Get Started' : 'Subscribe Now'}
        </Button>
        {pricing.userCount !== undefined && (
          <p className='text-[10px] text-muted-foreground text-center mt-2'>
            {pricing.userCount.toLocaleString()} users subscribed
          </p>
        )}
      </CardFooter>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className='border-red-100'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-base text-red-500'>Delete Pricing Package</AlertDialogTitle>
            <AlertDialogDescription className='text-xs'>
              Are you sure you want to delete this pricing package? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='my-2 rounded-md bg-red-50 p-3 border border-red-100'>
            <h4 className='text-xs font-medium text-red-800 mb-1'>You are about to delete:</h4>
            <div className='flex items-center gap-2'>
              <Badge className={`text-[10px] font-medium ${colorScheme.badge}`}>{pricing.name}</Badge>
              <p className='text-xs text-red-700 font-medium'>{pricing.description}</p>
            </div>
            <p className='text-[10px] text-red-600 mt-1'>
              Price: {formatCurrency(pricing.price)} | ID: {pricing.id}
            </p>
            {pricing.userCount && pricing.userCount > 0 && (
              <div className='mt-2 p-2 bg-red-100 rounded text-[10px] text-red-800'>
                <strong>Warning:</strong> This package is currently used by {pricing.userCount} users. Deleting it may
                affect their subscriptions.
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className='h-8 text-xs'>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='h-8 text-xs bg-red-500 hover:bg-red-600 text-white'
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
