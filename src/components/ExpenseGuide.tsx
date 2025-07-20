import { useZoraCoin } from '../hooks/useZoraCoin';
import { useState, useEffect } from 'react';

const ExpenseGuide = () => {
  const { getTutorial } = useZoraCoin();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getTutorial().then(setSteps);
  }, [getTutorial]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-2">How to Use Expense Coins</h2>
      {steps.length > 0 && (
        <div className="p-4 bg-white rounded shadow">
          <p className="mb-4">{steps[currentStep]}</p>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseGuide;