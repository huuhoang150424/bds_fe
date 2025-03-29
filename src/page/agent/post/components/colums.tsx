import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TablesRowActions from "./tables-row-actions";

export type Post = {
  id: string;
  title: string;
  priceUnit: string;
  address: string;
  price: number;
  squareMeters: number;
  description: string;
  floor: number;
  bedroom: number;
  bathroom: number;
  priority: number;
  isFurniture: boolean;
  direction: "Bắc" | "Nam" | "Đông" | "Tây" | "Đông Bắc" | "Đông Nam" | "Tây Bắc" | "Tây Nam";
  verified: boolean;
  image: string; 
};

export const columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giá
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: row.original.priceUnit || "VND",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "squareMeters",
    // header: "Diện tích",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Diện tích
        <ArrowUpDown />
      </Button>),
    cell: ({ row }) => <div>{row.getValue("squareMeters")} m²</div>,
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "floor",
    // header: "Tầng",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tầng
        <ArrowUpDown />
      </Button>),
    cell: ({ row }) => <div>{row.getValue("floor")}</div>,
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "image", // Cột Ảnh mới
    header: "Ảnh",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("image")}
          alt={row.getValue("title")}
          className="w-16 h-16 object-cover rounded-md" // Kích thước nhỏ gọn
        />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status") || "N/A"}</div>
    ),
  },
  {
    accessorKey: "bedroom",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phòng ngủ
        <ArrowUpDown />
      </Button>),
    cell: ({ row }) => <div>{row.getValue("bedroom")}</div>,
  },
  {
    accessorKey: "bathroom",
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phòng tắm
        <ArrowUpDown />
      </Button>),
    cell: ({ row }) => <div>{row.getValue("bathroom")}</div>,
  },
  {
    accessorKey: "isFurniture",
    header: "Nội thất",
    cell: ({ row }) => <div>{row.getValue("isFurniture") ? "Có" : "Không"}</div>,
  },
  {
    accessorKey: "direction",
    header: "Hướng",
    cell: ({ row }) => <div>{row.getValue("direction")}</div>,
  },
  {
    accessorKey: "verified",
    header: "Xác minh",
    cell: ({ row }) => <div>{row.getValue("verified") ? "Đã xác minh" : "Chưa xác minh"}</div>,
  },
  {
    id: "actions",
    accessorKey: "action",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return <TablesRowActions payment={payment} />;
    },
  },
];