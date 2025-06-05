import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../Context/ContextProvider';

const AddSubtask = (props) => {
    const [hovered, setHovered] = useState(false);
    const [subTasktitle, setSubTaskTitle] = useState('')
    const [subTasktitleError, setSubTaskTitleError] = useState(false)
    const [description, setDescription] = useState('')
    const { subTaskData, setSubTaskData } = useContext(ProjectContext)
    let IsEditMode = props.editSubTaskData

    useEffect(() => {
        if (props.editSubTaskData) {
            setSubTaskTitle(props.editSubTaskData?.subTasktitle)
            setDescription(props.editSubTaskData?.description)
        }
    }, [props.editSubTaskData])

    const handleSubmit = () => {
        if (!subTasktitle) {
            setSubTaskTitleError("Title is  Required")
        }
        if (IsEditMode) {
            const upDateSubTask = {
                ...props.editSubTaskData,
                subTasktitle,
                description
            }
            setSubTaskData(prevList =>
                prevList.map(list => list.id === upDateSubTask.id ? upDateSubTask : list)
            );
            handleClose()
        } else {
            const maxId = subTaskData.length > 0 ? Math.max(...subTaskData.map((DataId) => DataId.id || 0)) : 0;
            const newSubTask = {
                id: maxId + 1,
                subTasktitle,
                description,
                mainTaskId: props.Details.id
            };
            setSubTaskData((preList) => [...preList, newSubTask])
            handleClose()
        }

    }
    const handleClose = () => {
        setSubTaskTitle('')
        setDescription('')
        props.setOpenSubTaskWindow(false)
        props.setEditSubTaskData('')
    }
    return (
        <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '15px',
        }}>
            <button
                onClick={handleClose}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'absolute',
                    right: '15px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: hovered ? 'red' : '#aaa',
                    transition: 'color 0.3s ease'
                }}
                title="Close"
            >
                ×
            </button>

            <h2 style={{
                color: '#333',
                marginTop: '0px',
                fontSize: '1.5rem',
                textAlign: 'center'
            }}>
                Add SubTask
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Title *"
                        value={subTasktitle}
                        onChange={(e) => {
                            setSubTaskTitle(e.target.value);
                            setSubTaskTitleError(false);
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 15px',
                            border: subTasktitleError ? '2px solid #e74c3c' : '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            fontFamily: 'Poppins',
                        }}
                        onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                        onBlur={(e) => e.target.style.border = subTasktitleError ? '2px solid #e74c3c' : '2px solid #ddd'}
                    />
                    {subTasktitleError && (
                        <span style={{
                            color: '#e74c3c',
                            fontSize: '14px',
                            marginTop: '5px',
                            display: 'block'
                        }}>
                            Title is required
                        </span>
                    )}
                </div>

                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                    onBlur={(e) => e.target.style.border = '2px solid #ddd'}
                />



                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '12px 25px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    Add SubTask
                </button>
            </div>
        </div>
    );
}

export default AddSubtask
