import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { useState } from "react";
import DataTableDemo from "./components/tables";

export default function ManagePost() {
  const [sizePage, setSizePage] = useState(6);
  return (
    <div className=" py-[30px] max-w-[1800px]  mx-auto ">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">
        Danh sách bài đăng
      </h1>
      <div className="flex items-center mb-[15px] justify-between">
        <div className="flex items-center gap-[15px]">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
            placeholder="tìm kiếm bài đăng..."
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"square"}
                variant={"outline"}
                className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
              >
                Lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal"></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup></DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Select
          value={`${sizePage}`}
          onValueChange={(value) => {
            setSizePage(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[6, 12, 20, 30, 40].map((pageSize) => (
              <SelectItem className="text-textColor" key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTableDemo />
    </div>
  );
}
