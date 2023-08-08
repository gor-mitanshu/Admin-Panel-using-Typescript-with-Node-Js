import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts"; // Import the echarts library
import axios from "axios";

export const CurretWeekChart = () => {
  const [currentWeekDates, setCurrentWeekDates] = useState<string[]>([]);

  useEffect(() => {
    const currentweekDates = getCurrentWeekDates();
    setCurrentWeekDates(currentweekDates);
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

  useEffect(() => {
    const lastweekDates = getlastWeekDates();
    setLastWeekDates(lastweekDates);
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
        emphasis: {
          // Use `label` to display the highest value on the bar
          label: {
            show: true,
            position: "top",
          },
        },
        itemStyle: {
          // Use `color` to highlight the highest value bar with a different color
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#2378f7" }, // Start color
            { offset: 1, color: "#83bff6" }, // End color
          ]),
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

export const PieChart = () => {
  const [studentChartData, setStudentChartData] = useState<any>([]);

  const categories = [
    "first_class",
    "second_class",
    "third_class",
    "fail",
    "distinction",
  ];
  const PieChartStudentData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_JSON}`);
      const students = response.data;
      const totalResultCounts: any = {};

      categories.forEach((category) => {
        totalResultCounts[category] = 0;
      });

      students.forEach((student: any) => {
        if (categories.includes(student.result)) {
          totalResultCounts[student.result]++;
        }
      });

      setStudentChartData(totalResultCounts);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    PieChartStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const option = {
    title: {
      text: "Students Record",
      subtext: "Students",
      bottom: "bottom",
    },
    series: [
      {
        data: categories.map((category: any) => ({
          value: studentChartData[category],
          name: category.replace("_", " ").toUpperCase(),
        })),
        type: "pie",
        roseType: "area",
        // name: "Student Data",
        bottom: "left",
        stack: "x",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: categories.map((category) =>
        category.replace("_", " ").toUpperCase()
      ),
    },
    grid: {
      containLabel: true,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
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
    </div>
  );
};
