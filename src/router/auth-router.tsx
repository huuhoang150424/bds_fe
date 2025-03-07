import {Route, Routes } from "react-router-dom";
import LoginScreen from "@/screen/auth/login";
import Register from "@/screen/auth/register";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}
