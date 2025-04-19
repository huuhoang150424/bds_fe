
import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import useScrollToTopOnMount from "@/hooks/use-scroll-top"

// Mock data for transactions
const allTransactions = [
  {
    id: "1",
    date: "2023-08-25",
    description: "Đăng tin nhà phố Quận 7",
    amount: -250000,
    status: "completed",
    type: "listing",
  },
  {
    id: "2",
    date: "2023-08-23",
    description: "Nạp tiền vào tài khoản",
    amount: 2000000,
    status: "completed",
    type: "deposit",
  },
  {
    id: "3",
    date: "2023-08-20",
    description: "Gia hạn tin đăng căn hộ Quận 2",
    amount: -150000,
    status: "completed",
    type: "renewal",
  },
  {
    id: "4",
    date: "2023-08-18",
    description: "Đẩy tin lên trang chủ",
    amount: -350000,
    status: "completed",
    type: "promotion",
  },
  {
    id: "5",
    date: "2023-08-15",
    description: "Hoàn tiền tin đăng bị từ chối",
    amount: 250000,
    status: "completed",
    type: "refund",
  },
  {
    id: "6",
    date: "2023-08-12",
    description: "Đăng tin biệt thự Quận 9",
    amount: -300000,
    status: "completed",
    type: "listing",
  },
  {
    id: "7",
    date: "2023-08-10",
    description: "Nạp tiền vào tài khoản",
    amount: 3000000,
    status: "completed",
    type: "deposit",
  },
  {
    id: "8",
    date: "2023-08-05",
    description: "Đăng tin nhà mặt phố Quận 1",
    amount: -500000,
    status: "completed",
    type: "listing",
  },
  {
    id: "9",
    date: "2023-08-03",
    description: "Gia hạn gói dịch vụ Premium",
    amount: -1200000,
    status: "completed",
    type: "subscription",
  },
  {
    id: "10",
    date: "2023-08-01",
    description: "Đẩy tin lên trang chủ",
    amount: -350000,
    status: "completed",
    type: "promotion",
  },
  {
    id: "11",
    date: "2023-07-28",
    description: "Đăng tin căn hộ Quận 4",
    amount: -200000,
    status: "completed",
    type: "listing",
  },
  {
    id: "12",
    date: "2023-07-25",
    description: "Nạp tiền vào tài khoản",
    amount: 5000000,
    status: "completed",
    type: "deposit",
  },
]

interface RecentTransactionsProps {
  showAll?: boolean
}

export function Finance({ showAll = false }: RecentTransactionsProps) {
  useScrollToTopOnMount();
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionType, setTransactionType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter transactions based on search term and type
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = transactionType === "all" || transaction.type === transactionType
    return matchesSearch && matchesType
  })

  // Get transactions for current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)

  // Display only recent transactions if not showing all
  const displayTransactions = showAll ? currentTransactions : allTransactions.slice(0, 5)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN").format(date)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="max-w-[1800px] mt-[60px] mx-auto space-y-4">
      {showAll && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm giao dịch..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Loại giao dịch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="deposit">Nạp tiền</SelectItem>
              <SelectItem value="listing">Đăng tin</SelectItem>
              <SelectItem value="renewal">Gia hạn</SelectItem>
              <SelectItem value="promotion">Đẩy tin</SelectItem>
              <SelectItem value="refund">Hoàn tiền</SelectItem>
              <SelectItem value="subscription">Gói dịch vụ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày</TableHead>
              <TableHead className="hidden md:table-cell">Mã giao dịch</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="text-right">Số tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTransactions.length > 0 ? (
              displayTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell className="hidden md:table-cell">{transaction.id}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {transaction.amount > 0 ? (
                        <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      <span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Không tìm thấy giao dịch nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showAll && filteredTransactions.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredTransactions.length / itemsPerPage) }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(index + 1)
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < Math.ceil(filteredTransactions.length / itemsPerPage)) {
                    setCurrentPage(currentPage + 1)
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

