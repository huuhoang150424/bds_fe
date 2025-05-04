import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronRight, CheckCircle2, Shield, Activity, CreditCard, User, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"



function FloatingParticle({ color }:any) {
  const size = Math.random() * 4 + 2
  const initialX = Math.random() * 100
  const initialY = Math.random() * 100
  const duration = Math.random() * 15 + 10

  return (
    <motion.div
      className={`absolute rounded-full ${color} opacity-20`}
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, Math.random() * 20 - 10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

export default function Conditions({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [activeTab, setActiveTab] = useState("account")
  const [hoveredCard, setHoveredCard] = useState(null)

  const tabs = [
    { id: "account", label: "Tài khoản", icon: <Shield className="h-4 w-4" />, color: "from-red-300 to-red-400" },
    {
      id: "activity",
      label: "Hoạt động",
      icon: <Activity className="h-4 w-4" />,
      color: "from-rose-300 to-rose-400",
    },
    {
      id: "financial",
      label: "Tài chính",
      icon: <CreditCard className="h-4 w-4" />,
      color: "from-pink-300 to-pink-400",
    },
    { id: "profile", label: "Hồ sơ", icon: <User className="h-4 w-4" />, color: "from-red-200 to-rose-300" },
  ]

  const conditions = {
    account: [
      { id: 1, name: "Đã xác minh SĐT & Email" },
      { id: 2, name: "Không bị khóa tài khoản" },
      { id: 3, name: "Có ít nhất 1 giao dịch nạp tiền" },
      { id: 4, name: "Số dư tối thiểu 500,000 VNĐ" },
    ],
    activity: [
      { id: 5, name: "Đã đăng ít nhất 20 bài viết" },
      { id: 6, name: "Bài viết có tỷ lệ duyệt >80%" },
      { id: 7, name: "Có ít nhất 10 comment từ người khác" },
      { id: 8, name: "Điểm đánh giá trung bình ≥ 4.0/5" },
    ],
    financial: [
      { id: 9, name: "Mua gói Vip 1 tháng" },
      { id: 10, name: "Nạp 1 triệu VNĐ vào ví" },
      { id: 11, name: "Thanh toán phí đăng ký 500K" },
    ],
    profile: [
      { id: 12, name: "Đã điền giới thiệu bản thân" },
      { id: 13, name: "Có ảnh đại diện cá nhân" },
      { id: 14, name: "Cung cấp số năm kinh nghiệm" },
    ],
  }
  const onRegister=()=>{}
  const getTabColor = (id:any) => {
    const tab = tabs.find((t) => t.id === id)
    return tab ? tab.color : ""
  }

  const getTabBgColor = (id:any) => {
    switch (id) {
      case "account":
        return "bg-gradient-to-r from-red-300 to-red-400"
      case "activity":
        return "bg-gradient-to-r from-rose-300 to-rose-400"
      case "financial":
        return "bg-gradient-to-r from-pink-300 to-pink-400"
      case "profile":
        return "bg-gradient-to-r from-red-200 to-rose-300"
      default:
        return "bg-gradient-to-r from-red-300 to-red-400"
    }
  }

  // Generate particles for background
  const particles = []
  for (let i = 0; i < 20; i++) {
    particles.push(<FloatingParticle key={i} color="bg-red-300" />)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0">
        <div className="bg-gradient-to-r from-red-300 via-red-400 to-rose-300 p-5 text-white relative overflow-hidden">
          {particles}
          <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute bottom-0 left-10 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
          <DialogTitle className="text-center text-lg font-medium">✨ Điều Kiện Đăng Ký ✨</DialogTitle>
          <p className="text-xs text-center mt-1 text-white/90">Vui lòng đáp ứng các điều kiện sau để đăng ký</p>
        </div>

        <div className="grid grid-cols-4 bg-gray-50 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 text-xs transition-all relative",
                activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-700",
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 ${getTabBgColor(tab.id)}`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={cn(
                    "p-1.5 rounded-full mb-1",
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500",
                  )}
                >
                  {tab.icon}
                </div>
                <span className={activeTab === tab.id ? "text-white" : ""}>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {conditions[activeTab].map((condition, index) => (
                <motion.div
                  key={condition.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative"
                  onMouseEnter={() => setHoveredCard(condition.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-r ${getTabColor(activeTab)} opacity-5`}
                  ></div>
                  <motion.div
                    className="relative p-3 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    animate={{
                      scale: hoveredCard === condition.id ? 1.02 : 1,
                      y: hoveredCard === condition.id ? -2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${getTabColor(activeTab)}`}
                    ></div>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-50"></div>

                    <div className="flex items-center">
                      <motion.div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3 shadow-sm",
                          `bg-gradient-to-r ${getTabColor(activeTab)}`,
                        )}
                        animate={{
                          rotate: hoveredCard === condition.id ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: hoveredCard === condition.id ? Number.POSITIVE_INFINITY : 0,
                          repeatDelay: 1,
                        }}
                      >
                        {condition.id}
                      </motion.div>
                      <p className="text-xs font-medium text-gray-800">{condition.name}</p>

                      {hoveredCard === condition.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="ml-auto"
                        >
                          <Sparkles className="h-3 w-3 text-red-300" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-300 via-red-400 to-rose-300 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Button
              onClick={onRegister}
              className="relative w-full bg-gradient-to-r from-red-400 via-red-500 to-rose-400 hover:from-red-500 hover:via-red-600 hover:to-rose-500 text-white text-sm rounded-md py-5"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full"></span>
              <motion.span
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Đăng Ký Ngay
              </motion.span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}