import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns, Post } from "./colums";
import TablePaginate from "./table-paginate";

const data: Post[] = [
  {
    id: "m5gr84i9",
    title: "Căn hộ cao cấp Quận 1",
    priceUnit: "VND",
    address: "123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
    price: 5000000000,
    squareMeters: 100,
    description: "Căn hộ sang trọng, đầy đủ nội thất, vị trí trung tâm.",
    floor: 10,
    bedroom: 3,
    bathroom: 2,
    priority: 0,
    isFurniture: true,
    direction: "Bắc",
    verified: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c871d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "x7kr92p0",
    title: "Nhà phố Quận 3",
    priceUnit: "VND",
    address: "456 Lê Lợi, Quận 3, TP. Hồ Chí Minh",
    price: 8000000000,
    squareMeters: 150,
    description: "Nhà phố đẹp, gần trung tâm.",
    floor: 2,
    bedroom: 4,
    bathroom: 3,
    priority: 1,
    isFurniture: false,
    direction: "Đông",
    verified: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "k9pl34m1",
    title: "Biệt thự Quận 7",
    priceUnit: "VND",
    address: "789 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    price: 15000000000,
    squareMeters: 300,
    description: "Biệt thự rộng rãi, có hồ bơi.",
    floor: 3,
    bedroom: 5,
    bathroom: 4,
    priority: 2,
    isFurniture: true,
    direction: "Nam",
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "p2qr56n2",
    title: "Căn hộ Quận Bình Thạnh",
    priceUnit: "VND",
    address: "101 Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh",
    price: 3000000000,
    squareMeters: 80,
    description: "Căn hộ tiện nghi, gần sông.",
    floor: 15,
    bedroom: 2,
    bathroom: 1,
    priority: 0,
    isFurniture: true,
    direction: "Tây",
    verified: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t5uv78o3",
    title: "Nhà phố Quận 10",
    priceUnit: "VND",
    address: "234 Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh",
    price: 6000000000,
    squareMeters: 120,
    description: "Nhà phố hiện đại, gần trung tâm.",
    floor: 2,
    bedroom: 3,
    bathroom: 2,
    priority: 1,
    isFurniture: false,
    direction: "Đông Bắc",
    verified: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c871d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "r8wx90p4",
    title: "Căn hộ Thủ Đức",
    priceUnit: "VND",
    address: "567 Võ Văn Ngân, Thủ Đức, TP. Hồ Chí Minh",
    price: 2500000000,
    squareMeters: 70,
    description: "Căn hộ giá rẻ, gần trường học.",
    floor: 5,
    bedroom: 2,
    bathroom: 1,
    priority: 0,
    isFurniture: false,
    direction: "Tây Nam",
    verified: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "j1yz12q5",
    title: "Biệt thự Phú Nhuận",
    priceUnit: "VND",
    address: "890 Phan Đình Phùng, Phú Nhuận, TP. Hồ Chí Minh",
    price: 12000000000,
    squareMeters: 250,
    description: "Biệt thự sang trọng, yên tĩnh.",
    floor: 3,
    bedroom: 4,
    bathroom: 3,
    priority: 2,
    isFurniture: true,
    direction: "Đông Nam",
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "n4ab34r6",
    title: "Nhà phố Quận 5",
    priceUnit: "VND",
    address: "345 Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh",
    price: 7000000000,
    squareMeters: 130,
    description: "Nhà phố tiện kinh doanh.",
    floor: 2,
    bedroom: 3,
    bathroom: 2,
    priority: 1,
    isFurniture: false,
    direction: "Tây Bắc",
    verified: false,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c871d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m7cd56s7",
    title: "Căn hộ Quận 2",
    priceUnit: "VND",
    address: "678 Nguyễn Thị Định, Quận 2, TP. Hồ Chí Minh",
    price: 4000000000,
    squareMeters: 90,
    description: "Căn hộ view sông, đầy đủ tiện ích.",
    floor: 12,
    bedroom: 2,
    bathroom: 2,
    priority: 0,
    isFurniture: true,
    direction: "Nam",
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "q0ef78t8",
    title: "Nhà phố Gò Vấp",
    priceUnit: "VND",
    address: "901 Nguyễn Kiệm, Gò Vấp, TP. Hồ Chí Minh",
    price: 5500000000,
    squareMeters: 110,
    description: "Nhà phố gần chợ, tiện lợi.",
    floor: 2,
    bedroom: 3,
    bathroom: 2,
    priority: 1,
    isFurniture: false,
    direction: "Bắc",
    verified: false,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div>
      <div className=" rounded-md border">
        <div className=" h-[500px] overflow-y-auto overflow-x-auto custom-scrollbar">
          <Table className="min-w-[2000px]  ">
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4">
        <TablePaginate table={table} />
      </div>
    </div>
  );
}