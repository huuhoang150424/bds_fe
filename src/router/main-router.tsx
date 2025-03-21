import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/screen/user/home";
import SellDetail from "@/screen/user/sellDetails";
import { AuthModalProvider } from "@/context/auth-modal";
import News from "@/screen/user/news/index";
import NotFoundScreen from "@/screen/user/NotFoundScreen";
import PostDetail from "@/screen/user/postDetail";
import Profile from "@/screen/user/profile";
import NewsDetail from "@/screen/user/newsDetail";
import Business from "@/screen/user/Business";
import BusinessDetail from "@/screen/user/BusinessDetail";
import RealEstateAgentDirectory from "@/screen/user/Brokers";
import UltilitySuport from "@/screen/user/ultility-suport";
import MessengerClone from "@/components/user/chat-box";



export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>


          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SellDetail/>} />
          <Route path='/new' element={<News/>} />
          <Route path='/productDetail/:id' element={<PostDetail/>} />
          <Route path='/brokers' element={<RealEstateAgentDirectory/>} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/new/:id' element={<NewsDetail/>} />
          <Route path='/business' element={<Business/>} />
          <Route path='/business/:id' element={<BusinessDetail/>} />
          <Route path='/support' element={<UltilitySuport/>} />
          <Route path='/message' element={<MessengerClone/>} />

          <Route path='*' element={<NotFoundScreen/>} />
        </Route>
      </Routes>
    </AuthModalProvider>
  )
}



