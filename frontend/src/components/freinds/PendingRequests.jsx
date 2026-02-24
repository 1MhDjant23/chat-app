import { useEffect, useState } from "react";
import { getPendingRequestsAPI, acceptFriendRequestAPI, rejectFriendRequestAPI } from "../../api/freindsApi.js";

export const PendingRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const results = await getPendingRequestsAPI();
            setRequests(results.requests || []);
        } catch (err) {
            console.error("Error fetching pending requests:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            await acceptFriendRequestAPI(requestId);
            // Remove request from UI
            setRequests(prev => prev.filter(req => req.request_id !== requestId));
        } catch (err) {
            console.error("Failed to accept:", err.message);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await rejectFriendRequestAPI(requestId);
            // Remove request from UI
            setRequests(prev => prev.filter(req => req.request_id !== requestId));
        } catch (err) {
            console.error("Failed to reject:", err.message);
        }
    };

    if (loading && requests.length === 0) return <div>Loading pending requests...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="freind-list-container pending-requests">
            <h1>Pending Requests</h1>
            {requests.length === 0 ? (
                <p style={{ color: '#b9bbbe' }}>No pending requests.</p>
            ) : (
                requests.map(req => (
                    <div key={req.request_id} className="friend-item pending-item">
                        <div className="friend-info">
                            <div className="friend-avatar" style={{ backgroundImage: req.avatar_url ? `url(${req.avatar_url})` : 'none', backgroundSize: 'cover' }}></div>
                            <span className="friend-name">{req.username}</span>
                        </div>
                        <div className="pending-actions">
                            <button className="accept-btn" onClick={() => handleAccept(req.request_id)}>
                                Accept
                            </button>
                            <button className="reject-btn" onClick={() => handleReject(req.request_id)}>
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
