import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/screen/user/home";
import SellDetail from "@/screen/user/sellDetails";
import { AuthModalProvider } from "@/context/auth-modal";
import News from "@/screen/user/news/index";
import NotFoundScreen from "@/screen/user/NotFoundScreen";
import PostDetail from "@/screen/user/postDetail";
// import Profile from "@/screen/user/profile";



export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>


          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SellDetail/>} />
          <Route path='/new' element={<News/>} />
          <Route path='/productDetail/:id' element={<PostDetail/>} />

          <Route path='*' element={<NotFoundScreen/>} />
        </Route>
      </Routes>
    </AuthModalProvider>
  )
}



