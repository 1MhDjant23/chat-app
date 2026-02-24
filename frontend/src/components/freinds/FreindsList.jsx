import { useEffect, useState } from "react";
import { freindsListAPI } from "../../api/freindsApi.js";
import { useNavigate } from "react-router-dom";

export const FreindsList = ({ type }) => {
    const [freinds, setFreinds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFreindList = async () => {
            try {
                setLoading(true);
                setError(null);
                const results = await freindsListAPI();
                console.log("results:", results);
                setFreinds(results.freindList);
            } catch (error) {
                console.error("error lists:", error.message);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchFreindList();
    }, [type]);

    if (loading)
        return <div>Loading Freind lists...</div>
    if (error)
        return <div>error: {error}</div>
    return (
        <div className="freind-list-container">
            <h1>Freinds Lists:</h1>
            {freinds.map(fr => (
                <div
                    key={fr.id}
                    className="friend-item"
                    onClick={() => navigate(`/profile/${fr.id}`)}
                >
                    <div className="friend-avatar"></div>
                    <span className="friend-name">{fr.username}</span>
                </div>
            ))}
        </div>
    );
}