import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from '@/components/layout/main-layout'
import Home from "@/screen/user/home/Home";
import SellDetail from "@/screen/user/sellDetails/sellDetail";

export default function MainRouter() {
  return (
    <MainLayout>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/' element={<SellDetail/>} />
      </Routes>
    </MainLayout>
  )
}
