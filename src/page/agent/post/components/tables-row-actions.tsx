import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

interface Props {
  payment?:any
}



export default function TablesRowActions ({payment}:Props)
{
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={ () => {} }
        >
          Sửa 
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={ () => {} }
        >
          Xóa 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
