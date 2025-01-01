import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { Col, Row, Select } from "antd";
import "./style.css";

const { Option } = Select;

// Helper function to generate random candlestick data
const generateNewData = (lastData) => {
  const newTime = lastData.time + 1; // Increment time by 1 second
  const newClose = lastData.close + (Math.random() - 0.5) * 2; // Generate random close price
  return {
    time: newTime,
    open: lastData.close,
    high: Math.max(lastData.close, newClose + Math.random() * 5),
    low: Math.min(lastData.close, newClose - Math.random() * 5),
    close: newClose,
  };
};

const ChartLegend = ({ intervalTime, setIntervalTime, indicators }) => (
  <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
    <Col>
      <label style={{ color: "white" }} htmlFor="interval">
        Timeframe:
      </label>
      <Select
        id="interval"
        value={intervalTime}
        onChange={(value) => setIntervalTime(value)}
        style={{ width: 60 }}
      >
        <Option value="1s">1s</Option>
        <Option value="5s">5s</Option>
        <Option value="5m">5m</Option>
        <Option value="15m">15m</Option>
        <Option value="1h">1h</Option>
        <Option value="1d">1d</Option>
        <Option value="1wk">1wk</Option>
        <Option value="1mo">1mo</Option>
      </Select>
    </Col>
    {indicators.map((indicator, index) => (
      <Col key={index}>
        <span style={{ color: indicator.color, marginRight: "8px" }}>■</span>
        <span style={{ color: "white" }}>{indicator.name}</span>
      </Col>
    ))}
  </Row>
);

const RealTimeChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const emaSeries = useRef(null);
  const sma100Series = useRef(null);
  const sma200Series = useRef(null);

  const [intervalTime, setIntervalTime] = useState("1d");

  const indicators = [
    { name: "10 EMA", color: "rgba(255, 255, 0, 1)" },
    { name: "100 SMA", color: "rgba(0, 0, 255, 1)" },
    { name: "200 SMA", color: "rgba(255, 0, 0, 1)" },
  ];

  useEffect(() => {
    // Set interval duration based on intervalTime
    const getIntervalDuration = () => {
      switch (intervalTime) {
        case "1s":
          return 1000;
        case "5s":
          return 5000;
        case "5m":
          return 5 * 60 * 1000;
        case "15m":
          return 15 * 60 * 1000;
        case "1h":
          return 60 * 60 * 1000;
        case "1d":
          return 24 * 60 * 60 * 1000;
        default:
          return 1000;
      }
    };

    // Initialize chart and series
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "transparent" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "#373737" },
        horzLines: { color: "#373737" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: { visible: true },
    });

    seriesRef.current = chartRef.current.addCandlestickSeries();
    emaSeries.current = chartRef.current.addLineSeries({
      color: "rgba(255, 255, 0, 1)",
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    sma100Series.current = chartRef.current.addLineSeries({
      color: "rgba(0, 0, 255, 1)",
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    sma200Series.current = chartRef.current.addLineSeries({
      color: "rgba(255, 0, 0, 1)",
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    // Initial random data setup
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: i + 1,
      open: Math.random() * 10 + 100,
      high: Math.random() * 10 + 105,
      low: Math.random() * 10 + 95,
      close: Math.random() * 10 + 100,
    }));
    seriesRef.current.setData(initialData);

    // Track last data point
    let lastData = initialData[initialData.length - 1];

    // Update chart data based on selected intervalTime
    const intervalId = setInterval(() => {
      lastData = generateNewData(lastData);
      seriesRef.current.update(lastData);
      emaSeries.current.update({
        time: lastData.time,
        value: lastData.close - 1,
      });
      sma100Series.current.update({
        time: lastData.time,
        value: lastData.close - 2,
      });
      sma200Series.current.update({
        time: lastData.time,
        value: lastData.close - 3,
      });
    }, getIntervalDuration());

    // Handle window resize
    const handleResize = () => {
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      chartRef.current.remove();
    };
  }, [intervalTime]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ChartLegend
        intervalTime={intervalTime}
        setIntervalTime={setIntervalTime}
        indicators={indicators}
      />
      <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default RealTimeChart;
