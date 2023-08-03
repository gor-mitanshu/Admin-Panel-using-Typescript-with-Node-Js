import React from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "@mui/material";

export const BarChartOne = () => {
  const option = {
    title: {
      text: "Weekly Data",
      subtext: "July 2023",
      center: "",
    },
    xAxis: {
      type: "category",
      data: [
        "July 1",
        "July 2",
        "July 3",
        "July 4",
        "July 5",
        "July 6",
        "July 7",
      ],
      stack: "x",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Data",
        bottom: "left",
        data: [
          Math.floor(Math.random() * (120 - 60) + 60),
          Math.floor(Math.random() * (120 - 60) + 60),
          Math.floor(Math.random() * (120 - 60) + 60),
          Math.floor(Math.random() * (120 - 60) + 60),
          Math.floor(Math.random() * (120 - 60) + 60),
          Math.floor(Math.random() * (120 - 60) + 60),
          Math.floor(Math.random() * (120 - 60) + 60),
        ],
        type: "bar",
        stack: "x",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
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

export const BarChartTwo = () => {
  const option = {
    title: {
      text: "Weekly Data",
      subtext: "Aug 2023",
      center: "",
    },
    xAxis: {
      type: "category",
      data: ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7"],
      stack: "x",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Data",
        bottom: "left",
        data: [
          Math.floor(Math.random() * (140 - 70) + 70),
          Math.floor(Math.random() * (140 - 70) + 70),
          Math.floor(Math.random() * (140 - 70) + 70),
          Math.floor(Math.random() * (140 - 70) + 70),
          Math.floor(Math.random() * (140 - 70) + 70),
          Math.floor(Math.random() * (140 - 70) + 70),
          Math.floor(Math.random() * (140 - 70) + 70),
        ],
        type: "bar",
        stack: "x",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
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

export const PieChart = () => {
  const option = {
    series: [
      {
        type: "pie",
        stillShowZeroSum: true,
        symbolSize: 1,

        label: {
          show: true,
        },
        data: [
          {
            value: Math.random(),
            name: "Month",
          },
          {
            value: Math.random(),
            name: "Day",
          },
          {
            value: Math.random(),
            name: "Year",
          },
        ],
        //    radius: "50%",
      },
    ],
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
