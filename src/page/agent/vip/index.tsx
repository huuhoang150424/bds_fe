
import React from 'react';
import Faqs from './components/Faqs';
import VipCard from './components/vip-card';

function Vip() {
  return (
    <div className='max-w-[1800px] mx-auto my-[30px]' >
      <VipCard />
      <div>
        <Faqs />
      </div>
    </div>
  );
}

export default Vip;
