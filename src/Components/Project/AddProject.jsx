import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../Context/ContextProvider';

const AddProject = (props) => {
    const [projectName, setProjectName] = useState('');
    const [projectNameError, setProjectNameError] = useState(false);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Planning');
    const [hovered, setHovered] = useState(false);
    const { projectData, setProjectData } = useContext(ProjectContext);
    const isEditMode = !!props.projectToEdit;

    // this use Effect is fill the value which we get from projectToEdit
    useEffect(() => {
        if (props.projectToEdit) {
            setProjectName(props.projectToEdit.projectName)
            setDescription(props.projectToEdit.description)
            setStatus(props.projectToEdit.status)
        }
    }, [props.projectToEdit])

    // here we make this function for save project data and update project data by id
    const handleSubmit = () => {
        if (!projectName.trim()) {
            setProjectNameError(true);
            return;
        }
        // here we manage over project update code 
        if (isEditMode) {
            const updatedProject = {
                ...props.projectToEdit,
                projectName,
                description: description ? description : '',
                status
            };
            setProjectData(prevList =>
                prevList.map(list => list.id === updatedProject.id ? updatedProject : list)
            );
            handleCloseAddWindow()
        } else {
            // here we manage over new Project Add code
            const maxId = projectData.length > 0 ? Math.max(...projectData.map((DataId) => DataId.id || 0)) : 0;
            const newProject = {
                id: maxId + 1,
                projectName,
                description,
                status
            };
            setProjectData(prevList => [...prevList, newProject]);
            handleCloseAddWindow()
        }

    };

    // here we close the form and clean the data
    const handleCloseAddWindow = () => {
        setProjectName('')
        setDescription('')
        setStatus('')
        setProjectNameError('')
        props.setOpenAddProject(false)
        props.setProjectToEdit(null)
        setStatus('Planning');
    }

    return (
        <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '15px',
        }}>
            <button
                onClick={handleCloseAddWindow}
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
                Add Project
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Project Name *"
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value);
                            setProjectNameError(false);
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 15px',
                            border: projectNameError ? '2px solid #e74c3c' : '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            fontFamily: 'Poppins',
                        }}
                        onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                        onBlur={(e) => e.target.style.border = projectNameError ? '2px solid #e74c3c' : '2px solid #ddd'}
                    />
                    {projectNameError && (
                        <span style={{
                            color: '#e74c3c',
                            fontSize: '14px',
                            marginTop: '5px',
                            display: 'block'
                        }}>
                            Project name is required
                        </span>
                    )}
                </div>

                <textarea
                    placeholder="Project Description"
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

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            flex: '1',
                            minWidth: '150px',
                            padding: '12px 15px',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Testing">Testing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

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
                    Add Project
                </button>
            </div>
        </div>
    );
};

export default AddProject;
