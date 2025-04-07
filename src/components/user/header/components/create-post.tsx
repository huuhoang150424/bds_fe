import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/context/auth-modal";
import { selectUser } from "@/redux/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CreatePostButtonProps {
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

const CreatePostButton = ({ isAuthenticated = false, onAuthRequired }: CreatePostButtonProps) => {
  const { openModal } = useAuthModal(); 
  const navigate = useNavigate(); 
  const user = useSelector(selectUser);

  const handleNavigateCreatePost = () => {
    if (!isAuthenticated) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    if (user?.phone && user?.emailVerified) {
      navigate('/agent/create-post');
    } else if (!user?.emailVerified) {
      openModal('verifyEmail');
    } else if (!user?.phone) {
      openModal('updatePhone');
    }
  };

  return (
    <Button
      onClick={handleNavigateCreatePost}
      variant={'outline'}
      className="text-[17px] text-black hover:bg-[#FAFAFA] ml-[15px] px-[15px] py-[20px]"
    >
      <span className="py-[30px]">Đăng tin</span>
    </Button>
  );
};

export default CreatePostButton;