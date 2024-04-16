import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";

const AdminBarChart = ({ statData }) => {
  const chartRef = useRef();
  const [view, setView] = useState("day");
  const [data, setData] = useState({
    day: {
      labels: [],
      values: [],
    },
    month: {
      labels: [],
      values: [],
    },
  });
  const [year, setYear] = useState(2024);

  let chartInstance = null;

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data[view].labels,
          datasets: [
            {
              label: "Data",
              data: data[view].values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            duration: 1000, // Animation duration in milliseconds
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, view]);

  const toggleView = (e) => {
    e.preventDefault()
    setView(view === "day" ? "month" : "day");
  };

  const handleToggleString = () => {
    return view === "day" ? "Months" : "Days";
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  useEffect(() => {
    setData({ day: getDaysData(), month: getMonthsData() });
}, [year, statData]);

  const getDaysData = () => {
    if (year in statData["days"]) {
      let daysByYear = statData["days"][year];
      let labels = [];
      let values = [];

      daysByYear.forEach((element) => {
        let label = element.day + "-" + element.month;
        let value = element.count;

        labels.push(label);
        values.push(value);
      });

      return {
        labels: labels,
        values: values,
      };
    } else {
      return {
        labels: [],
        values: [],
      };
    }
  };

  const getMonthsData = () => {
    if (year in statData["months"]) {
      let monthsByYear = statData["months"][year];
      let labels = [];
      let values = [];

      Object.entries(monthsByYear).forEach(([key, value]) => {
        labels.push(getMonthName(parseInt(key)));
        values.push(value);
      });

      return {
        labels: labels,
        values: values,
      };
    } else {
      return {
        labels: [],
        values: [],
      };
    }
  };

  const getMonthName = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid month";
    }
  };

  return (
    <div>
      <div className="p-6">
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
        />
      </div>
      <canvas ref={chartRef} />
      <button onClick={toggleView} className="mt-6 ml-7">
        {"Show " + handleToggleString()}
      </button>
    </div>
  );
};

export default AdminBarChart;
