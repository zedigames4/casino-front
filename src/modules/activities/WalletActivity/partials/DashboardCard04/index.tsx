import React from 'react';
import BarChart from '@/components/charts/BarChart01';

const DashboardCard04 = ({ chartData }: { chartData: any }) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-transparent shadow-lg rounded-sm text-white">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-sans">Income VS Expenses</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
};

export default DashboardCard04;

//   const chartData_ = {
//     labels: [
//       '12-01-2020',
//       '01-01-2021',
//       '02-01-2021',
//       '03-01-2021',
//       '04-01-2021',
//       '05-01-2021',
//     ],
//     datasets: [
//       // Light blue bars
//       {
//         label: 'Expenses',
//         data: [800, 1600, 900, 1300, 1950, 1700],
//         backgroundColor: tailwindConfig().theme.colors.blue[400],
//         hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
//         barPercentage: 0.66,
//         categoryPercentage: 0.66,
//       },
//       // Blue bars
//       {
//         label: 'Income',
//         data: [4900, 2600, 5350, 4800, 5200, 4800],
//         backgroundColor: tailwindConfig().theme.colors.indigo[500],
//         hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
//         barPercentage: 0.66,
//         categoryPercentage: 0.66,
//       },
//     ],
//   };
