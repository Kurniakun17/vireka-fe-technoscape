import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Droplet,
  Info,
  Leaf,
} from "lucide-react";

export default function EnvironmentalDashboard({ data }) {
  console.log(data);
  const getValueText = (value, type) => {
    if (type === "ndvi") {
      if (value < 0.3) return "Low Vegetation";
      if (value > 0.7) return "Dense Vegetation";
      return "Moderate";
    } else if (type === "sentinel") {
      if (value < -15) return "Dry";
      if (value > -8) return "Wet";
      return "Moderate";
    } else if (type === "precipitation") {
      if (value < 10) return "Low";
      if (value > 60) return "Heavy";
      return "Moderate";
    }
    return "";
  };

  const getStatusColor = (value, type) => {
    if (type === "precipitation") {
      if (value < 10) return "bg-yellow-500";
      if (value > 60) return "bg-red-500";
      return "bg-blue-500";
    } else if (type === "sentinel") {
      if (value < 0.3) return "bg-yellow-500";
      if (value > 0.8) return "bg-blue-500";
      return "bg-cyan-500";
    } else if (type === "ndvi") {
      if (value < 0.3) return "bg-yellow-500";
      if (value > 0.7) return "bg-green-600";
      return "bg-green-500";
    }
    return "bg-gray-500";
  };

  const getInsightData = () => {
    const precipText =
      data.precipitation < 10
        ? "Low precipitation levels in this region."
        : data.precipitation > 60
        ? "Heavy rainfall detected in this area."
        : "Moderate rainfall levels are present.";

    const soilText =
      data.sentinel < -15
        ? "Surface moisture readings indicate dry conditions."
        : data.sentinel > -8
        ? "Higher surface moisture levels detected in this area."
        : "Moderate surface moisture levels are present.";

    const ndviText =
      data.ndvi < 0.3
        ? "Low vegetation density in this region."
        : data.ndvi > 0.7
        ? "Dense and healthy vegetation coverage detected."
        : "Moderate vegetation coverage observed.";

    // Overall assessment
    let overallStatus = "neutral";
    let overallMessage = "";

    if (data.ndvi > 0.5 && data.sentinel > -15 && data.sentinel < -8) {
      overallStatus = "positive";
      overallMessage = "Balanced environmental conditions in this region.";
    } else if (
      data.ndvi < 0.3 ||
      data.sentinel < -15 ||
      data.precipitation < 5
    ) {
      overallStatus = "warning";
      overallMessage = "Some environmental indicators show potential concerns.";
    } else {
      overallMessage =
        "General environmental conditions are within normal ranges.";
    }

    return {
      precipitation: precipText,
      soil: soilText,
      ndvi: ndviText,
      overall: {
        status: overallStatus,
        message: overallMessage,
      },
    };
  };

  const insights = getInsightData();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <Leaf className="mr-2 text-green-500" />
          Environmental Monitoring Dashboard
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1" size={16} />
          <span>Updated: 08 May 2020</span>
        </div>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl ">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center">
                <Droplet className="text-blue-600 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-800">
                  Precipitation
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Current rainfall level
              </p>
            </div>
            <span className="text-2xl font-bold text-blue-800">
              {data.precipitation.toFixed(1)} mm
            </span>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {getValueText(data.precipitation, "precipitation")}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-200">
              <div
                style={{ width: `${Math.min(100, data.precipitation * 1.5)}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(
                  data.precipitation,
                  "precipitation"
                )}`}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-5 rounded-xl ">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center">
                <Droplet className="text-cyan-600 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-800">
                  Surface Moisture
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Soil water content</p>
            </div>
            <span className="text-2xl font-bold text-cyan-800">
              {data.sentinel.toFixed(2)} dB
            </span>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200">
                  {getValueText(data.sentinel, "sentinel")}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-cyan-200">
              <div
                style={{ width: `${Math.min(100, data.sentinel * 100)}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(
                  data.sentinel,
                  "sentinel"
                )}`}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl ">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center">
                <Leaf className="text-green-600 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-800">
                  Vegetation (NDVI)
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">Plant health index</p>
            </div>
            <span className="text-2xl font-bold text-green-800">
              {data.ndvi.toFixed(2)}
            </span>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  {getValueText(data.ndvi, "ndvi")}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-green-200">
              <div
                style={{ width: `${Math.min(100, data.ndvi * 100)}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(
                  data.ndvi,
                  "ndvi"
                )}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
