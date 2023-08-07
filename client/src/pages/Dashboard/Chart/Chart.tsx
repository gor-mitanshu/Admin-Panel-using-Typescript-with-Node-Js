import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

export const CurretWeekChart = () => {
  const [currentWeekDates, setCurrentWeekDates] = useState<string[]>([]);
  // const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const currentweekDates = getCurrentWeekDates();
    setCurrentWeekDates(currentweekDates);

    // Simulate dynamic data change in the chart
    // const interval = setInterval(() => {
    //   const newData: number[] = [];
    //   for (let i = 0; i < 7; i++) {
    //     newData.push(Math.floor(Math.random() * 1000)); // Random data for the chart
    //   }
    //   setData(newData);
    // }, 3000);

    // return () => clearInterval(interval);
  }, []);

  // function to get the week data
  const getCurrentWeekDates = (): string[] => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);

    const weekDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10);
      weekDates.push(formattedDate);
    }
    return weekDates;
  };

  const option = {
    title: {
      text: "Current Week's Weekly Data",
      subtext: "Aug 2023",
      center: "",
    },
    xAxis: {
      type: "category",
      data: currentWeekDates,
      stack: "x",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Data",
        bottom: "left",
        data: [10, 20, 30, 40, 50, 60, 80],
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
    <div>
      {/* <h2>Current Week's</h2> */}
      {/* <ul>
        {currentWeekDates.map((date) => (
          <li key={date}>{date}</li>
        ))}
      </ul> */}
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
    </div>
  );
};
export const LastWeekChart = () => {
  const [lastWeekDates, setLastWeekDates] = useState<string[]>([]);
  // const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const lastweekDates = getlastWeekDates();
    setLastWeekDates(lastweekDates);

    // Simulate dynamic data change in the chart
    // const interval = setInterval(() => {
    //   const newData: number[] = [];
    //   for (let i = 0; i < 7; i++) {
    //     newData.push(Math.floor(Math.random() * 1000)); // Random data for the chart
    //   }
    //   setData(newData);
    // }, 3000);

    // return () => clearInterval(interval);
  }, []);

  // Function to get last week data
  const getlastWeekDates = (): string[] => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const firstDayOfLastWeek = new Date(currentDate);
    firstDayOfLastWeek.setDate(currentDate.getDate() - currentDayOfWeek - 7); // Subtracting 7 days for the last week

    const lastWeekDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfLastWeek);
      date.setDate(firstDayOfLastWeek.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10);
      lastWeekDates.push(formattedDate);
    }
    return lastWeekDates;
  };

  const option = {
    title: {
      text: "Last Week's Weekly Data",
      subtext: "Aug 2023",
      center: "",
    },
    xAxis: {
      type: "category",
      data: lastWeekDates,
      stack: "x",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Data",
        bottom: "left",
        data: [80, 70, 60, 50, 50, 60, 80],
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
    <div>
      {/* <h2>Last Week's</h2> */}
      {/* <ul>
        {lastWeekDates.map((date) => (
          <li key={date}>{date}</li>
        ))}
      </ul> */}
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
    </div>
  );
};
