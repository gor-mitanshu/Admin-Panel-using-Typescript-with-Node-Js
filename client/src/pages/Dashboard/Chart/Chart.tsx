import React from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "@mui/material";

const Chart = () => {
  const customColors = [
    "#ff7070",
    "#4fc1e9",
    "#f6bb42",
    "#a0d468",
    "#a8a7a7",
    "#37bc9b",
    "#e9573f",
  ];

  const option = {
    title: {
      text: "Weekly Data",
      subtext: "July 2023",
      center: "left",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: any) => `${value}`,
      },
    },
    series: [
      {
        name: "Data",
        bottom: "left",
        data: [80, 70, 50, 100, 79, 89, 110],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          // Set custom colors for each bar
          color: (params: any) => customColors[params.dataIndex],
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const value = params[0].value;
        return `Custom Tooltip: ${value}`;
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        type: "slider",
        start: 0,
        end: 100,
        height: 20,
        bottom: 10,
      },
    ],
    legend: {
      data: ["Data"],
    },
    grid: {
      containLabel: true,
    },
    responsive: true,
    maintainAspectRatio: false,
    //     color: ["#ff7070"],
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <ReactEcharts
          option={option}
          style={{ height: "65vh", width: "100%" }}
        />
      </Card>
    </>
  );
};

export default Chart;
