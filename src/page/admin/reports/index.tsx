
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
import { ArrowUpDown, Download, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllReport } from "./hooks/use-get-all-report";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Report {
  id: number;
  post: { id: number; title: string };
  user: { fullname: string };
  reason: string;
  createdAt: string;
}

interface ApiResponse {
  data: Report[];
  totalPages: number;
}

export default function ReportManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Report | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const { data, isLoading, error } = useGetAllReport(page, limit) as {
    data: ApiResponse | undefined;
    isLoading: boolean;
    error: any;
  };

  const totalPages = data?.totalPages || 1;

  // Format date to DD-MM-YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Filter reports
  const filteredReports = data?.data?.filter((report) =>
    [report?.post?.title, report?.user?.fullname, report?.reason]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting
  const handleSort = (key: keyof Report) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Handle pagination
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Handle export
  const handleExport = () => {
    const headers = ["STT", "ID", "Bài đăng", "Người báo cáo", "Lý do", "Ngày báo cáo"];
    const rows = data?.data.map((report, index) => [
      (page - 1) * limit + index + 1,
      report.id,
      report.post.title,
      report.user.fullname,
      report.reason,
      formatDate(report.createdAt),
    ]);
    const csvContent = [
      headers.join(","),
      ...(rows?.map((row) => row.join(",")) || []),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reports.csv";
    link.click();
  };

  // Handle dialog actions
  const handleIgnore = async (reportId: number) => {
    console.log(`Ignoring report ${reportId}`);
  };

  const handleDeletePost = async (postId: number) => {
    console.log(`Deleting post ${postId}`);
  };

  if (isLoading) {
    return <div className="text-center">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Lỗi khi tải dữ liệu</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Danh sách báo cáo bài đăng</h1>
            <p className="text-muted-foreground text-sm">
              Xem và xử lý các báo cáo từ người dùng
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Xuất dữ liệu
          </Button>
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

        {/* Table for PC/Laptop, Card for Mobile */}
        <div className="rounded-md border hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-[80px]">
                  STT
                </TableHead>
                <TableHead scope="col">
                  <button className="flex items-center gap-1" onClick={() => handleSort("post")}>
                    Bài đăng
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col" className="hidden lg:table-cell">
                  <button className="flex items-center gap-1" onClick={() => handleSort("user")}>
                    Người báo cáo
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col">
                  <button className="flex items-center gap-1" onClick={() => handleSort("reason")}>
                    Lý do
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col" className="hidden lg:table-cell">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("createdAt")}
                  >
                    Ngày báo cáo
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReports.length > 0 ? (
                sortedReports.map((report, index) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{report?.post?.title || "Không có tiêu đề"}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {report?.user?.fullname || "Không xác định"}
                    </TableCell>
                    <TableCell
                      title={report.reason}
                      className="max-w-[150px] truncate"
                    >
                      {report.reason}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(report.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" /> Chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px] max-w-[95vw]">
                          <DialogHeader>
                            <DialogTitle>Chi tiết báo cáo</DialogTitle>
                            <DialogDescription>
                              Xem chi tiết báo cáo và lý do
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <h3 className="font-medium">
                                Báo cáo cho bài đăng:{" "}
                                {report?.post?.title || "Không có tiêu đề"}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Người báo cáo: {report?.user?.fullname || "Không xác định"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Ngày báo cáo: {formatDate(report.createdAt)}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Lý do báo cáo:</h4>
                              <div className="border rounded-md p-4">
                                <p>{report.reason}</p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => handleIgnore(report.id)}
                            >
                              Bỏ qua
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeletePost(report.post.id)}
                            >
                              Xóa bài đăng
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Không tìm thấy báo cáo
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Card Layout for Mobile */}
        <div className="md:hidden space-y-4">
          {sortedReports.length > 0 ? (
            sortedReports.map((report, index) => (
              <div
                key={report.id}
                className="border rounded-md p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    STT: {(page - 1) * limit + index + 1}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" /> Chi tiết
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw]">
                      <DialogHeader>
                        <DialogTitle>Chi tiết báo cáo</DialogTitle>
                        <DialogDescription>Xem chi tiết báo cáo và lý do</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-medium">
                            Báo cáo cho bài đăng: {report?.post?.title || "Không có tiêu đề"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Người báo cáo: {report?.user?.fullname || "Không xác định"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Ngày báo cáo: {formatDate(report.createdAt)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Lý do báo cáo:</h4>
                          <div className="border rounded-md p-4">
                            <p>{report.reason}</p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => handleIgnore(report.id)}>
                          Bỏ qua
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeletePost(report.post.id)}
                        >
                          Xóa bài đăng
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">
                    Bài đăng: {report?.post?.title || "Không có tiêu đề"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lý do: {report.reason}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              Không tìm thấy báo cáo
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
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
                  onClick={handlePrevious}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                >
                  Trước
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                >
                  Sau
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}