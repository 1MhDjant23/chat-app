import { useEffect, useState } from "react";
import { ActivityBar } from "../components/sidebare/ActivityBar.jsx";
import { userApi } from "../api/profileApi.js";
import { ProfileInfo } from "../components/profile/ProfileInfo.jsx";
import { ProfileAvatar } from '../components/profile/ProfileAvatar.jsx';
import  '../components/public/css/profilePage.css';

export const ProfilePage = () => {
    
    const   [error, setError] = useState(null);
    const   [loading, setLoading] = useState(false);
    const   [user, setUser] = useState(null);
    const   [isEdit, setIsEdit] = useState(false);

    // const   isButtonDisabled = isEdit;
    useEffect(() => {
        const   fetchData = async () => {
            setError(null);
            setLoading(false);
            try {
                const   data = await userApi();
                // console.log("gettting ------------------");
                setUser(data);
                console.log('data of user:', data);
            } catch (error) {
                setError(error);
                console.log('Error:', error);
            }
            finally {
                setLoading(true);
            }

        }
        fetchData();
    }, []);
    if(!loading)
        return <div>User Loading...</div>
    if (error)
        return <div>Error fetching user: {error}</div>

    return (
        <div className="profile-page-container">
            {console.log('USER is:', user)}
            <ActivityBar />
            <div className="main-content">
                <button
                    disabled={isEdit}
                    className='edit-button'
                    onClick={(e) => {
                        e.preventDefault();
                        setIsEdit(true);
                    }
                    
                } >
                    Edit Profile
                </button>
                <div className="profile-layout">
                    <ProfileAvatar user={user} onUpdate={setUser}/>
                    <ProfileInfo user={user} onUpdate={setUser} isEdit={isEdit} setIsEdit={setIsEdit} />
                </div>
            </div>

        </div>
    );
}