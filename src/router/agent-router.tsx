import AgentLayout from "@/components/layout/agent-layout";
import CreatePostPage from "@/screen/agent/create-new-post.tsx";
import CustomersPage from "@/screen/agent/customer";
import DashBoard from "@/screen/agent/dasboard";
import DraftPost from "@/screen/agent/draft-post";
import { DraftPostEditPage } from "@/screen/agent/draft-post/components/draft-post-edit-page";
import { Finance } from "@/screen/agent/finance";
import { UserProfile } from "@/screen/agent/manage-account/infor";

import AccountManagement from "@/screen/agent/manage-account/update-infor";
import Overview from "@/screen/agent/overview";
import ManagePost from "@/screen/agent/post";
import Statistical from "@/screen/agent/statistical";
import Vip from "@/screen/agent/vip";
import VIPRequired from "@/screen/agent/vip/components/have-vip";
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
        <Route path="/manage-post" element={<ManagePost/>}/>
        <Route path="/manage-account" element={<AccountManagement/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/customer-infor" element={<CustomersPage/>}/>
        <Route path="/finance" element={<Finance/>}/>
        <Route path="/statistical" element={<Statistical/>}/>
        <Route path="/draft-post" element={<DraftPost/>}/>
        <Route path="/draft-post-edit" element={<DraftPostEditPage/>}/>
      </Route>
    </Routes>
  )
}



