import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../Context/ContextProvider'

const AddUser = (props) => {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [username, setUsername] = useState('')
    const [usenameError, setUsernameError] = useState(false)
    const { userData, setUserData } = useContext(ProjectContext);
    let isEditMode = props?.userDetails
    useEffect(() => {
        if (props.userDetails) {
            setName(props.userDetails?.name)
            setEmail(props.userDetails?.email)
            setUsername(props.userDetails?.username)
        }
    }, [props.userDetails])


    const handleSaveUser = () => {
        if (!name) {
            setNameError('Name is required')
            return
        } else {
            setNameError(false)
        }
        if (!email) {
            setEmailError('Email is required')
            return
        } else {
            setEmailError(false)
        }
        if (!username) {
            setUsernameError('Username is required')
            return
        } else {
            setUsernameError(false)
        }
        if (isEditMode) {
            // here we manage over update User Add code
            const updatedUser = {
                ...props.userDetails,
                name,
                email,
                username
            };
            setUserData(prevList =>
                prevList.map(list => list.id === updatedUser.id ? updatedUser : list)
            );
            handleCloseAddWindow()
        } else {
            // here we manage over new User Add code
            const maxId = userData.length > 0 ? Math.max(...userData.map((DataId) => DataId.id || 0)) : 0;
            const newUser = {
                id: maxId + 1,
                name,
                email,
                username
            };
            setUserData(prevList => [...prevList, newUser]);
            handleCloseAddWindow()
        }
    }

    const handleCloseAddWindow = () => {
        setName('');
        setNameError(false);
        setEmail('')
        setEmailError(false)
        setUsername('')
        setUsernameError(false)
        props.setAddUserWindow(false)
        props.setUserDetails('')
    }
   
    return (
        <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '15px',
        }}>
            <button
                onClick={handleCloseAddWindow}
                // onMouseEnter={() => setHovered(true)}
                // onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'absolute',
                    right: '15px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    // color: hovered ? 'red' : '#aaa',
                    transition: 'color 0.3s ease',
                    fontFamily: 'Poppins',
                }}
                title="Close"
            >
                ×
            </button>

            <h2 style={{
                color: '#333',
                marginTop: '0px',
                fontSize: '1.5rem',
                textAlign: 'center',
                fontFamily: 'Poppins'
            }}>
                Add User
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Name *"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameError(false);
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 15px',
                            border: nameError ? '2px solid #e74c3c' : '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            fontFamily: 'Poppins'

                        }}
                        onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                        onBlur={(e) => e.target.style.border = nameError ? '2px solid #e74c3c' : '2px solid #ddd'}
                    />
                    {nameError && (
                        <span style={{
                            color: '#e74c3c',
                            fontSize: '14px',
                            marginTop: '5px',
                            display: 'block',
                            fontFamily: 'Poppins'
                        }}>
                            Name is required
                        </span>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 15px',
                            border: emailError ? '2px solid #e74c3c' : '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            fontFamily: 'Poppins'
                        }}
                        onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                        onBlur={(e) => e.target.style.border = emailError ? '2px solid #e74c3c' : '2px solid #ddd'}
                    />
                    {emailError && (
                        <span style={{
                            color: '#e74c3c',
                            fontSize: '14px',
                            marginTop: '5px',
                            display: 'block',
                            fontFamily: 'Poppins'
                        }}>
                            Email is required
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Username *"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUsernameError(false);
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 15px',
                            border: usenameError ? '2px solid #e74c3c' : '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            fontFamily: 'Poppins'
                        }}
                        onFocus={(e) => e.target.style.border = '2px solid #667eea'}
                        onBlur={(e) => e.target.style.border = usenameError ? '2px solid #e74c3c' : '2px solid #ddd'}
                    />
                    {usenameError && (
                        <span style={{
                            color: '#e74c3c',
                            fontSize: '14px',
                            marginTop: '5px',
                            display: 'block',
                            fontFamily: 'Poppins'
                        }}>
                            Username is required
                        </span>
                    )}
                </div>
                <button
                    onClick={handleSaveUser}
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
                    Add User
                </button>
            </div>
        </div>
    );
}

export default AddUser
