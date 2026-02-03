import { Fragment, useEffect, useRef, useState } from "react";
import { getHistory } from "../../api/getHistory.js";
import { socket } from "../../socket/socket.js";
import '../public/css/messages.css';

export const Messages = ({ uid }) => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const   toLastMessage = useRef(null);

    useEffect(() => {
        if (!uid)
            return;
        const getChatHistory = async () => {
            try {
                setLoading(true);
                setError(null)
                const chatHistory = await getHistory(uid);
                setHistory(chatHistory);

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        getChatHistory();

        // Listen for new messages
        const handleNewMessage = (message) => {
            setHistory(prev => [...prev, message]);
        };

        socket.on('receive-message', handleNewMessage);

        return () => {
            socket.off('receive-message', handleNewMessage);
        };

    }, [uid]);

    useEffect(() => {
        toLastMessage.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history]);


    if (loading)
        return (<div className="history-loading">Loading conversation...</div>);
    if (error)
        return <div className="history-loading">Error: {error.message}</div>


    return (
        <section className="chat-window">
            {history.length > 0 ? (
                history.map(messg => {
                    // Determine if message was sent by current user
                    const isSent = messg.to === uid;

                    return (
                        <Fragment key={messg.id}>
                            <div className={`messg-block ${isSent ? 'sent' : 'received'}`}>
                                <h2>
                                    {messg.content}
                                </h2>
                            </div>
                            <div ref={toLastMessage}/>
                        </Fragment>
                    );
                })
            ) :
                (<div className="chat-empty"><h3>No messages yet. Say Hello!</h3></div>)
            }
        </section>
    );
}