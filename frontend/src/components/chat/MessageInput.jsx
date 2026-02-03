import { useState } from "react";
import { socket } from "../../socket/socket.js";
import { BsSend } from 'react-icons/bs'


export const MessageInput = ({ uid }) => {
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === '')
            return;
        socket.emit('send-message', {
            receiverId: uid,
            content: input
        });
        setInput('');
        console.log('message send !!!');
    }

    return (
        <div className="mssg-input-container">
            <form onSubmit={handleSend}>
                <div className="chat-input">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        value={input}
                        placeholder="Type a message..."
                    />
                    <button type="submit"><BsSend size={20} color="white" /></button>
                </div>
            </form>

        </div>
    );
}
