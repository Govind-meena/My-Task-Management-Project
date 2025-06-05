import styles from '../../Styles/Task/TaskDetailsWindow.module.css';

const TaskDetailsWindow = (props) => {
  if (!props.openDetailsWindow) return null;

  const { title, taskType, description } = props.taskDetails;

  return (
    <div className={styles.overlay}>
      <div className={styles.canvas}>
        <button className={styles.closeButton} onClick={props.handleCloseDetailsWindow}>×</button>
        <h2 className={styles.heading}>📝 Task Details</h2>
        <div className={styles.detailRow}>
          <span className={styles.label}>Title:</span>
          <span className={styles.value}>{title}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{taskType}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Description:</span>
          <span className={styles.value}>{description}</span>
        </div>
        {/* Add more fields here if needed */}
      </div>
    </div>
  );
};

export default TaskDetailsWindow;
