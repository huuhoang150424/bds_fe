import React from 'react';
import { DashboardCharts } from './components/chart';
import RegionsChart from './components/pie-chart';
import { Trend } from './components/statistiical-trend-by-visitor';
import { PostByMonth } from './components/statistical-post-by-month';

function Statistical() {
  return (
    <div className='max-w-[1800px] p-[30px] mx-auto '>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
        <div className='col-span-1 md:col-span-8'>
          <DashboardCharts />
        </div>
        <div className='col-span-1 md:col-span-4'>
          <RegionsChart />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-8 mt-8'>
        <div className='col-span-1 md:col-span-6'>
          <Trend />
        </div>
        <div className='col-span-1 md:col-span-6'>
          <PostByMonth />
        </div>
      </div>
    </div>
  );
}

export default Statistical;
