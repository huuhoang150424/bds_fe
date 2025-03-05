import { Route, Routes } from "react-router-dom";
import MainLayout from '@/components/layout/main-layout'
import Home from "@/screen/user/home/Home";

export default function MainRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
      </Route>

    </Routes>
  )
}
