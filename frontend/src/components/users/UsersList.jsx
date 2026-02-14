import { useEffect, useState } from "react";
import { usersApi } from "../../api/auth.api.js";
import  { MdLogout }  from    'react-icons/md';
import '../public/css/usersList.css';
import  { useNavigate } from 'react-router-dom';

export const UsersList = ({ setUserActive, setToken }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let   navigate = useNavigate();

    const   handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
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
            {/* <div className="logout-section">
                <button
                    className="logout-btn"
                    onClick={handleLogout}>
                        <MdLogout className="logout-icon"/>
                </button>
            </div> */}
        </div >
    );
}