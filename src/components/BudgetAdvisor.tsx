import { useZoraCoin } from '../hooks/useZoraCoin';
import { useState, useEffect } from 'react';

const BudgetAdvisor = () => {
  const { getBudgetAdvice } = useZoraCoin();
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    getBudgetAdvice(['0x0000000000000000000000000000000000000000']).then(setAdvice);
  }, [getBudgetAdvice]);

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h2 className="text-xl font-bold mb-2">AI Budget Advice</h2>
      <p className="mb-4 text-gray-600">
        Personalized suggestions based on your spending patterns, powered by xAI.
      </p>
      <ul className="space-y-1">
        {advice.map((tip: string, i: number) => (
          <li key={i} className="p-2 bg-white rounded shadow">{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetAdvisor;