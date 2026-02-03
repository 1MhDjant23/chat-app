import { useEffect, useState } from "react";
import { usersApi } from "../../api/auth.api.js";
import  { MdLogout }  from    'react-icons/md';
import '../public/css/usersList.css';
import { Link, Navigate } from 'react-router-dom';
// import {}
// import { useNavigate } from "react-router-dom";


export const UsersList = ({ setUserActive }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const   handleLogout = () => {
        localStorage.removeItem('token');
        return <Navigate to={'/login'}/>
    }

    useEffect(() => {
        const fetchUsers = async () => {
            setError(null);
            setLoading(true);
            try {
                const allUsers = await usersApi();
                setUsers(allUsers);
            } catch (error) {
                setError(error || 'Something went wrong.');
                console.log('fetch users error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading)
        return <div className="users-loading">Users Loading...</div>
    if (error)
        return <div>Error: {error.message}</div>

    return (
        <div className="users-list-container">
            <h1>Messages</h1>
            <section className="user-list">
                {
                    users.length > 0 ? (
                        <ul>
                            {
                                users.map((u) => (
                                    <li
                                        // className={activeUser?.id === u.id ? 'active' : ''}
                                        key={u.id}
                                        onClick={() => setUserActive(u)}
                                    >
                                        <div className="user-avatar">
                                            {u.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="user-info">
                                            <span className="user-name">{u.username}</span>
                                            <span className="user-status">Online</span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : <span className="empty">No Users availlable</span>
                }
            </section>
            <div className="logout-section">
                <button
                    onClick={() => {
                        {console.log('logpout')}
                        
                        // <Link to={'/login'}/>
                        // <Navigate to={'/logi+n'}/>
                    }}
                    className="logout-btn"><MdLogout className="logout-icon"/>
                </button>
            </div>
        </div >
    );
}