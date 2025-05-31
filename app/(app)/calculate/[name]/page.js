"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import RegionDetailTabs from "@/components/details/RegionDetailTabs";
import GapScoreCalculator from "@/components/details/Calculator";
import { API_URL } from "@/constants/apiURL";

async function fetchInfrastructureData(provinceName) {
  const response = await fetch(
    `${API_URL}/get-infrastructure/city?provinceName=${provinceName?.toLowerCase()}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function Page() {
  const params = useParams();
  const slug = params.name;

  const {
    data: dataDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["infrastructureCalculate", slug],
    queryFn: () => fetchInfrastructureData(slug),
  });

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/5 z-50">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <GapScoreCalculator regionData={dataDetail[0]} />
    </div>
  );
}
