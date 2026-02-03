import { MessageInput } from "./MessageInput.jsx";
import { Messages } from "./Messages.jsx";
import '../public/css/chatWindow.css';

export    const   ChatWindow = ({user}) => {
    return (
        <div>
            <header>
                <div className="profile">
                    <img src="#" alt="user-pic"/>
                    <h4>{user.username}</h4>
                </div>
            </header>
            <Messages uid={user.id}/>
            <MessageInput uid={user.id}/>
        </div>
    );
}