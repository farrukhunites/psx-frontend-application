import React from "react";
import ReactApexChart from "react-apexcharts";

const PolarAreaChart = ({ data }) => {
  // Ensure data is an array
  const validData = Array.isArray(data) ? data : [];

  // Map over valid data
  const categories = validData.map((item) => item?.x);
  const values = validData.map((item) => item?.y);

  const options = {
    chart: {
      type: "polarArea",
    },
    labels: categories,
    fill: {
      opacity: 0.8,
    },
    stroke: {
      width: 1,
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

  // Use the values as the series
  const series = values;

  return (
    <div>
      <h3>Stock Distribution by Company</h3>
      {validData.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="polarArea"
          height={450}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PolarAreaChart;
