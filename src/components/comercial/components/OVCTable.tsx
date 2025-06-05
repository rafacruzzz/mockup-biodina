
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface OVCItem {
  id: number;
  code: string;
  qty: string;
  priceListUnit: string;
  priceListTotal: string;
  customerDiscountPercent: string;
  customerDiscountUnit: string;
  customerDiscountTotal: string;
  subTotalUnit: string;
  subTotalTotal: string;
  handlingCharge: string;
  total: string;
  comissionPercent: string;
  comissionValue: string;
  netRadiometer: string;
}

interface OVCTableProps {
  items: OVCItem[];
  onUpdateItems: (items: OVCItem[]) => void;
}

const OVCTable = ({ items, onUpdateItems }: OVCTableProps) => {
  const updateItem = (id: number, field: keyof OVCItem, value: string) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Calcular automaticamente alguns campos baseados em outros
        if (field === 'qty' || field === 'priceListUnit') {
          const qty = parseFloat(updatedItem.qty) || 0;
          const priceListUnit = parseFloat(updatedItem.priceListUnit) || 0;
          updatedItem.priceListTotal = (qty * priceListUnit).toFixed(2);
        }
        
        if (field === 'customerDiscountPercent' || field === 'priceListUnit') {
          const priceListUnit = parseFloat(updatedItem.priceListUnit) || 0;
          const discountPercent = parseFloat(updatedItem.customerDiscountPercent) || 0;
          updatedItem.customerDiscountUnit = (priceListUnit * discountPercent / 100).toFixed(2);
        }
        
        if (field === 'qty' || field === 'customerDiscountUnit') {
          const qty = parseFloat(updatedItem.qty) || 0;
          const customerDiscountUnit = parseFloat(updatedItem.customerDiscountUnit) || 0;
          updatedItem.customerDiscountTotal = (qty * customerDiscountUnit).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    });
    onUpdateItems(updatedItems);
  };

  const calculateTotals = () => {
    return {
      priceListTotal: items.reduce((sum, item) => sum + (parseFloat(item.priceListTotal) || 0), 0).toFixed(2),
      customerDiscountTotal: items.reduce((sum, item) => sum + (parseFloat(item.customerDiscountTotal) || 0), 0).toFixed(2),
      subTotalTotal: items.reduce((sum, item) => sum + (parseFloat(item.subTotalTotal) || 0), 0).toFixed(2),
      handlingCharge: items.reduce((sum, item) => sum + (parseFloat(item.handlingCharge) || 0), 0).toFixed(2),
      total: items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2),
      comissionValue: items.reduce((sum, item) => sum + (parseFloat(item.comissionValue) || 0), 0).toFixed(2),
      netRadiometer: items.reduce((sum, item) => sum + (parseFloat(item.netRadiometer) || 0), 0).toFixed(2)
    };
  };

  const totals = calculateTotals();

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border border-gray-300 text-center font-bold">CODE</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold">Qty</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold" colSpan={2}>Price List</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold" colSpan={3}>Customer Discount</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold" colSpan={2}>Sub total</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold">Handling charge* (3%)</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold">Total</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold">Comission</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold">Comission value</TableHead>
            <TableHead className="border border-gray-300 text-center font-bold">Net Radiometer</TableHead>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableHead className="border border-gray-300"></TableHead>
            <TableHead className="border border-gray-300"></TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">Unit</TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">Total</TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">%</TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">Unit</TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">Total</TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">Unit</TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">Total</TableHead>
            <TableHead className="border border-gray-300"></TableHead>
            <TableHead className="border border-gray-300"></TableHead>
            <TableHead className="border border-gray-300 text-center text-sm">%</TableHead>
            <TableHead className="border border-gray-300"></TableHead>
            <TableHead className="border border-gray-300"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.code}
                  onChange={(e) => updateItem(item.id, 'code', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.priceListUnit}
                  onChange={(e) => updateItem(item.id, 'priceListUnit', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.priceListTotal}
                  readOnly
                  className="border-0 h-8 text-center bg-gray-50"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.customerDiscountPercent}
                  onChange={(e) => updateItem(item.id, 'customerDiscountPercent', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.customerDiscountUnit}
                  readOnly
                  className="border-0 h-8 text-center bg-gray-50"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.customerDiscountTotal}
                  readOnly
                  className="border-0 h-8 text-center bg-gray-50"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.subTotalUnit}
                  onChange={(e) => updateItem(item.id, 'subTotalUnit', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.subTotalTotal}
                  onChange={(e) => updateItem(item.id, 'subTotalTotal', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.handlingCharge}
                  onChange={(e) => updateItem(item.id, 'handlingCharge', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.total}
                  onChange={(e) => updateItem(item.id, 'total', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.comissionPercent}
                  onChange={(e) => updateItem(item.id, 'comissionPercent', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.comissionValue}
                  onChange={(e) => updateItem(item.id, 'comissionValue', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
              <TableCell className="border border-gray-300 p-1">
                <Input
                  value={item.netRadiometer}
                  onChange={(e) => updateItem(item.id, 'netRadiometer', e.target.value)}
                  className="border-0 h-8 text-center"
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-gray-100 font-bold">
            <TableCell className="border border-gray-300 text-center">TOTAL</TableCell>
            <TableCell className="border border-gray-300"></TableCell>
            <TableCell className="border border-gray-300"></TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.priceListTotal}</TableCell>
            <TableCell className="border border-gray-300"></TableCell>
            <TableCell className="border border-gray-300"></TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.customerDiscountTotal}</TableCell>
            <TableCell className="border border-gray-300"></TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.subTotalTotal}</TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.handlingCharge}</TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.total}</TableCell>
            <TableCell className="border border-gray-300"></TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.comissionValue}</TableCell>
            <TableCell className="border border-gray-300 text-center">{totals.netRadiometer}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OVCTable;
