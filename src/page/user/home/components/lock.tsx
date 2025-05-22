"use client"

import { useState } from "react"
import { AlertTriangle, Lock, Mail, Phone, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import LoginScreen from "@/page/auth/page/login"

export default function LockedAccountModal() {
  const [open, setOpen] = useState(true)

  const signOut = () => {
    
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        // Prevent closing the dialog by clicking outside or pressing escape
        if (open === true && newOpen === false) {
          return
        }
        setOpen(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="flex flex-col items-center gap-1">
          <div className="rounded-full bg-red-100 p-3 mb-2">
            <Lock className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl text-center">Tài khoản của bạn đã bị khóa</DialogTitle>
          <DialogDescription className="text-center">
            Tài khoản của bạn đã tạm thời bị khóa vì lý do bảo mật hoặc vi phạm điều khoản sử dụng.
            <p className="mt-2 font-medium text-red-600">Bạn chỉ có thể đăng xuất khỏi tài khoản này.</p>
          </DialogDescription>
        </DialogHeader>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-2">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              Việc khóa tài khoản có thể do một trong các lý do sau:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nhiều lần đăng nhập thất bại</li>
                <li>Hoạt động đáng ngờ được phát hiện</li>
                <li>Vi phạm điều khoản dịch vụ</li>
                <li>Yêu cầu từ chủ tài khoản</li>
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="destructive" className="flex-1" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Button>
            {/* <Button className="flex-1 bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-4 w-4" />
              Liên hệ hỗ trợ
            </Button>
            <Button variant="secondary" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Xác minh
            </Button> */}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
