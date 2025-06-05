import React, { useContext, useState } from 'react';
import AddProject from '../../Components/Project/AddProject';
import ProjectList from '../../Components/Project/ProjectList';
import { ProjectContext } from '../../Context/ContextProvider';

const Project = () => {
    const [openAddProject, setOpenAddProject] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const { projectData, setProjectData } = useContext(ProjectContext);

    const handleOpenWindow = () => {
        setOpenAddProject(true);
    };

    const handleEditProject = (id) => {
        const project = projectData.find(p => p.id === id);
        if (project) {
            setProjectToEdit(project);
            setOpenAddProject(true);
        }
    }
    const handleDeleteProject = (id) => {
        const updatedProjects = projectData.filter(project => project.id !== id);
        setProjectData(updatedProjects);
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
                {!openAddProject && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleOpenWindow}
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
                            }}
                        >
                            Add Project
                        </button>
                    </div>
                )}

            </div>
            <div style={{ overflowY: 'auto' }}>
                <ProjectList handleEditProject={handleEditProject} handleDeleteProject={handleDeleteProject} />
            </div>
            {openAddProject && (
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
                        <AddProject
                            openAddProject={openAddProject}
                            setOpenAddProject={setOpenAddProject}
                            projectToEdit={projectToEdit}
                            setProjectToEdit={setProjectToEdit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;
