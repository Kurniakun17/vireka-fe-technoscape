// utils/healthScoring.js

/**
 * Normalize values to 0-1 range
 */
function normalizeValue(value, min, max) {
    if (max === min) return 1;
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  }
  
  /**
   * Reverse normalize - higher values get lower scores
   */
  function reverseNormalize(value, min, max) {
    return 1 - normalizeValue(value, min, max);
  }
  
  /**
   * Environmental Score Calculation
   */
  export function calculateEnvironmentalScore(data) {
    // Air Pollution Components (normalize dengan reverse - semakin tinggi semakin buruk)
    const pm25_score = Math.max(0, 1 - (data.pm25 / 100)); // WHO guideline: 15 μg/m³, severe: 100+
    const co_score = Math.max(0, 1 - (data.co / 50)); // Typical range 0-50 ppm
    const so2_score = Math.max(0, 1 - (data.so2 / 200)); // WHO guideline: 20 μg/m³, severe: 200+
    const no2_score = Math.max(0, 1 - (data.no2 / 100)); // WHO guideline: 40 μg/m³, severe: 100+
    const o3_score = Math.max(0, 1 - (data.o3 / 0.5)); // WHO guideline: 0.1 mg/m³, severe: 0.5+
  
    // Air Pollution Score
    const air_pollution_score = (pm25_score * 0.2 + co_score * 0.2 + so2_score * 0.2 + no2_score * 0.2 + o3_score * 0.2);
  
    // Chemical Score
    const chemical_score = (so2_score * 0.5 + no2_score * 0.5);
  
    // Water Score (Precipitation - normalize biasa, optimal range 100-200mm/month)
    const water_score = data.precipitation >= 100 && data.precipitation <= 200 ? 1.0 : 
                       Math.max(0, 1 - Math.abs(data.precipitation - 150) / 150);
  
    // Agriculture Score (NDVI - normalize biasa, 0-1 range, higher is better)
    const agriculture_score = Math.max(0, Math.min(1, data.ndvi));
  
    // Climate Score Components
    const temp_score = Math.max(0, 1 - Math.abs(data.temperature - 27) / 10);
    const humidity_score = Math.max(0, 1 - Math.abs(data.humidity - 60) / 40);
    const sun_score = Math.max(0, 1 - Math.abs(data.sunshine_duration - 7) / 7);
    
    const climate_score = (temp_score * 0.25 + humidity_score * 0.25 + sun_score * 0.25 + water_score * 0.25);
  
    // Final Environmental Score
    const final_score = Math.round(
      (air_pollution_score * 0.2 + 
       water_score * 0.2 + 
       chemical_score * 0.2 + 
       agriculture_score * 0.2 + 
       climate_score * 0.2) * 1000
    ) / 1000;
  
    return {
      air_pollution_score: Math.round(air_pollution_score * 1000) / 1000,
      chemical_score: Math.round(chemical_score * 1000) / 1000,
      water_score: Math.round(water_score * 1000) / 1000,
      agriculture_score: Math.round(agriculture_score * 1000) / 1000,
      climate_score: Math.round(climate_score * 1000) / 1000,
      final_environmental_score: final_score
    };
  }
  
  /**
   * Health Infrastructure Score Calculation
   */
  export function calculateHealthInfrastructureScore(totalDoctors, totalFacilities, totalPopulation) {
    const R_T = 1/1000;    // Ideal ratio: 1 doctor per 1000 people
    const R_F = 1/10000;   // Ideal ratio: 1 facility per 10000 people  
    const R_TF = 44.5/10000; // Combined ratio
  
    const actual_T = totalDoctors / totalPopulation;
    const actual_F = totalFacilities / totalPopulation;
    const actual_TF = (totalDoctors + totalFacilities) / totalPopulation;
  
    const score = (
      Math.min(1, actual_T / R_T) + 
      Math.min(1, actual_F / R_F) + 
      Math.min(1, actual_TF / R_TF)
    ) / 3;
  
    return Math.round(score * 1000) / 1000;
  }
  
  /**
   * Birth Mortality Score
   */
  export function calculateBirthMortalityScore(mortalityRate) {
    // Idealnya < 12 per 1.000 kelahiran (WHO threshold)
    return Math.round(Math.max(0, 1 - (mortalityRate / 20)) * 1000) / 1000;
  }
  
  /**
   * Life Expectancy Score
   */
  export function calculateLifeExpectancyScore(lifeExpectancy) {
    // Idealnya 75 tahun ke atas
    return Math.round(Math.min(lifeExpectancy / 80, 1) * 1000) / 1000;
  }
  
  /**
   * Disease Vulnerability Score
   */
  export function calculateDiseaseVulnerabilityScore(diseaseCasesPer100k) {
    // Semakin tinggi kasus, semakin rendah skor
    return Math.round(Math.max(0, 1 - (diseaseCasesPer100k / 1000)) * 1000) / 1000;
  }
  
  /**
   * Population Density Score
   */
  export function calculatePopulationDensityScore(density) {
    // Ideal di bawah 1.000/km²
    return Math.round(Math.max(0, 1 - (density / 10000)) * 1000) / 1000;
  }
  
  /**
   * Environmental Characteristics Score
   */
  export function calculateEnvironmentalCharacteristicsScore(type) {
    const mapping = {
      'lowland': 1.0,
      'coastal': 0.9,
      'urban flat': 0.8,
      'mountainous': 0.6,
      'disaster-prone': 0.4
    };
    return mapping[type?.toLowerCase()] || 0.5;
  }
  
  /**
   * Living Cost Score
   */
  export function calculateLivingCostScore(ihkIndex) {
    // Semakin tinggi biaya hidup, semakin rendah skor. Baseline IHK nasional = 100
    return Math.round(Math.max(0, 1 - ((ihkIndex - 100) / 100)) * 1000) / 1000;
  }
  
  /**
   * Calculate Overall Health Gap Score
   */
  export function calculateOverallHealthGapScore(data) {
    // Environmental Score
    const envScores = calculateEnvironmentalScore(data);
    
    // Infrastructure Score
    const infraScore = calculateHealthInfrastructureScore(
      data.jumlah_dokter, 
      data.jumlah_faskes, 
      data.jumlah_penduduk
    );
    
    // Health Indicators
    const birthMortalityScore = calculateBirthMortalityScore(data.birth_mortality);
    const lifeExpectancyScore = calculateLifeExpectancyScore(data.life_expectancy_rate);
    const diseaseVulnScore = calculateDiseaseVulnerabilityScore(data.disease_vulnerability);
    const popDensityScore = calculatePopulationDensityScore(data.population_density);
    const envCharScore = calculateEnvironmentalCharacteristicsScore(data.evi_characteristics);
    const livingCostScore = calculateLivingCostScore(data.living_cost);
  
    // Poverty Index Score (reverse normalize - higher poverty = lower score)
    const povertyScore = Math.round(Math.max(0, 1 - (data.poverty_index / 20)) * 1000) / 1000;
  
    // Combined Health Infrastructure & Social Score
    const healthInfraScore = (
      infraScore * 0.3 + 
      birthMortalityScore * 0.15 + 
      lifeExpectancyScore * 0.15 + 
      diseaseVulnScore * 0.2 + 
      popDensityScore * 0.1 + 
      livingCostScore * 0.1
    );
  
    // Final Gap Score (lower score = higher gap = needs more budget)
    const gapScore = (
      envScores.final_environmental_score * 0.4 + // Environmental factor
      healthInfraScore * 0.4 + // Health infrastructure & indicators
      povertyScore * 0.2 // Poverty factor
    );
  
    return {
      province: data.province,
      environmental_score: envScores.final_environmental_score,
      infrastructure_score: Math.round(infraScore * 1000) / 1000,
      health_indicators_score: Math.round(healthInfraScore * 1000) / 1000,
      poverty_score: povertyScore,
      environmental_characteristics_score: envCharScore,
      overall_gap_score: Math.round(gapScore * 1000) / 1000,
      budget_allocation_factor: Math.round((1 - gapScore) * 1000) / 1000, // Inverse of gap score for budget allocation
      detailed_env_scores: envScores
    };
  }
  
  /**
   * Calculate Budget Allocation for Multiple Regions
   */
  export function calculateBudgetAllocation(regionsData, totalBudget = 186000000000000) { // 186 Triliun default
    const processedRegions = regionsData.map(region => calculateOverallHealthGapScore(region));
    
    // // Calculate total allocation factors
    // const totalAllocationFactor = processedRegions.reduce(
    //   (sum, region) => sum + region.budget_allocation_factor, 0
    // );

    // Under the assumption that the total allocation factor is 257 (514 city has an average of 0.5)
    const totalAllocationFactor = 257;
    
    // Calculate budget allocation for each region
    const allocatedRegions = processedRegions.map(region => ({
      ...region,
      budget_allocation: Math.round((region.budget_allocation_factor / totalAllocationFactor) * totalBudget).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
      budget_percentage: Math.round((region.budget_allocation_factor / totalAllocationFactor) * 100 * 100) / 100
    }));
    
    return {
      regions: allocatedRegions,
      total_budget: totalBudget,
      total_allocation_factor: Math.round(totalAllocationFactor * 1000) / 1000
    };
  }
  
  
  export default {
    calculateEnvironmentalScore,
    calculateHealthInfrastructureScore,
    calculateBirthMortalityScore,
    calculateLifeExpectancyScore,
    calculateDiseaseVulnerabilityScore,
    calculatePopulationDensityScore,
    calculateEnvironmentalCharacteristicsScore,
    calculateLivingCostScore,
    calculateOverallHealthGapScore,
    calculateBudgetAllocation
  };