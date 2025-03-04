import React from 'react';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/header';

interface Props {
  children: React.ReactNode
}

export default function MainLayout({children}:Props) {
  return (
    <div className="">
      <Header/>
      <main className="">
        {children}
      </main>
      <Footer/>
    </div>
  )
}
