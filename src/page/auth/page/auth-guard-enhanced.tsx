import React, { type ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import RequireAuthModal from "./require-auth-modal";
import { selectIsAuthenticated } from "@/redux/authReducer";

interface AuthGuardChildProps {
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}
interface AuthGuardProps {
  children: ReactNode;
  actionType?: "save" | "comment" | "like" | "purchase" | "contact" | "warning" | "custom";
  customMessage?: string;
}

function AuthGuard({ children, actionType = "custom", customMessage }: AuthGuardProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showModal, setShowModal] = useState(false);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<AuthGuardChildProps>(child)) {
      return React.cloneElement(child, {
        isAuthenticated,
        onAuthRequired: () => setShowModal(true),
      });
    }
    return child;
  });

  return (
    <>
      {enhancedChildren}
      <RequireAuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        actionType={actionType}
        customMessage={customMessage}
      />
    </>
  );
}

export default AuthGuard;