import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { useState } from 'react';
import { ArrowDown, ArrowUp, Calendar, CreditCard, Filter, Search, Wallet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Pagination } from '@/components/user/pagination';
import { Loading } from '@/components/common';
import * as XLSX from 'xlsx';
import { useFinancialSummary } from './hook/use-summary-transactions';
import { useGetTransactions } from './hook/use-getall-transactions';

enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  MOMO = 'momo',
  ZALOPAY = 'zalo_pay',
  APPLEPAY = 'apple_pay',
  GOOGLEPAY = 'google_pay',
}

interface Transaction {
  id: string;
  userId: string;
  amount?: number;
  description?: string;
  orderCode?: number;
  paymentMethod?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pricingId?: string;
  remainingPosts?: number;
  displayDay?: number;
  startDate?: string;
  boostDays?: number;
  endDate?: string;
}

export function Finance() {
  useScrollToTopOnMount();
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('income');
  const [page, setPage] = useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const { data, isLoading, error } = useGetTransactions(page, limit, activeTab as 'income' | 'expense');
  const { data: financialSummary, isLoading: isSummaryLoading, error: summaryError } = useFinancialSummary();

  if (error || summaryError) {
    toast({
      variant: 'destructive',
      title: 'Lỗi',
      description: 'Không thể tải dữ liệu tài chính.',
    });
  }

  const transactions = data?.data?.data || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 1;
  const currentPage = data?.data?.currentPage || 1;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const formatPercentChange = (percent: number) => {
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const getPercentChangeColor = (percent: number) => {
    if (percent > 0) return 'text-emerald-600';
    if (percent < 0) return 'text-rose-600';
    return 'text-gray-600';
  };

  const getPercentChangeIcon = (percent: number) => {
    if (percent > 0) return <ArrowUp className='h-3 w-3 mr-1' />;
    if (percent < 0) return <ArrowDown className='h-3 w-3 mr-1' />;
    return null;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case Status.COMPLETED:
        return <Badge className='bg-emerald-500 hover:bg-emerald-600 text-xs px-2 py-0'>Hoàn thành</Badge>;
      case Status.PENDING:
        return <Badge className='bg-amber-500 hover:bg-amber-600 text-xs px-2 py-0'>Đang xử lý</Badge>;
      case Status.FAILED:
        return <Badge className='bg-rose-500 hover:bg-rose-600 text-xs px-2 py-0'>Thất bại</Badge>;
      case Status.CANCELLED:
        return <Badge className='bg-gray-500 hover:bg-gray-600 text-xs px-2 py-0'>Hủy</Badge>;
      default:
        return <Badge className='bg-emerald-500 hover:bg-emerald-600 text-xs px-2 py-0'>Hoàn thành</Badge>;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case Status.COMPLETED:
        return 'Hoàn thành';
      case Status.PENDING:
        return 'Đang xử lý';
      case Status.FAILED:
        return 'Thất bại';
      case Status.CANCELLED:
        return 'Hủy';
      default:
        return 'Hoàn thành';
    }
  };

  const getPaymentMethod = (method?: string) => {
    switch (method) {
      case PaymentMethod.BANK_TRANSFER:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-violet-100'>
              <Wallet className='h-3 w-3 text-violet-600' />
            </div>
            <span className='text-xs'>Chuyển khoản</span>
          </div>
        );
      case PaymentMethod.CREDIT_CARD:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-pink-100'>
              <CreditCard className='h-3 w-3 text-pink-600' />
            </div>
            <span className='text-xs'>Thẻ tín dụng</span>
          </div>
        );
      case PaymentMethod.CASH:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-amber-100'>
              <Wallet className='h-3 w-3 text-amber-600' />
            </div>
            <span className='text-xs'>Tiền mặt</span>
          </div>
        );
      case PaymentMethod.PAYPAL:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-100'>
              <Wallet className='h-3 w-3 text-blue-600' />
            </div>
            <span className='text-xs'>PayPal</span>
          </div>
        );
      case PaymentMethod.MOMO:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-purple-100'>
              <Wallet className='h-3 w-3 text-purple-600' />
            </div>
            <span className='text-xs'>Momo</span>
          </div>
        );
      case PaymentMethod.ZALOPAY:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-teal-100'>
              <Wallet className='h-3 w-3 text-teal-600' />
            </div>
            <span className='text-xs'>ZaloPay</span>
          </div>
        );
      case PaymentMethod.APPLEPAY:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-gray-100'>
              <CreditCard className='h-3 w-3 text-gray-600' />
            </div>
            <span className='text-xs'>Apple Pay</span>
          </div>
        );
      case PaymentMethod.GOOGLEPAY:
        return (
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-orange-100'>
              <CreditCard className='h-3 w-3 text-orange-600' />
            </div>
            <span className='text-xs'>Google Pay</span>
          </div>
        );
      default:
        return <span className='text-xs'>Không xác định</span>;
    }
  };

  const getPaymentMethodLabel = (method?: string) => {
    switch (method) {
      case PaymentMethod.BANK_TRANSFER:
        return 'Chuyển khoản';
      case PaymentMethod.CREDIT_CARD:
        return 'Thẻ tín dụng';
      case PaymentMethod.CASH:
        return 'Tiền mặt';
      case PaymentMethod.PAYPAL:
        return 'PayPal';
      case PaymentMethod.MOMO:
        return 'Momo';
      case PaymentMethod.ZALOPAY:
        return 'ZaloPay';
      case PaymentMethod.APPLEPAY:
        return 'Apple Pay';
      case PaymentMethod.GOOGLEPAY:
        return 'Google Pay';
      default:
        return 'Không xác định';
    }
  };

  const exportToExcel = () => {
    if (transactions.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Không có giao dịch để xuất.',
      });
      return;
    }

    let data: any[] = [];
    let headers: string[] = [];

    if (activeTab === 'income') {
      headers = ['Ngày', 'Mã giao dịch', 'Mô tả', 'Phương thức', 'Trạng thái', 'Số tiền'];
      data = transactions.map((transaction:Transaction) => ({
        Ngày: formatDate(transaction.createdAt),
        'Mã giao dịch': `#${transaction.orderCode || 'N/A'}`,
        'Mô tả': transaction.description || 'N/A',
        'Phương thức': getPaymentMethodLabel(transaction.paymentMethod),
        'Trạng thái': getStatusLabel(transaction.status),
        'Số tiền': `+${formatCurrency(transaction.amount || 0)}`,
      }));
    } else {
      headers = [
        'Ngày',
        'Mã gói',
        'Bài đăng',
        'Ngày hiển thị',
        'Ngày bắt đầu',
        'Ngày tăng tốc',
        'Ngày kết thúc',
        'Trạng thái',
      ];
      data = transactions.map((transaction:Transaction) => ({
        Ngày: formatDate(transaction.createdAt),
        'Mã gói': transaction.pricingId || 'N/A',
        'Bài đăng': transaction.remainingPosts || 0,
        'Ngày hiển thị': transaction.displayDay || 0,
        'Ngày bắt đầu': transaction.startDate ? formatDate(transaction.startDate) : 'N/A',
        'Ngày tăng tốc': transaction.boostDays || 0,
        'Ngày kết thúc': transaction.endDate ? formatDate(transaction.endDate) : 'N/A',
        'Trạng thái': getStatusLabel(transaction.status),
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    const fileName = `transactions_${activeTab}_${dateStr}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className='space-y-8 p-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='bg-gradient-to-br from-green-100 to-emerald-300 border-none shadow-md rounded-[8px]'>
          <CardHeader className='pb-2'>
            <CardDescription className='text-emerald-700 font-medium text-xs'>Tổng thu</CardDescription>
            <CardTitle className='text-xl text-emerald-700'>
              {isSummaryLoading ? 'Đang tải...' : formatCurrency(financialSummary?.data?.depositsThisMonth || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center text-emerald-600'>
              <ArrowUp className='h-3 w-3 mr-1' />
              <span className='text-xs'>Tiền vào tài khoản</span>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-red-100 to-rose-300 border-none shadow-md rounded-[8px]'>
          <CardHeader className='pb-2'>
            <CardDescription className='text-rose-700 font-medium text-xs'>Tổng chi</CardDescription>
            <CardTitle className='text-xl text-rose-700'>
              {isSummaryLoading ? 'Đang tải...' : formatCurrency(financialSummary?.data?.totalVipSpent || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center text-rose-600'>
              <ArrowDown className='h-3 w-3 mr-1' />
              <span className='text-xs'>Tiền ra khỏi tài khoản</span>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-blue-100 to-indigo-300 border-none shadow-md rounded-[8px]'>
          <CardHeader className='pb-2'>
            <CardDescription className='text-indigo-700 font-medium text-xs'>Số dư</CardDescription>
            <CardTitle className='text-xl text-indigo-700'>
              {isSummaryLoading ? 'Đang tải...' : formatCurrency(financialSummary?.data?.balance || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center text-indigo-600'>
              <Wallet className='h-3 w-3 mr-1' />
              <span className='text-xs'>Tổng thu - Tổng chi</span>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-yellow-100 to-amber-300 border-none shadow-md rounded-[8px]'>
          <CardHeader className='pb-2'>
            <CardDescription className='text-amber-700 font-medium text-xs'>Thay đổi chi tiêu</CardDescription>
            <CardTitle className='text-xl text-amber-700'>
              {isSummaryLoading ? 'Đang tải...' : formatPercentChange(financialSummary?.data?.spendingChangePercent || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn('flex items-center', getPercentChangeColor(financialSummary?.data?.spendingChangePercent || 0))}>
              {getPercentChangeIcon(financialSummary?.data?.spendingChangePercent || 0)}
              <span className='text-xs'>So với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='border-none shadow-lg overflow-hidden rounded-[8px]'>
        <CardHeader className='bg-gradient-to-r from-violet-500 to-purple-600 text-white'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <CardTitle className='text-xl font-bold'>Lịch sử giao dịch</CardTitle>
              <CardDescription className='text-violet-100 mt-1 text-xs'>
                Xem lịch sử giao dịch của gói VIP
              </CardDescription>
            </div>
            <Button
              variant='secondary'
              className='bg-white text-violet-700 hover:bg-violet-100 text-xs h-8 px-3'
              onClick={exportToExcel}
            >
              Xuất Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className='p-4'>
          <Tabs defaultValue='income' className='mb-6' onValueChange={setActiveTab}>
            <TabsList className='grid grid-cols-2 w-full max-w-md mb-4 h-9'>
              <TabsTrigger
                value='income'
                className='data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 text-xs'
              >
                Tiền vào
              </TabsTrigger>
              <TabsTrigger
                value='expense'
                className='data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700 text-xs'
              >
                Tiền ra
              </TabsTrigger>
            </TabsList>

            <div className='flex flex-col md:flex-row gap-4 mb-6'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Tìm kiếm giao dịch...'
                  className='pl-9 h-10 rounded-xl border-slate-200 text-sm'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={activeTab === 'expense'}
                />
              </div>
              <div className='flex gap-2'>
                <div className='relative'>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                    disabled={activeTab === 'expense'}
                  >
                    <SelectTrigger className='w-[160px] h-10 rounded-xl border-slate-200 pl-9 text-sm'>
                      <SelectValue placeholder='Trạng thái' />
                    </SelectTrigger>
                    <Filter className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <SelectContent>
                      <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                      <SelectItem value={Status.COMPLETED}>Hoàn thành</SelectItem>
                      <SelectItem value={Status.PENDING}>Đang xử lý</SelectItem>
                      <SelectItem value={Status.FAILED}>Thất bại</SelectItem>
                      <SelectItem value={Status.CANCELLED}>Hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='relative'>
                  <Select
                    value={paymentMethodFilter}
                    onValueChange={setPaymentMethodFilter}
                    disabled={activeTab === 'expense'}
                  >
                    <SelectTrigger className='w-[160px] h-10 rounded-xl border-slate-200 pl-9 text-sm'>
                      <SelectValue placeholder='Phương thức' />
                    </SelectTrigger>
                    <CreditCard className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <SelectContent>
                      <SelectItem value='all'>Tất cả phương thức</SelectItem>
                      <SelectItem value={PaymentMethod.BANK_TRANSFER}>Chuyển khoản</SelectItem>
                      <SelectItem value={PaymentMethod.CREDIT_CARD}>Thẻ tín dụng</SelectItem>
                      <SelectItem value={PaymentMethod.CASH}>Tiền mặt</SelectItem>
                      <SelectItem value={PaymentMethod.PAYPAL}>PayPal</SelectItem>
                      <SelectItem value={PaymentMethod.MOMO}>Momo</SelectItem>
                      <SelectItem value={PaymentMethod.ZALOPAY}>ZaloPay</SelectItem>
                      <SelectItem value={PaymentMethod.APPLEPAY}>Apple Pay</SelectItem>
                      <SelectItem value={PaymentMethod.GOOGLEPAY}>Google Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <TabsContent value='income' className='m-0'>
              {isLoading ? (
                <Loading className='mt-[210px]' />
              ) : (
                <div className='rounded-xl border border-slate-200 overflow-hidden'>
                  <Table>
                    <TableHeader className='bg-emerald-50'>
                      <TableRow>
                        <TableHead className='font-semibold text-xs'>Ngày</TableHead>
                        <TableHead className='font-semibold text-xs'>Mã giao dịch</TableHead>
                        <TableHead className='font-semibold text-xs'>Mô tả</TableHead>
                        <TableHead className='font-semibold text-xs'>Phương thức</TableHead>
                        <TableHead className='font-semibold text-xs'>Trạng thái</TableHead>
                        <TableHead className='text-right font-semibold text-xs'>Số tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.length > 0 ? (
                        transactions.map((transaction: Transaction, index: number) => (
                          <TableRow
                            key={transaction.id}
                            className={cn(
                              'transition-colors hover:bg-emerald-50 cursor-pointer',
                              index % 2 === 0 ? 'bg-white' : 'bg-emerald-50/50'
                            )}
                          >
                            <TableCell className='flex items-center gap-2 text-xs py-2'>
                              <div className='flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100'>
                                <Calendar className='h-3 w-3 text-emerald-600' />
                              </div>
                              {formatDate(transaction.createdAt)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant='outline'
                                className='bg-emerald-100 hover:bg-emerald-200 font-mono text-xs px-2 py-0'
                              >
                                #{transaction.orderCode || 'N/A'}
                              </Badge>
                            </TableCell>
                            <TableCell className='font-medium text-xs'>{transaction.description || 'N/A'}</TableCell>
                            <TableCell>{getPaymentMethod(transaction.paymentMethod)}</TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className='text-right font-medium'>
                              <div className='flex items-center justify-end gap-1'>
                                <div className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700'>
                                  <ArrowUp className='h-3 w-3' />
                                  <span className='font-semibold text-xs'>
                                    + {formatCurrency(transaction.amount || 0)}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className='text-center py-10 text-muted-foreground'>
                            <div className='flex flex-col items-center justify-center gap-2'>
                              <Search className='h-10 w-10 text-slate-300' />
                              <p className='text-slate-500 font-medium text-sm'>Không tìm thấy giao dịch nào</p>
                              <p className='text-slate-400 text-xs'>
                                Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
                    <div className='text-xs text-gray-500'>
                      {transactions.length > 0
                        ? `Hiển thị ${(currentPage - 1) * limit + 1} đến ${Math.min(
                            currentPage * limit,
                            totalItems
                          )} trong tổng số ${totalItems} giao dịch`
                        : 'Không có dữ liệu'}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handleChangePage}
                      className='mt-0'
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value='expense' className='m-0'>
              {isLoading ? (
                <Loading className='mt-[210px]' />
              ) : (
                <div className='rounded-xl border border-slate-200 overflow-hidden'>
                  <Table>
                    <TableHeader className='bg-rose-50'>
                      <TableRow>
                        <TableHead className='font-semibold text-xs'>Ngày</TableHead>
                        <TableHead className='font-semibold text-xs'>Mã gói</TableHead>
                        <TableHead className='font-semibold text-xs'>Bài đăng</TableHead>
                        <TableHead className='font-semibold text-xs'>Ngày hiển thị</TableHead>
                        <TableHead className='font-semibold text-xs'>Ngày bắt đầu</TableHead>
                        <TableHead className='font-semibold text-xs'>Ngày tăng tốc</TableHead>
                        <TableHead className='font-semibold text-xs'>Ngày kết thúc</TableHead>
                        <TableHead className='font-semibold text-xs'>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.length > 0 ? (
                        transactions.map((transaction: Transaction, index: number) => (
                          <TableRow
                            key={transaction.id}
                            className={cn(
                              'transition-colors hover:bg-rose-50 cursor-pointer',
                              index % 2 === 0 ? 'bg-white' : 'bg-rose-50/50'
                            )}
                          >
                            <TableCell className='flex items-center gap-2 text-xs py-2'>
                              <div className='flex items-center justify-center w-6 h-6 rounded-full bg-rose-100'>
                                <Calendar className='h-3 w-3 text-rose-600' />
                              </div>
                              {formatDate(transaction.createdAt)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant='outline'
                                className='bg-rose-100 hover:bg-rose-200 font-mono text-xs px-2 py-0'
                              >
                                {transaction.pricingId || 'N/A'}
                              </Badge>
                            </TableCell>
                            <TableCell className='font-medium text-xs'>{transaction.remainingPosts || 0}</TableCell>
                            <TableCell className='font-medium text-xs'>{transaction.displayDay || 0}</TableCell>
                            <TableCell className='font-medium text-xs'>
                              {transaction.startDate ? formatDate(transaction.startDate) : 'N/A'}
                            </TableCell>
                            <TableCell className='font-medium text-xs'>{transaction.boostDays || 0}</TableCell>
                            <TableCell className='font-medium text-xs'>
                              {transaction.endDate ? formatDate(transaction.endDate) : 'N/A'}
                            </TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className='text-center py-10 text-muted-foreground'>
                            <div className='flex flex-col items-center justify-center gap-2'>
                              <Search className='h-10 w-10 text-slate-300' />
                              <p className='text-slate-500 font-medium text-sm'>Không tìm thấy giao dịch nào</p>
                              <p className='text-slate-400 text-xs'>
                                Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className='flex items-center justify-between px-4 py-3 border-t w-full'>
                    <div className='text-xs text-gray-500'>
                      {transactions.length > 0
                        ? `Hiển thị ${(currentPage - 1) * limit + 1} đến ${Math.min(
                            currentPage * limit,
                            totalItems
                          )} trong tổng số ${totalItems} giao dịch`
                        : 'Không có dữ liệu'}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handleChangePage}
                      className='mt-0'
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}