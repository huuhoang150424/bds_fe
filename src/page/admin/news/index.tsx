"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Download, Pencil, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllNews } from "./hooks/use-get-all-new";


interface News {
  id: string;
  title: string;
  author: { fullname: string };
  category: string;
  createdAt: string;
  slug: string;
}

export default function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof News | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllNews(limit);

  // Làm phẳng dữ liệu từ các trang
  const newsList = data?.pages.flatMap((page : any) => page.data) || [];
  console.log("newsList", newsList);

  // Format date to DD-MM-YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Filter news based on search term
  const filteredNews = newsList?.filter(
    (news : any) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.author.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort news
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    // Xử lý đặc biệt cho trường author là object
    const aValue = sortConfig.key === "author" ? a.author.fullname : a[sortConfig.key];
    const bValue = sortConfig.key === "author" ? b.author.fullname : b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (key: keyof News) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Handle pagination
  const handleNext = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Handle export
  const handleExport = () => {
    const headers = ["STT", "ID", "Tiêu đề", "Tác giả", "Danh mục", "Ngày tạo"];
    const rows = sortedNews.map((news, index) => [
      index + 1,
      news.id,
      news.title,
      news.author.fullname,
      news.category,
      formatDate(news.createdAt),
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "news.csv";
    link.click();
  };

  // Handle add news
  const handleAddNews = () => {
    // Implement API call to add news
    setOpenDialog(false);
  };

  if (isLoading) {
    return <div className="text-center">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Quản lý tin tức</h1>
            <p className="text-muted-foreground text-sm">
              Quản lý các bài tin tức trên hệ thống
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="gap-1 w-full sm:w-auto" onClick={handleExport}>
              <Download className="h-4 w-4" /> Xuất CSV
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="gap-1 w-full sm:w-auto">
                  <Plus className="h-4 w-4" /> Thêm tin tức
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-w-[95vw]">
                <DialogHeader>
                  <DialogTitle>Thêm tin tức mới</DialogTitle>
                  <DialogDescription>
                    Điền thông tin để thêm bài tin tức mới vào hệ thống.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input id="title" placeholder="Nhập tiêu đề tin tức" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuyen-dung">Tuyển dụng</SelectItem>
                        <SelectItem value="thong-bao">Thông báo</SelectItem>
                        <SelectItem value="su-kien">Sự kiện</SelectItem>
                        <SelectItem value="cong-nghe">Công nghệ</SelectItem>
                        <SelectItem value="huong-dan">Hướng dẫn</SelectItem>
                        <SelectItem value="khuyen-mai">Khuyến mãi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Nội dung</Label>
                    <Textarea id="content" placeholder="Nhập nội dung tin tức" rows={8} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddNews}>Lưu tin tức</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full sm:max-w-sm p-2"
          />
        </div>

        {/* Table for PC/Laptop */}
        <div className="rounded-md border hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-[80px]">
                  STT
                </TableHead>
                <TableHead scope="col">
                  <button className="flex items-center gap-1" onClick={() => handleSort("title")}>
                    Tiêu đề
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col" className="hidden lg:table-cell">
                  <button className="flex items-center gap-1" onClick={() => handleSort("author")}>
                    Tác giả
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("category")}
                  >
                    Danh mục
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col" className="hidden lg:table-cell">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("createdAt")}
                  >
                    Ngày tạo
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedNews.length > 0 ? (
                sortedNews.map((news, index) => (
                  <TableRow key={news.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{news?.title || "Không có tiêu đề"}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {news?.author?.fullname || "Không xác định"}
                    </TableCell>
                    <TableCell>{news?.category || "Không xác định"}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(news.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="px-2">
                          <Link to={`/new/${news?.slug}`}>Xem</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="px-2">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-2">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Không tìm thấy tin tức
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Card Layout for Mobile */}
        <div className="md:hidden space-y-4">
          {sortedNews.length > 0 ? (
            sortedNews.map((news, index) => (
              <div key={news?.id} className="border rounded-md p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">STT: {index + 1}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="px-2">
                      <Link to={`/new/${news?.slug}`}>Xem</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="px-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-2">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">
                    Tiêu đề: {news?.title || "Không có tiêu đề"}
                  </p>
                  <p className="text-sm mt-1">
                    Tác giả: {news?.author?.fullname || "Không xác định"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Danh mục: {news?.category || "Không xác định"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ngày tạo: {formatDate(news.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">Không tìm thấy tin tức</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Hiển thị tối đa {limit} bản ghi mỗi trang
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={limit.toString()}
              onValueChange={(value) => {
                setLimit(Number(value));
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="pointer-events-none opacity-50"
                    aria-disabled={true}
                    
                  >
                    Trước
                  </PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNext}
                    aria-disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Đang tải..." : hasNextPage ? "Sau" : "Hết"}
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}