"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowUpDown, Download, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ReportManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock report data
  const reports = [
    {
      id: "r1",
      post: "Bí quyết giữ dáng của các ngôi sao",
      reporter: "Nguyễn Văn X",
      reason: "Nội dung không chính xác, quảng cáo sai sự thật",
      reportDate: "2023-03-18",
    },
    {
      id: "r2",
      post: "10 địa điểm du lịch đẹp nhất Việt Nam",
      reporter: "Trần Thị Y",
      reason: "Hình ảnh sử dụng không được phép, vi phạm bản quyền",
      reportDate: "2023-03-17",
    },
    {
      id: "r3",
      post: "Kinh nghiệm mua nhà lần đầu",
      reporter: "Lê Văn Z",
      reason: "Nội dung quảng cáo trá hình, không phù hợp",
      reportDate: "2023-03-21",
    },
    {
      id: "r4",
      post: "Cách tiết kiệm điện trong mùa hè",
      reporter: "Phạm Thị W",
      reason: "Thông tin sai lệch về cách sử dụng thiết bị điện",
      reportDate: "2023-03-20",
    },
    {
      id: "r5",
      post: "Cách làm bánh mì sandwich ngon tại nhà",
      reporter: "Hoàng Văn V",
      reason: "Công thức không chính xác, nguy hiểm cho người dùng",
      reportDate: "2023-03-16",
    },
  ]

  // Filter reports based on search term
  const filteredReports = reports.filter(
    (report) =>
      report.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date to display in DD-MM-YYYY format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
  }

  // Truncate long text with ellipsis
  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Danh sách báo cáo bài đăng</h1>
            <p className="text-muted-foreground">Xem và xử lý các báo cáo từ người dùng</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất dữ liệu
          </Button>
        </div>

        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm p-[5px]"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Bài đăng
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Người báo cáo</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead>Ngày báo cáo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.post}</TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell title={report.reason}>{truncateText(report.reason)}</TableCell>
                  <TableCell>{formatDate(report.reportDate)}</TableCell>
                  <TableCell className="text-right">
                  <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Eye className="h-4 w-4" /> Chi tiết
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Chi tiết báo cáo</DialogTitle>
              <DialogDescription>Xem chi tiết báo cáo và lý do</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="font-medium">Báo cáo cho bài đăng: {report.post}</h3>
                <p className="text-sm text-muted-foreground">Người báo cáo: {report.reporter}</p>
                <p className="text-sm text-muted-foreground">Ngày báo cáo: {report.reportDate}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Lý do báo cáo:</h4>
                <div className="border rounded-md p-4">
                  <p>{report.reason}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Bỏ qua</Button>
              <Button variant="destructive">Xóa bài đăng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" aria-disabled="true">
                  Trước
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#">Sau</PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

