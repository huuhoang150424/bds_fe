
import RegisterAgentRequire from "@/page/agent/post/components/registerAgent/register-agent-require";
import { selectUser } from "@/redux/authReducer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function RequireAgentRole() {
  const user=useSelector(selectUser);

  if (!user || user.roles !== "Agent") {
    return <RegisterAgentRequire />;
  }

  return <Outlet />;
}
