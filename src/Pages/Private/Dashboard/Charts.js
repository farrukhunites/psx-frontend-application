import React from "react";
import ReactApexChart from "react-apexcharts";

export const LineChart = () => {
  const options = {
    chart: {
      type: "line",
    },
    series: [
      {
        name: "Stock Price",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  return (
    <ReactApexChart options={options} series={options.series} type="line" />
  );
};

export const BarChart = () => {
  const options = {
    chart: {
      type: "bar",
    },
    series: [
      {
        name: "Volume",
        data: [44, 55, 41, 64, 22, 43, 21, 67, 49],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  return (
    <ReactApexChart options={options} series={options.series} type="bar" />
  );
};
