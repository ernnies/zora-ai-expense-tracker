import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';
import TopGainers from './components/TopGainers';

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {showOnboarding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">Welcome to Zora AI Expense Tracker</h2>
              <p className="mb-2">Create custom coins to track expenses like groceries or rent.</p>
              <p className="mb-4">Explore trending expense tokens to inform your budgeting.</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setShowOnboarding(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        <nav className="p-4 bg-blue-500 text-white">
          <Link to="/" className="mr-4">Track Expenses</Link>
          <Link to="/trending" className="mr-4">Trending Tokens</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ExpenseTracker />} />
          <Route path="/trending" element={<TopGainers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;