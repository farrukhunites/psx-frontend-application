import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialBarChart = () => {
  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    legend: {
      show: true,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function () {
              return "100%";
            },
          },
        },
      },
    },
    labels: [
      "Energy",
      "Banking",
      "Cement",
      "Telecommunication",
      "Fertilizer",
      "Steel",
    ],

    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#3F51B5"],
  };

  const series = [44, 55, 67, 83, 69, 92]; // Example sector percentage values

  return (
    <div>
      <h3>Stock Distribution by Sector</h3>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
};

export default RadialBarChart;
