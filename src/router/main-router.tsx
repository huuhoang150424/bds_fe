import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/page/user/home";
import SellDetail from "@/page/user/sellDetails";
import { AuthModalProvider } from "@/context/auth-modal";
import News from "@/page/user/news/index";
import NotFoundScreen from "@/page/user/NotFoundScreen";
import PostDetail from "@/page/user/postDetail";
import Profile from "@/page/user/profile";
import NewsDetail from "@/page/user/newsDetail";
import Business from "@/page/user/Business";
import BusinessDetail from "@/page/user/BusinessDetail";
import RealEstateAgentDirectory from "@/page/user/Brokers";
import UltilitySuport from "@/page/user/ultility-suport";
import MessengerClone from "@/components/user/chat-box";



export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>


          <Route path='/' element={<Home />} />
          <Route path='/post' element={<SellDetail/>} />
          <Route path='/new' element={<News/>} />
          <Route path='/post/:slug' element={<PostDetail/>} />
          <Route path='/brokers' element={<RealEstateAgentDirectory/>} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/new/:slug' element={<NewsDetail/>} />
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



