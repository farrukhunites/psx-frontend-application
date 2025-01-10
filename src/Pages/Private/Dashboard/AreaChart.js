import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ data }) => {
  const categories = data?.map((item) => item?.x) || [];
  const portfolioValues = data?.map((item) => item?.y) || [];

  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: "2px",
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Portfolio Value (Rs.)",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#2A9CFA", "#01CFC3"],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.15,
        stops: [0, 100],
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
  };

  const series = [
    {
      name: "Portfolio Value",
      data: portfolioValues, // Example portfolio values for last 10 days
    },
  ];

  return (
    <div>
      <h3>Portfolio Value Over Last 10 Days</h3>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
