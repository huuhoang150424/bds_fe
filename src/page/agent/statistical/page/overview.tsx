import { DashboardCharts } from '../components/chart-overview';

import StatCard from '../components/stats-card';
import { quickStatistics } from '@/constant/const-dashboard';
import { RegionsChart } from '../components/pie-chart';

import VIPRequired from '../../vip/components/have-vip';
import useScrollToTopOnMount from '@/hooks/use-scroll-top';

function Overview() {
  useScrollToTopOnMount();
  const isHaveVip = true;

  return (
    <div>
      {isHaveVip ? (
        <div className='p-4 sm:p-6 lg:p-8'>
          {/* Stat Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <StatCard infor={quickStatistics.post} />
            <StatCard infor={quickStatistics.view} />
            <StatCard infor={quickStatistics.contact} />
            <StatCard infor={quickStatistics.accountMoney} />
          </div>

          {/* Charts Section */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6'>
            <div className='lg:col-span-8'>
              <DashboardCharts />
            </div>
            <div className='lg:col-span-4'>
              <RegionsChart />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <VIPRequired />
        </div>
      )}
    </div>
  );
}

export default Overview;
