import AgentLayout from "@/components/layout/agent-layout";
import CreatePostPage from "@/page/agent/post/page/create-post-sell";
import CustomersPage from "@/page/agent/customer";
import DraftPost from "@/page/agent/post/page/draft-post";
import { Finance } from "@/page/agent/finance";


import Overview from "@/page/agent/statistical/page/overview";
import ManagePost from "@/page/agent/post/page/manage-post";
import Statistical from "@/page/agent/statistical/page/statistical";
import Vip from "@/page/agent/vip";
import VIPRequired from "@/page/agent/vip/components/have-vip";
import { Route, Routes } from "react-router-dom";
import Chat from "@/page/agent/chat/page/chat";
import UserProfile from "@/page/agent/manage-account/infor";

import UserProfileEditable from "@/page/agent/manage-account/update-infor";
import CreatePost from "@/page/agent/post/page/create-post";
import CreatePostPageRent from "@/page/agent/post/page/create-post-rent";
import CreatePostPageSell from "@/page/agent/post/page/create-post-sell";




export default function AgentRouter ()
{
  return (
    <Routes>
      <Route path="" element={ <AgentLayout /> }>
        <Route path="/overview" element={ <Overview /> } />
        <Route path="/create-post" element={ <CreatePost /> } />
        <Route path="/create-post-sell" element={ <CreatePostPageSell /> } />
        <Route path="/create-post-rent" element={ <CreatePostPageRent /> } />
        <Route path="/vip" element={ <Vip /> } />
        <Route path="/vip-required" element={ <VIPRequired /> } />
        <Route path="/manage-post" element={ <ManagePost /> } />
        <Route path="/manage-account" element={ <UserProfileEditable /> } />
        <Route path="/profile" element={ <UserProfile /> } />
        <Route path="/customer-infor" element={ <CustomersPage /> } />
        <Route path="/finance" element={ <Finance /> } />
        <Route path="/statistical" element={ <Statistical /> } />
        <Route path="/draft-post" element={ <DraftPost /> } />
        <Route path="/chat" element={ <Chat /> } />
      </Route>
    </Routes>
  )
}



