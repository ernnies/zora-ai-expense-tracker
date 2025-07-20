import { useZoraCoin } from '../hooks/useZoraCoin';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ExpenseTrends = () => {
  const { getCoinDetails } = useZoraCoin();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const coins = ['0x0000000000000000000000000000000000000000']; 
      const data = await Promise.all(coins.map(addr => getCoinDetails(addr)));
      setChartData({
        labels: data.map((c: any) => c.name),
        datasets: [
          {
            label: 'Spending',
            data: data.map((c: any) => Number(c.balance)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    };
    fetchData();
  }, [getCoinDetails]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Expense Trends</h2>
      <p className="mb-4 text-gray-600">Visualize your spending across budget categories.</p>
      <Bar data={chartData} />
    </div>
  );
};

export default ExpenseTrends;