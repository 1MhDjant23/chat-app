import { useEffect, useState } from 'react';

export const  ProfileInfo = ({ user, onUpdate, isEdit }) => {
    const   [username, setUsername] = useState('');
    const   [email, setEmail] = useState('');
    // const   [phone, setPhone] = useState('');

    const   editUsername = () => {
        if(username.trim() === '')
            return ;
        
    }
    const   editEmail = () => {

    }

    useEffect(() => {

    }, [])
    return (
        <div className="profile-av,atar-container">
            {
                user ? 
                (<div>
                    <p>ID: {user.id}</p>
                    <label htmlFor="username">username: {user.username}</label>
                        isEdit ? (
                        <input
                            id='username'
                            value={username}
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button onClick={editUsername}>edit</button>
                    ) : ('')
                    {/* <p>username: {user.username}</p> */}
                    <label htmlFor="email">email: {user.email}</label>
                        isEdit ? (
                        <input
                            id='email'
                            value={email}
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button onClick={editEmail}>edit</button>
                    ) : ('')
                    {/* <p>email: {user.email}</p> */}
                    {/* <label htmlFor="phone">phone: {user.phone}</label>
                    <input
                        id='phone'
                        value={phone}
                        type="phone"
                        onChange={e => setPhone(e.target.value)}
                    />
                    <button onClick={editPhone}>edit</button> */}
                    {/* <p>phone: +212 ***********</p> */}
                </div>) : <p>error fetching user</p>
            }
        </div>
    );
}