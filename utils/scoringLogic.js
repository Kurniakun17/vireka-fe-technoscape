// lib/scoringLogic.js

// --- Helper Normalization Functions (jika diperlukan, contoh) ---
const normalize = (value, min, max) => {
    if (max === min) return 1; // or 0, depending on context
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
};

// --- Parameter Scoring Functions (output 0-1, 1 is best) ---

// 1. Poverty Index Score
export const povertyIndexScore = (povertyIndex) => {
    // Asumsi: Semakin rendah indeks kemiskinan, semakin baik.
    // Target ideal 0%. Skor 0 jika povertyIndex >= 20% (misalnya).
    return Math.max(0, 1 - (povertyIndex / 20));
};

// 2. Environmental Score
const calculatePm25Score = (pm25) => { // WHO annual mean guideline < 5 µg/m³
    return Math.max(0, 1 - (pm25 / 50)); // Skor 0 jika PM2.5 >= 50 µg/m³
};
const calculateCoScore = (co) => { // Data CO: 33.278 µg/m³. WHO 24h: 4 mg/m³ (4000 µg/m³).
                                    // Nilai data sangat rendah, mungkin unitnya berbeda atau sudah sangat bersih.
                                    // Asumsi ambang batas tinggi agar skor tidak selalu 1.
    return Math.max(0, 1 - (co / 1000)); // Skor 0 jika CO >= 1000 µg/m³
};
const calculateSo2Score = (so2) => { // WHO 24h: 40 µg/m³. Data: 138.503 µg/m³
    return Math.max(0, 1 - (so2 / 200)); // Skor 0 jika SO2 >= 200 µg/m³
};
const calculateNo2Score = (no2) => { // WHO annual: 10 µg/m³, 24h: 25 µg/m³. Data: 120.354 µg/m³
    return Math.max(0, 1 - (no2 / 150)); // Skor 0 jika NO2 >= 150 µg/m³
};
const calculateO3Score = (o3_ppm) => { // WHO 8h mean: 100 µg/m³ (approx 0.05 ppm). Data: 0.117 ppm
    return Math.max(0, 1 - (o3_ppm / 0.15)); // Skor 0 jika O3 >= 0.15 ppm
};

export const environmentalScore = (data) => {
    const { temperature, humidity, sunshine_duration, pm25, co, so2, no2, o3, precipitation, ndvi } = data;

    // Climate sub-scores
    const temp_score = Math.max(0, 1 - Math.abs(temperature - 27) / 10);
    const humidity_score = Math.max(0, 1 - Math.abs(humidity - 60) / 40);
    const sun_score = Math.max(0, 1 - Math.abs(sunshine_duration - 7) / 7);

    // Air Pollution sub-scores
    const pm25_s = calculatePm25Score(pm25);
    const co_s = calculateCoScore(co);
    const so2_s = calculateSo2Score(so2);
    const no2_s = calculateNo2Score(no2);
    const o3_s = calculateO3Score(o3);

    const air_pollution_score = (pm25_s * 0.2 + co_s * 0.2 + so2_s * 0.2 + no2_s * 0.2 + o3_s * 0.2);
    const chemical_score = (so2_s * 0.5 + no2_s * 0.5); // Menggunakan skor SO2 & NO2 yang sudah dihitung

    // Water & Agri sub-scores
    // Asumsi ideal precipitation 5mm/day, deviasi 10mm memberi skor 0.
    const water_score = Math.max(0, 1 - Math.abs(precipitation - 5) / 10);
    // NDVI score: -1 to 1. Normalisasi ke 0-1. (value + 1) / 2
    const agriculture_score = Math.max(0, (ndvi + 1) / 2);

    // Climate Score (menggunakan water_score sebagai rain_climate_score)
    const climate_score = (water_score * 0.25 + temp_score * 0.25 + humidity_score * 0.25 + sun_score * 0.25);

    const final_env_score = (
        air_pollution_score * 0.2 +
        water_score * 0.2 +
        chemical_score * 0.2 +
        agriculture_score * 0.2 +
        climate_score * 0.2
    );
    return roundTo3(final_env_score);
};

