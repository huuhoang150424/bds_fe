import useScrollToTopOnMount from "@/hooks/use-scroll-top";
import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Calendar, CreditCard, Filter, Search, Wallet } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  CREDIT_CARD = "CREDIT_CARD",
  E_WALLET = "E_WALLET",
  CASH = "CASH",
}

interface Transaction {
  id: string
  userId: string
  amount: number
  description: string
  orderCode?: number
  paymentMethod: string
  status: string
  createdAt: string
  updatedAt: string
}
const sampleTransactions: Transaction[] = [
  {
    id: "1",
    userId: "user123",
    amount: -250000,
    description: "Đăng tin nhà phố Quận 7",
    orderCode: 1,
    paymentMethod: PaymentMethod.CREDIT_CARD,
    status: Status.COMPLETED,
    createdAt: "2023-08-25T10:30:00Z",
    updatedAt: "2023-08-25T10:30:00Z",
  },
  {
    id: "2",
    userId: "user123",
    amount: 2000000,
    description: "Nạp tiền vào tài khoản",
    orderCode: 2,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: Status.COMPLETED,
    createdAt: "2023-08-23T14:20:00Z",
    updatedAt: "2023-08-23T14:20:00Z",
  },
  {
    id: "3",
    userId: "user123",
    amount: -150000,
    description: "Gia hạn tin đăng căn hộ Quận 2",
    orderCode: 3,
    paymentMethod: PaymentMethod.E_WALLET,
    status: Status.COMPLETED,
    createdAt: "2023-08-20T09:15:00Z",
    updatedAt: "2023-08-20T09:15:00Z",
  },
  {
    id: "4",
    userId: "user123",
    amount: -350000,
    description: "Đẩy tin lên trang chủ",
    orderCode: 4,
    paymentMethod: PaymentMethod.CREDIT_CARD,
    status: Status.COMPLETED,
    createdAt: "2023-08-18T16:45:00Z",
    updatedAt: "2023-08-18T16:45:00Z",
  },
  {
    id: "5",
    userId: "user123",
    amount: 250000,
    description: "Hoàn tiền tin đăng bị từ chối",
    orderCode: 5,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: Status.REFUNDED,
    createdAt: "2023-08-15T11:30:00Z",
    updatedAt: "2023-08-15T11:30:00Z",
  },
  {
    id: "6",
    userId: "user123",
    amount: -180000,
    description: "Đăng tin căn hộ Quận 9",
    orderCode: 6,
    paymentMethod: PaymentMethod.E_WALLET,
    status: Status.COMPLETED,
    createdAt: "2023-08-12T08:30:00Z",
    updatedAt: "2023-08-12T08:30:00Z",
  },
  {
    id: "7",
    userId: "user123",
    amount: 1500000,
    description: "Nạp tiền vào tài khoản",
    orderCode: 7,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: Status.COMPLETED,
    createdAt: "2023-08-10T13:45:00Z",
    updatedAt: "2023-08-10T13:45:00Z",
  },
]
export function Finance() {
  useScrollToTopOnMount();
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<string>("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  useEffect(() => {
    let filtered = sampleTransactions

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.orderCode?.toString().includes(searchTerm),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter)
    }

    if (paymentMethodFilter !== "all") {
      filtered = filtered.filter((t) => t.paymentMethod === paymentMethodFilter)
    }

    if (activeTab === "income") {
      filtered = filtered.filter((t) => t.amount > 0)
    } else if (activeTab === "expense") {
      filtered = filtered.filter((t) => t.amount < 0)
    }

    setTransactions(filtered)
  }, [searchTerm, statusFilter, paymentMethodFilter, activeTab])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case Status.COMPLETED:
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-xs px-2 py-0">Hoàn thành</Badge>
      case Status.PENDING:
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-xs px-2 py-0">Đang xử lý</Badge>
      case Status.FAILED:
        return <Badge className="bg-rose-500 hover:bg-rose-600 text-xs px-2 py-0">Thất bại</Badge>
      case Status.REFUNDED:
        return <Badge className="bg-sky-500 hover:bg-sky-600 text-xs px-2 py-0">Hoàn tiền</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  const getPaymentMethod = (method: string) => {
    switch (method) {
      case PaymentMethod.BANK_TRANSFER:
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100">
              <Wallet className="h-3 w-3 text-violet-600" />
            </div>
            <span className="text-xs">Chuyển khoản</span>
          </div>
        )
      case PaymentMethod.CREDIT_CARD:
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100">
              <CreditCard className="h-3 w-3 text-pink-600" />
            </div>
            <span className="text-xs">Thẻ tín dụng</span>
          </div>
        )
      case PaymentMethod.E_WALLET:
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100">
              <Wallet className="h-3 w-3 text-cyan-600" />
            </div>
            <span className="text-xs">Ví điện tử</span>
          </div>
        )
      case PaymentMethod.CASH:
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
              <Wallet className="h-3 w-3 text-amber-600" />
            </div>
            <span className="text-xs">Tiền mặt</span>
          </div>
        )
      default:
        return method
    }
  }

  const totalIncome = sampleTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = sampleTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-100 to-emerald-300 border-none shadow-md rounded-[8px]">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-700 font-medium text-xs">Tổng thu</CardDescription>
            <CardTitle className="text-xl text-emerald-700">{formatCurrency(totalIncome)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-emerald-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span className="text-xs">Tiền vào tài khoản</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-100 to-rose-300 border-none shadow-md rounded-[8px]">
          <CardHeader className="pb-2">
            <CardDescription className="text-rose-700 font-medium text-xs">Tổng chi</CardDescription>
            <CardTitle className="text-xl text-rose-700">{formatCurrency(totalExpense)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-rose-600">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span className="text-xs">Tiền ra khỏi tài khoản</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-indigo-300 border-none shadow-md rounded-[8px]">
          <CardHeader className="pb-2">
            <CardDescription className="text-indigo-700 font-medium text-xs">Số dư</CardDescription>
            <CardTitle className="text-xl text-indigo-700">{formatCurrency(balance)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-indigo-600">
              <Wallet className="h-3 w-3 mr-1" />
              <span className="text-xs">Tổng thu - Tổng chi</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-lg overflow-hidden rounded-[8px]">
        <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">Lịch sử giao dịch</CardTitle>
              <CardDescription className="text-violet-100 mt-1 text-xs">
                Xem lịch sử giao dịch của gói VIP
              </CardDescription>
            </div>
            <Button variant="secondary" className="bg-white text-violet-700 hover:bg-violet-100 text-xs h-8 px-3">
              Xuất Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4 h-9">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 text-xs"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 text-xs"
              >
                Tiền vào
              </TabsTrigger>
              <TabsTrigger
                value="expense"
                className="data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700 text-xs"
              >
                Tiền ra
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm giao dịch..."
                  className="pl-9 h-10 rounded-xl border-slate-200 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px] h-10 rounded-xl border-slate-200 pl-9 text-sm">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value={Status.COMPLETED}>Hoàn thành</SelectItem>
                      <SelectItem value={Status.PENDING}>Đang xử lý</SelectItem>
                      <SelectItem value={Status.FAILED}>Thất bại</SelectItem>
                      <SelectItem value={Status.REFUNDED}>Hoàn tiền</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                    <SelectTrigger className="w-[160px] h-10 rounded-xl border-slate-200 pl-9 text-sm">
                      <SelectValue placeholder="Phương thức" />
                    </SelectTrigger>
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <SelectContent>
                      <SelectItem value="all">Tất cả phương thức</SelectItem>
                      <SelectItem value={PaymentMethod.BANK_TRANSFER}>Chuyển khoản</SelectItem>
                      <SelectItem value={PaymentMethod.CREDIT_CARD}>Thẻ tín dụng</SelectItem>
                      <SelectItem value={PaymentMethod.E_WALLET}>Ví điện tử</SelectItem>
                      <SelectItem value={PaymentMethod.CASH}>Tiền mặt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-semibold text-xs">Ngày</TableHead>
                      <TableHead className="font-semibold text-xs">Mã giao dịch</TableHead>
                      <TableHead className="font-semibold text-xs">Mô tả</TableHead>
                      <TableHead className="font-semibold text-xs">Phương thức</TableHead>
                      <TableHead className="font-semibold text-xs">Trạng thái</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Số tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <TableRow
                          key={transaction.id}
                          className={cn(
                            "transition-colors hover:bg-slate-50 cursor-pointer",
                            index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                          )}
                        >
                          <TableCell className="flex items-center gap-2 text-xs py-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
                              <Calendar className="h-3 w-3 text-slate-600" />
                            </div>
                            {formatDate(transaction.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-slate-100 hover:bg-slate-200 font-mono text-xs px-2 py-0"
                            >
                              #{transaction.orderCode}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-xs">{transaction.description}</TableCell>
                          <TableCell>{getPaymentMethod(transaction.paymentMethod)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right font-medium">
                            <div className="flex items-center justify-end gap-1">
                              <div
                                className={cn(
                                  "flex items-center gap-1 px-2 py-0.5 rounded-full",
                                  transaction.amount > 0
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700",
                                )}
                              >
                                {transaction.amount > 0 ? (
                                  <ArrowUp className="h-3 w-3" />
                                ) : (
                                  <ArrowDown className="h-3 w-3" />
                                )}
                                <span className="font-semibold text-xs">
                                  {transaction.amount > 0 ? "+" : "-"} {formatCurrency(transaction.amount)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Search className="h-10 w-10 text-slate-300" />
                            <p className="text-slate-500 font-medium text-sm">Không tìm thấy giao dịch nào</p>
                            <p className="text-slate-400 text-xs">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="income" className="m-0">
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-emerald-50">
                    <TableRow>
                      <TableHead className="font-semibold text-xs">Ngày</TableHead>
                      <TableHead className="font-semibold text-xs">Mã giao dịch</TableHead>
                      <TableHead className="font-semibold text-xs">Mô tả</TableHead>
                      <TableHead className="font-semibold text-xs">Phương thức</TableHead>
                      <TableHead className="font-semibold text-xs">Trạng thái</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Số tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <TableRow
                          key={transaction.id}
                          className={cn(
                            "transition-colors hover:bg-emerald-50 cursor-pointer",
                            index % 2 === 0 ? "bg-white" : "bg-emerald-50/50",
                          )}
                        >
                          <TableCell className="flex items-center gap-2 text-xs py-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
                              <Calendar className="h-3 w-3 text-emerald-600" />
                            </div>
                            {formatDate(transaction.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-emerald-100 hover:bg-emerald-200 font-mono text-xs px-2 py-0"
                            >
                              #{transaction.orderCode}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-xs">{transaction.description}</TableCell>
                          <TableCell>{getPaymentMethod(transaction.paymentMethod)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right font-medium">
                            <div className="flex items-center justify-end gap-1">
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                <ArrowUp className="h-3 w-3" />
                                <span className="font-semibold text-xs">+ {formatCurrency(transaction.amount)}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Search className="h-10 w-10 text-slate-300" />
                            <p className="text-slate-500 font-medium text-sm">Không tìm thấy giao dịch nào</p>
                            <p className="text-slate-400 text-xs">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expense" className="m-0">
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-rose-50">
                    <TableRow>
                      <TableHead className="font-semibold text-xs">Ngày</TableHead>
                      <TableHead className="font-semibold text-xs">Mã giao dịch</TableHead>
                      <TableHead className="font-semibold text-xs">Mô tả</TableHead>
                      <TableHead className="font-semibold text-xs">Phương thức</TableHead>
                      <TableHead className="font-semibold text-xs">Trạng thái</TableHead>
                      <TableHead className="text-right font-semibold text-xs">Số tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <TableRow
                          key={transaction.id}
                          className={cn(
                            "transition-colors hover:bg-rose-50 cursor-pointer",
                            index % 2 === 0 ? "bg-white" : "bg-rose-50/50",
                          )}
                        >
                          <TableCell className="flex items-center gap-2 text-xs py-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100">
                              <Calendar className="h-3 w-3 text-rose-600" />
                            </div>
                            {formatDate(transaction.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-rose-100 hover:bg-rose-200 font-mono text-xs px-2 py-0"
                            >
                              #{transaction.orderCode}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-xs">{transaction.description}</TableCell>
                          <TableCell>{getPaymentMethod(transaction.paymentMethod)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right font-medium">
                            <div className="flex items-center justify-end gap-1">
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                                <ArrowDown className="h-3 w-3" />
                                <span className="font-semibold text-xs">- {formatCurrency(transaction.amount)}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Search className="h-10 w-10 text-slate-300" />
                            <p className="text-slate-500 font-medium text-sm">Không tìm thấy giao dịch nào</p>
                            <p className="text-slate-400 text-xs">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-slate-500">
              Hiển thị {transactions.length} trên tổng số {sampleTransactions.length} giao dịch
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="text-xs h-7 px-2">
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-violet-100 text-violet-700 border-violet-200 text-xs h-7 w-7 px-0"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-7 w-7 px-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

