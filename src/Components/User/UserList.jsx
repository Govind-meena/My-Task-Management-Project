import React, { useContext } from 'react'
import { ProjectContext } from '../../Context/ContextProvider';
import styles from '../../Styles/User/UserList.module.css';
import { FaEdit, FaEye, FaTrash, FaUser } from 'react-icons/fa';

const UserList = (props) => {
    const { userData, setUserData } = useContext(ProjectContext);



    const handleEdit = (user) => {
        props.setUserDetails(user)
        props.setAddUserWindow(true)
    };



    return (
        <div className={styles.userlistcontainer}>
            {userData?.length === 0 ? (
                <div className={styles.noUser}>
                    <FaUser size={48} color="#ccc" />
                    <p>No users found</p>
                </div>
            ) : (
                <div className={styles.userGrid}>
                    {userData?.map((user, index) => (
                        <div key={user.id || index} className={styles.userCard}>
                            <div className={styles.userHeader}>
                                <div className={styles.userAvtar}>
                                    <FaUser size={24} />
                                </div>
                                <div className={styles.userAction}>

                                    <FaEdit
                                        className={`${styles.btnAction} ${styles.editBtn}`}
                                        onClick={() => handleEdit(user)}
                                        title="Edit User"
                                    />
                                    <FaTrash
                                        className={`${styles.btnAction} ${styles.deleteBtn}`}
                                        onClick={() => props.handleDeleteUser(user.id)}
                                        title="Delete User"
                                    />
                                </div>
                            </div>

                            <div className={styles.userInfo}>
                                <h3 className={styles.userDisplayName}>{user.name}</h3>
                                <div className={styles.userDetails}>
                                    <p className={styles.username}>{user.username}</p>
                                    <p className={styles.email}>{user.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserList