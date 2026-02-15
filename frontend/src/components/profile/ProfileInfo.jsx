import { useEffect, useState }  from 'react';
import { infoApi }              from '../../api/profileApi';
import { toast }                from 'react-toastify';

export const  ProfileInfo = ({ user, onUpdate, isEdit, setIsEdit }) => {
    const   [username, setUsername] = useState('');
    const   [email, setEmail] = useState('');

    const   handleSubmit = async (e) => {
        e.preventDefault();
        if(username.trim() === '' || email.trim() === '')
            return ;
        try {
            const   result = await infoApi({ username: username, email: email });
            onUpdate(result.user);
            toast.success(result.message);
            setIsEdit(false);
        } catch (error) {
            console.log('Error info:', error);
            toast.error(error);
        }
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setUsername(user.username);
        }
    }, [user])
    return (
       <div className="profile-info-container">
            {
                !isEdit ? (
                <div className='profile-info'>

                    <p><strong>username:</strong> {username}</p>
                    <p><strong>email:</strong> {email}</p>
                    <p><strong>Phone:</strong> +212 *******</p>
                    <p><strong>Created_at:</strong> {new Date(user.created_at).toLocaleDateString()}</p>

                </div>) :
                (
                <form className='profile-info-edit' onSubmit={handleSubmit}>

                    <label htmlFor="username">Username</label>
                    <input 
                        id='username'
                        value={username}
                        type="text" 
                        onChange={e => setUsername(e.target.value)} 
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        id='email'
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                    />
                    <div className="actions-edit">
                        <button type='submit'>Save</button>

                        <button 
                            type='button' 
                            onClick={e => setIsEdit(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>)
            }
       </div>
    );
}