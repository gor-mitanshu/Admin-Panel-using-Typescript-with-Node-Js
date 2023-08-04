import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "@mui/material";
import "../DashboardPage.css";
import moment from "moment";

export const BarChartMonth = ({ data, title }: any) => {
  const [chartData, setChartData] = useState([]);
  const month = moment(title, "MMMM").format("MMM");
  console.log(Object.keys(data).map((day) => moment(day, "D").format("MMM D")));

  useEffect(() => {
    if (data) {
      const formattedData: any = Object.keys(data).map((day) => data[day]);
      setChartData(formattedData);
    }
  }, [data]);

  const option = {
    title: {
      text: `Weekly Data - ${month}`,
      // subtext: moment().format("MMM YYYY"),
      left: "left",
    },
    xAxis: {
      type: "category",
      data: Object.keys(data).map((day) => moment(day, "D").format("MMM D")),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Data",
        bottom: "left",
        data: chartData,
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
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          backgroundColor: "#f6f1f1",
          border: "1px solid #ded3d3",
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

export const PieChart = ({ data }: any) => {
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
            value: data?.July ? Object.keys(data.July).length : Math.random(),
            name: "July",
          },
          {
            value: data?.August
              ? Object.keys(data.August).length
              : Math.random(),
            name: "August",
          },
        ],
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
          backgroundColor: "#f6f1f1",
          border: "1px solid #ded3d3",
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
