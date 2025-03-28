import { MdDashboard } from 'react-icons/md';
import { MdOutlineArticle } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const navItems: NavItem[] = [
  {
    icon: <MdDashboard size={24} />,
    name: 'Tổng quan',
    path: '/admin/dashboard',
  },
  {
    icon: <MdOutlineArticle size={24} />,
    name: 'Bài đăng',
    subItems: [{ name: 'Danh sách bài đăng', path: '/admin/post', pro: false }],
  },
  {
    icon: <FaUsers size={24} />,
    name: 'Người dùng',
   
    subItems: [{ name: 'Danh sách người dùng', path: '/admin/user', pro: false }],
  },
  {
    icon: <FaUsers size={24} />,
    name: 'Reports',
   
    subItems: [{ name: 'Danh sách báo cáo', path: '/admin/reports', pro: false }],
  },
  {
    icon: <FaUsers size={24} />,
    name: 'Tin tức',
   
    subItems: [{ name: 'Danh sách bài viết', path: '/admin/news', pro: false }],
  },
];
