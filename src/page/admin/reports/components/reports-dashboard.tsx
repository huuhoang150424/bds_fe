import { useState } from 'react';
import { AlertTriangle, AlertCircle, MessageCircle, Search, Filter, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReportsList } from './reports-list';
import { ReportDetail } from './report-detail';
import { useGetReports } from '../hooks/use-get-reports';
import { useGetSummary } from '../hooks/use-get-summary';

enum ReportReason {
  INAPPROPRIATE_CONTENT = 'NỘI_DUNG_KHÔNG_PHÙ_HỢP',
  SPAM = 'SPAM',
  HARASSMENT = 'QUẤY_RỐI',
  MISINFORMATION = 'THÔNG_TIN_SAI_LỆCH',
  COPYRIGHT_VIOLATION = 'VI_PHẠM_BẢN_QUYỀN',
  OTHER = 'KHÁC',
}

enum ProcessingStatus {
  PENDING = 'CHỜ_XỬ_LÝ',
  IN_PROGRESS = 'ĐANG_XỬ_LÝ',
  RESOLVED = 'ĐÃ_GIẢI_QUYẾT',
  REJECTED = 'ĐÃ_TỪ_CHỐI',
}

enum Severity {
  EMERGENCY = 'KHẨN_CẤP',
  IMPORTANT = 'QUAN_TRỌNG',
  FEEDBACK = 'GÓP_Ý',
}

