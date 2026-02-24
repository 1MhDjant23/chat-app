import { useState } from "react";
import { sendFriendRequestAPI } from "../../api/freindsApi.js";

export const AddFriends = () => {
    const [username, setUsername] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddFriend = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setStatusMessage({ text: "Please enter a valid username.", type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const response = await sendFriendRequestAPI(username);
            setStatusMessage({ text: `Friend request sent to ${username}!`, type: 'success' });
            setUsername(''); // Clear input after submission
        } catch (error) {
            setStatusMessage({ text: error.message || "Failed to send request.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-friend-container">
            <h1>Add Friend</h1>
            <p className="add-friend-description">
                You can add friends with their username.
            </p>

            {/* Wrap in a form to allow 'Enter' key submission */}
            <form onSubmit={handleAddFriend} className="add-friend-form">
                <input
                    type="text"
                    value={username}
                    placeholder="Enter username..."
                    onChange={(e) => setUsername(e.target.value)}
                    className="add-friend-input"
                    disabled={loading}
                />
                <button type="submit" className="add-friend-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Friend Request'}
                </button>
            </form>

            {statusMessage && (
                <p className="status-message" style={{ color: statusMessage.type === 'error' ? '#f04747' : '#43b581' }}>
                    {statusMessage.text}
                </p>
            )}
        </div>
    );
};
