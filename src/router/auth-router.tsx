// import { ChangePasswordScreen, ForgotPasswordScreen, LoginScreen, SignUpScreen, VerifyCodeScreen } from "@/screen/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "@/screen/auth/login/LoginScreen";
import Register from "@/screen/auth/register/Register";
// import { AuthLayout } from "@/layout";

export default function AuthRouter() {
  return (
    // <AuthLayout>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>

    // </AuthLayout>
  );
}
