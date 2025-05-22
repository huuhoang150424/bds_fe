//@ts-nocheck
import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Bell } from "lucide-react"
import confetti from "canvas-confetti"

const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
})

export function EmailSubscription() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Hiệu ứng pháo giấy ngắn gọn khi đăng ký thành công
    const btn = document.querySelector("button[type='submit']")
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x, y },
        colors: ["#ff0000", "#ff3333", "#ff6666"],
        ticks: 150,
      })
    }

    toast({
      title: "Đăng ký thành công!",
      description: "Cảm ơn bạn đã đăng ký nhận tin từ chúng tôi.",
    })

    form.reset()
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-red-800 to-red-700 text-white relative overflow-hidden">
      {/* Thêm các hình trang trí */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/3 right-10 w-20 h-20 bg-red-500 rounded-full opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full w-fit mx-auto mb-6">
            <Bell className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng ký nhận tin</h2>
          <p className="text-sm md:text-base mb-8 text-white/90">
            Đăng ký để nhận thông tin mới nhất về các dự án bất động sản, tin tức thị trường và các ưu đãi đặc biệt.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Nhập email của bạn"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-white/90" />
                  </FormItem>
                )}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="secondary"
                  className="whitespace-nowrap h-12 px-6 bg-white text-red-700 hover:bg-white/90 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Đang đăng ký...
                    </span>
                  ) : (
                    "Đăng ký ngay"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <p className="text-xs mt-4 text-white/70">
            Chúng tôi tôn trọng quyền riêng tư của bạn và sẽ không chia sẻ thông tin với bên thứ ba.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
