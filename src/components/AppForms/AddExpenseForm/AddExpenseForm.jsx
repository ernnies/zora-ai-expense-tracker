// src/components/AppForms/AddExpenseForm/AddExpenseForm.jsx
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import styles from './AddExpenseForm.module.css';

export const AddExpenseForm = ({ 
  initialValues = {}, 
  onSubmit, 
  onCancel,
  balance
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    category: initialValues.category || '',
    price: initialValues.price || '',
    date: initialValues.date || new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.price || !formData.date) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }

    if (Number(formData.price) <= 0) {
      enqueueSnackbar('Price must be positive', { variant: 'error' });
      return;
    }

    if (Number(formData.price) > balance) {
      enqueueSnackbar('Price exceeds balance', { variant: 'error' });
      return;
    }

    onSubmit({
      ...formData,
      price: Number(formData.price)
    });
  };

  return (
    <div className={styles.formWrapper}>
      <h3>{initialValues.id ? 'Edit Expense' : 'Add Expense'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Dinner with friends"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Amount</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="500"
          />
          {formData.price > balance && (
            <div className={styles.warning}>
              This expense exceeds your current balance
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.primaryButton}
          >
            {initialValues.id ? 'Update Expense' : 'Add Expense'}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};