// 3. Health Infrastructure Score
export const healthInfraScore = (jumlah_dokter, jumlah_faskes, jumlah_penduduk) => {
    const T = jumlah_dokter;
    const F = jumlah_faskes;
    const P = jumlah_penduduk;

    const R_T = 1 / 1000; // Target rasio dokter per penduduk
    const R_F = 1 / 10000; // Target rasio faskes per penduduk
    // Rasio ideal total (dokter+faskes) per penduduk, contoh ini 44.5/10000, mungkin perlu disesuaikan
    // Ini adalah (target dokter + target faskes) / P
    // Atau ini adalah target jumlah nakes per penduduk?
    // Dari V4: R_TF=44.5/10000 seems to be an independent target for combined resources.
    // Let's use your formula as is.
    const R_TF = 44.5 / 10000;


    const actual_T_per_P = T / P;
    const actual_F_per_P = F / P;
    const actual_TF_per_P = (T + F) / P; // This is one interpretation for actual_TF

    // Alternative interpretation for actual_TF, if R_TF is a ratio for combined resources,
    // it should be compared against (T+F)/P. Your formula below uses actual_T, actual_F, actual_TF
    // as separate ratios. Let's re-evaluate R_TF's meaning.
    // The formula given `min(1, actual_TF / R_TF)` suggests actual_TF is also a ratio.
    // If R_TF is for T+F, then it could be actual_TF = (T+F)/P.

    // The provided formula is:
    // score = ( min(1, actual_T / R_T) + min(1, actual_F / R_F) + min(1, actual_TF / R_TF) ) / 3
    // This implies actual_T, actual_F, actual_TF are like-for-like comparisons with their respective R_ values.
    // It's slightly unusual as actual_TF is (T+F)/P, while R_T is T/P and R_F is F/P.
    // Let's stick to the provided formula:
    const score_T = Math.min(1, actual_T_per_P / R_T);
    const score_F = Math.min(1, actual_F_per_P / R_F);

    // Re-evaluating actual_TF in the context of R_TF=44.5/10000
    // If R_TF is a target for (T+F)/P, then we use actual_TF_per_P
    const score_TF = Math.min(1, actual_TF_per_P / R_TF);

    const score = (score_T + score_F + score_TF) / 3;
    return roundTo3(score);
};


// 4. Birth Mortality Score
export const birthMortalityScore = (mortality_rate) => { // per 1,000 kelahiran
    // Idealnya < 12 per 1.000 kelahiran (WHO threshold).
    // Formula Anda: max(1 - (mortality_rate / 20), 0)
    // Ini berarti skor 0 jika rate >= 20. Skor 1 jika rate = 0.
    // Jika rate 12, skor = 1 - (12/20) = 1 - 0.6 = 0.4.
    return roundTo3(Math.max(0, 1 - (mortality_rate / 20)));
};

// 5. Life Expectancy Rate Score
export const lifeExpectancyScore = (life_expectancy) => { // tahun
    // Idealnya 75 tahun ke atas.
    // Formula Anda: min(life_expectancy / 80, 1)
    // Ini berarti skor 1 jika life_expectancy >= 80.
    return roundTo3(Math.min(1, life_expectancy / 80));
};

// 6. Disease Vulnerability Score
export const diseaseVulnerabilityScore = (disease_cases_per_100k) => {
    // Semakin tinggi kasus, semakin rendah skor.
    // Formula Anda: max(1 - (disease_cases_per_100k / 1000), 0)
    // Ini berarti skor 0 jika kasus >= 1000 per 100k.
    return roundTo3(Math.max(0, 1 - (disease_cases_per_100k / 1000)));
};

