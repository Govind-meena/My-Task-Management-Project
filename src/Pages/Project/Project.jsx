import React, { useContext, useState } from 'react';
import AddProject from '../../Components/Project/AddProject';
import ProjectList from '../../Components/Project/ProjectList';
import { ProjectContext } from '../../Context/ContextProvider';
import styles from '../../Styles/Project/ProjectList.module.css'
import { Grid3X3, List } from 'lucide-react';
const Project = () => {
    const [openAddProject, setOpenAddProject] = useState(false);
    const [viewMode, setViewMode] = useState('list');
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
    const ViewToggle = () => (
        <div className={styles.viewToggle}>
            <button
                onClick={() => setViewMode('list')}
                className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.active : ''}`}
                title="List view"
            >
                <List size={16} />
            </button>
            <button
                onClick={() => setViewMode('grid')}
                className={`${styles.viewToggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
                title="Grid view"
            >
                <Grid3X3 size={16} />
            </button>
        </div>
    );
    return (
        <div
            style={{
                minHeight: '92vh',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgb(133 157 195) 0%, rgb(255, 255, 255) 100%)',
                padding: '20px',
                fontFamily: 'Poppins',
                position: 'relative',
                // boxSizing: 'border-box'
            }}
        >
            <div >
                {!openAddProject && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: "10px " }}>
                        <button style={{ marginBottom: '18px', border: 'none' }}>
                            <ViewToggle />
                        </button>
                        <button
                            onClick={handleOpenWindow}
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
                            }}
                        >
                            Add Project
                        </button>
                    </div>
                )}

            </div>
            <div style={{ overflowY: 'auto' }}>
                <ProjectList handleEditProject={handleEditProject} handleDeleteProject={handleDeleteProject} viewMode={viewMode} setViewMode={setViewMode} />
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
