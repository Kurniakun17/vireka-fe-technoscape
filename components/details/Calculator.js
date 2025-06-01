"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const reference = {
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
  ai_investment_score: 0,
  period: "2025-05-31",
  level: "city",
  aqi: 60,
  diseases: {
    overview:
      "Dengan mempertimbangkan data lingkungan, kelurahan Trenggalek berisiko tinggi terhadap penyakit saluran pernapasan seperti ISPA dan Asma, serta risiko menengah untuk DBD dan Malaria. Hal ini disebabkan oleh kualitas udara yang buruk, yaitu ACQ 60, dan tingkat NO2 dan SO2 yang tinggi, serta curah hujan yang dapat menciptakan habitat bagi vektor penyakit.",
    diseaseData: [
      {
        name: "ISPA",
        riskLevel: "tinggi",
        percentage: 0.7,
        prevention: [
          "Mengurangi paparan polusi udara dengan menggunakan masker",
          "Menghindari aktivitas luar ruangan di waktu puncak polusi",
          "Meningkatkan ventilasi dalam ruangan",
          "Melakukan pemeriksaan kesehatan secara teratur",
        ],
        explanationWhyItsFeasible:
          "Kualitas udara yang buruk, ditandai dengan AQI 60 dan level PM2.5 yang cukup tinggi (22.6 μg/m³), dapat meningkatkan risiko penyakit saluran pernapasan.",
      },
      {
        name: "Asma",
        riskLevel: "tinggi",
        percentage: 0.6,
        prevention: [
          "Menghindari pemicu asma seperti asap rokok dan polusi",
          "Menggunakan inhaler sesuai anjuran dokter",
          "Menghindari tempat dengan konsentrasi polusi tinggi",
        ],
        explanationWhyItsFeasible:
          "Tingginya konsentrasi NO2 (43.395 μg/m³) dan SO2 (128.348 μg/m³) dapat memicu serangan asma terutama pada populasi rentan.",
      },
      {
        name: "DBD",
        riskLevel: "sedang",
        percentage: 0.5,
        prevention: [
          "Membunuh jentik di genangan air",
          "Menggunakan kelambu dan obat nyamuk",
          "Menghindari tempat penampungan air yang tidak tertutup",
        ],
        explanationWhyItsFeasible:
          "Curah hujan 11.8 mm dapat menciptakan genangan air, sementara NDVI yang relatif baik (0.73) seringkali terkait dengan habitat nyamuk, meningkatkan risiko DBD.",
      },
      {
        name: "Malaria",
        riskLevel: "sedang",
        percentage: 0.4,
        prevention: [
          "Menggunakan kelambu berinsektisida",
          "Melakukan pemeriksaan dan pengobatan dini jika terindikasi malaria",
          "Pengendalian nyamuk di lingkungan sekitar",
        ],
        explanationWhyItsFeasible:
          "Curah hujan dapat meningkatkan populasi nyamuk penyebar malaria. Tingkat kemiskinan yang tinggi juga berkontribusi terhadap kerentanan penyakit.",
      },
      {
        name: "Pneumonia",
        riskLevel: "medium",
        percentage: 0.5,
        prevention: [
          "Vaksinasi pneumonia",
          "Konsumsi gizi seimbang untuk meningkatkan imun",
          "Penghindaran paparan asap dan polutan",
        ],
        explanationWhyItsFeasible:
          "Risiko pneumonia dapat meningkat akibat polusi udara yang tinggi. Pengaruh kualitas udara pada kesehatan pernapasan sangat signifikan.",
      },
    ],
  },
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
  population_density: 1000,
  evi_characteristics: "mountainous",
  living_cost: 106.91,
  budget_allocation: 52586400000,
};

const povertyIndexScore = (value) => Math.max(0, (15 - value) / 15);
const environmentalScore = (data) => {
  const aqi_score = Math.max(0, (150 - data.aqi) / 150);
  const ndvi_score = Math.min(1, data.ndvi / 0.5);
  return (aqi_score + ndvi_score) / 2;
};
const healthInfraScore = (dokter, faskes, penduduk) => {
  const dokter_per_1000 = (dokter / penduduk) * 1000;
  const faskes_per_1000 = (faskes / penduduk) * 1000;
  return Math.min(1, (dokter_per_1000 * 0.6 + faskes_per_1000 * 0.4) / 2);
};
const birthMortalityScore = (value) => Math.max(0, (15 - value) / 15);
const lifeExpectancyScore = (value) => Math.min(1, value / 80);

const diseaseVulnerabilityScore = (value) => Math.max(0, (10 - value) / 10);
const populationDensityScore = (value) => Math.max(0, 1 - value / 50);
const environmentalCharacteristicsScore = (characteristics) => {
  const scores = { highland: 0.8, midland: 0.6, lowland: 0.4, coastal: 0.3 };
  return scores[characteristics] || 0.5;
};
const livingCostScore = (value) => Math.max(0, (150 - value) / 150);

const allParameters = [
  {
    id: "poverty_index",
    label: "Poverty Index",
    getValue: (data) => data.poverty_index,
    scoreFunction: (data) => povertyIndexScore(data.poverty_index),
  },
  {
    id: "env_score",
    label: "Environmental Score",
    getValue: (data) => "See Calculation Details",
    scoreFunction: (data) => environmentalScore(data),
  },
  {
    id: "health_infra_score",
    label: "Health Infrastructure Score",
    getValue: (data) =>
      `Dokter: ${data.jumlah_dokter}, Faskes: ${data.jumlah_faskes}, Penduduk: ${data.jumlah_penduduk}`,
    scoreFunction: (data) =>
      healthInfraScore(
        data.jumlah_dokter,
        data.jumlah_faskes,
        data.jumlah_penduduk
      ),
  },
  {
    id: "birth_mortality",
    label: "Birth Mortality Rate",
    getValue: (data) => data.birth_mortality,
    scoreFunction: (data) => birthMortalityScore(data.birth_mortality),
  },
  {
    id: "life_expectancy_rate",
    label: "Life Expectancy Rate",
    getValue: (data) => data.life_expectancy_rate,
    scoreFunction: (data) => lifeExpectancyScore(data.life_expectancy_rate),
  },
  {
    id: "disease_vulnerability",
    label: "Disease Vulnerability",
    getValue: (data) => data.disease_vulnerability,
    scoreFunction: (data) =>
      diseaseVulnerabilityScore(data.disease_vulnerability),
  },
  {
    id: "population_density",
    label: "Population Density",
    getValue: (data) => data.population_density,
    scoreFunction: (data) => populationDensityScore(data.population_density),
  },
  {
    id: "environmental_characteristics",
    label: "Environmental Characteristics",
    getValue: (data) => data.evi_characteristics,
    scoreFunction: (data) =>
      environmentalCharacteristicsScore(data.evi_characteristics),
  },
  {
    id: "living_cost",
    label: "Living Cost Index",
    getValue: (data) => data.living_cost,
    scoreFunction: (data) => livingCostScore(data.living_cost),
  },
];

const TOTAL_BUDGET = 186_000_000_000_000;
const TOTAL_ALLOCATION_FACTOR = 257;

const formatCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) return "N/A";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const getParameterRecommendations = (data, scores, totalAllocation) => {
  const recommendations = [];
  const MAX_ALLOCATION_PERCENTAGE = 0.125; // 12.5%
  const maxBudgetPerParameter = totalAllocation * MAX_ALLOCATION_PERCENTAGE;

  // Health Infrastructure Recommendations
  if (scores.health_infra_score && scores.health_infra_score.score < 0.7) {
    const currentDoctorRatio =
      (data.jumlah_dokter / data.jumlah_penduduk) * 1000;
    const currentFacilityRatio =
      (data.jumlah_faskes / data.jumlah_penduduk) * 1000;

    // Target WHO: 1 dokter per 1000 penduduk, 1 faskes per 2500 penduduk
    const targetDoctorRatio = 1;
    const targetFacilityRatio = 0.4;

    const totalDoctorsNeeded = Math.max(
      0,
      Math.ceil(
        ((targetDoctorRatio - currentDoctorRatio) * data.jumlah_penduduk) / 1000
      )
    );
    const totalFacilitiesNeeded = Math.max(
      0,
      Math.ceil(
        ((targetFacilityRatio - currentFacilityRatio) * data.jumlah_penduduk) /
          1000
      )
    );

    if (totalDoctorsNeeded > 0 || totalFacilitiesNeeded > 0) {
      // Biaya unit
      const doctorCost = 800_000_000; // Rp 800 juta per dokter
      const facilityCost = 2_500_000_000; // Rp 2.5 miliar per fasilitas

      // Hitung berapa yang bisa diafford dengan budget maksimum
      let affordableDoctors = 0;
      let affordableFacilities = 0;
      let remainingBudget = maxBudgetPerParameter;

      // Prioritas: dokter dulu karena lebih urgent dan lebih murah per unit
      if (totalDoctorsNeeded > 0) {
        affordableDoctors = Math.min(
          totalDoctorsNeeded,
          Math.floor(remainingBudget / doctorCost)
        );
        remainingBudget -= affordableDoctors * doctorCost;
      }

      // Sisa budget untuk fasilitas
      if (totalFacilitiesNeeded > 0 && remainingBudget > 0) {
        affordableFacilities = Math.min(
          totalFacilitiesNeeded,
          Math.floor(remainingBudget / facilityCost)
        );
      }

      const actualCost =
        affordableDoctors * doctorCost + affordableFacilities * facilityCost;
      const budgetUtilization = (actualCost / maxBudgetPerParameter) * 100;

      if (affordableDoctors > 0 || affordableFacilities > 0) {
        recommendations.push({
          parameter: "Health Infrastructure",
          priority: scores.health_infra_score.score < 0.5 ? "High" : "Medium",
          totalNeeded: {
            doctors: totalDoctorsNeeded,
            facilities: totalFacilitiesNeeded,
          },
          affordable: {
            doctors: affordableDoctors,
            facilities: affordableFacilities,
          },
          gap: {
            unfundedDoctors: totalDoctorsNeeded - affordableDoctors,
            unfundedFacilities: totalFacilitiesNeeded - affordableFacilities,
            currentDoctorRatio: currentDoctorRatio.toFixed(2),
            currentFacilityRatio: currentFacilityRatio.toFixed(2),
          },
          cost: actualCost,
          budgetUtilization: budgetUtilization,
          maxBudget: maxBudgetPerParameter,
          description: `Dapat membiayai ${affordableDoctors} dari ${totalDoctorsNeeded} dokter dan ${affordableFacilities} dari ${totalFacilitiesNeeded} fasilitas kesehatan`,
          actions: [
            `Rekrut ${affordableDoctors} tenaga medis dengan program PTT berinsentif`,
            `Bangun ${affordableFacilities} puskesmas/poskesdes di daerah prioritas`,
            "Program telemedicine untuk jangkauan maksimal",
            "Pelatihan kader kesehatan masyarakat sebagai support",
            affordableDoctors < totalDoctorsNeeded
              ? `Perlu tambahan ${
                  totalDoctorsNeeded - affordableDoctors
                } dokter di tahap selanjutnya`
              : null,
          ].filter(Boolean),
        });
      }
    }
  }

  // Environmental Score Recommendations
  if (scores.env_score && scores.env_score.score < 0.6) {
    const currentAQI = data.aqi;
    const currentNDVI = data.ndvi;
    const targetAQI = 50; // Good air quality
    const targetNDVI = 0.6; // Healthy vegetation

    const aqiImprovement = Math.max(0, currentAQI - targetAQI);
    const ndviImprovement = Math.max(0, targetNDVI - currentNDVI);

    if (aqiImprovement > 0 || ndviImprovement > 0) {
      const aqiCostPerPoint = 500_000_000; // Rp 500 juta per poin AQI
      const ndviCostPer01Point = 1_000_000_000; // Rp 1 miliar per 0.1 poin NDVI

      // Hitung improvement yang affordable
      let affordableAQIImprovement = 0;
      let affordableNDVIImprovement = 0;
      let remainingBudget = maxBudgetPerParameter;

      // Prioritas AQI karena lebih urgent untuk kesehatan
      if (aqiImprovement > 0) {
        affordableAQIImprovement = Math.min(
          aqiImprovement,
          remainingBudget / aqiCostPerPoint
        );
        remainingBudget -= affordableAQIImprovement * aqiCostPerPoint;
      }

      // Sisa budget untuk NDVI
      if (ndviImprovement > 0 && remainingBudget > 0) {
        const ndviPointsAffordable = remainingBudget / ndviCostPer01Point;
        affordableNDVIImprovement = Math.min(
          ndviImprovement,
          ndviPointsAffordable
        );
      }

      const actualCost =
        affordableAQIImprovement * aqiCostPerPoint +
        affordableNDVIImprovement * ndviCostPer01Point;
      const budgetUtilization = (actualCost / maxBudgetPerParameter) * 100;

      if (affordableAQIImprovement > 0 || affordableNDVIImprovement > 0) {
        const targetAQIAchievable = currentAQI - affordableAQIImprovement;
        const targetNDVIAchievable = currentNDVI + affordableNDVIImprovement;

        recommendations.push({
          parameter: "Environmental Quality",
          priority: currentAQI > 100 || currentNDVI < 0.3 ? "High" : "Medium",
          totalNeeded: {
            aqiImprovement: aqiImprovement.toFixed(1),
            ndviImprovement: ndviImprovement.toFixed(2),
          },
          affordable: {
            aqiImprovement: affordableAQIImprovement.toFixed(1),
            ndviImprovement: affordableNDVIImprovement.toFixed(2),
            achievableAQI: targetAQIAchievable.toFixed(1),
            achievableNDVI: targetNDVIAchievable.toFixed(2),
          },
          gap: {
            remainingAQI: (aqiImprovement - affordableAQIImprovement).toFixed(
              1
            ),
            remainingNDVI: (
              ndviImprovement - affordableNDVIImprovement
            ).toFixed(2),
            currentAQI: currentAQI,
            currentNDVI: currentNDVI.toFixed(2),
          },
          cost: actualCost,
          budgetUtilization: budgetUtilization,
          maxBudget: maxBudgetPerParameter,
          description: `Dapat memperbaiki AQI sebesar ${affordableAQIImprovement.toFixed(
            1
          )} poin dan NDVI sebesar ${affordableNDVIImprovement.toFixed(
            2
          )} poin`,
          actions: [
            affordableAQIImprovement > 0
              ? `Program perbaikan kualitas udara (target AQI: ${targetAQIAchievable.toFixed(
                  1
                )})`
              : null,
            affordableNDVIImprovement > 0
              ? `Program penghijauan untuk mencapai NDVI ${targetNDVIAchievable.toFixed(
                  2
                )}`
              : null,
            "Pembatasan emisi kendaraan dan industri",
            "Penanaman pohon strategis di area urban",
            "Monitoring kualitas udara real-time",
            aqiImprovement - affordableAQIImprovement > 0
              ? `Perlu program lanjutan untuk ${(
                  aqiImprovement - affordableAQIImprovement
                ).toFixed(1)} poin AQI`
              : null,
          ].filter(Boolean),
        });
      }
    }
  }

  // Poverty Index Recommendations
  if (scores.poverty_index && scores.poverty_index.score < 0.7) {
    const currentPovertyRate = data.poverty_index;
    const targetPovertyRate = 5; // Target nasional 5%
    const povertyReduction = Math.max(
      0,
      currentPovertyRate - targetPovertyRate
    );

    if (povertyReduction > 0) {
      const totalPoorPeople = Math.round(
        (currentPovertyRate * data.jumlah_penduduk) / 100
      );
      const targetPoorPeople = Math.round(
        (targetPovertyRate * data.jumlah_penduduk) / 100
      );
      const peopleToLift = totalPoorPeople - targetPoorPeople;

      const costPerPerson = 3_600_000; // Rp 3.6 juta per orang per tahun
      const totalCostNeeded = peopleToLift * costPerPerson;

      const affordablePeopleToLift = Math.min(
        peopleToLift,
        Math.floor(maxBudgetPerParameter / costPerPerson)
      );

      const actualCost = affordablePeopleToLift * costPerPerson;
      const budgetUtilization = (actualCost / maxBudgetPerParameter) * 100;
      const achievablePovertyRate =
        currentPovertyRate -
        (affordablePeopleToLift / data.jumlah_penduduk) * 100;

      if (affordablePeopleToLift > 0) {
        recommendations.push({
          parameter: "Poverty Reduction",
          priority: currentPovertyRate > 10 ? "High" : "Medium",
          totalNeeded: {
            povertyReduction: povertyReduction.toFixed(1),
            peopleToLift: peopleToLift,
          },
          affordable: {
            peopleToLift: affordablePeopleToLift,
            achievablePovertyRate: achievablePovertyRate.toFixed(1),
            povertyReductionAchievable: (
              currentPovertyRate - achievablePovertyRate
            ).toFixed(1),
          },
          gap: {
            remainingPoorPeople: peopleToLift - affordablePeopleToLift,
            currentPovertyRate: currentPovertyRate,
            remainingPovertyRate: (
              achievablePovertyRate - targetPovertyRate
            ).toFixed(1),
          },
          cost: actualCost,
          budgetUtilization: budgetUtilization,
          maxBudget: maxBudgetPerParameter,
          description: `Dapat mengentaskan kemiskinan ${affordablePeopleToLift.toLocaleString(
            "id-ID"
          )} orang (menurunkan tingkat kemiskinan menjadi ${achievablePovertyRate.toFixed(
            1
          )}%)`,
          actions: [
            `Program bantuan langsung untuk ${affordablePeopleToLift.toLocaleString(
              "id-ID"
            )} keluarga miskin`,
            "Pelatihan keterampilan dan program kewirausahaan",
            "Akses kredit mikro dan UMKM",
            "Program padat karya berbasis masyarakat",
            affordablePeopleToLift < peopleToLift
              ? `Perlu program lanjutan untuk ${(
                  peopleToLift - affordablePeopleToLift
                ).toLocaleString("id-ID")} orang`
              : null,
          ].filter(Boolean),
        });
      }
    }
  }

  // Birth Mortality Recommendations
  if (scores.birth_mortality && scores.birth_mortality.score < 0.7) {
    const currentMortalityRate = data.birth_mortality;
    const targetMortalityRate = 7; // Target SDGs
    const mortalityGap = Math.max(
      0,
      currentMortalityRate - targetMortalityRate
    );

    if (mortalityGap > 0) {
      const estimatedBirths = Math.round((data.jumlah_penduduk * 20) / 1000); // CBR 20 per 1000
      const costPerBirth = 2_500_000; // Rp 2.5 juta program per persalinan
      const totalCostNeeded = estimatedBirths * costPerBirth;

      const affordableBirths = Math.min(
        estimatedBirths,
        Math.floor(maxBudgetPerParameter / costPerBirth)
      );

      const actualCost = affordableBirths * costPerBirth;
      const budgetUtilization = (actualCost / maxBudgetPerParameter) * 100;
      const coveragePercentage = (affordableBirths / estimatedBirths) * 100;
      const achievableMortalityReduction =
        mortalityGap * (coveragePercentage / 100);
      const achievableMortalityRate =
        currentMortalityRate - achievableMortalityReduction;

      if (affordableBirths > 0) {
        recommendations.push({
          parameter: "Maternal & Child Health",
          priority: currentMortalityRate > 12 ? "High" : "Medium",
          totalNeeded: {
            estimatedBirths: estimatedBirths,
            mortalityReduction: mortalityGap.toFixed(1),
          },
          affordable: {
            birthsCovered: affordableBirths,
            coveragePercentage: coveragePercentage.toFixed(1),
            achievableMortalityRate: achievableMortalityRate.toFixed(1),
            mortalityReduction: achievableMortalityReduction.toFixed(1),
          },
          gap: {
            uncoveredBirths: estimatedBirths - affordableBirths,
            currentMortalityRate: currentMortalityRate,
            remainingMortalityGap: (
              achievableMortalityRate - targetMortalityRate
            ).toFixed(1),
          },
          cost: actualCost,
          budgetUtilization: budgetUtilization,
          maxBudget: maxBudgetPerParameter,
          description: `Dapat mencover ${affordableBirths.toLocaleString(
            "id-ID"
          )} persalinan (${coveragePercentage.toFixed(
            1
          )}% coverage) dan menurunkan angka kematian bayi menjadi ${achievableMortalityRate.toFixed(
            1
          )}`,
          actions: [
            `Program ANC terpadu untuk ${affordableBirths.toLocaleString(
              "id-ID"
            )} ibu hamil`,
            "Pelatihan bidan dan tenaga kesehatan ibu-anak",
            "Pembangunan rumah tunggu kelahiran prioritas",
            "Program imunisasi dan gizi balita",
            affordableBirths < estimatedBirths
              ? `Perlu program tambahan untuk ${(
                  estimatedBirths - affordableBirths
                ).toLocaleString("id-ID")} persalinan`
              : null,
          ].filter(Boolean),
        });
      }
    }
  }

  // Life Expectancy Recommendations
  if (scores.life_expectancy_rate && scores.life_expectancy_rate.score < 0.8) {
    const currentLifeExpectancy = data.life_expectancy_rate;
    const targetLifeExpectancy = 75; // Target nasional
    const expectancyGap = Math.max(
      0,
      targetLifeExpectancy - currentLifeExpectancy
    );

    if (expectancyGap > 0) {
      const costPerCapitaPerYear = 180_000; // Rp 180 ribu per penduduk per tahun
      const totalCostNeeded =
        data.jumlah_penduduk * costPerCapitaPerYear * expectancyGap;

      const affordableYearImprovement = Math.min(
        expectancyGap,
        maxBudgetPerParameter / (data.jumlah_penduduk * costPerCapitaPerYear)
      );

      const actualCost =
        data.jumlah_penduduk * costPerCapitaPerYear * affordableYearImprovement;
      const budgetUtilization = (actualCost / maxBudgetPerParameter) * 100;
      const achievableLifeExpectancy =
        currentLifeExpectancy + affordableYearImprovement;

      if (affordableYearImprovement > 0) {
        recommendations.push({
          parameter: "Life Expectancy Improvement",
          priority: currentLifeExpectancy < 70 ? "High" : "Medium",
          totalNeeded: {
            yearGap: expectancyGap.toFixed(1),
            currentAge: currentLifeExpectancy,
            targetAge: targetLifeExpectancy,
          },
          affordable: {
            yearImprovement: affordableYearImprovement.toFixed(1),
            achievableAge: achievableLifeExpectancy.toFixed(1),
          },
          gap: {
            remainingYearGap: (
              expectancyGap - affordableYearImprovement
            ).toFixed(1),
            remainingToTarget: (
              targetLifeExpectancy - achievableLifeExpectancy
            ).toFixed(1),
          },
          cost: actualCost,
          budgetUtilization: budgetUtilization,
          maxBudget: maxBudgetPerParameter,
          description: `Dapat meningkatkan harapan hidup sebesar ${affordableYearImprovement.toFixed(
            1
          )} tahun (dari ${currentLifeExpectancy} menjadi ${achievableLifeExpectancy.toFixed(
            1
          )} tahun)`,
          actions: [
            "Program pencegahan penyakit tidak menular",
            "Peningkatan akses layanan kesehatan primer",
            "Program gizi masyarakat dan keamanan pangan",
            "Peningkatan sanitasi dan akses air bersih",
            affordableYearImprovement < expectancyGap
              ? `Perlu program lanjutan untuk ${(
                  expectancyGap - affordableYearImprovement
                ).toFixed(1)} tahun tambahan`
              : null,
          ].filter(Boolean),
        });
      }
    }
  }

  // Disease Vulnerability Recommendations
  if (
    scores.disease_vulnerability &&
    scores.disease_vulnerability.score < 0.6
  ) {
    const currentVulnerability = data.disease_vulnerability;
    const targetVulnerability = 3;
    const vulnerabilityGap = Math.max(
      0,
      currentVulnerability - targetVulnerability
    );

    if (vulnerabilityGap > 0) {
      const costPerCapitaPerPoint = 150_000; // Rp 150 ribu per penduduk per poin
      const totalCostNeeded =
        data.jumlah_penduduk * costPerCapitaPerPoint * vulnerabilityGap;

      const affordableVulnerabilityReduction = Math.min(
        vulnerabilityGap,
        maxBudgetPerParameter / (data.jumlah_penduduk * costPerCapitaPerPoint)
      );

      const actualCost =
        data.jumlah_penduduk *
        costPerCapitaPerPoint *
        affordableVulnerabilityReduction;
      const budgetUtilization = (actualCost / maxBudgetPerParameter) * 100;
      const achievableVulnerability =
        currentVulnerability - affordableVulnerabilityReduction;

      if (affordableVulnerabilityReduction > 0) {
        recommendations.push({
          parameter: "Disease Prevention",
          priority: currentVulnerability > 7 ? "High" : "Medium",
          totalNeeded: {
            vulnerabilityGap: vulnerabilityGap.toFixed(1),
            currentLevel: currentVulnerability,
            targetLevel: targetVulnerability,
          },
          affordable: {
            vulnerabilityReduction: affordableVulnerabilityReduction.toFixed(1),
            achievableLevel: achievableVulnerability.toFixed(1),
          },
          gap: {
            remainingVulnerability: (
              vulnerabilityGap - affordableVulnerabilityReduction
            ).toFixed(1),
            remainingToTarget: (
              achievableVulnerability - targetVulnerability
            ).toFixed(1),
          },
          cost: actualCost,
          budgetUtilization: budgetUtilization,
          maxBudget: maxBudgetPerParameter,
          description: `Dapat menurunkan tingkat kerentanan penyakit sebesar ${affordableVulnerabilityReduction.toFixed(
            1
          )} poin (dari ${currentVulnerability} menjadi ${achievableVulnerability.toFixed(
            1
          )})`,
          actions: [
            "Program surveillance dan deteksi dini penyakit",
            "Kampanye imunisasi dan vaksinasi massal",
            "Sistem peringatan dini wabah",
            "Program edukasi kesehatan masyarakat",
            affordableVulnerabilityReduction < vulnerabilityGap
              ? `Perlu program lanjutan untuk ${(
                  vulnerabilityGap - affordableVulnerabilityReduction
                ).toFixed(1)} poin kerentanan`
              : null,
          ].filter(Boolean),
        });
      }
    }
  }

  // Sort recommendations by priority and budget utilization
  return recommendations.sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (b.priority === "High" && a.priority !== "High") return 1;
    return b.budgetUtilization - a.budgetUtilization; // Highest utilization first within same priority
  });
};

