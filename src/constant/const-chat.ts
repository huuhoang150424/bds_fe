// types/chat.ts
export interface Conversation {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastMessage: string;
    time: string;
    unread?: boolean;
    isActive?: boolean;
  }
  
  export interface Message {
    id: number;
    sender: string;
    content: string;
    time: string;
    isUser: boolean;
  }
  
  export type Messages = {
    [key: string]: Message[];
  };

 export  const conversations = [
    {
      id: 'hoang',
      name: 'Tài, Hoàng',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'online',
      lastMessage: 'Cuộc gọi đang diễn ra',
      time: '1 giờ',
      unread: false,
      isActive: true,
    },
    {
      id: 'wuynh',
      name: 'Wuynh Wuynh',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'offline',
      lastMessage: 'Đã bày tỏ cảm xúc 😮 về tin nhắn',
      time: '2 giờ',
      unread: false,
      isActive: false,
    },
    {
      id: 'nguyen',
      name: 'Nguyễn Hữu Hoàng',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'online',
      lastMessage: 'nay 18 rồi',
      time: '2 giờ',
      unread: true,
      isActive: false,
    },
    {
      id: 'son',
      name: 'Hoàng Sơn',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'offline',
      lastMessage: 'Tin nhắn và cuộc gọi được bảo mật',
      time: '13 giờ',
      unread: false,
      isActive: false,
    },
    {
      id: 'giac',
      name: 'Giấc đói 🍔🍔',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'online',
      lastMessage: 'Người thân thiện nhất nhóm',
      time: '15 giờ',
      unread: false,
      isActive: false,
    },
    {
      id: 'vu',
      name: 'Vũ Đình C. Hải',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'online',
      lastMessage: 'dcu',
      time: '15 giờ',
      unread: false,
      isActive: false,
    },
    {
      id: 'thong',
      name: 'Vũ Hữu Thông',
      avatar: '/placeholder.svg?height=40&width=40',
      status: 'offline',
      lastMessage: 'Tí đi ăn cx Sáng',
      time: '18 giờ',
      unread: false,
      isActive: false,
    },
  ];
  
  export const messages = {
    hoang: [
      {
        id: 1,
        sender: 'Nguyễn Hữu Hoàng',
        content: 'File phương tiện',
        time: '',
        isUser: false,
      },
      {
        id: 2,
        sender: 'Hoàng',
        content: 'Im ắng thí',
        time: '',
        isUser: false,
      },
      {
        id: 3,
        sender: 'Hoàng',
        content: 'Tài đag ốm thì p',
        time: '',
        isUser: false,
      },
      {
        id: 4,
        sender: 'Hoàng',
        content: 'rảnh chưa',
        time: '12:22',
        isUser: false,
      },
      {
        id: 5,
        sender: 'Hoàng',
        content: 'họp tí nhỉ',
        time: '',
        isUser: false,
      },
      {
        id: 6,
        sender: 'Tài',
        content: 'Chưa',
        time: '12:51',
        isUser: true,
      },
      {
        id: 7,
        sender: 'Hoàng',
        content: '1r nhé',
        time: '',
        isUser: false,
      },
      {
        id: 8,
        sender: 'You',
        content: 'đang pha cà phê',
        time: '',
        isUser: true,
      },
      {
        id: 9,
        sender: 'You',
        content: 'đang pha cà phê ở nhà',
        time: '',
        isUser: true,
      },
      
      
      
  
    ],
  };