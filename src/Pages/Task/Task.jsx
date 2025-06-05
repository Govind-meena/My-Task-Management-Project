import React, { useContext, useState } from 'react'
import AddTask from '../../Components/Task/AddTask'
import TaskList from '../../Components/Task/TaskList'
import { ProjectContext } from '../../Context/ContextProvider'

const Task = () => {
  const [opentaskWindow, setOpenTaskWindow] = useState(false)
  const [editTaskData, setEditTaskData] = useState('')
  const [isHovered, setIsHovered] = useState(false);
  const { projectData, taskData, setTaskData } = useContext(ProjectContext);
  const handleOpenAddTaskWindow = () => {
    setOpenTaskWindow(true)
  }

  const handleEditTask = (data) => {
    setEditTaskData(data)
    setOpenTaskWindow(true)
  }
  const handleRemoveTask = (task) => {
    let updatedList = taskData.filter((data) => data.id !== task.id)
    setTaskData(updatedList)
  }
  const handleAssignUserToTask = (taskId, userId) => {
    setTaskData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, assignedUserId: userId }
          : task
      )
    );
  };
  const handleChangeRunStatus = (taskId, newStatus) => {
    const updatedTasks = taskData.map(task =>
      task.id === taskId ? { ...task, taskRunStatus: newStatus } : task
    );
    setTaskData(updatedTasks);
  };
  return (
    <div
      style={{
        minHeight: '92vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgb(217, 222, 244) 0%, rgb(255, 255, 255) 100%)',
        padding: '20px',
        fontFamily: 'Poppins',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <div >
        {!opentaskWindow && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleOpenAddTaskWindow}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                padding: '10px 20px',
                marginBottom: '20px',
                backgroundColor: isHovered ? 'rgb(75, 108, 183)' : '#fff',
                color: isHovered ? '#fff' : '#764ba2',
                border: '1px solid blue',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
            >
              Add Task
            </button>
          </div>
        )}

      </div>
      <div >
        <TaskList handleEditTask={handleEditTask} handleRemoveTask={handleRemoveTask} handleAssignUserToTask={handleAssignUserToTask} handleChangeRunStatus={handleChangeRunStatus}/>
      </div>
      {opentaskWindow && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              width: '100%',
              maxWidth: '600px',
              boxSizing: 'border-box'
            }}
          >
            <AddTask setOpenTaskWindow={setOpenTaskWindow} editTaskData={editTaskData} setEditTaskData={setEditTaskData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Task
