import React, { useEffect, useRef, useState } from 'react';
import 'moment/min/moment-with-locales';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Link } from 'react-router-dom';

const PlotData = ({ labels, data }) => {
  return {
    labels,
    datasets: [
      {
        label: 'Glucose Level',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
};

const Graph = () => {
  const canvasRef = useRef(null);
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    const jsonExample =[
      { x: new Date(2023, 0, 1, 6, 2), y: 15.8 },
      { x: new Date(2023, 0, 1, 6, 15), y: 16.3 },
      { x: new Date(2023, 0, 1, 6, 30), y: 16.4 },
      { x: new Date(2023, 0, 1, 6, 45), y: 16.1 },
      { x: new Date(2023, 0, 1, 7, 1), y: 13.6 },
      { x: new Date(2023, 0, 1, 7, 16), y: 10.7 },
      { x: new Date(2023, 0, 1, 7, 31), y: 8.6 },
      { x: new Date(2023, 0, 1, 7, 46), y: 8 },
      { x: new Date(2023, 0, 1, 8, 1), y: 7.5 },
      { x: new Date(2023, 0, 1, 8, 5), y: 7.2 },
      { x: new Date(2023, 0, 1, 8, 16), y: 7 },
      { x: new Date(2023, 0, 1, 8, 31), y: 7.1 },
      { x: new Date(2023, 0, 1, 8, 46), y: 6.3 },
      { x: new Date(2023, 0, 1, 9, 1), y: 5.4 },
      { x: new Date(2023, 0, 1, 9, 16), y: 5.2 },
      { x: new Date(2023, 0, 1, 9, 32), y: 5.2 },
      { x: new Date(2023, 0, 1, 9, 34), y: 5.2 },
      { x: new Date(2023, 0, 1, 9, 46), y: 4.7 },
      { x: new Date(2023, 0, 1, 9, 47), y: 4.6 },
      { x: new Date(2023, 0, 1, 10, 2), y: 4.5 },
      { x: new Date(2023, 0, 1, 10, 17), y: 5.1 },
      { x: new Date(2023, 0, 1, 10, 32), y: 6.7 },
      { x: new Date(2023, 0, 1, 10, 46), y: 9.4 },
      { x: new Date(2023, 0, 1, 10, 47), y: 9.5 },
      { x: new Date(2023, 0, 1, 11, 2), y: 10.9 },
      { x: new Date(2023, 0, 1, 11, 3), y: 11.6 },
      { x: new Date(2023, 0, 1, 11, 14), y: 12.5 },
      { x: new Date(2023, 0, 1, 11, 17), y: 12.4 },
      { x: new Date(2023, 0, 1, 11, 32), y: 13.4 },
      { x: new Date(2023, 0, 1, 11, 34), y: 13.7 },
      { x: new Date(2023, 0, 1, 11, 35), y: 13.9 },
      { x: new Date(2023, 0, 1, 11, 47), y: 12.6 },
      { x: new Date(2023, 0, 1, 12, 3), y: 10.9 },
      { x: new Date(2023, 0, 1, 12, 18), y: 9.7 },
      { x: new Date(2023, 0, 1, 12, 29), y: 9.4 },
      { x: new Date(2023, 0, 1, 12, 33), y: 9.2 },
      { x: new Date(2023, 0, 1, 12, 43), y: 9.3 },
      { x: new Date(2023, 0, 1, 12, 48), y: 8.3 },
      { x: new Date(2023, 0, 1, 13, 3), y: 7.9 },
      { x: new Date(2023, 0, 1, 13, 18), y: 6.9 },
      { x: new Date(2023, 0, 1, 13, 22), y: 6.6 },
      { x: new Date(2023, 0, 1, 13, 33), y: 6.3 },
      { x: new Date(2023, 0, 1, 13, 42), y: 5.6 },
      { x: new Date(2023, 0, 1, 13, 48), y: 5.7 },
      { x: new Date(2023, 0, 1, 14, 3), y: 5.3 },
      { x: new Date(2023, 0, 1, 14, 18), y: 5.6 },
      { x: new Date(2023, 0, 1, 14, 21), y: 5.7 },
      { x: new Date(2023, 0, 1, 14, 22), y: 5.8 },
      { x: new Date(2023, 0, 1, 14, 23), y: 5.8 },
      { x: new Date(2023, 0, 1, 14, 29), y: 5.9 },
      { x: new Date(2023, 0, 1, 14, 34), y: 5.9 },
      { x: new Date(2023, 0, 1, 14, 49), y: 5.3 },
      { x: new Date(2023, 0, 1, 15, 4), y: 4.4 },
      { x: new Date(2023, 0, 1, 15, 8), y: 3.9 },
      { x: new Date(2023, 0, 1, 15, 19), y: 4.4 },
      { x: new Date(2023, 0, 1, 15, 24), y: 3.9 },
      { x: new Date(2023, 0, 1, 15, 34), y: 6.3 },
      { x: new Date(2023, 0, 1, 15, 49), y: 8.4 },
      { x: new Date(2023, 0, 1, 16, 4), y: 8.9 },
      { x: new Date(2023, 0, 1, 16, 19), y: 8.8 },
      { x: new Date(2023, 0, 1, 16, 34), y: 8.9 },
      { x: new Date(2023, 0, 1, 16, 43), y: 8.6 },
      { x: new Date(2023, 0, 1, 16, 50), y: 7.7 },
      { x: new Date(2023, 0, 1, 16, 53), y: 7.1 },
      { x: new Date(2023, 0, 1, 17, 2), y: 6.4 },
      { x: new Date(2023, 0, 1, 17, 5), y: 6.5 },
      { x: new Date(2023, 0, 1, 17, 17), y: 5.6 },
      { x: new Date(2023, 0, 1, 17, 20), y: 5.7 },
      { x: new Date(2023, 0, 1, 17, 25), y: 5.2 },
      { x: new Date(2023, 0, 1, 17, 27), y: 4.9 },
      { x: new Date(2023, 0, 1, 17, 33), y: 4.6 },
      { x: new Date(2023, 0, 1, 17, 35), y: 4.5 },
      { x: new Date(2023, 0, 1, 17, 46), y: 3.6 },
      { x: new Date(2023, 0, 1, 17, 47), y: 3.6 },
      { x: new Date(2023, 0, 1, 17, 50), y: 3.7 },
      { x: new Date(2023, 0, 1, 18, 5), y: 3.7 },
      { x: new Date(2023, 0, 1, 18, 20), y: 4.1 },
      { x: new Date(2023, 0, 1, 18, 35), y: 3.8 },
      { x: new Date(2023, 0, 1, 18, 50), y: 3.6 },
      { x: new Date(2023, 0, 1, 19, 5), y: 5.1 },
      { x: new Date(2023, 0, 1, 19, 5), y: 5.1 },
      { x: new Date(2023, 0, 1, 19, 13), y: 6.8 },
      { x: new Date(2023, 0, 1, 19, 15), y: 6.4 },
      { x: new Date(2023, 0, 1, 19, 21), y: 5.7 },
      { x: new Date(2023, 0, 1, 19, 36), y: 5.3 },
      { x: new Date(2023, 0, 1, 19, 51), y: 4.4 },
      { x: new Date(2023, 0, 1, 20, 3), y: 3.7 },
      { x: new Date(2023, 0, 1, 20, 3), y: 3.7 },
      { x: new Date(2023, 0, 1, 20, 6), y: 3.7 },
      { x: new Date(2023, 0, 1, 20, 15), y: 3.6 },
      { x: new Date(2023, 0, 1, 20, 21), y: 3.7 },
      { x: new Date(2023, 0, 1, 20, 36), y: 3.7 },
      { x: new Date(2023, 0, 1, 20, 51), y: 3.8 },
      { x: new Date(2023, 0, 1, 21, 6), y: 5.1 },
      { x: new Date(2023, 0, 1, 21, 7), y: 4.9 },
      { x: new Date(2023, 0, 1, 21, 7), y: 4.9 },
      { x: new Date(2023, 0, 1, 21, 18), y: 7.5 },
      { x: new Date(2023, 0, 1, 21, 21), y: 8.1 },
      { x: new Date(2023, 0, 1, 21, 36), y: 9.7 },
      { x: new Date(2023, 0, 1, 21, 43), y: 10.1 },
      { x: new Date(2023, 0, 1, 21, 50), y: 11.6 },
      { x: new Date(2023, 0, 1, 21, 52), y: 9.2 },
      { x: new Date(2023, 0, 1, 22, 1), y: 7.3 },
      { x: new Date(2023, 0, 1, 22, 2), y: 7.4 },
      { x: new Date(2023, 0, 1, 22, 7), y: 7.2 },
      { x: new Date(2023, 0, 1, 22, 22), y: 4.9 },
      { x: new Date(2023, 0, 1, 22, 22), y: 4.7 },
      { x: new Date(2023, 0, 1, 22, 29), y: 4.1 },
      { x: new Date(2023, 0, 1, 22, 37), y: 5.1 },
      { x: new Date(2023, 0, 1, 22, 47), y: 5.4 },
      { x: new Date(2023, 0, 1, 22, 52), y: 5.8 },
      { x: new Date(2023, 0, 1, 23, 0), y: 6.3 },
      { x: new Date(2023, 0, 1, 23, 7), y: 6.2 },
      { x: new Date(2023, 0, 1, 23, 9), y: 6.3 },
      { x: new Date(2023, 0, 1, 23, 22), y: 5.3 },
      { x: new Date(2023, 0, 1, 23, 37), y: 4.3 },
      { x: new Date(2023, 0, 1, 23, 52), y: 4.2 },
      { x: new Date(2023, 0, 2, 0, 7), y: 4.2 },
      { x: new Date(2023, 0, 2, 0, 23), y: 4.3 },
      { x: new Date(2023, 0, 2, 0, 38), y: 4.4 },
      { x: new Date(2023, 0, 2, 0, 53), y: 4.2 },
      { x: new Date(2023, 0, 2, 1, 8), y: 4.4 },
      { x: new Date(2023, 0, 2, 1, 23), y: 5.4 },
      { x: new Date(2023, 0, 2, 1, 38), y: 5.9 },
      { x: new Date(2023, 0, 2, 1, 53), y: 6.2 },
      { x: new Date(2023, 0, 2, 2, 8), y: 6.8 },
      { x: new Date(2023, 0, 2, 2, 23), y: 7.4 },
      { x: new Date(2023, 0, 2, 2, 38), y: 7.8 },
      { x: new Date(2023, 0, 2, 2, 54), y: 7.7 },
      { x: new Date(2023, 0, 2, 3, 9), y: 7.9 },
      { x: new Date(2023, 0, 2, 3, 24), y: 7.9 },
      { x: new Date(2023, 0, 2, 3, 39), y: 7.9 },
      { x: new Date(2023, 0, 2, 3, 54), y: 7.8 },
      { x: new Date(2023, 0, 2, 4, 9), y: 7.9 },
      { x: new Date(2023, 0, 2, 4, 24), y: 8.4 },
      { x: new Date(2023, 0, 2, 4, 39), y: 9.3 },
      { x: new Date(2023, 0, 2, 4, 54), y: 9.9 },
      { x: new Date(2023, 0, 2, 5, 10), y: 10.3 },
      { x: new Date(2023, 0, 2, 5, 25), y: 9.7 },
      { x: new Date(2023, 0, 2, 5, 40), y: 9.6 }
    ];
    





    const labels = jsonExample.map((point) => point.x);
    const data = jsonExample.map((point) => point.y);
    const preparedPlotData = PlotData({ labels, data });

    setPlotData(preparedPlotData);
  }, []);

  useEffect(() => {
    if (plotData) {
      const ctx = canvasRef.current.getContext('2d');
      let chart = null;

      if (canvasRef.current.chart) {
        canvasRef.current.chart.destroy();
      }

      chart = new Chart(ctx, {
        type: 'line',
        data: plotData,
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Glucose (mmol/L)',
              },
            },
          },
        },
      });

      canvasRef.current.chart = chart;
    }
  }, [plotData]);

  return (<>
  <canvas ref={canvasRef}  width={800} height={400}/>
  <Link to="/home">Go Home</Link>
  </>
  );
};

export default Graph;