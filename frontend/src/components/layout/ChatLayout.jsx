import { useState } from "react";
import { Chat } from "../Chat.jsx";
import { UsersList } from "../users/UsersList.jsx";
import { ChatWindow } from "../chat/ChatWindow.jsx";
import  "../public/css/chatLayout.css"

export  const   ChatLayout = () => {
    const   [userActive, setUserActive] = useState(null);

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