// quickStatistics.ts

// Định nghĩa interface cho từng mục dữ liệu
interface StatisticItem {
    category : String;
    lastMonth: number;
    currentMonth: number;
  }
  
  // Định nghĩa kiểu cho toàn bộ object
  interface QuickStatistics {
    post: StatisticItem;
    view: StatisticItem;
    contact: StatisticItem;
    accountMoney: StatisticItem;
  }
  
  // Dữ liệu
  export const quickStatistics: QuickStatistics = {
    post: {
        category: 'bài đăng',
      lastMonth: 50,
      currentMonth: 30,
    },
    view: {
        category: 'Lượt xem',
      lastMonth: 1000,
      currentMonth: 1200,
    },
    contact: {
        category: 'Liên hệ',
      lastMonth: 500,
      currentMonth: 800,
    },
    accountMoney: {
        category: 'Tài chính',
      lastMonth: 2000000,
      currentMonth: 120000,
    },
  };

  interface Property {
    id: number;
    title: string;
    type: string;
    price: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
  }
  
  // Dữ liệu mẫu
export  const featuredProperties: Property[] = [
    {
      id: 1,
      title: "Căn hộ Landmark 81",
      type: "Căn hộ",
      price: "8.5 tỷ",
      address: "720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM",
      bedrooms: 3,
      bathrooms: 2,
      area: 95,
      image: "https://th.bing.com/th/id/R.4fc648e68cec720d7e930e9f58c74c89?rik=cevQZuCie%2b4zhw&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      title: "Biệt thự Thảo Điền",
      type: "Biệt thự",
      price: "35 tỷ",
      address: "Đường Nguyễn Văn Hưởng, Phường Thảo Điền, Quận 2, TP.HCM",
      bedrooms: 5,
      bathrooms: 5,
      area: 350,
      image: "https://th.bing.com/th/id/R.4fc648e68cec720d7e930e9f58c74c89?rik=cevQZuCie%2b4zhw&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      title: "Nhà phố Phú Nhuận",
      type: "Nhà phố",
      price: "15 tỷ",
      address: "Đường Phan Xích Long, Phường 7, Phú Nhuận, TP.HCM",
      bedrooms: 4,
      bathrooms: 3,
      area: 120,
      image: "https://th.bing.com/th/id/R.4fc648e68cec720d7e930e9f58c74c89?rik=cevQZuCie%2b4zhw&pid=ImgRaw&r=0",
    },
  ];