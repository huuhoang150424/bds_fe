import AgentLayout from '@/components/layout/agent-layout';
import CustomersPage from '@/page/agent/customer';
import DraftPost from '@/page/agent/post/page/draft-post';
import { Finance } from '@/page/agent/finance';

import Overview from '@/page/agent/statistical/page/overview';
import ManagePost from '@/page/agent/post/page/manage-post';
import Statistical from '@/page/agent/statistical/page/statistical';
import Vip from '@/page/agent/vip/page';
import VIPRequired from '@/page/agent/vip/components/have-vip';
import { Route, Routes } from 'react-router-dom';
import Chat from '@/page/agent/chat/page/chat';
import UserProfile from '@/page/agent/manage-account/infor';
import CreatePost from '@/page/agent/post/page/create-post';
import RequireAgentRole from './require-agent-role';
import Guideline from '@/page/agent/post/page/instruct';
import Sample from '@/page/agent/post/page/sample-instructions';
import MyPricing from '@/page/agent/vip/page/my-pricing';
//

export default function AgentRouter() {
  return (
    <Routes>
      <Route path='' element={<AgentLayout />}>
        <Route element={<RequireAgentRole />}>
          <Route path='/overview' element={<Overview />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/vip' element={<Vip />} />
          <Route path='/vip-required' element={<VIPRequired />} />
          <Route path='/manage-post' element={<ManagePost />} />
          <Route path='/customer-infor' element={<CustomersPage />} />
          <Route path='/finance' element={<Finance />} />
          <Route path='/statistical' element={<Statistical />} />
          <Route path='/draft-post' element={<DraftPost />} />
          <Route path='/guideline' element={<Guideline />} />
          <Route path='/sample' element={<Sample />} />
          <Route path='/my-pricing' element={<MyPricing />} />
        </Route>
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/chat' element={<Chat />} />
      </Route>
    </Routes>
  );
}
