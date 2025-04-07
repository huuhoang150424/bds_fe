"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuthModal } from "@/context/auth-modal"
import { LockKeyhole, UserPlus, LogIn } from "lucide-react"

interface RequireAuthModalProps {
  isOpen: boolean
  onClose: () => void
  actionType?: "save" | "comment" | "like" | "purchase" | "contact" | "warning" | "custom"
  customMessage?: string
  actionMessage?: string // Direct message to display
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

function RequireAuthModal({
  isOpen,
  onClose,
  actionType = "custom",
  customMessage,
  actionMessage,
  onLoginClick,
  onRegisterClick,
}: RequireAuthModalProps) {
  const { openModal } = useAuthModal()

  const getActionMessage = () => {
    if (actionMessage) return actionMessage

    switch (actionType) {
      case "warning":
        return "báo cáo tin đăng này"
      case "save":
        return "lưu sản phẩm này"
      case "comment":
        return "bình luận"
      case "like":
        return "thích bài viết này"
      case "purchase":
        return "thực hiện giao dịch"
      case "contact":
        return "liên hệ với người bán"
      case "custom":
      default:
        return customMessage || "thực hiện hành động này"
    }
  }

  const handleLoginClick = () => {
    onClose()
    if (onLoginClick) {
      onLoginClick()
    } else {
      openModal("login")
    }
  }

  const handleRegisterClick = () => {
    onClose()
    if (onRegisterClick) {
      onRegisterClick()
    } else {
      openModal("register")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="bg-red-50 p-3 rounded-full mb-4">
            <LockKeyhole className="h-8 w-8 text-[#E03C31]" />
          </div>
          <DialogTitle className="text-xl font-semibold">Yêu cầu đăng nhập</DialogTitle>
          <DialogDescription className="pt-2 text-center">Bạn cần đăng nhập để {getActionMessage()}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          <Button
            onClick={handleLoginClick}
            className="w-full bg-[#E03C31] hover:bg-[#FF837A] text-white font-semibold py-[15px] px-[15px] rounded-md"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Đăng nhập
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-300 w-full absolute"></div>
            <span className="bg-white px-2 text-sm text-gray-500 relative">Hoặc</span>
          </div>

          <Button
            variant="outline"
            onClick={handleRegisterClick}
            className="w-full border-gray-300 font-semibold py-[15px] px-[15px] rounded-md"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Đăng ký tài khoản mới
          </Button>
        </div>

        <DialogFooter className="flex justify-center sm:justify-center">
          <p className="text-sm text-gray-500 text-center">
            Bằng cách đăng nhập, bạn đồng ý với các điều khoản và điều kiện của chúng tôi.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RequireAuthModal

