import Overview from "@/screen/agent/overview";
import {
  Frame,
  SquareTerminal,
  LayoutDashboard
} from "lucide-react";
export const data = {
  overview: [
    {
      name: "Tổng quan",
      url: 'overview',
      item:[],
      icon: LayoutDashboard
    }
  ],
  navMain: [
    {
      title: "Bài đăng",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Tạo mới bài đăng",
          url: "create-post",
        },
        {
          title: "Bài đăng nháp",
          url: "#",
        },
        {
          title: "Quản lí bài đăng",
          url: "#",
        },
      ],
    },
    {
      title: "Khách hàng",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        
      ],
    },
    {
      title: "Tài khoản cá nhân",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Chỉnh sửa thông tin cá nhân",
          url: "#",
        },
        {
          title: "Tài chính cá nhân",
          url: "#",
        },
        
      ],
    },
    {
      title: "Thống kê",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Thống kê lượng người xem",
          url: "#",
        },
        
      ],
    },
    {
      title: "Gói hội viên",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Đăng ký mua",
          url: "vip",
        },
      ],
    },

  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    }
  ],
  
}
