// MapComponent.js
"use client";
import { Loader, ArrowLeft } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchAllProvinceJson } from "@/utils/functions";
import * as topoJson from "topojson-client";
import { useRouter } from "next/navigation";

export default function MapComponent() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [cityGeoJsonData, setCityGeoJsonData] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [isClickedDetail, setIsClickedDetail] = useState({
    state: false,
    data: null,
  });
  const [provinceGapScores, setProvinceGapScores] = useState({});
  const [cityGapScores, setCityGapScores] = useState({});
  const mapRef = useRef(null);
  const router = useRouter();

  // Predefined array of gap scores
  const gapScores = [
    0.25, 0.28, 0.32, 0.35, 0.90, 0.82, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62,
    0.65, 0.68, 0.72, 0.75, 0.78, 0.82, 0.85, 0.88, 0.32, 0.35, 0.92, 0.42,
    0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.65, 0.68, 0.72, 0.75, 0.78, 0.82,
    0.85, 0.88, 0.92, 0.95, 0.82, 0.42, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62,
    0.65, 0.68,
  ];

  useEffect(() => {
    fetchAllProvinceJson().then((data) => {
      // Initialize gap scores for provinces
      const initialProvinceScores = {};
      data.features.forEach((feature, index) => {
        const provinceName = feature.properties.provinsi;
        // Use predefined scores from the array
        initialProvinceScores[provinceName] =
          gapScores[index % gapScores.length];
      });
      setProvinceGapScores(initialProvinceScores);
      setGeoJsonData(data);
      setMapLoading(false);
    });
  }, []);

  const getColorByGapScore = (gapScore) => {
    if (gapScore < 0.4) {
      return "#10B981"; // Yellow for low gap scores
    } else if (gapScore < 0.6) {
      return "#F59E0B"; // Green for medium gap scores
    } else {
      return "#EF4444"; // Red for high gap scores
    }
  };

  const style = (feature) => {
    const provinceName = feature.properties.provinsi;
    const gapScore = provinceGapScores[provinceName] || 0.5;
    return {
      fillColor: getColorByGapScore(gapScore),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties.provinsi;
    const gapScore = provinceGapScores[provinceName] || 0.5;
    console.log(provinceName, gapScore);

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#f7f7f7",
          dashArray: "",
          fillOpacity: 0.9,
          fillColor: getColorByGapScore(gapScore),
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(style(feature));
      },
      click: (e) => {
        const provinceName = feature.properties.provinsi?.toLowerCase();
        const formattedProvinceName = provinceName
          .toLowerCase()
          .replace(" ", "-");
        const fileName = formattedProvinceName + "-simplified-topo.json";

        setIsClickedDetail({
          state: true,
          data: feature,
        });

        const map = mapRef.current;

        const zoomLevel = provinceName.includes("jakarta") ? 10.5 : 8;

        if (map) {
          map.setView(layer.getBounds().getCenter(), zoomLevel);
        }

        fetch("/provinceTopo/" + fileName)
          .then((response) => response.json())
          .then((data) => {
            const convertedData = formatTopoJSON(data, formattedProvinceName);

            const initialCityScores = {};
            convertedData.features.forEach((feature, index) => {
              const cityName = feature.properties.kabkot;
              // Use predefined scores from the array
              initialCityScores[cityName] = gapScores[index % gapScores.length];
            });
            setCityGapScores(initialCityScores);
            setCityGeoJsonData(convertedData);
          })
          .catch((error) => {
            console.error("Error fetching city data:", error);
          });
      },
    });
  };

  const cityStyle = (feature) => {
    const cityName = feature.properties.kabkot;
    const gapScore = cityGapScores[cityName] || 0.5;

    return {
      fillColor: getColorByGapScore(gapScore),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.6,
    };
  };

  const onEachCityFeature = (feature, layer) => {
    const cityName = feature.properties.kabkot;
    const gapScore = cityGapScores[cityName] || 0.5;

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillOpacity: 1,
          fillColor: getColorByGapScore(gapScore),
          weight: 1,
          color: "white",
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(cityStyle(feature));
      },
      click: (e) => {
        router.push(`/region-detail/${cityName}`);
        console.log("City clicked:", cityName);
      },
    });

    layer.bindTooltip(`${cityName} (Gap Score: ${gapScore.toFixed(2)})`, {
      permanent: false,
    });
  };

  const formatTopoJSON = (topoData, attribute) => {
    const convertedData = topoJson.feature(
      topoData,
      topoData.objects[attribute]
    );
    return convertedData;
  };

  const onTapMapBack = () => {
    setCityGeoJsonData(null);
    setIsClickedDetail({
      state: false,
      data: null,
    });

    if (mapRef.current) {
      mapRef.current.setView([-2.5, 118], 5);
    }
  };

  return (
    <div className="w-full h-full relative">
      {isClickedDetail.state && (
        <button
          onClick={onTapMapBack}
          className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Provinces</span>
        </button>
      )}
      {geoJsonData ? (
        <MapContainer
          center={[-2.5, 118]}
          zoom={isClickedDetail.state ? 7 : 5}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
          className={`rounded-lg relative ${mapLoading ? "hidden" : ""}`}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!isClickedDetail.state && (
            <GeoJSON
              data={geoJsonData}
              style={style}
              onEachFeature={onEachFeature}
            />
          )}
          {mapLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          )}
          {isClickedDetail.state && cityGeoJsonData && !mapLoading && (
            <GeoJSON
              data={cityGeoJsonData}
              style={cityStyle}
              onEachFeature={onEachCityFeature}
            />
          )}
        </MapContainer>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat peta...</p>
          </div>
        </div>
      )}
    </div>
  );
}
