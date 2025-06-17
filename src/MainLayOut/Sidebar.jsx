import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    BarChart3,
    FolderOpen,
    Star,
    X,
    AlignJustify,
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, isVisible, setIsVisible }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
        { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/Project' },
        { id: 'User', label: 'User', icon: BarChart3, path: '/User' },
        { id: 'tasks', label: 'Tasks', icon: Star, path: '/Task' },
    ];

    const handleFullClose = () => {
        setIsVisible(false);
    };

    const handleShowSidebar = () => {
        setIsVisible(true);
        setIsOpen(true);
    };

    return (
        <>
            {/* Sidebar */}
            {isVisible && (
                <div
                    style={{
                        width: isOpen ? '220px' : '60px',
                        background: 'linear-gradient(135deg, rgb(133, 157, 195) 0%, rgb(255, 255, 255) 100%)',
                        transition: 'width 0.3s ease',
                        paddingTop: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        zIndex: 10,
                    }}
                >
                    {/* Close Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 10px' }}>
                        {isOpen && (
                            <button onClick={handleFullClose} style={{ background: 'none', border: 'none' }}>
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {/* Nav Links */}
                    <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                        {navItems.map(({ id, label, icon: Icon, path }) => (
                            <NavLink
                                key={id}
                                to={path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 15px',
                                    textDecoration: 'none',
                                    color: isActive ? 'black' : '#1e293b',
                                    backgroundColor: isActive ? 'white' : 'transparent',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                })}
                                title={!isOpen ? label : ''}
                                onClick={() => setIsOpen(true)}
                            >
                                <Icon size={20} style={{ marginRight: isOpen ? '12px' : '0' }} />
                                {isOpen && <span>{label}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}

            {/* Toggle/Open Button */}
            {!isVisible && (
                <button
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        zIndex: 20,
                        backgroundColor: '#334155',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '8px',
                    }}
                    onClick={handleShowSidebar}
                >
                    <AlignJustify size={20} />
                </button>
            )}

        </>
    );
};

export default Sidebar;
