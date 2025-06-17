import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../Context/ContextProvider';
import styles from '../../Styles/Task/AddTask.module.css';
import { FaEye, FaEdit, FaTrash, FaUser, FaPlus } from 'react-icons/fa';
import TaskDetailsWindow from './TaskDetailsWindow';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TaskList = (props) => {
    const { taskData, userData } = useContext(ProjectContext);
    const [taskDetails, setTaskDetails] = useState('');
    const [openDetailsWindow, setOpenDetailsWindow] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(null);
    const navigate = useNavigate();

    const handleEyeClick = (task) => {
        setTaskDetails(task)
        setOpenDetailsWindow(true)
    };

    const handleCloseDetailsWindow = () => {
        setTaskDetails('');
        setOpenDetailsWindow(false);
    };

    const getUserById = (userId) => userData?.find(user => user.id === userId);

    const getUserInitials = (user) => {
        if (!user || !user.name) return 'U';
        const names = user.name.split(' ');
        return names.length >= 2
            ? (names[0][0] + names[1][0]).toUpperCase()
            : user.name[0].toUpperCase();
    };

    const handleAssignUser = (taskId, userId) => {
        if (props.handleAssignUserToTask) {
            props.handleAssignUserToTask(taskId, userId);
        }
        setShowUserDropdown(null);
    };

    const toggleUserDropdown = (taskId) => {
        setShowUserDropdown(showUserDropdown === taskId ? null : taskId);
    };

    const handleAddSubTask = (task) => {
        navigate('/Subtask', { state: { Details: task } });
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {taskData?.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#555' }}>No tasks found.</div>
                ) : (
                    taskData.map((task, index) => {
                        const assignedUser = getUserById(task.assignedUserId);
                        return (
                            <div key={task.id || index} className={styles.Taskcard}>
                                <div className={styles.TaskHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <h3 style={{ margin: 0, color: '#764ba2' }}>{task.title}</h3>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                                            {assignedUser ? (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        cursor: 'pointer',
                                                        padding: '5px 10px',
                                                        backgroundColor: '#764ba2',
                                                        borderRadius: '15px',
                                                        fontSize: '13px',
                                                        color: 'white',
                                                        fontWeight: '500'
                                                    }}
                                                    onClick={() => toggleUserDropdown(task.id)}
                                                    title={`Assigned to: ${assignedUser.name}`}
                                                >
                                                    <span>{getUserInitials(assignedUser)}</span>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        cursor: 'pointer',
                                                        padding: '5px 10px',
                                                        border: '2px dashed #ccc',
                                                        borderRadius: '15px',
                                                        fontSize: '12px',
                                                        color: '#666'
                                                    }}
                                                    onClick={() => toggleUserDropdown(task.id)}
                                                    title="Click to assign user"
                                                >
                                                    <FaUser style={{ fontSize: '12px' }} />
                                                    <span>Assign</span>
                                                </div>
                                            )}

                                            <select
                                                value={task.taskRunStatus || 'Open'}
                                                onChange={(e) => props.handleChangeRunStatus(task.id, e.target.value)}
                                                style={{
                                                    padding: '5px 10px',
                                                    borderRadius: '15px',
                                                    border: '1px solid #ccc',
                                                    fontSize: '13px',
                                                    backgroundColor: '#f5f5f5',
                                                    cursor: 'pointer',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="Open">Open</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Paused">Paused</option>
                                                <option value="Done">Done</option>
                                            </select>

                                            {showUserDropdown === task.id && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        left: 0,
                                                        backgroundColor: 'white',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                        zIndex: 1000,
                                                        minWidth: '150px',
                                                        maxHeight: '200px',
                                                        overflowY: 'auto'
                                                    }}
                                                >
                                                    {userData?.length > 0 ? (
                                                        userData.map(user => (
                                                            <div
                                                                key={user.id}
                                                                style={{
                                                                    padding: '8px 12px',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px',
                                                                    borderBottom: '1px solid #f0f0f0',
                                                                    backgroundColor: assignedUser?.id === user.id ? '#f0f0f0' : 'white'
                                                                }}
                                                                onClick={() => handleAssignUser(task.id, user.id)}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#764ba2',
                                                                        color: 'white',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '8px',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    {getUserInitials(user)}
                                                                </div>
                                                                <span style={{ fontSize: '12px', fontWeight: '500' }}>{user.name}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div style={{ padding: '8px 12px', color: '#999', fontSize: '12px' }}>
                                                            No users available
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <FaEye style={{ color: '#764ba2', cursor: 'pointer' }} onClick={() => handleEyeClick(task)} />
                                        <FaEdit style={{ color: 'black', cursor: 'pointer' }} title="Edit" onClick={() => props.handleEditTask(task)} />
                                        <FaTrash style={{ color: '#e74c3c', cursor: 'pointer' }} title="Delete" onClick={() => props.handleRemoveTask(task)} />
                                    </div>
                                </div>

                                {/* Task Info Section */}
                                <div style={{ display: 'flex', justifyContent: "space-between", color: '#555', marginTop: '10px', gap: '5px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span><strong>Type:</strong> {task.taskType}</span>
                                        <span><strong>Run Status:</strong> {task.taskRunStatus || 'Open'}</span>
                                        {task.dueDate && (
                                            <span><strong>Due Date:</strong> {dayjs(task.dueDate).format('DD MMM YYYY')}</span>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "25px" }}>
                                        <button
                                            onClick={() => handleAddSubTask(task)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                padding: '6px 12px',
                                                backgroundColor: 'rgb(126, 179, 235)',
                                                color: 'rgb(95, 162, 234)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                fontWeight: '500',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(126, 179, 235)'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(126, 179, 235)'}
                                            title="Add SubTask"
                                        >
                                            <FaPlus style={{ fontSize: '10px' }} />
                                            <span>Add SubTask</span>
                                        </button>


                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Overlay to close dropdown */}
            {showUserDropdown && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999
                    }}
                    onClick={() => setShowUserDropdown(null)}
                />
            )}

            {/* Task Details Modal */}
            {openDetailsWindow && (
                <TaskDetailsWindow
                    openDetailsWindow={openDetailsWindow}
                    taskDetails={taskDetails}
                    handleCloseDetailsWindow={handleCloseDetailsWindow}
                />
            )}
        </>
    );
};

export default TaskList;