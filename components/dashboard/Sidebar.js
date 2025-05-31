import { Activity, Book, Heart, MapPin, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white  border-r border-gray-200 z-10">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Image src="/logo-vireka.png" alt="Vireka" width={32} height={32} />

          <div>
            <h1 className="text-xl font-bold text-gray-900">Vireka</h1>
            <p className="text-xs text-gray-500">National Health Analytics</p>
          </div>
        </div>

        <nav className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] text-white rounded-xl font-medium ">
            <Link
              href={"/"}
              className="flex items-center space-x-3 hover:text-white "
            >
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="p-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200">
            <div className="flex items-center space-x-3">
              <Book className="h-5 w-5" />
              <span>Hospital Reports</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
