
import { Line } from 'react-chartjs-2';

// import our custom configuration for our chart
import { Config } from './ChartConfig';
import {Chart, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'; 
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const PoolChart = () => {
  

  const data = {
    datasets: [
      {
        // label for our chart
        label: 'Bitcoin Price Chart',
        fill: true,
        data:[0,4000],

        // color of the line chart
        borderColor: '#3B82F6',
        // partially transparent part below our line graph
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        pointRadius: 2,
        pointHoverRadius: 5,
        borderCapStyle: 'butt',
        pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderWidth: 2
      }
    ]
  };

  //   and finally lets return a chart component with our api data and
  //   config
  return (
    <div className="chart-container w-full p-2">
      <Line data={data} options={Config} />
    </div>
  );
};

export default PoolChart;