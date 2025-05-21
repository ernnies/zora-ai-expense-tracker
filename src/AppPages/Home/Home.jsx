// AppPages/Home/Home.jsx
import { useState } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { ModalApp } from '../../components/Modal/ModalApp';
import { AppCard } from '../../components/AppCard/AppCard';
import styles from './Home.module.css';
import { AddIncomeForm } from '../../components/AppForms/AddIncomeForm/AddIncomeForm';
import { AddExpenseForm } from '../../components/AppForms/AddExpenseForm/AddExpenseForm';
import { PieCharts } from '../../components/PieCharts/PieCharts';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { BarChart } from '../../components/BarChartComponent/BarChartComponent';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';

const Home = () => {
  const {
    balance,
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
    addIncome,
    totalExpenses,
    categorySpends,
    categoryCount
  } = useExpenses();

  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddExpense = (expenseData) => {
    addExpense({
      ...expenseData,
      price: Number(expenseData.price),
      date: expenseData.date || new Date().toISOString().split('T')[0]
    });
  };

  const handleEditExpense = (expenseData) => {
    editExpense(editId, {
      ...expenseData,
      price: Number(expenseData.price)
    });
    setEditId(null);
  };

  const handleEditStart = (id) => {
    setEditId(id);
    setIsOpenExpense(true);
  };

  const chartData = [
    { name: "Food", value: categorySpends.food },
    { name: "Entertainment", value: categorySpends.entertainment },
    { name: "Travel", value: categorySpends.travel }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Expense Tracker</h1>
        <ThemeToggle />
      </header>

      <div className={styles.dashboard}>
        <div className={styles.overview}>
          <AppCard
            title="Wallet Balance"
            amount={balance}
            type="primary"
            actionText="+ Add Income"
            onAction={() => setIsOpenBalance(true)}
            trend={{ value: 5.2 }} // Example trend data
          />
          
          <AppCard
            title="Total Expenses"
            amount={totalExpenses}
            type="danger"
            actionText="+ Add Expense"
            onAction={() => setIsOpenExpense(true)}
            trend={{ value: -2.8 }} // Example trend data
          />
          
          <div className={styles.chartContainer}>
            <PieCharts data={chartData} />
          </div>
        </div>

        <div className={styles.details}>
          <TransactionList
            transactions={expenses}
            onDelete={deleteExpense}
            onEdit={handleEditStart}
            title="Recent Transactions"
          />
          
          <div className={styles.barChartContainer}>
            <BarChart data={chartData} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ModalApp isOpen={isOpenBalance} onClose={() => setIsOpenBalance(false)}>
        <AddIncomeForm
          onSubmit={(amount) => {
            addIncome(Number(amount));
            setIsOpenBalance(false);
          }}
          onCancel={() => setIsOpenBalance(false)}
        />
      </ModalApp>

      <ModalApp isOpen={isOpenExpense} onClose={() => {
        setIsOpenExpense(false);
        setEditId(null);
      }}>
        <AddExpenseForm
          initialValues={editId ? expenses.find(e => e.id === editId) : {}}
          onSubmit={editId ? handleEditExpense : handleAddExpense}
          onCancel={() => {
            setIsOpenExpense(false);
            setEditId(null);
          }}
          balance={balance}
        />
      </ModalApp>
    </div>
  );
};

export default Home;