const GapScoreCalculator = ({ isCompact = false, regionData }) => {
  const [selectedParamIds, setSelectedParamIds] = useState([
    "poverty_index",
    "health_infra_score",
    "env_score",
  ]);
  const [calculatedScores, setCalculatedScores] = useState({});
  const [combinedGapScore, setCombinedGapScore] = useState(0);
  const [allocation, setAllocation] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  regionData.jumlah_dokter = regionData.jumlah_dokter || 2242;
  regionData.jumlah_faskes = regionData.jumlah_faskes || 204;
  regionData.humidity = regionData.humidity || 75;
  regionData.temperature = regionData.temperature || 25;
  regionData.life_expectancy_rate = regionData.life_expectancy_rate || 75;
  regionData.living_cost = regionData.living_cost || 106.9;
  regionData.population_density = regionData.population_density || 1000;
  regionData.disease_vulnerability = regionData.disease_vulnerability || 3;
  regionData.birth_mortality = regionData.birth_mortality || 7;
  regionData.sunshine_duration = regionData.sunshine_duration || 12;
  regionData.aqi = regionData.aqi || 50;
  regionData.ndvi = regionData.ndvi || 0.5;
  regionData.poverty_index = regionData.poverty_index || 7.77;

  const handleChipToggle = (paramId) => {
    setSelectedParamIds((prev) =>
      prev.includes(paramId)
        ? prev.filter((id) => id !== paramId)
        : [...prev, paramId]
    );
  };

  useEffect(() => {
    if (selectedParamIds.length === 0) {
      setCalculatedScores({});
      setCombinedGapScore(0);
      setAllocation(0);
      setRecommendations([]);
      return;
    }

    const currentRegionData = regionData;
    const newScores = {};
    let totalGap = 0;
    const weightPerParam = 1 / selectedParamIds.length;

    allParameters.forEach((param) => {
      if (selectedParamIds.includes(param.id)) {
        const score = param.scoreFunction(currentRegionData);
        newScores[param.id] = {
          label: param.label,
          rawValue: param.getValue(currentRegionData),
          score: score,
          gap: 1 - score,
          weight: weightPerParam,
        };
        totalGap += 1 - score;
      }
    });

    const currentCombinedGapScore = totalGap / selectedParamIds.length;

    const newRecommendations = getParameterRecommendations(
      currentRegionData,
      newScores,
      allocation
    );

    setCalculatedScores(newScores);
    setCombinedGapScore(currentCombinedGapScore);
    setRecommendations(newRecommendations);

    const calculatedAllocation =
      (currentCombinedGapScore / TOTAL_ALLOCATION_FACTOR) * TOTAL_BUDGET;
    setAllocation(calculatedAllocation);
  }, [selectedParamIds, regionData, allocation]);

  if (allocation === 0) {
    return <div>Loading...</div>;
  }
  console.log(recommendations);
  return (
    <>
      {isCompact ? (
        <div className="">
          <div className=" mx-auto space-y-4">
            {selectedParamIds.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Gap Score - Prominent Display */}
                <div className="lg:col-span-1 flex items-center justify-center flex-col  bg-gradient-to-br from-blue-600 to-blue-700 text-white border-2 border-blue-800 rounded-xl p-4 text-center">
                  <h2 className="text-lg font-semibold mb-2">Gap Score</h2>
                  <div className="text-5xl font-bold mb-2">
                    {combinedGapScore.toFixed(3)}
                  </div>
                  <p className="text-sm opacity-90">
                    Tinggi = Butuh Dana Lebih
                  </p>
                </div>

                {/* Allocation Result */}
                <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="w-full flex justify-between">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Estimasi Alokasi Dana
                    </h3>
                    <div className="text-sm text-gray-500">
                      Kalkulasi dengan {selectedParamIds.length} parameter
                    </div>
                  </div>

                  <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 mb-4">
                    <p className="text-green-700 font-medium text-sm mb-1">
                      Rekomendasi untuk {regionData.province.toUpperCase()}
                    </p>
                    <div className="text-2xl font-bold text-green-800">
                      {formatCurrency(allocation)}
                    </div>
                  </div>

                  <Link
                    href={`/calculate/${regionData?.province?.toLowerCase()}`}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    <span>Ubah parameter</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
                <div className="text-gray-400 mb-3">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-1">
                  Pilih Parameter
                </h3>
                <p className="text-sm text-gray-500">
                  Klik parameter di atas untuk mulai kalkulasi
                </p>
              </div>
            )}

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Rekomendasi Alokasi Anggaran
                    </h3>
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="bg-white/80 border border-gray-300 p-6 rounded-xl"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {rec.parameter}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                rec.priority === "High"
                                  ? "bg-red-100 text-red-700"
                                  : rec.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {rec.priority} Priority
                            </span>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {rec.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-blue-900 mb-2">
                                Alokasi Anggaran
                              </h5>
                              <p className="text-blue-800">
                                {formatCurrency(rec.cost)}
                              </p>
                              <p className="text-sm text-blue-600 mt-1">
                                {(rec.budgetUtilization * 0.125).toFixed(2)}%
                                dari total anggaran
                              </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-green-900 mb-2">
                                Target Pencapaian
                              </h5>
                              {rec.parameter === "Environmental Quality" && (
                                <div className="text-green-800 text-sm">
                                  <p>
                                    AQI Target: {rec.affordable.achievableAQI}
                                  </p>
                                  <p>
                                    NDVI Target: {rec.affordable.achievableNDVI}
                                  </p>
                                </div>
                              )}
                              {rec.parameter === "Poverty Reduction" && (
                                <div className="text-green-800 text-sm">
                                  <p>
                                    Orang Terentaskan:{" "}
                                    {rec.affordable.peopleToLift.toLocaleString(
                                      "id-ID"
                                    )}
                                  </p>
                                  <p>
                                    Tingkat Kemiskinan:{" "}
                                    {rec.affordable.achievablePovertyRate}%
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-gray-900 mb-3">
                              Rencana Aksi
                            </h5>
                            <ul className="space-y-2">
                              {rec.actions.map((action, actionIndex) => (
                                <li
                                  key={actionIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 text-sm">
                                    {action}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {rec.gap && (
                            <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                              <h5 className="font-semibold text-orange-900 mb-2">
                                Gap yang Tersisa
                              </h5>
                              {rec.parameter === "Environmental Quality" && (
                                <div className="text-orange-800 text-sm">
                                  <p>AQI saat ini: {rec.gap.currentAQI}</p>
                                  <p>NDVI saat ini: {rec.gap.currentNDVI}</p>
                                </div>
                              )}
                              {rec.parameter === "Poverty Reduction" && (
                                <div className="text-orange-800 text-sm">
                                  <p>
                                    Masih perlu ditangani:{" "}
                                    {rec.gap.remainingPoorPeople.toLocaleString(
                                      "id-ID"
                                    )}{" "}
                                    orang
                                  </p>
                                  <p>
                                    Tingkat kemiskinan tersisa:{" "}
                                    {rec.gap.remainingPovertyRate}%
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className=" mx-auto space-y-6">
            {/*     Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Kalkulator Alokasi Dana Kesehatan
              </h1>
              <p className="text-gray-600 capitalize">
                {regionData.province.toUpperCase()}
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Parameter Evaluasi
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedParamIds.length > 0
                    ? `${selectedParamIds.length} parameter • ${(
                        100 / selectedParamIds.length
                      ).toFixed(1)}% per parameter`
                    : "Pilih parameter untuk kalkulasi"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {allParameters.map((param) => {
                  const isSelected = selectedParamIds.includes(param.id);
                  return (
                    <button
                      key={param.id}
                      onClick={() => handleChipToggle(param.id)}
                      className={`px-4 py-2 text-sm rounded-full border-2 font-medium transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      {param.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedParamIds.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gap Score - Prominent Display */}
                <div className="lg:col-span-1 flex items-center justify-center flex-col  bg-gradient-to-br from-blue-600 to-blue-700 text-white border-2 border-blue-800 rounded-xl p-6 text-center">
                  <h2 className="text-lg font-semibold mb-2">Gap Score</h2>
                  <div className="text-5xl font-bold mb-2">
                    {combinedGapScore.toFixed(3)}
                  </div>
                  <p className="text-sm opacity-90">
                    Tinggi = Butuh Dana Lebih
                  </p>
                </div>

                {/* Allocation Result */}
                <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Estimasi Alokasi Dana
                  </h3>

                  <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 mb-4">
                    <p className="text-green-700 font-medium text-sm mb-1">
                      Rekomendasi untuk {regionData.province.toUpperCase()}
                    </p>
                    <div className="text-2xl font-bold text-green-800">
                      {formatCurrency(allocation)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Gap Score:</span>
                      <span className="font-bold">
                        {combinedGapScore.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Factor:</span>
                      <span className="font-bold">
                        {TOTAL_ALLOCATION_FACTOR}
                      </span>
                    </div>
                    <div className="col-span-2 text-xs text-gray-500 pt-2 border-t border-gray-200">
                      Formula: (Gap Score ÷ {TOTAL_ALLOCATION_FACTOR}) ×{" "}
                      {formatCurrency(TOTAL_BUDGET)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
                <div className="text-gray-400 mb-3">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-1">
                  Pilih Parameter
                </h3>
                <p className="text-sm text-gray-500">
                  Klik parameter di atas untuk mulai kalkulasi
                </p>
              </div>
            )}

            {selectedParamIds.length > 0 && (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Detail Parameter
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(calculatedScores).map(([id, data]) => (
                    <div
                      key={id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 text-sm leading-tight">
                          {data.label}
                        </h4>
                        <div
                          className={`px-2 py-1 text-xs font-bold rounded border ${
                            data.score > 0.7
                              ? "bg-green-50 text-green-700 border-green-200"
                              : data.score > 0.4
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {data.score.toFixed(3)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>
                          <span className="font-medium">Raw:</span>{" "}
                          {typeof data.rawValue === "number"
                            ? data.rawValue.toFixed(2)
                            : data.rawValue.slice(0, 30) +
                              (data.rawValue.length > 30 ? "..." : "")}
                        </div>
                        <div>
                          <span className="font-medium">Gap:</span>{" "}
                          <span className="text-red-600 font-bold">
                            {data.gap.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Rekomendasi Alokasi Anggaran
                    </h3>
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="bg-white/80 border border-gray-300 p-6 rounded-xl"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {rec.parameter}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                rec.priority === "High"
                                  ? "bg-red-100 text-red-700"
                                  : rec.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {rec.priority} Priority
                            </span>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {rec.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-blue-900 mb-2">
                                Alokasi Anggaran
                              </h5>
                              <p className="text-blue-800">
                                {formatCurrency(rec.cost)}
                              </p>
                              <p className="text-sm text-blue-600 mt-1">
                                {(rec.budgetUtilization * 0.125).toFixed(2)}%
                                dari total anggaran
                              </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-green-900 mb-2">
                                Target Pencapaian
                              </h5>
                              {rec.parameter === "Environmental Quality" && (
                                <div className="text-green-800 text-sm">
                                  <p>
                                    AQI Target: {rec.affordable.achievableAQI}
                                  </p>
                                  <p>
                                    NDVI Target: {rec.affordable.achievableNDVI}
                                  </p>
                                </div>
                              )}
                              {rec.parameter === "Poverty Reduction" && (
                                <div className="text-green-800 text-sm">
                                  <p>
                                    Orang Terentaskan:{" "}
                                    {rec.affordable.peopleToLift.toLocaleString(
                                      "id-ID"
                                    )}
                                  </p>
                                  <p>
                                    Tingkat Kemiskinan:{" "}
                                    {rec.affordable.achievablePovertyRate}%
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-gray-900 mb-3">
                              Rencana Aksi
                            </h5>
                            <ul className="space-y-2">
                              {rec.actions.map((action, actionIndex) => (
                                <li
                                  key={actionIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                  <span className="text-gray-700 text-sm">
                                    {action}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {rec.gap && (
                            <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                              <h5 className="font-semibold text-orange-900 mb-2">
                                Gap yang Tersisa
                              </h5>
                              {rec.parameter === "Environmental Quality" && (
                                <div className="text-orange-800 text-sm">
                                  <p>AQI saat ini: {rec.gap.currentAQI}</p>
                                  <p>NDVI saat ini: {rec.gap.currentNDVI}</p>
                                </div>
                              )}
                              {rec.parameter === "Poverty Reduction" && (
                                <div className="text-orange-800 text-sm">
                                  <p>
                                    Masih perlu ditangani:{" "}
                                    {rec.gap.remainingPoorPeople.toLocaleString(
                                      "id-ID"
                                    )}{" "}
                                    orang
                                  </p>
                                  <p>
                                    Tingkat kemiskinan tersisa:{" "}
                                    {rec.gap.remainingPovertyRate}%
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GapScoreCalculator;
