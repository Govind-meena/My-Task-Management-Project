import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../Context/ContextProvider';
import styles from '../../Styles/Project/ProjectList.module.css'

const ProjectList = (props) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { projectData } = useContext(ProjectContext);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projectData?.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#555' }}>No projects found.</div>
            ) : (
                projectData?.map((project, index) => (
                    <div key={index} className={`${styles.projectcard}`}>
                        <div className={`${styles.projectHeader}`}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#764ba2' }}>{project.projectName}</h3>
                            <div>
                                <div>
                                    <button
                                        className={`${styles.editButton} ${hoveredIndex === index ? styles.hovered : ''}`}
                                        onClick={() => props.handleEditProject(project.id)}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`${styles.deleteButton} ${hoveredIndex === index ? styles.hovered : ''}`}
                                        onClick={() => props.handleDeleteProject(project.id)}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p style={{ margin: '0 0 8px', color: '#333' }}>{project.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
                            <span><strong>Status:</strong> {project.status}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProjectList;