import AgentLayout from "@/components/layout/agent-layout";
import DashBoard from "@/screen/agent/dasboard";
import { Route, Routes } from "react-router-dom";




export default function AgentRouter ()
{
  return (
    <Routes>
      <Route element={ <AgentLayout /> }>
        <Route path="dashboard" element={<DashBoard/>}/>
      </Route>
    </Routes>
  )
}



