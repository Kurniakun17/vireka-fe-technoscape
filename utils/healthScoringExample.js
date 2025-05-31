// utils/healthScoringExample.js
import {
  calculateOverallHealthGapScore,
  calculateBudgetAllocation,
} from "./normalization.js";

// Sample data berdasarkan yang kamu berikan
const sampleData = {
  id: 3919,
  province: "trenggalek",
  infrastructure: "Placeholder",
  renewable_energy: "Placeholder",
  poverty_index: 4.72,
  ndvi: 0.73,
  precipitation: 11.8,
  sentinel: -6.635,
  no2: 43.395,
  co: 25.689,
  so2: 128.348,
  o3: 0.116,
  pm25: 22.6,
  ai_investment_score: 0.0,
  period: "2025-05-31",
  level: "city",
  aqi: 60,
  kecamatan: null,
  jumlah_dokter: 870,
  jumlah_faskes: 93,
  jumlah_penduduk: 700716,
  longitude: null,
  latitude: null,
  humidity: 97,
  sunshine_duration: 5,
  temperature: 25,
  birth_mortality: 3.15,
  life_expectancy_rate: 73.18,
  disease_vulnerability: 225.71,
  population_density: 1000.0,
  evi_characteristics: "mountainous",
  living_cost: 106.91,
};

// Contoh data Jakarta untuk perbandingan (gap rendah)
const jakartaData = {
  id: 1,
  province: "jakarta",
  poverty_index: 2.1, // Lower poverty
  ndvi: 0.3, // Lower vegetation (urban)
  precipitation: 150,
  no2: 80.5, // Higher pollution
  co: 45.2,
  so2: 85.1,
  o3: 0.25,
  pm25: 45.8,
  jumlah_dokter: 25000, // More doctors
  jumlah_faskes: 1200, // More facilities
  jumlah_penduduk: 10500000, // Higher population
  humidity: 85,
  sunshine_duration: 6,
  temperature: 28,
  birth_mortality: 2.1, // Lower mortality
  life_expectancy_rate: 76.5, // Higher life expectancy
  disease_vulnerability: 180.2, // Lower disease vulnerability
  population_density: 15000, // Very high density
  evi_characteristics: "urban flat",
  living_cost: 125.5, // Higher living cost
};

// Test dengan satu daerah
console.log("=== TRENGGALEK HEALTH GAP ANALYSIS ===");
const trenggalekResult = calculateOverallHealthGapScore(sampleData);
console.log(JSON.stringify(trenggalekResult, null, 2));

console.log("\n=== JAKARTA HEALTH GAP ANALYSIS ===");
const jakartaResult = calculateOverallHealthGapScore(jakartaData);
console.log(JSON.stringify(jakartaResult, null, 2));

// Test budget allocation untuk multiple regions
console.log("\n=== BUDGET ALLOCATION COMPARISON ===");
const multipleRegions = [sampleData, jakartaData];
const budgetAllocation = calculateBudgetAllocation(
  multipleRegions,
  6000000000000
); // 6 Triliun

console.log(JSON.stringify(budgetAllocation, null, 2));

// Summary comparison
console.log("\n=== SUMMARY COMPARISON ===");
console.log(
  `Trenggalek Gap Score: ${trenggalekResult.overall_gap_score} (Higher gap = needs more budget)`
);
console.log(
  `Jakarta Gap Score: ${jakartaResult.overall_gap_score} (Lower gap = needs less budget)`
);
console.log(
  `Trenggalek Budget Allocation Factor: ${trenggalekResult.budget_allocation_factor}`
);
console.log(
  `Jakarta Budget Allocation Factor: ${jakartaResult.budget_allocation_factor}`
);

// Export untuk testing
export {
  sampleData,
  jakartaData,
  trenggalekResult,
  jakartaResult,
  budgetAllocation,
};
