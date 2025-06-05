import React, { useState } from 'react'
import AddUser from '../../Components/User/AddUser'
import UserList from '../../Components/User/UserList'

const User = () => {
    const [addUserWindow, setAddUserWindow] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const [userDetails, setUserDetails] = useState('')
    const handleOpenAddUserWindow = () => {
        setAddUserWindow(true)
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
                {!addUserWindow && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleOpenAddUserWindow}
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
                            Add User
                        </button>
                    </div>
                )}

            </div>
            <div style={{ overflowY: 'auto' }}>
                <UserList setAddUserWindow={setAddUserWindow} setUserDetails={setUserDetails}/>
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
                        <AddUser setAddUserWindow={setAddUserWindow} userDetails={userDetails} setUserDetails={setUserDetails}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default User
