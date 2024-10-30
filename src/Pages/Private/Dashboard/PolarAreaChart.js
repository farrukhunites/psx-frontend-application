import React from "react";
import ReactApexChart from "react-apexcharts";

const PolarAreaChart = () => {
  const options = {
    chart: {
      type: "polarArea",
    },
    labels: [
      "Oil & Gas Development Company",
      "Habib Bank Limited",
      "Lucky Cement",
      "Fauji Fertilizer Company",
      "Pakistan Telecommunication Company",
    ],
    fill: {
      opacity: 0.8,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 0,
    },
    yaxis: {
      show: false,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
  };

  const series = [160, 95, 210, 175, 32]; // Example stock holdings for each company

  return (
    <div>
      <h3>Stock Distribution by Company</h3>
      <ReactApexChart
        options={options}
        series={series}
        type="polarArea"
        height={450}
      />
    </div>
  );
};

export default PolarAreaChart;
