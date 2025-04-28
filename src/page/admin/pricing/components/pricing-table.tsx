import { useState } from 'react';
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Filter} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PricingCreateDialog } from './pricing-create-dialog';
import { PricingLevel, type Pricing,columns, formatCurrency } from './column';


export const pricingData: Pricing[] = [
  {
    id: 'p001',
    name: PricingLevel.FREE,
    description: 'Basic features for individuals',
    price: 0,
    discountPercent: 0,
    displayDay: 5,
    hasReport: false,
    maxPost: 3,
    boostDays: 0,
    expiredDay: 30,
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z',
    userCount: 1250,
  },
  {
    id: 'p002',
    name: PricingLevel.BASIC,
    description: 'Essential features for beginners',
    price: 9.99,
    discountPercent: 0,
    displayDay: 10,
    hasReport: false,
    maxPost: 10,
    boostDays: 1,
    expiredDay: 30,
    createdAt: '2023-10-14T14:15:00Z',
    updatedAt: '2023-10-14T14:15:00Z',
    userCount: 850,
  },
  {
    id: 'p003',
    name: PricingLevel.STANDARD,
    description: 'Advanced features for professionals',
    price: 19.99,
    discountPercent: 10,
    displayDay: 15,
    hasReport: true,
    maxPost: 25,
    boostDays: 3,
    expiredDay: 30,
    createdAt: '2023-10-13T09:45:00Z',
    updatedAt: '2023-10-13T09:45:00Z',
    userCount: 620,
  },
  {
    id: 'p004',
    name: PricingLevel.PREMIUM,
    description: 'Premium features for businesses',
    price: 49.99,
    discountPercent: 15,
    displayDay: 30,
    hasReport: true,
    maxPost: 100,
    boostDays: 7,
    expiredDay: 30,
    createdAt: '2023-10-12T16:20:00Z',
    updatedAt: '2023-10-12T16:20:00Z',
    userCount: 320,
  }
];

export function PricingTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Pricing[]>([...pricingData]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<Pricing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {

  };

  const handlePricingCreated = (newPricing: Pricing) => {
    setData((prev) => [newPricing, ...prev]);
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-3'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Filter by description...'
            value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('description')?.setFilterValue(event.target.value)}
            className='text-[14px] text-gray-700 outline-none px-[16px] py-[6px] rounded-[8px]'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                <Filter className='mr-1.5 h-3 w-3' />
                Lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              <DropdownMenuLabel className='text-xs'>Filter by package</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(PricingLevel).map((level) => (
                <DropdownMenuCheckboxItem
                  key={level}
                  className='text-xs'
                  checked={
                    table.getColumn('name')?.getFilterValue() === level ||
                    (Array.isArray(table.getColumn('name')?.getFilterValue()) &&
                      (table.getColumn('name')?.getFilterValue() as string[])?.includes(level))
                  }
                  onCheckedChange={(checked) => {
                    const filterValues = (table.getColumn('name')?.getFilterValue() as string[]) || [];
                    if (checked) {
                      table.getColumn('name')?.setFilterValue([...filterValues, level]);
                    } else {
                      table.getColumn('name')?.setFilterValue(filterValues.filter((val) => val !== level));
                    }
                  }}
                >
                  {level}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-xs'
                onClick={() => {
                  table.getColumn('name')?.setFilterValue(null);
                }}
              >
                Clear filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex items-center gap-2'>
          <PricingCreateDialog onPricingCreated={handlePricingCreated} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 text-xs'>
                Columns <ChevronDown className='ml-1.5 h-3 w-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-xs'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='text-xs capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border border-red-100'>
        <div className='relative max-h-[500px] overflow-auto'>
          <Table>
            <TableHeader className='bg-red-50/50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='border-red-100 hover:bg-red-50/80'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='text-xs font-medium text-gray-700 h-8'>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='border-red-100 hover:bg-red-50/50 data-[state=selected]:bg-red-50'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='py-2 text-xs'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center text-xs'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
