import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../Context/ContextProvider';
import styles from '../../Styles/DashBoard/DashBoard.module.css';

const statusColors = {
  Open: '#95a5a6',
  'In Progress': '#2980b9',
  Paused: 'rgb(148 5 35)',
  Done: '#27ae60',
};

const Dashboard = () => {
  const { userData, taskData } = useContext(ProjectContext);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const statuses = ['Open', 'In Progress', 'Paused', 'Done'];

  const filteredTasks = taskData.filter(task => {
    const userMatch = selectedUser ? task.assignedUserId?.toString() === selectedUser?.toString() : true;
    const statusMatch = selectedStatus ? task.taskRunStatus === selectedStatus : true;
    return userMatch && statusMatch;
  });

  const taskStatusCounts = statuses.reduce((acc, status) => {
    acc[status] = filteredTasks.filter(task => task.taskRunStatus === status).length;
    return acc;
  }, {});


  const users = userData || [];

  return (
    <div className={styles.dashboard}>
      <h2>Task Dashboard</h2>

      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <label>User: </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className={styles.select}
          >
            <option value=''>All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>Status: </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.select}
          >
            <option value=''>All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.summary}>
        <h3>Task Summary</h3>
        <div className={styles.statusGrid}>
          {statuses.map(status => (
            <div
              key={status}
              className={styles.statusCard}
              style={{ backgroundColor: statusColors[status] || '#999' }}
            >
              <h4>{status}</h4>
              <p className={styles.count}>{taskStatusCounts[status]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
