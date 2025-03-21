import React from "react";
import { DashboardCharts } from "./components/chart";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "./components/stats-card";
import { quickStatistics, featuredProperties } from "@/constant/const-dashboard";
import { RegionsChart } from "./components/pie-chart";
import { RecentListings } from "./components/recent-listing";
import { Prominent } from "./components/prominent-news";

function Overview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard infor={quickStatistics.post} />
        <StatCard infor={quickStatistics.view} />
        <StatCard infor={quickStatistics.contact} />
        <StatCard infor={quickStatistics.accountMoney} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8">
          <DashboardCharts />
        </div>
        <div className="lg:col-span-4">
          <RegionsChart />
        </div>
      </div>

      {/* Recent Listings */}
      <div className="mb-6">
        <RecentListings />
      </div>

      {/* Prominent News */}
      <div>
        <Prominent />
      </div>
    </div>
  );
}

export default Overview;