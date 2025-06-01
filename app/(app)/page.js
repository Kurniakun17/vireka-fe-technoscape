"use client";
import React from "react";

import TopRows from "@/components/dashboard/TopRows";
import ProvincialBudget from "@/components/dashboard/ProvincialBudget";

import Header from "@/components/dashboard/Header";
import EconomicTrend from "@/components/dashboard/EconomicTrend";
import MapSection from "@/components/dashboard/MapSection";
import BudgetDistribution from "@/components/dashboard/BudgetDistribution";
import HealthGapRanking from "@/components/dashboard/HealthGapRanking";

export default function Home() {
  return (
    <>
      <Header />
      <TopRows />

      <div className="flex gap-6 flex-col xl:flex-row">
        {/* Middle Section */}
        <div className="flex flex-col gap-6 items-stretch flex-1">
          <MapSection />
          <ProvincialBudget />

          {/* <div className="flex w-full gap-6 ">
            <EconomicTrend />
          </div> */}
        </div>

        <div className="flex flex-col gap-6 items-stretch w-full xl:max-w-sm">
          <HealthGapRanking />
          {/* <BudgetDistribution /> */}
        </div>
      </div>
    </>
  );
}
