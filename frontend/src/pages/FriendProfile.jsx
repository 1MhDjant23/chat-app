import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI, BASE_URL } from "../api/fetchApi.js";
import { ActivityBar } from "../components/sidebare/ActivityBar.jsx";
import avatarFallback from '../components/public/assets/avatar.png';
import '../components/public/css/profilePage.css';

export const FriendProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const data = await fetchAPI(`/api/users/${userId}`, {
                    method: 'GET',
                    body: undefined,
                    token: localStorage.getItem('token')
                });
                setUser(data);
            } catch (err) {
                console.error("Error fetching user profile:", err);
                setError(err.message || 'Error fetching user profile');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    if (loading) return <div className="profile-page-container"><ActivityBar /><div className="main-content">Loading profile...</div></div>;
    if (error) return <div className="profile-page-container"><ActivityBar /><div className="main-content">Error: {error}</div></div>;
    if (!user) return <div className="profile-page-container"><ActivityBar /><div className="main-content">User not found</div></div>;

    return (
        <div className="profile-page-container">
            <ActivityBar />
            <div className="main-content">
                <button className="edit-button" style={{ backgroundColor: 'var(--bg-element)', width: 'fit-content' }} onClick={() => navigate(-1)}>
                    ← Back
                </button>
                <div className="profile-layout" style={{ marginTop: '20px' }}>
                    <div className="profile-avatar">
                        <div className="avatar-wrapper">
                            <img
                                src={user.avatar_url ? `${BASE_URL}/${user.avatar_url}` : avatarFallback}
                                alt={`${user.username}'s avatar`}
                            />
                        </div>
                    </div>

                    <div className="profile-info-container">
                        <div className="profile-info">
                            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--text-main)' }}>{user.username}</h2>
                            <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                            {/* In the future: Add "Send Friend Request" or "Message" buttons here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
