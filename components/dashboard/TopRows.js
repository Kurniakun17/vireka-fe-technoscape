import { Building, DollarSign, Target, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export default function TopRows() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-[#1FA09D]/10 hover: transition-all duration-300 hover:border-[#1FA09D]/30">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 bg-gradient-to-r from-[#1FA09D] to-[#16A085] rounded-2xl  shadow-[#1FA09D]/30">
            <DollarSign className="h-7 w-7 text-white" />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-2 rounded-xl border border-green-200">
              +8.1%
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-600 mb-2 font-medium">Total Anggaran </p>
          <p className="text-3xl font-bold text-gray-900 mb-1">Rp 186.3T</p>
          <p className="text-sm text-gray-500">Dialokasikan per tahun secara nasional</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-blue-500/10 hover: transition-all duration-300 hover:border-blue-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl  shadow-blue-500/30">
            <TrendingDown className="h-7 w-7 text-white" />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-2 rounded-xl border border-blue-200">
              -1.2 pts
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-600 mb-2 font-medium">Indeks Kemiskinan</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">11.4</p>
          <p className="text-sm text-gray-500">
            Menurun secara bertahap
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-amber-500/10 hover: transition-all duration-300 hover:border-amber-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl  shadow-amber-500/30">
            <Building className="h-7 w-7 text-white" />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-amber-600 bg-amber-100 px-3 py-2 rounded-xl border border-amber-200">
              Sedang
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-600 mb-2 font-medium">
            Kesenjangan Infrastruktur
          </p>
          <p className="text-3xl font-bold text-gray-900 mb-1">6.8/10</p>
          <p className="text-sm text-gray-500">Meningkat secara bertahap</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl  p-6 border border-gray-300 hover:shadow-purple-500/10 hover: transition-all duration-300 hover:border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl  shadow-purple-500/30">
            <Target className="h-7 w-7 text-white" />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-2 rounded-xl border border-purple-200">
              100%
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-600 mb-2 font-medium">Cakupan</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">34</p>
          <p className="text-sm text-gray-500">Provinsi yang dipantau</p>
        </div>
      </div>
    </div>
  );
}
