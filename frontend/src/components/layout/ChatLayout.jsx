import { useEffect, useState } from "react";
import { UsersList } from "../users/UsersList.jsx";
import { ChatWindow } from "../chat/ChatWindow.jsx";
import  { socket }  from '../../socket/socket.js';
import  "../public/css/chatLayout.css"

export  const   ChatLayout = () => {
    const   [userActive, setUserActive] = useState(null);
    
    useEffect(() => {
        const   token = localStorage.getItem('token');
        socket.auth = { token: token };
        socket.connect();
        socket.on('connect', () => {
            console.log('Websocket connection established success!');   
        })
    }, []);

    useEffect(() => {
        if (!userActive)
            return ;
        socket.emit('join-private-chat', userActive.id);
        socket.on('joined', (mess) => console.log(`Joined:`, mess));

    }, [userActive])


    return (
        <div className="chat-layout-container">
                <UsersList setUserActive={setUserActive} />
            
                {
                    userActive ? <ChatWindow user={userActive} /> 
                    : 
                    <div className="chat-empty">
                        <h3>Select a user to start Chatting</h3>
                    </div>
                }
        </div>
    );
}