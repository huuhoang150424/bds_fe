import AgentLayout from "@/components/layout/agent-layout";
import CreatePostPage from "@/screen/agent/create-new-post.tsx";
import DashBoard from "@/screen/agent/dasboard";
import Overview from "@/screen/agent/overview";
import Vip from "@/screen/agent/vip";
import VIPRequired from "@/screen/user/have-vip";
import { Route, Routes } from "react-router-dom";




export default function AgentRouter ()
{
  return (
    <Routes>
      <Route path="" element={ <AgentLayout /> }>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/overview" element={<Overview/>}/>
        <Route path="/create-post" element={<CreatePostPage/>}/>
        <Route path="/vip" element={<Vip/>}/>
        <Route path="/vip-required" element={<VIPRequired/>}/>
      </Route>
    </Routes>
  )
}



