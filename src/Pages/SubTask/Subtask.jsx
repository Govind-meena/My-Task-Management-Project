import React, { useState, useContext } from 'react'
import AddSubtask from '../../Components/SubTask/AddSubtask'
import SubTasklist from '../../Components/SubTask/SubTasklist'
import MainTaskDetails from '../../Components/SubTask/MainTaskDetails'
import { useLocation } from 'react-router-dom'
import { ProjectContext } from '../../Context/ContextProvider';
const Subtask = () => {
    const location = useLocation();
    const { Details } = location.state || {};
    const [openSubTaskWindow, setOpenSubTaskWindow] = useState(false)
    const [editSubTaskData, setEditSubTaskData] = useState('')
    const [isHovered, setIsHovered] = useState(false)
    const { subTaskData, setSubTaskData } = useContext(ProjectContext);
    const handleOpenSubtask = () => {
        setOpenSubTaskWindow(true)
    }
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
                <MainTaskDetails Details={Details} />
                {!openSubTaskWindow && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleOpenSubtask}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                padding: '10px 20px',
                                marginBottom: '20px',
                                backgroundColor: isHovered ? 'rgb(126, 179, 235)' : '#fff',
                                color: isHovered ? '#fff' : 'rgb(95, 162, 234)',
                                border: '1px solid blue',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s, color 0.3s',
                            }}
                        >
                            Add SubTask
                        </button>
                    </div>
                )}

            </div>
            <div style={{ overflowY: 'auto' }}>
                <SubTasklist Details={Details} setOpenSubTaskWindow={setOpenSubTaskWindow} setEditSubTaskData={setEditSubTaskData} subTaskData={subTaskData} setSubTaskData={setSubTaskData} />
            </div>
            {openSubTaskWindow && (
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
                        <AddSubtask Details={Details} setOpenSubTaskWindow={setOpenSubTaskWindow} editSubTaskData={editSubTaskData} setEditSubTaskData={setEditSubTaskData} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Subtask
