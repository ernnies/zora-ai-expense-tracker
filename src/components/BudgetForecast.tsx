import { useZoraCoin } from '../hooks/useZoraCoin';
import { useState, useEffect } from 'react';

const BudgetForecast = () => {
  const { predictExpenses } = useZoraCoin();
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    predictExpenses(['0x0000000000000000000000000000000000000000']).then(setForecast);
  }, [predictExpenses]);

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h2 className="text-xl font-bold mb-2">Expense Forecast</h2>
      <p>Groceries: {forecast.groceries || 'N/A'} ETH</p>
    </div>
  );
};

export default BudgetForecast;