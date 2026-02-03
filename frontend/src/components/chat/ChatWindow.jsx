import { MessageInput } from "./MessageInput.jsx";
import { Messages } from "./Messages.jsx";
import "../public/css/messages.css";

export const ChatWindow = ({ user }) => {
    return (
        <div className="chat-window-container">
            <div className="chat-header">
                <div className="chat-header-avatar">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="chat-header-info">
                    <h2>{user.username}</h2>
                    <p>Online</p>
                </div>
            </div>
            <Messages uid={user.id} />
            <MessageInput uid={user.id} />
        </div>
    );
}