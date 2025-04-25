import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import ListCards from './components/card';
import Chart from './components/char';
import UserRecent from './components/user-recent';

export default function DashBroad() {
  useScrollToTopOnMount();
  return (
    <div className="max-w-8xlp-6 space-y-6 min-h-screen max-w-8xl">
      <h1 className='mb-[15px] text-[20px] font-[700] text-textColor dark:text-white'>Tổng quan</h1>
      <ListCards/>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7 mt-[20px] '>
        <Chart/>
        <UserRecent/>
      </div>
    </div>
  )
}
