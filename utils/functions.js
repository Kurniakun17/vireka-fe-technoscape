import * as topoJson from "topojson-client";

const formatTopoJSON = (topoData, attribute) => {
  const convertedData = topoJson.feature(topoData, topoData.objects[attribute]);

  return convertedData;
};

const fetchAllProvinceJson = async () => {
  try {
    const response = await fetch("/indonesiaProvince-topo.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const topoData = await response.json();

    const convertedData = formatTopoJSON(topoData, "provinces");

    return convertedData;
  } catch (error) {
    console.error("Error fetching province data:", error);
    throw error;
  }
};

export { formatTopoJSON, fetchAllProvinceJson };
