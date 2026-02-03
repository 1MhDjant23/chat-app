import { Fragment, useEffect, useState } from "react";
import { getHistory } from "../api/getHistory.js";
import { useParams } from "react-router-dom";
import  {socket}   from '../socket/socket.js';
import { clientSocket } from "../socket/clientSocket.js";
import { UserCounter } from "./UserCounter.jsx";

export  const   Chat = ({user}) => {

    const   [loading, setLoading] = useState(true);
    const   [error, setError] = useState(null);
    const   [history, setHistory] = useState([]);
    const   [message, setMessage] = useState('');

    const   sendMessage = (e) => {
        e.preventDefault();
        if(message.trim() === '')
            return alert('can\'t send empty message');
        socket.emit('send-message', {
            receiverId: user.id,
            content: message
        });
        console.log('message send !!!');
    }

    useEffect(() => {
        if (user === null)
            return;
        const   getChatHistory = async () => {
        try {
            setLoading(true);
            const   chatHistory = await getHistory(user.id);
            setHistory(chatHistory);
        } catch (err) {
            setError(err);
            console.log('error Loading history', err);
        } finally {
            setLoading(false);
            console.log("history loading success");
        }
    }
    getChatHistory();


    
    clientSocket(user.id);

    const   receive_message = (messObj) => {
        setHistory(prev => [...prev, messObj]);
    }

    socket.on('receive-message', receive_message);

    return () => {
        socket.off('connect');
        socket.off('connect_error');
        socket.off('receive-message', receive_message);
        socket.disconnect();
        console.log('socket disconnected');
    }
    }, []);

    // if(loading)
    //     return (<div>Loading conversation...</div>);
    // if(error)
    //     return (<div>Error: {error}</div>);
    return (

        <div className="chat-window">

            <header>
                <UserCounter />
                {socket.username} Chat:
            </header>
            <section>
                {history.length > 0 ? (
                    history.map(m => (
                        <Fragment key={m.id}>
                            <div style={{
                            textAlign: m.from === user.id ? 'right' : 'left'
                        }}>

                            {/* <h1>hiii</h1> */}
                            <span>{m.id}</span>
                            <span>{m.from} To: {m.to}</span>
                            <h2 style={{
                                backgroundColor: m.from === user.id ? "black" : "grey"
                            }}>{m.content}</h2>
                            </div>
                        </Fragment>))
                ) : (<h3>No History yet</h3>)}
            </section>
            {/* <footer>
                <input
                    placeholder="type message..."
                    value={message}
                    type="text"
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>send</button>
            </footer> */}
        </div>
    );

}