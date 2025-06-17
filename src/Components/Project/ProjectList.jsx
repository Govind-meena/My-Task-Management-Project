import React, { useContext, useState } from 'react';
import { Calendar, User, Edit, Trash2, Plus, Grid3X3, List } from 'lucide-react';
import { ProjectContext } from '../../Context/ContextProvider';
import styles from '../../Styles/Project/ProjectList.module.css';
import dayjs from 'dayjs'; // Import Day.js

const ProjectList = ({ handleEditProject, handleDeleteProject, viewMode, setViewMode }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [editingDateField, setEditingDateField] = useState(null); 
    
    const { projectData, setProjectData } = useContext(ProjectContext); 

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return styles.statusCompleted;
            case 'in progress':
                return styles.statusInProgress;
            case 'planning':
                return styles.statusPlanning;
            case 'on hold':
                return styles.statusOnHold;
            default:
                return styles.statusDefault;
        }
    };

    // Using Day.js for date formatting
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return dayjs(dateString).format('DD MMMM YYYY'); // "09 June 2025"
    };

    const handleDateClick = (projectId, field) => {
        setEditingDateField({ projectId, field });
    };

    const handleDateChange = (projectId, field, newDate) => {
        // Find current project
        const currentProject = projectData.find(p => p.id === projectId);
        if (!currentProject) return;

        // Validate dates using Day.js
        const startDate = field === 'startDate' ? newDate : currentProject.startDate;
        const dueDate = field === 'dueDate' ? newDate : currentProject.dueDate;

        // Check if due date is before start date
        if (startDate && dueDate && dayjs(dueDate).isBefore(dayjs(startDate))) {
            alert('Due date cannot be earlier than start date!');
            setEditingDateField(null);
            return;
        }

        setProjectData(prevData => 
            prevData.map(project => 
                project.id === projectId 
                    ? { ...project, [field]: newDate }
                    : project
            )
        );
        setEditingDateField(null);
    };

    const handleDateBlur = () => {
        setEditingDateField(null);
    };

    const convertToInputDate = (dateString) => {
        if (!dateString) return '';
        return dayjs(dateString).format('YYYY-MM-DD'); // For HTML date input
    };

    // Rest of your component remains the same...
    const DateDisplay = ({ project, field, className = '' }) => {
        const isEditing = editingDateField?.projectId === project.id && editingDateField?.field === field;
        
        // Set min/max dates based on field type
        const getDateConstraints = () => {
            if (field === 'startDate') {
                return {
                    max: project.dueDate ? convertToInputDate(project.dueDate) : undefined
                };
            } else if (field === 'dueDate') {
                return {
                    min: project.startDate ? convertToInputDate(project.startDate) : undefined
                };
            }
            return {};
        };

        if (isEditing) {
            return (
                <input
                    type="date"
                    defaultValue={convertToInputDate(project[field])}
                    {...getDateConstraints()}
                    onChange={(e) => handleDateChange(project.id, field, e.target.value)}
                    onBlur={handleDateBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleDateChange(project.id, field, e.target.value);
                        } else if (e.key === 'Escape') {
                            setEditingDateField(null);
                        }
                    }}
                    autoFocus
                    className={styles.dateInput}
                />
            );
        }

        return (
            <div 
                className={`${styles.dateColumn} ${className}`}
                onClick={() => handleDateClick(project.id, field)}
                style={{ cursor: 'pointer' }}
                title="Click to edit date"
            >
                <Calendar size={16} className={styles.dateIcon} />
                <span className={styles.dateText}>{formatDate(project[field])}</span>
            </div>
        );
    };

    // ListView and GridView components remain the same as in your original code...
    const ListView = () => (
        <div className={styles.projectListContainer}>
            {/* Table Header */}
            <div className={styles.tableHeader}>
                <div className={styles.headerRow}>
                    <div>Name</div>
                    <div>Status</div>
                    <div>Start date</div>
                    <div>Due date</div>
                    <div style={{ textAlign: 'right' }}>Actions</div>
                </div>
            </div>

            {/* Table Body */}
            <div className={styles.tableBody}>
                {projectData.map((project, index) => (
                    <div 
                        key={project.id} 
                        className={`${styles.projectRow} ${hoveredIndex === index ? styles.hovered : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Name Column */}
                        <div className={styles.nameColumn}>
                            <h4 className={styles.projectName}>{project.projectName}</h4>
                            <p className={styles.projectDescription}>{project.description}</p>
                        </div>
                        
                        {/* Status Column */}
                        <div className={styles.statusColumn}>
                            <span className={`${styles.statusBadge} ${getStatusClass(project.status)}`}>
                                {project.status}
                            </span>
                        </div>

                        {/* Start Date Column */}
                        <DateDisplay project={project} field="startDate" />

                        {/* Due Date Column */}
                        <DateDisplay project={project} field="dueDate" />

                        {/* Actions Column */}
                        <div className={styles.actionsColumn}>
                            <button
                                onClick={() => handleEditProject && handleEditProject(project.id)}
                                className={`${styles.actionButton} ${styles.editButton}`}
                                title="Edit project"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => handleDeleteProject && handleDeleteProject(project.id)}
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                title="Delete project"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const GridView = () => (
        <div className={styles.gridContainer}>
            {projectData.map((project, index) => (
                <div 
                    key={project.id} 
                    className={`${styles.projectCard} ${hoveredIndex === index ? styles.cardHovered : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>
                            <h4 className={styles.cardProjectName}>{project.projectName}</h4>
                            <div className={styles.cardActions}>
                                <button
                                    onClick={() => handleEditProject && handleEditProject(project.id)}
                                    className={`${styles.cardActionButton} ${styles.editButton}`}
                                    title="Edit project"
                                >
                                    <Edit size={14} />
                                </button>
                                <button
                                    onClick={() => handleDeleteProject && handleDeleteProject(project.id)}
                                    className={`${styles.cardActionButton} ${styles.deleteButton}`}
                                    title="Delete project"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <span className={`${styles.statusBadge} ${getStatusClass(project.status)}`}>
                            {project.status}
                        </span>
                    </div>

                    <div className={styles.cardBody}>
                        <p className={styles.cardDescription}>{project.description}</p>
                        
                        <div className={styles.cardInfo}>
                            <div 
                                className={styles.cardInfoItem}
                                onClick={() => handleDateClick(project.id, 'startDate')}
                                style={{ cursor: 'pointer' }}
                                title="Click to edit start date"
                            >
                                <Calendar size={14} className={styles.cardIcon} />
                                {editingDateField?.projectId === project.id && editingDateField?.field === 'startDate' ? (
                                    <input
                                        type="date"
                                        defaultValue={convertToInputDate(project.startDate)}
                                        max={project.dueDate ? convertToInputDate(project.dueDate) : undefined}
                                        onChange={(e) => handleDateChange(project.id, 'startDate', e.target.value)}
                                        onBlur={handleDateBlur}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleDateChange(project.id, 'startDate', e.target.value);
                                            } else if (e.key === 'Escape') {
                                                setEditingDateField(null);
                                            }
                                        }}
                                        autoFocus
                                        className={styles.cardDateInput}
                                    />
                                ) : (
                                    <span className={styles.cardInfoText}>Start: {formatDate(project.startDate)}</span>
                                )}
                            </div>
                            
                            <div 
                                className={styles.cardInfoItem}
                                onClick={() => handleDateClick(project.id, 'dueDate')}
                                style={{ cursor: 'pointer' }}
                                title="Click to edit due date"
                            >
                                <Calendar size={14} className={styles.cardIcon} />
                                {editingDateField?.projectId === project.id && editingDateField?.field === 'dueDate' ? (
                                    <input
                                        type="date"
                                        defaultValue={convertToInputDate(project.dueDate)}
                                        min={project.startDate ? convertToInputDate(project.startDate) : undefined}
                                        onChange={(e) => handleDateChange(project.id, 'dueDate', e.target.value)}
                                        onBlur={handleDateBlur}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleDateChange(project.id, 'dueDate', e.target.value);
                                            } else if (e.key === 'Escape') {
                                                setEditingDateField(null);
                                            }
                                        }}
                                        autoFocus
                                        className={styles.cardDateInput}
                                    />
                                ) : (
                                    <span className={styles.cardInfoText}>Due: {formatDate(project.dueDate)}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={styles.projectContainer}>
            {viewMode === 'list' ? <ListView /> : <GridView />}
        </div>
    );
};

export default ProjectList;