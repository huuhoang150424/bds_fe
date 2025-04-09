export type News = {
    id: string
    title: string
    author: string
    category: string
    createdAt: string
  }

export const news: News[] = [
  {
    id: "n1",
    title: "Ra mắt sản phẩm mới - Điện thoại XYZ Pro",
    author: "Admin",
    category: "Công nghệ",
    createdAt: "2023-03-10",
  },
  {
    id: "n2",
    title: "Cập nhật chính sách bảo mật người dùng",
    author: "Admin",
    category: "Thông báo",
    createdAt: "2023-03-12",
  },
  {
    id: "n3",
    title: "Sự kiện ra mắt sản phẩm sẽ diễn ra vào ngày 20/4",
    author: "Admin",
    category: "Sự kiện",
    createdAt: "2023-03-15",
  },
  {
    id: "n4",
    title: "Hướng dẫn sử dụng tính năng mới trên ứng dụng",
    author: "Admin",
    category: "Hướng dẫn",
    createdAt: "2023-03-18",
  },
  {
    id: "n5",
    title: "Chương trình khuyến mãi tháng 4/2023",
    author: "Admin",
    category: "Khuyến mãi",
    createdAt: "2023-03-20",
  },
  {
    id: "n6",
    title: "Thông báo bảo trì hệ thống ngày 25/3/2023",
    author: "Admin",
    category: "Thông báo",
    createdAt: "2023-03-22",
  },
  {
    id: "n7",
    title: "Tuyển dụng vị trí Nhân viên Marketing",
    author: "Admin",
    category: "Tuyển dụng",
    createdAt: "2023-03-25",
  },
]


export type Post = {
    id: string
    title: string
    author: string
    status: "pending" | "approved" | "rejected"
    createdAt: string
  }


  export const posts: Post[] = [
    {
      id: "p1",
      title: "Cách làm bánh mì sandwich ngon tại nhà",
      author: "Nguyễn Văn A",
      status: "approved",
      createdAt: "2023-03-15",
    },
    {
      id: "p2",
      title: "10 địa điểm du lịch đẹp nhất Việt Nam",
      author: "Trần Thị B",
      status: "pending",
      createdAt: "2023-03-16",
    },
    {
      id: "p3",
      title: "Hướng dẫn chăm sóc cây cảnh trong nhà",
      author: "Lê Văn C",
      status: "approved",
      createdAt: "2023-03-17",
    },
    {
      id: "p4",
      title: "Bí quyết giữ dáng của các ngôi sao",
      author: "Phạm Thị D",
      status: "rejected",
      createdAt: "2023-03-18",
    },
    {
      id: "p5",
      title: "Cách tiết kiệm điện trong mùa hè",
      author: "Hoàng Văn E",
      status: "pending",
      createdAt: "2023-03-19",
    },
    {
      id: "p6",
      title: "Những món ăn đặc sản miền Trung",
      author: "Ngô Thị F",
      status: "approved",
      createdAt: "2023-03-20",
    },
    {
      id: "p7",
      title: "Kinh nghiệm mua nhà lần đầu",
      author: "Đỗ Văn G",
      status: "pending",
      createdAt: "2023-03-21",
    },
    {
      id: "p8",
      title: "Cách chọn giày thể thao phù hợp",
      author: "Vũ Thị H",
      status: "approved",
      createdAt: "2023-03-22",
    },
  ]


  export type Report = {
    id: string
    postId: string
    postTitle: string
    reporter: string
    reason: string
    createdAt: string
  }

  export const reports: Report[] = [
    {
      id: "r1",
      postId: "p4",
      postTitle: "Bí quyết giữ dáng của các ngôi sao",
      reporter: "Nguyễn Văn X",
      reason: "Nội dung không chính xác, quảng cáo sản phẩm không rõ nguồn gốc",
      createdAt: "2023-03-18",
    },
    {
      id: "r2",
      postId: "p2",
      postTitle: "10 địa điểm du lịch đẹp nhất Việt Nam",
      reporter: "Trần Thị Y",
      reason: "Hình ảnh sử dụng không được cấp phép, vi phạm bản quyền",
      createdAt: "2023-03-17",
    },
    {
      id: "r3",
      postId: "p7",
      postTitle: "Kinh nghiệm mua nhà lần đầu",
      reporter: "Lê Văn Z",
      reason: "Nội dung quảng cáo trá hình cho công ty bất động sản",
      createdAt: "2023-03-21",
    },
    {
      id: "r4",
      postId: "p5",
      postTitle: "Cách tiết kiệm điện trong mùa hè",
      reporter: "Phạm Thị W",
      reason: "Thông tin sai lệch về cách sử dụng thiết bị điện",
      createdAt: "2023-03-20",
    },
    {
      id: "r5",
      postId: "p1",
      postTitle: "Cách làm bánh mì sandwich ngon tại nhà",
      reporter: "Hoàng Văn V",
      reason: "Công thức không chính xác, nhiều người làm theo bị hỏng",
      createdAt: "2023-03-16",
    },
  ]

  export type UserAdmin = {
    id: string
    name: string
    email: string
    status: "active" | "locked"
    createdAt: string
  }


  export const users: UserAdmin[] = [
    {
      id: "u1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "u2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      status: "active",
      createdAt: "2023-01-20",
    },
    {
      id: "u3",
      name: "Lê Văn C",
      email: "levanc@example.com",
      status: "locked",
      createdAt: "2023-01-25",
    },
    {
      id: "u4",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      status: "active",
      createdAt: "2023-02-01",
    },
    {
      id: "u5",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      status: "active",
      createdAt: "2023-02-05",
    },
    {
      id: "u6",
      name: "Ngô Thị F",
      email: "ngothif@example.com",
      status: "locked",
      createdAt: "2023-02-10",
    },
    {
      id: "u7",
      name: "Đỗ Văn G",
      email: "dovang@example.com",
      status: "active",
      createdAt: "2023-02-15",
    },
    {
      id: "u8",
      name: "Vũ Thị H",
      email: "vuthih@example.com",
      status: "active",
      createdAt: "2023-02-20",
    },
    {
      id: "u9",
      name: "Bùi Văn I",
      email: "buivani@example.com",
      status: "active",
      createdAt: "2023-02-25",
    },
    {
      id: "u10",
      name: "Lý Thị K",
      email: "lythik@example.com",
      status: "locked",
      createdAt: "2023-03-01",
    },
  ]
  
  
