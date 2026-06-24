'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Brand Strategy Guide', sku: 'BK-001', price: 299.00, stock: 45 },
  { id: 2, name: 'Production Asset Bundle', sku: 'AS-202', price: 549.00, stock: 8 },
];

export function ProductManager() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <Card className="bg-slate-950/40 backdrop-blur shadow-xl border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800">
        <CardTitle className="text-xl font-sans font-medium text-slate-100">Product Inventory</CardTitle>
        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-900/50">
              <TableHead className="text-slate-400">Name</TableHead>
              <TableHead className="text-slate-400">SKU</TableHead>
              <TableHead className="text-slate-400">Price</TableHead>
              <TableHead className="text-slate-400">Stock</TableHead>
              <TableHead className="text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id} className="border-slate-800 hover:bg-slate-900/50">
                <TableCell className="font-sans font-medium text-white">{product.name}</TableCell>
                <TableCell className="font-mono text-slate-300">{product.sku}</TableCell>
                <TableCell className="font-mono text-cyan-400">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-slate-300">{product.stock}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive" className="bg-red-900/40 text-red-300 hover:bg-red-900/60">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
