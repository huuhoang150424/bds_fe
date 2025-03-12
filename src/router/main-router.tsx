import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/screen/user/home";

import SellDetail from "@/screen/user/sellDetails";
import { AuthModalProvider } from "@/context/auth-modal";

import News from "@/screen/user/news/index";

import NotFoundScreen from "@/screen/user/NotFoundScreen";



export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/df' element={<Home />} />
          <Route path='/sd' element={<SellDetail/>} />

          <Route path='/' element={<News/>} />

          <Route path='*' element={<NotFoundScreen/>} />

        </Route>
      </Routes>
    </AuthModalProvider>
  )
}



