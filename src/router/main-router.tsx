import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/screen/user/home/Home";

import SellDetail from "@/screen/user/sellDetails/sellDetail";

import { AuthModalProvider } from "@/context/auth-modal";


export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>

        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/' element={<SellDetail/>} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>

      </Routes>
    </AuthModalProvider>
  )
}