const generateMockReports = (count = 100) => {
  const reports = [];
  const reasons = Object.values(ReportReason);
  const statuses = Object.values(ProcessingStatus);
  const severities = Object.values(Severity);

  for (let i = 1; i <= count; i++) {
    const isPostReport = Math.random() > 0.2;
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

    reports.push({
      id: i.toString(),
      userId: `user-${Math.floor(Math.random() * 20) + 1}`,
      postId: isPostReport ? `post-${Math.floor(Math.random() * 500) + 1}` : null,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      content: `Nội dung báo cáo chi tiết #${i}. Đây là mô tả vấn đề mà người dùng đã gặp phải.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: randomDate,
      user: {
        id: `user-${Math.floor(Math.random() * 20) + 1}`,
        fullname: `Người dùng ${Math.floor(Math.random() * 20) + 1}`,
        email: `user${Math.floor(Math.random() * 20) + 1}@example.com`,
      },
      post: isPostReport
        ? {
            id: `post-${Math.floor(Math.random() * 500) + 1}`,
            title: `Bài viết ${Math.floor(Math.random() * 500) + 1}`,
            content: `Đây là nội dung của bài viết đã bị báo cáo. Bài viết này có thể chứa nội dung không phù hợp hoặc vi phạm quy định của cộng đồng.`,
            userId: `author-${Math.floor(Math.random() * 20) + 1}`,
          }
        : null,
      severity: severities[Math.floor(Math.random() * severities.length)],
      adminNotes: Math.random() > 0.7 ? 'Ghi chú của admin về báo cáo này.' : '',
    });
  }

  return reports;
};

const mockReports = generateMockReports();

export function ReportsAdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<string>('date_desc');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: allReports, isLoading } = useGetReports(page, limit);
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const { data: summaryData, isLoading: isLoadingSummary } = useGetSummary();

  console.log(summaryData?.data);

  const filteredReports = mockReports
    .filter((report) => {
      if (selectedTab !== 'all' && report.status !== selectedTab) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          report.content.toLowerCase().includes(query) ||
          report.user.fullname.toLowerCase().includes(query) ||
          report.post?.title.toLowerCase().includes(query) ||
          false
        );
      }

      if (severityFilter !== 'all' && report.severity !== severityFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date_asc':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'date_desc':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'severity':
          const severityOrder = {
            [Severity.EMERGENCY]: 0,
            [Severity.IMPORTANT]: 1,
            [Severity.FEEDBACK]: 2,
          };
          return severityOrder[a.severity as Severity] - severityOrder[b.severity as Severity];
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const pendingCount = mockReports.filter((r) => r.status === ProcessingStatus.PENDING).length;
  const inProgressCount = mockReports.filter((r) => r.status === ProcessingStatus.IN_PROGRESS).length;
  const resolvedCount = mockReports.filter((r) => r.status === ProcessingStatus.RESOLVED).length;
  const emergencyCount = mockReports.filter((r) => r.severity === Severity.EMERGENCY).length;

  const reportDetail = selectedReport ? mockReports.find((r) => r.id === selectedReport) : null;

  const handleBatchAction = (action: string) => {};

  return (
    <div className='space-y-6 mt-5'>
      {/* Stats Overview */}
      <div className='space-y-6 mt-5'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='border border-gray-200 rounded-[8px]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Báo Cáo Chờ Xử Lý</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{summaryData?.data?.processingStatus?.pending || 0}</div>
              <p className='text-xs text-muted-foreground'>Đang chờ xem xét</p>
            </CardContent>
          </Card>
          <Card className='border border-gray-200 rounded-[8px]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Đang Xử Lý</CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{summaryData?.data?.processingStatus?.reviewing  || 0}</div>
              <p className='text-xs text-muted-foreground'>Đang trong quá trình xử lý</p>
            </CardContent>
          </Card>
          <Card className='border border-gray-200 rounded-[8px]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Đã Giải Quyết</CardTitle>
              <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{summaryData?.data?.processingStatus?.resolved  || 0}</div>
              <p className='text-xs text-muted-foreground'>Báo cáo đã hoàn thành</p>
            </CardContent>
          </Card>
          <Card className='bg-red-50 border border-gray-200 rounded-[8px]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-red-800'>Báo Cáo Khẩn Cấp</CardTitle>
              <AlertTriangle className='h-4 w-4 text-red-800' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-red-800'>{summaryData?.data?.processingStatus?.urgentReports  || 0}</div>
              <p className='text-xs text-red-700'>Vấn đề ưu tiên cao</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2 '>
          <Card className='border border-gray-200 rounded-[8px]'>
            <CardHeader className='px-6 pt-6 pb-0'>
              <CardTitle className='text-sm font-medium'>Phân Loại Báo Cáo</CardTitle>
            </CardHeader>
            <CardContent className='px-6 py-4'>
              <div className='space-y-2'>
                {summaryData?.data && Object.entries(summaryData?.data?.severityStatus).map(([key, value]) => (
                <div key={key} className='flex justify-between items-center'>
                  <span className='text-sm'>{key}</span>
                  <span className='font-medium'>{value as string}</span>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

          <Card className='border border-gray-200 rounded-[8px] self-start'>
            <CardHeader className='px-6 pt-6 pb-0'>
              <CardTitle className='text-sm font-medium '>Hoạt Động Gần Đây</CardTitle>
            </CardHeader>
            <CardContent className='px-6 py-4'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>7 ngày qua</span>
                  <span className='font-medium'>{summaryData?.data?.recentActivity?.last7Days || 0} báo cáo</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>30 ngày qua</span>
                  <span className='font-medium'>{summaryData?.data?.recentActivity?.last30Days  || 0} báo cáo</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm'>Tổng số báo cáo</span>
                  <span className='font-medium'>{summaryData?.data?.processingStatus?.total || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Batch Actions */}
      {selectedReports.length > 0 && (
        <div className='bg-slate-100 p-4 rounded-md flex items-center justify-between'>
          <div>
            <span className='font-medium'>{selectedReports.length} báo cáo được chọn</span>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' onClick={() => handleBatchAction('mark_in_progress')}>
              Đánh dấu đang xử lý
            </Button>
            <Button variant='outline' size='sm' onClick={() => handleBatchAction('resolve')}>
              Giải quyết tất cả
            </Button>
            <Button variant='outline' size='sm' onClick={() => handleBatchAction('dismiss')}>
              Bỏ qua tất cả
            </Button>
            <Button variant='outline' size='sm' onClick={() => setSelectedReports([])}>
              Hủy chọn
            </Button>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Reports List Panel */}
        <div className='lg:col-span-1'>
          <Card className='border border-gray-200 rounded-[8px]'>
            <CardHeader>
              <CardTitle>Danh Sách Báo Cáo</CardTitle>
              <CardDescription>Quản lý báo cáo từ người dùng</CardDescription>

              <div className='flex flex-col space-y-2 mt-2'>
                {/* Search */}
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Tìm kiếm báo cáo...'
                    className='  pl-[30px] py-[6px] outline-none text-textColor text-[14px] font-[400]'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <div className='flex items-center space-x-2'>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className='w-full'>
                      <Filter className='mr-2 h-4 w-4' />
                      <SelectValue placeholder='Lọc theo mức độ' />
                    </SelectTrigger>
                    <SelectContent className=''>
                      <SelectItem value='all'>Tất cả mức độ</SelectItem>
                      <SelectItem value={Severity.EMERGENCY}>
                        <div className='flex items-center'>
                          <Badge variant='outline' className='bg-red-100 text-red-800 mr-2'>
                            🔴
                          </Badge>
                          Khẩn cấp
                        </div>
                      </SelectItem>
                      <SelectItem value={Severity.IMPORTANT}>
                        <div className='flex items-center'>
                          <Badge variant='outline' className='bg-yellow-100 text-yellow-800 mr-2'>
                            🟡
                          </Badge>
                          Quan trọng
                        </div>
                      </SelectItem>
                      <SelectItem value={Severity.FEEDBACK}>
                        <div className='flex items-center'>
                          <Badge variant='outline' className='bg-blue-100 text-blue-800 mr-2'>
                            🔵
                          </Badge>
                          Góp ý
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Sắp xếp theo' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='date_desc'>Mới nhất trước</SelectItem>
                      <SelectItem value='date_asc'>Cũ nhất trước</SelectItem>
                      <SelectItem value='severity'>Mức độ nghiêm trọng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className='p-0'>
              <Tabs defaultValue='all' value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className='w-full grid grid-cols-4 border-y border-gray-200 bg-transparent rounded-none '>
                  <TabsTrigger
                    className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
                    value='all'
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger
                    className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
                    value={ProcessingStatus.PENDING}
                  >
                    Chờ xử lý
                  </TabsTrigger>
                  <TabsTrigger
                    className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
                    value={ProcessingStatus.IN_PROGRESS}
                  >
                    Đang xử lý
                  </TabsTrigger>
                  <TabsTrigger
                    className='data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
                    value={ProcessingStatus.RESOLVED}
                  >
                    Đã giải quyết
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='all' className='m-0 border border-gray-200 bg-transparent '>
                  <ReportsList
                    reports={allReports}
                    selectedReportId={selectedReport}
                    onSelectReport={setSelectedReport}
                    selectedReports={selectedReports}
                    onSelectMultiple={setSelectedReports}
                    handleChangePage={handleChangePage}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value={ProcessingStatus.PENDING} className='m-0'>
                  <ReportsList
                    reports={allReports}
                    selectedReportId={selectedReport}
                    onSelectReport={setSelectedReport}
                    selectedReports={selectedReports}
                    onSelectMultiple={setSelectedReports}
                    handleChangePage={handleChangePage}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value={ProcessingStatus.IN_PROGRESS} className='m-0'>
                  <ReportsList
                    reports={allReports}
                    selectedReportId={selectedReport}
                    onSelectReport={setSelectedReport}
                    selectedReports={selectedReports}
                    onSelectMultiple={setSelectedReports}
                    handleChangePage={handleChangePage}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value={ProcessingStatus.RESOLVED} className='m-0'>
                  <ReportsList
                    reports={allReports}
                    selectedReportId={selectedReport}
                    onSelectReport={setSelectedReport}
                    selectedReports={selectedReports}
                    onSelectMultiple={setSelectedReports}
                    handleChangePage={handleChangePage}
                    isLoading={isLoading}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Report Detail Panel */}
        <div className='lg:col-span-2 self-start h-[700px] '>
          {reportDetail ? (
            <ReportDetail
              report={reportDetail}
              onClose={() => setSelectedReport(null)}
              onStatusChange={(reportId, newStatus) => {
                console.log(`Thay đổi trạng thái của báo cáo ${reportId} thành ${newStatus}`);
              }}
            />
          ) : (
            <Card className='h-full flex items-center justify-center p-6 border border-gray-200 rounded-[8px] '>
              <div className='text-center'>
                <MessageCircle className='mx-auto h-12 w-12 text-muted-foreground' />
                <h3 className='mt-4 text-lg font-medium'>Chưa chọn báo cáo</h3>
                <p className='mt-2 text-sm text-muted-foreground'>
                  Chọn một báo cáo từ danh sách để xem chi tiết và thực hiện hành động
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
