"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, ImagePlus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Direction, DraftPost, PostDraftStatus } from "@/constant/const-draft-post"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  address: z.string().min(10, "Địa chỉ phải có ít nhất 10 ký tự"),
  price: z.coerce.number().positive("Giá phải là số dương"),
  square_meters: z.coerce.number().positive("Diện tích phải là số dương"),
  description: z.string().min(20, "Mô tả phải có ít nhất 20 ký tự"),
  floor: z.coerce.number().nonnegative("Tầng phải là số không âm"),
  bedroom: z.coerce.number().nonnegative("Số phòng ngủ phải là số không âm"),
  bathroom: z.coerce.number().nonnegative("Số phòng tắm phải là số không âm"),
  isFurniture: z.boolean(),
  direction: z.string(),
  expiredDate: z.date(),
  priority: z.coerce.number().min(0).max(3, "Độ ưu tiên phải từ 0 đến 3"),
  status: z.string(),
})

// Infer form values type from schema
type FormValues = z.infer<typeof formSchema>

// Define component props
interface DraftPostEditFormProps {
  post: DraftPost
  onSave: (post: DraftPost) => void
}

export function DraftPostEditForm({ post, onSave }: DraftPostEditFormProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("basic")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      address: post.address,
      price: post.price,
      square_meters: post.square_meters,
      description: post.description,
      floor: post.floor,
      bedroom: post.bedroom,
      bathroom: post.bathroom,
      isFurniture: post.isFurniture,
      direction: post.direction,
      expiredDate: new Date(post.expiredDate),
      priority: post.priority,
      status: post.status,
    },
  })

  const onSubmit = (values: FormValues) => {
    setIsSaving(true)

    // Create updated post object
    const updatedPost: DraftPost = {
      ...post,
      ...values,
      direction: values.direction as Direction, // Ensure direction is of type Direction
      status: values.status as PostDraftStatus, // Ensure status is of type PostDraftStatus
      expiredDate: values.expiredDate.toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Simulate API call
    setTimeout(() => {
      onSave(updatedPost)
      setIsSaving(false)
    }, 1000)
  }

  const directions: Direction[] = [
    "Bắc",
    "Nam",
    "Đông",
    "Tây",
    "Đông Bắc",
    "Đông Nam",
    "Tây Bắc",
    "Tây Nam",
  ]

  const statuses: PostDraftStatus[] = [
    "draft",
    "pending",
    "published",
    "rejected",
    "expired",
  ]

  const statusLabels: Record<PostDraftStatus, string> = {
    draft: "Nháp",
    pending: "Đang chờ",
    published: "Đã đăng",
    rejected: "Từ chối",
    expired: "Hết hạn",
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="details">Chi tiết</TabsTrigger>
            <TabsTrigger value="media">Hình ảnh & Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề bất động sản" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá (VND)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Nhập giá" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nhập giá bằng VND, không cần nhập dấu phẩy
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập địa chỉ đầy đủ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả chi tiết về bất động sản"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="square_meters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diện tích (m²)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Diện tích" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số phòng ngủ</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Số phòng ngủ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số phòng tắm</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Số phòng tắm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tầng</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Tầng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hướng</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hướng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {directions.map((direction) => (
                          <SelectItem key={direction} value={direction}>
                            {direction}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFurniture"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Có nội thất</FormLabel>
                      <FormDescription>
                        Bất động sản đã được trang bị nội thất
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="expiredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày hết hạn</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: vi })
                            ) : (
                              <span>Chọn ngày</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Độ ưu tiên</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn độ ưu tiên" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Thấp</SelectItem>
                        <SelectItem value="1">Trung bình</SelectItem>
                        <SelectItem value="2">Cao</SelectItem>
                        <SelectItem value="3">Rất cao</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {statusLabels[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg">
                  <ImagePlus className="w-10 h-10 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Kéo và thả hình ảnh vào đây hoặc nhấp để tải lên
                  </p>
                  <Button variant="outline" className="mt-2">
                    Chọn hình ảnh
                  </Button>
                </div>
                <Alert className="mt-4">
                  <AlertDescription>
                    Tính năng tải lên hình ảnh chưa được triển khai trong demo này.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Link to="/draft-post">
            <Button variant="outline" type="button">
              Hủy
            </Button>
          </Link>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}