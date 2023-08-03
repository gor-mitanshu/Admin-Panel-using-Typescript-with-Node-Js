import React from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "@mui/material";

const Chart = () => {
  const option = {
    title: {
      text: "Weekly Data",
      subtext: "July 2023",
      center: "",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
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

export default Chart;
