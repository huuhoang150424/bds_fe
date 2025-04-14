import React from 'react';
import Footer from '@/components/user/footer';
import Header from '@/components/user/header';
import { Outlet } from 'react-router-dom';
import AuthModal from './auth-modal';
import RealEstateChat from '@/page/user/chat/real-estate-chat';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AuthModal />
      <RealEstateChat />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout;