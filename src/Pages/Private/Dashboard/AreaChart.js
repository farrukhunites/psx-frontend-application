import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = () => {
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
      type: "datetime",
      categories: [
        "2024-10-11",
        "2024-10-12",
        "2024-10-13",
        "2024-10-14",
        "2024-10-15",
        "2024-10-16",
        "2024-10-17",
        "2024-10-18",
        "2024-10-19",
        "2024-10-20",
      ],
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
      data: [
        150000, 151500, 149800, 152000, 153000, 155000, 154500, 156000, 157500,
        159000,
      ], // Example portfolio values for last 10 days
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
