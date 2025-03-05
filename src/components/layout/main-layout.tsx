import React from 'react';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/header';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC=()=> {
  return (
    <div className="">
      <Header/>
      <main className="">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
export default MainLayout;