import React, { useContext, useState } from 'react'
import AddUser from '../../Components/User/AddUser'
import UserList from '../../Components/User/UserList'
import { ProjectContext } from '../../Context/ContextProvider'

const User = () => {
    const [addUserWindow, setAddUserWindow] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const [userDetails, setUserDetails] = useState('')
    const { userData, setUserData } = useContext(ProjectContext);
    const handleOpenAddUserWindow = () => {
        setAddUserWindow(true)
    }
    const handleDeleteUser = (id) => {
        const updatedUsers = userData.filter(user => user.id !== id);
        setUserData(updatedUsers);
    };
    return (
        <div
            style={{
                minHeight: '92vh',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgb(133 157 195) 0%, rgb(255, 255, 255) 100%)',
                padding: '20px',
                fontFamily: 'Poppins',
                position: 'relative',
                boxSizing: 'border-box'
            }}
        >
            <div >
                {!addUserWindow && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleOpenAddUserWindow}
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
                           + Add User
                        </button>
                    </div>
                )}

            </div>
            <div style={{ overflowY: 'auto' }}>
                <UserList setAddUserWindow={setAddUserWindow} setUserDetails={setUserDetails} handleDeleteUser={handleDeleteUser} />
            </div>
            {addUserWindow && (
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
                        <AddUser setAddUserWindow={setAddUserWindow} userDetails={userDetails} setUserDetails={setUserDetails} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default User
