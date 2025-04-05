import AgentLayout from "@/components/layout/agent-layout";
import CreatePostPage from "@/page/agent/post/page/create-post";
import CustomersPage from "@/page/agent/customer";
import DraftPost from "@/page/agent/post/page/draft-post";
import { DraftPostEditPage } from "@/page/agent/draft-post/components/draft-post-edit-page";
// import DraftPost from "@/page/agent/draft-post";
// import { DraftPostEditPage } from "@/page/agent/draft-post/components/draft-post-edit-page";
import { Finance } from "@/page/agent/finance";
import { UserProfile } from "@/page/agent/manage-account/infor";

import AccountManagement from "@/page/agent/manage-account/update-infor";
import Overview from "@/page/agent/statistical/page/overview";
import ManagePost from "@/page/agent/post/page/manage-post";
import Statistical from "@/page/agent/statistical/page/statistical";
// import Statistical from "@/page/agent/statistical";
import Vip from "@/page/agent/vip";
import VIPRequired from "@/page/agent/vip/components/have-vip";
import { Route, Routes } from "react-router-dom";




export default function AgentRouter ()
{
  return (
    <Routes>
      <Route path="" element={ <AgentLayout /> }>
        <Route path="/overview" element={ <Overview /> } />
        <Route path="/create-post" element={ <CreatePostPage /> } />
        <Route path="/vip" element={ <Vip /> } />
        <Route path="/vip-required" element={ <VIPRequired /> } />
        <Route path="/manage-post" element={ <ManagePost /> } />
        <Route path="/manage-account" element={ <AccountManagement /> } />
        <Route path="/profile" element={ <UserProfile /> } />
        <Route path="/customer-infor" element={ <CustomersPage /> } />
        <Route path="/finance" element={ <Finance /> } />
        <Route path="/statistical" element={ <Statistical /> } />
        <Route path="/draft-post" element={ <DraftPost /> } />
        {/* <Route path="/draft-post-edit" element={<DraftPostEditPage id={0}/>}/> */ }
      </Route>
    </Routes>
  )
}