// 7. Population Density Score
export const populationDensityScore = (density_per_km2) => { // jiwa/km²
    // Ideal di bawah 1.000/km².
    // Formula Anda: max(1 - (density / 10000), 0)
    // Ini berarti skor 0 jika density >= 10,000/km².
    // Jakarta Barat: 2,440,302 penduduk. Luas sekitar 124.4 km². Kepadatan ~19,616 jiwa/km².
    // Jika data `population_density: 16.591` adalah 16,591 jiwa/km², maka skor akan 0.
    // Jika 16.591 adalah per km2, skornya ~1.
    // Mari kita asumsikan data.population_density adalah nilai yang langsung dimasukkan ke rumus.
    return roundTo3(Math.max(0, 1 - (density_per_km2 / 10000)));
};

// 8. Environmental Characteristics Score
export const environmentalCharacteristicsScore = (type_) => {
    const mapping = {
        'lowland': 1.0,
        'coastal': 0.9,
        'urban flat': 0.8,
        'mountainous': 0.6,
        'disaster-prone': 0.4
    };
    return mapping[type_?.toLowerCase()] || 0.5; // default 0.5 if type not found
};

// 9. Living Cost Score
export const livingCostScore = (ihk_index) => {
    // Semakin tinggi biaya hidup, semakin rendah skor. Ambil baseline IHK nasional = 100.
    // Formula Anda: max(1 - ((ihk_index - 100) / 100), 0)
    // Jika IHK = 100, skor = 1. Jika IHK = 200, skor = 0. Jika IHK < 100 (misal 50), skor = 1 - (-50/100) = 1.5 (jadi perlu Math.min(1, ...))
    // Namun, formula Anda tidak ada Math.min(1,...), jadi akan saya ikuti.
    // Jika IHK 105.58, skor = 1 - (5.58 / 100) = 1 - 0.0558 = 0.9442
    return roundTo3(Math.max(0, 1 - ((ihk_index - 100) / 100)));
};


const roundTo3 = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return 0; // Handle non-numeric or NaN
    return Math.round(num * 1000) / 1000;
};

// --- Parameter Definitions ---
export const allParameters = [
    {
        id: 'poverty_index',
        label: 'Poverty Index',
        getValue: (data) => data.poverty_index,
        scoreFunction: (data) => povertyIndexScore(data.poverty_index),
    },
    {
        id: 'env_score',
        label: 'Environmental Score',
        getValue: (data) => 'See Calculation Details', // Composite score
        scoreFunction: (data) => environmentalScore(data),
    },
    {
        id: 'health_infra_score',
        label: 'Health Infrastructure Score',
        getValue: (data) => `Dokter: ${data.jumlah_dokter}, Faskes: ${data.jumlah_faskes}, Penduduk: ${data.jumlah_penduduk}`,
        scoreFunction: (data) => healthInfraScore(data.jumlah_dokter, data.jumlah_faskes, data.jumlah_penduduk),
    },
    {
        id: 'birth_mortality',
        label: 'Birth Mortality Rate',
        getValue: (data) => data.birth_mortality,
        scoreFunction: (data) => birthMortalityScore(data.birth_mortality),
    },
    {
        id: 'life_expectancy_rate',
        label: 'Life Expectancy Rate',
        getValue: (data) => data.life_expectancy_rate,
        scoreFunction: (data) => lifeExpectancyScore(data.life_expectancy_rate),
    },
    {
        id: 'disease_vulnerability',
        label: 'Disease Vulnerability',
        getValue: (data) => data.disease_vulnerability,
        scoreFunction: (data) => diseaseVulnerabilityScore(data.disease_vulnerability),
    },
    {
        id: 'population_density',
        label: 'Population Density',
        getValue: (data) => data.population_density,
        scoreFunction: (data) => populationDensityScore(data.population_density),
    },
    {
        id: 'environmental_characteristics',
        label: 'Environmental Characteristics',
        getValue: (data) => data.evi_characteristics,
        scoreFunction: (data) => environmentalCharacteristicsScore(data.evi_characteristics),
    },
    {
        id: 'living_cost',
        label: 'Living Cost Index',
        getValue: (data) => data.living_cost,
        scoreFunction: (data) => livingCostScore(data.living_cost),
    }
];