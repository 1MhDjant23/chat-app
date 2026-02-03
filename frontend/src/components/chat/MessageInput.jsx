import { useState } from "react";
import { socket } from "../../socket/socket.js";
import { BsSend } from 'react-icons/bs'


export const MessageInput = ({ uid }) => {
    const [input, setInput] = useState('');

    const   handleFocus = () => {
        console.log("i'm typing now ....");
        socket.emit('status:typing:start', uid);
    }

    const   handleBlur = () => {
        socket.emit('status:typing:stop', uid);
    }

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
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        value={input}
                        placeholder="Type a message..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                e.preventDefault();
                        }}
                    />
                    <button 
                        disabled={input.trim() === '' ? true : false}
                        onClick={handleBlur}
                        type="submit">
                        
                        <BsSend size={20} color="white" /></button>
                </div>
            </form>

        </div>
    );
}
