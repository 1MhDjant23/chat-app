import { MdPerson, MdPeople, MdOutlineMessage, MdLogout } from 'react-icons/md';
import  '../public/css/activityBar.css';
import { useNavigate } from 'react-router-dom';

export  const   ActivityBar = () => {
    const   navigate = useNavigate();
    const   handleFreinds = () => {
        console.log('Freinds clicked');
        navigate('/freinds');
    }
     const   handleProfile = () => {
        console.log("Profile clicked");
        navigate('/me');
    }
    const   handleChatLayout = () => {
        console.log("ChatLayout clicked");
        navigate('/'); 
    }
    return (
        <div className="activity-bar-container">
            <nav className='activity-bar-block'>
                <ul>
                    {/* <li className='admin-icon'>M</li> */}
                    <li onClick={handleChatLayout}><MdOutlineMessage /></li>
                    <li onClick={handleFreinds}><MdPeople /></li>
                    <li onClick={handleProfile}><MdPerson /></li>
                    <li onClick={handleFreinds}><MdLogout /></li>
                </ul>
            </nav>
        </div>
    );
}