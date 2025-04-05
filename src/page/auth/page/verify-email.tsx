import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/context/auth-modal";
import Loader from "@/components/common/loading/loader/loading";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useEmailVerification } from "../hook/use-email-verification";
import { useVerifyToken } from "../hook/use-verify-token";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser, updateVerifiedMail } from "@/redux/authReducer";
import { AppDispatch } from "@/redux/store";

function EmailVerification() {
  const isAuthenticated=useSelector(selectIsAuthenticated);
  const dispatch=useDispatch<AppDispatch>();
  const { closeModal, email,openModal } = useAuthModal();
  const [resendDisabled, setResendDisabled] = useState(false);
  const verificationMutation = useEmailVerification(email);

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token") || "";
  const verifyTokenMutation = useVerifyToken(email, token);

  useEffect(() => {
    if (token && !verifyTokenMutation.isPending && !verifyTokenMutation.isSuccess) {
      verifyTokenMutation.mutate();
    }
  }, [token]);

  useEffect(() => {
    if (verifyTokenMutation.isSuccess) {
      window.history.pushState({}, document.title, window.location.pathname); 
      dispatch(updateVerifiedMail());
      if (isAuthenticated) {
        closeModal();
      } else {
        openModal("login");
      }
    }
  }, [verifyTokenMutation.isSuccess, closeModal]);

  const handleResend = () => {
    verificationMutation.mutate();
    setResendDisabled(true);
    setTimeout(() => setResendDisabled(false), 60000);
  };

  return (
    <div className="w-[45%] p-8">
      <div className="mb-[15px]">
        <p className="text-gray-600 text-[15px]">Xác thực tài khoản</p>
        <span className="block text-xl font-[600]">Xác thực email</span>
      </div>
      {verificationMutation.isPending || verifyTokenMutation.isPending ? (
        <Loader className="my-[120px]" />
      ) : (
        <div>
          <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-3 mt-4">
            <div>
              <p className="text-sm text-gray-700">
                Vui lòng ấn Gửi mail xác thực{" "}
                <span className="font-medium">{email}</span>. Và kiểm tra hộp thư của bạn và nhấp vào liên kết xác thực để hoàn tất quá trình.
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            <p>Không nhận được email? Vui lòng kiểm tra thư mục spam hoặc thử gửi lại.</p>
          </div>

          <Button
            onClick={handleResend}
            disabled={resendDisabled || verificationMutation.isPending}
            variant="outline"
            className="w-full mt-[160px]"
          >
            {resendDisabled ? "Đợi 15 phút để gửi lại" : "Gửi mail xác thực"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmailVerification;