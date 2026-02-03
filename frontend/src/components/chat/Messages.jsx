import { Fragment, useEffect, useState } from "react";
import { getHistory } from "../../api/getHistory.js";
import '../public/css/messages.css';

export  const   Messages = ({uid}) => {

    const   [history, setHistory] = useState([]);
    const   [loading, setLoading] = useState(true);
    const   [error, setError] = useState(null);

    useEffect(() => {
        if(!uid)
            return;
        const   getChatHistory = async () => {
            try {
                setLoading(true);
                setError(null)
                const   chatHistory = await getHistory(uid);
                setHistory(chatHistory);

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        getChatHistory();

    }, [uid]);

    if(loading)
        return (<div className="history-loading">Loading conversation...</div>);
    if (error) 
        return <div>{error.message}</div>


    return (
        <div className="chat-window-container">
            <section className="chat-window">
                {history.length > 0 ? (
                    history.map(messg => (
                        <Fragment key={messg.id}>
                            <div className="messg-block">
                                <span>{messg.from}</span>
                                <span>{messg.to}</span>
                                <h2>
                                    {messg.content}
                                </h2>
                            </div>
                        </Fragment>
                    ))
                ) : (<h3>No messages yet. Say Hello!</h3>)
                }
            </section>

        </div>
    );
}