import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/screen/user/home/Home";

import SellDetail from "@/screen/user/sellDetails/sellDetail";

import { AuthModalProvider } from "@/context/auth-modal";
import News from "@/screen/user/news/index";


export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>

        {/* <Route path='/' element={<Home/>} /> */}
        

        <Route element={<MainLayout />}>
          <Route path='/df' element={<Home />} />
          <Route path='/sd' element={<SellDetail/>} />
          <Route path='/' element={<News/>} />
        </Route>

      </Routes>
    </AuthModalProvider>
  )
}



