import React, { useState, useContext, useEffect } from 'react';
import styles from '../../Styles/Task/AddTask.module.css';
import { ProjectContext } from '../../Context/ContextProvider';

const AddTask = (props) => {
    const [selectProject, setSelectProject] = useState('');
    const [selectProjectError, setSelectProjectError] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskTitleError, setTaskTitleError] = useState(false);
    const [description, setDescription] = useState('');
    const [taskType, setTaskType] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    const { projectData, taskData, setTaskData } = useContext(ProjectContext);
    let isEditMode = props.editTaskData;

    useEffect(() => {
        if (props.editTaskData) {
            setSelectProject(props.editTaskData.projectId);
            setTaskTitle(props.editTaskData.title);
            setDescription(props.editTaskData.description);
            setTaskType(props.editTaskData.taskType);
            setDueDate(props.editTaskData.dueDate || '');
        }
    }, [props.editTaskData]);

    const handleSaveTask = (e) => {
        e.preventDefault();

        if (!selectProject) {
            setSelectProjectError('Please select project');
            return;
        } else {
            setSelectProjectError('');
        }

        if (!taskTitle) {
            setTaskTitleError('Task title is required');
            return;
        } else {
            setTaskTitleError('');
        }

        if (isEditMode) {
            const updatedTask = {
                ...props.editTaskData,
                projectId: selectProject,
                title: taskTitle,
                description: description ? description : '',
                taskType,
                dueDate,
            };
            setTaskData(prevList =>
                prevList.map(list => list.id === updatedTask.id ? updatedTask : list)
            );
            handleCloseWindow();
        } else {
            const maxId = taskData.length > 0 ? Math.max(...taskData.map((DataId) => DataId.id || 0)) : 0;
            const newTask = {
                id: maxId + 1,
                projectId: selectProject,
                title: taskTitle,
                description: description ? description : '',
                taskType,
                dueDate,
                taskRunStatus:'Open'
            };
            setTaskData(prevList => [...prevList, newTask]);
            handleCloseWindow()
        }
    };

    const handleCloseWindow = () => {
        setSelectProject('');
        setTaskTitle('');
        setDescription('');
        setTaskType('Low');
        setDueDate('');
        props.setOpenTaskWindow(false);
        props.setEditTaskData('');
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{isEditMode ? 'Edit Task' : 'Add Task'}</h3>
            <button
                aria-label="Close task window"
                onClick={handleCloseWindow}
                className={styles.closeBtn}
            >
                &times;
            </button>

            <form className={styles.form} onSubmit={handleSaveTask}>
                <select
                    value={selectProject}
                    onChange={(e) => {
                        setSelectProject(e.target.value);
                        if (selectProjectError) setSelectProjectError('');
                    }}
                    style={{
                        border: selectProjectError ? '2px solid #e74c3c' : '2px solid #ddd',
                    }}
                >
                    <option value="">Select Project</option>
                    {projectData?.map((project) => (
                        <option key={project.id} value={project.projectName}>
                            {project.projectName}
                        </option>
                    ))}
                </select>
                {selectProjectError && (
                    <span style={{ color: '#e74c3c', fontSize: '14px', display: 'block' }}>
                        {selectProjectError}
                    </span>
                )}

                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.target.value);
                        if (taskTitleError) setTaskTitleError('');
                    }}
                    placeholder="Enter task title"
                    onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                    onBlur={(e) => e.target.style.border = taskTitleError ? '2px solid #e74c3c' : '2px solid #ddd'}
                    style={{
                        border: taskTitleError ? '2px solid #e74c3c' : '2px solid #ddd',
                        fontFamily: 'Poppins',
                    }}
                />
                {taskTitleError && (
                    <span style={{ color: '#e74c3c', fontSize: '14px', display: 'block' }}>
                        {taskTitleError}
                    </span>
                )}

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    rows={4}
                    style={{ fontFamily: 'Poppins' }}
                />

                <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>

                <label style={{ fontWeight: 500, }}>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{
                        border: '2px solid #ddd',
                        padding: '8px',
                        fontFamily: 'Poppins',
                    }}
                />

                <button type="submit" className={styles.submitBtn}>
                    {isEditMode ? 'Update Task' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
