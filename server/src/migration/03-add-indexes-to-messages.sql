-- Create an index on 'messages' for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver_created
ON messages (sender_id, receiver_id, created_at);
