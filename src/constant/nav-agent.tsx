
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
          url: "draft-post",
        },
        {
          title: "Quản lí bài đăng",
          url: "manage-post",
        },
      ],
    },
    {
      title: "Khách hàng",
      url: "",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Quản lí khách hàng",
          url: "customer-infor",
        },
      ],
    },
    {
      title: "Tài khoản cá nhân",
      url: "profile",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Thông tin cá nhân",
          url: "profile",
        },
        {
          title: "Chỉnh sửa thông tin cá nhân",
          url: "manage-account",
        },
        {
          title: "Tài chính cá nhân",
          url: "finance",
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
          url: "statistical",
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

  ]
  
}
