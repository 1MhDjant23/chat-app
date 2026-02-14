import { useState } from 'react';
import { avatarApi } from '../../api/profileApi';
import  avatar    from '../public/assets/avatar.png';
import  { BASE_URL }    from    '../../api/fetchApi.js';

export  const   ProfileAvatar = ({ user, onUpdate, onEdit }) => {
    const   [error, setError] = useState(null);
    const   [loading, setLoading] = useState(false);

    const   handleChange = async (e) => {
        const   file = e.target.files[0];
        if(!file) return;

        if(!file.type.startsWith('image/')) {
            setError('Please select a valid image file.');
            return ;
        }
        if(file.size > 2 * 1024 * 1024) {
            setError('File size must be less than 2MB.');
            return ;
        }

        const   newFormData = new FormData();
        console.log("file:", file);
        newFormData.append('avatar', file);
        try {
            setLoading(true);
            setError(null);
            // console.log(`FORM DATA ${newFormData.ke}`);
           const   res = await avatarApi(
            {
                method: 'POST',
                body: newFormData,
            });
            if (!res.ok)
                throw new Error('Upload failed');
            onUpdate(res.user);
            // console.log("{{{{{{{{{{" ,res.user);
        } catch (error) {
            console.log(error);
            setError(error.message );
        }
        finally{
            setLoading(false);
        }
    }
    if (loading) 
        return <div>loading avatar...</div>
    if (error) {
        return <div>error avatar: {error}</div>
    }
    return (
        <div className="profile-avatar">
            
            <div className="avatar-wrapper">
                <img 
                    src={ user.avatar_url ? `${BASE_URL}/` + user.avatar_url : `${avatar}`}
                    alt={`${user.username}` || 'User avatar'} />
            </div>

            <label htmlFor="avatar-upload" className='upload-button'>
                Change Avatar
            </label>

            <input
                id='avatar-upload'
                type="file"
                accept='image/*'
                onChange={handleChange}
            />
            
        </div>
    );
}