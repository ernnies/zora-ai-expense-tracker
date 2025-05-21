// components/AppForms/AddExpenseForm/AddExpenseForm.jsx
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddExpenseForm.module.css';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(50, 'Title too long'),
  category: Yup.string()
    .required('Category is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Must be a number'),
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future')
});

export const AddExpenseForm = ({ 
  initialValues = {}, 
  onSubmit, 
  onCancel,
  balance
}) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values);
      onCancel();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3>{initialValues.id ? 'Edit Expense' : 'Add Expense'}</h3>
      
      <Formik
        initialValues={{
          title: '',
          category: '',
          price: '',
          date: new Date().toISOString().split('T')[0],
          ...initialValues
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <Field 
                name="title" 
                type="text" 
                placeholder="Dinner with friends" 
              />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Amount</label>
              <Field 
                name="price" 
                type="number" 
                placeholder="500" 
              />
              <ErrorMessage name="price" component="div" className={styles.error} />
              {values.price > balance && (
                <div className={styles.warning}>
                  This expense exceeds your current balance
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <Field as="select" name="category">
                <option value="">Select category</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
              </Field>
              <ErrorMessage name="category" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Date</label>
              <Field name="date" type="date" />
              <ErrorMessage name="date" component="div" className={styles.error} />
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="submit" 
                className={styles.primaryButton}
                disabled={isSubmitting || values.price > balance}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};