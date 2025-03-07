import { Route, Routes } from "react-router-dom";
import {MainLayout } from '@/components/layout';
import Home from "@/screen/user/home/Home";
import { AuthModalProvider } from "@/context/auth-modal";

export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </AuthModalProvider>
  )
}
