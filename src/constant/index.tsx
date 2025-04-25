import { MdDashboard, MdOutlineArticle, MdImage, MdNotificationsNone } from 'react-icons/md';
import { FaUsers, FaNewspaper, FaGem, FaFolderOpen } from 'react-icons/fa6';
import { RiFeedbackLine } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const navItems: NavItem[] = [
  {
    icon: <MdDashboard size={22} />,
    name: 'Tổng quan',
    path: '/admin/dashboard',
  },
  {
    icon: <MdOutlineArticle size={22} />,
    name: 'Bài đăng',
    subItems: [{ name: 'Danh sách bài đăng', path: '/admin/post', pro: false }],
  },
  {
    icon: <FaUsers size={22} />,
    name: 'Người dùng',
    subItems: [{ name: 'Danh sách người dùng', path: '/admin/user', pro: false }],
  },
  {
    icon: <RiFeedbackLine size={22} />,
    name: 'Phản hồi người dùng',
    subItems: [{ name: 'Danh sách báo cáo', path: '/admin/reports', pro: false }],
  },
  {
    icon: <FaNewspaper size={22} />,
    name: 'Tin tức',
    subItems: [
      { name: 'Danh sách bài viết', path: '/admin/news', pro: false },
      { name: 'Thêm bài viết', path: '/admin/create-news', pro: false }
    ],
  },
  {
    icon: <FaGem size={22} />,
    name: 'Gói Vip',
    subItems: [{ name: 'Danh sách gói vip', path: '/admin/pricing', pro: false }],
  },
  {
    icon: <BiCategory size={22} />,
    name: 'Danh mục bất động sản',
    subItems: [{ name: 'Danh sách danh mục', path: '/admin/categories', pro: false }],
  },
  {
    icon: <MdNotificationsNone size={22} />,
    name: 'Quản lý thông báo',
    subItems: [{ name: 'Danh sách thông báo', path: '/admin/notifications', pro: false }],
  },
  {
    icon: <MdImage size={22} />,
    name: 'Banner',
    subItems: [
      { name: 'Danh sách banner', path: '/admin/banner', pro: false },
      { name: 'Tạo mới banner', path: '/admin/create-banner', pro: false }
    ],
  },
];
