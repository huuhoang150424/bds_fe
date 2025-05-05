
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
          title: "Quản lí bài đăng nháp",
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
          title: "Quản lí lịch hẹn khách hàng",
          url: "customer-infor",
        },
        {
          title: "Nhắn tin",
          url: "chat",
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
        {
          title: "Gói đã mua",
          url: "my-pricing",
        },
      ],
    },
    

  ]
  
}
