import Chart from 'chart.js/auto';
import React, { useRef, useEffect } from 'react';

const AdminPieChart = ({ data }) => {
  const chartContainer = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
        },
      });
    }

    // Cleanup
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data]);

  return <canvas  ref={chartContainer} />;
};

export default AdminPieChart;
