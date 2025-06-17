import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../Context/ContextProvider';
import { FaUser } from 'react-icons/fa';

const SubTasklist = (props) => {
    const { userData } = useContext(ProjectContext);
    const [showUserDropdown, setShowUserDropdown] = useState(null);

    const tableStyle = {
        width: '100%',
        margin: '2rem auto',
        borderCollapse: 'collapse',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '12px',
        backgroundColor: '#f4f4f4',
        textAlign: 'left',
    };

    const tdStyle = {
        border: '1px solid #eee',
        padding: '12px',
        transition: 'background 0.3s ease',
    };

    const tdCenter = {
        transition: 'background 0.3s ease',
        textAlign: 'center'
    };

    const buttonStyle = {
        padding: '6px 12px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    };

    const editButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: '#fff',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545',
        color: '#fff',
    };

    const getUserById = (userId) => {
        return userData?.find(user => user.id === userId);
    };

    const getUserInitials = (user) => {
        if (!user || !user.name) return 'U';
        const names = user.name.split(' ');
        return names.length >= 2
            ? (names[0][0] + names[1][0]).toUpperCase()
            : user.name[0].toUpperCase();
    };

    const handleAssignUserToSubTask = (subtaskId, userId) => {
        const updatedList = props.subTaskData.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, assignedUserId: userId } : subtask
        );
        props.setSubTaskData(updatedList);
        setShowUserDropdown(null);
    };

    const toggleUserDropdown = (subtaskId) => {
        setShowUserDropdown(showUserDropdown === subtaskId ? null : subtaskId);
    };

    const handleEdit = (subtask) => {
        props.setEditSubTaskData(subtask);
        props.setOpenSubTaskWindow(true);
    };

    const handleDelete = (indexToDelete) => {
        const updatedList = props.subTaskData.filter((_, index) => index !== indexToDelete);
        props.setSubTaskData(updatedList);
    };

    return (
        <div>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thStyle, width: '5%' }}>#</th>
                        <th style={{ ...thStyle, width: '15%' }}>Title</th>
                        <th style={{ ...thStyle, width: '50%' }}>Description</th>
                        <th style={{ ...thStyle, width: '15%' }}>Assigned</th>
                        <th style={{ ...thStyle, width: '15%', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.subTaskData &&
                        props.subTaskData
                            .filter(subtask => subtask.mainTaskId === props.Details.id)
                            .map((subtask, index) => {
                                const assignedUser = getUserById(subtask.assignedUserId);
                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                                            cursor: 'pointer'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f9f9f9'}
                                    >
                                        <td style={tdStyle}>{index + 1}</td>
                                        <td style={tdStyle}>{subtask.subTasktitle}</td>
                                        <td style={tdStyle}>{subtask.description}</td>

                                        {/* Assigned User Cell */}
                                        <td style={tdCenter}>
                                            <div style={{ position: 'relative' }}>
                                                {assignedUser ? (
                                                    <div
                                                        style={{
                                                            display: 'inline-flex',
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
                                                        onClick={() => toggleUserDropdown(subtask.id)}
                                                        title={`Assigned to: ${assignedUser.name}`}
                                                    >
                                                        {getUserInitials(assignedUser)}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            cursor: 'pointer',
                                                            padding: '5px 10px',
                                                            border: '2px dashed #ccc',
                                                            borderRadius: '15px',
                                                            fontSize: '12px',
                                                            color: '#666'
                                                        }}
                                                        onClick={() => toggleUserDropdown(subtask.id)}
                                                        title="Click to assign user"
                                                    >
                                                        <FaUser style={{ fontSize: '12px' }} />
                                                        <span>Assign</span>
                                                    </div>
                                                )}

                                                {showUserDropdown === subtask.id && (
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '100%',
                                                            right: 0,
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
                                                        {userData && userData.length > 0 ? (
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
                                                                    onClick={() => handleAssignUserToSubTask(subtask.id, user.id)}
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = assignedUser?.id === user.id ? '#f0f0f0' : 'white'}
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
                                                                    <span style={{ fontSize: '12px', fontWeight: '500' }}>
                                                                        {user.name}
                                                                    </span>
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
                                        </td>

                                        {/* Actions */}
                                        <td style={tdCenter}>
                                            <button
                                                onClick={() => handleEdit(subtask)}
                                                style={editButtonStyle}
                                                onMouseOver={e => e.target.style.backgroundColor = '#0056b3'}
                                                onMouseOut={e => e.target.style.backgroundColor = '#007bff'}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                style={deleteButtonStyle}
                                                onMouseOver={e => e.target.style.backgroundColor = '#c82333'}
                                                onMouseOut={e => e.target.style.backgroundColor = '#dc3545'}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                </tbody>
            </table>
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
        </div>
    );
};

export default SubTasklist;
