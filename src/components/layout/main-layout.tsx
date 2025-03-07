import React from 'react';
import Footer from '@/components/user/footer';
import Header from '@/components/user/header';
import { Outlet } from 'react-router-dom';
import AuthModal from './auth-modal';

const MainLayout: React.FC = () => {
  return (
    <div className="">
      <Header />
      <AuthModal />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default MainLayout;