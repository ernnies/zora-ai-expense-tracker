// components/AppCard/AppCard.jsx
import styles from './AppCard.module.css';

export const AppCard = ({ 
  title, 
  amount, 
  type = 'primary', 
  actionText, 
  onAction,
  icon,
  trend
}) => {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.amountContainer}>
        <span className={styles.amount}>₹{amount.toLocaleString()}</span>
        {trend && (
          <span className={`${styles.trend} ${trend.value > 0 ? styles.positive : styles.negative}`}>
            {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {actionText && (
        <button 
          className={styles.actionButton}
          onClick={onAction}
          aria-label={`${actionText} for ${title}`}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};