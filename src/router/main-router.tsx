import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from '@/components/layout/main-layout'
import Home from "@/screen/user/home/Home";

export default function MainRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </MainLayout>
  )
}
