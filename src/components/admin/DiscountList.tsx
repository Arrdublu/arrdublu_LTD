
'use client';

import { useState } from 'react';
import type { Discount } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteDiscount } from '@/lib/discount-actions';
import { useToast } from '@/hooks/use-toast';
import { useCurrency } from '@/context/CurrencyProvider';


interface DiscountListProps {
    initialDiscounts: Discount[];
}

export function DiscountList({ initialDiscounts }: DiscountListProps) {
    const [discounts, setDiscounts] = useState(initialDiscounts);
    const { toast } = useToast();
    const { getFormattedPrice } = useCurrency();

    const handleDelete = async (id: string, code: string) => {
        try {
            await deleteDiscount(id);
            setDiscounts(discounts.filter(d => d.id !== id));
            toast({
                title: 'Discount Deleted',
                description: `The discount code "${code}" has been removed.`,
            });
        } catch (error: any) {
            toast({
                title: 'Error Deleting Discount',
                description: error.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
        }
    };

    if (discounts.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No discounts have been created yet.</p>
    }

    return (
        <div className="space-y-4">
            {discounts.map(discount => (
                <div key={discount.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div>
                        <p className="font-mono text-lg font-semibold">{discount.code}</p>
                        <p className="text-sm text-muted-foreground">
                            {discount.type === 'percentage' 
                                ? `${discount.value}% off` 
                                : `${getFormattedPrice(discount.value)} off`}
                        </p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-5 w-5 text-destructive" />
                                <span className="sr-only">Delete discount</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the 
                                    <span className="font-semibold"> {discount.code} </span> 
                                    discount code.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={() => handleDelete(discount.id, discount.code)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ))}
        </div>
    )
}
