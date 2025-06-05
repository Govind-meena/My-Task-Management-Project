import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <div style={{
            backgroundColor: '#4b6cb7',
            backgroundImage: 'linear-gradient(to right, #4b6cb7, #182848)',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                MyApp
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link
                    to="/dashboard"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#ffdd57'}
                    onMouseOut={(e) => e.target.style.color = 'white'}
                >
                    Dashboard
                </Link>
                <Link
                    to="/User"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#ffdd57'}
                    onMouseOut={(e) => e.target.style.color = 'white'}
                >
                    Users
                </Link>
                <Link
                    to="/task"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#ffdd57'}
                    onMouseOut={(e) => e.target.style.color = 'white'}
                >
                    Task
                </Link>
                <Link
                    to="/project"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '16px',
                        transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#ffdd57'}
                    onMouseOut={(e) => e.target.style.color = 'white'}
                >
                    Project
                </Link>

            </div>
        </div>
    );
};

export default Topbar;

