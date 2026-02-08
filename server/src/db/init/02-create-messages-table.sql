
CREATE TABLE messages (
    id          SERIAL PRIMARY KEY,
    sender_id   INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),

    CONSTRAINT ft_sender
        FOREIGN KEY (sender_id) REFERENCES  users(id),
    CONSTRAINT ft_receiver
        FOREIGN KEY (receiver_id)   REFERENCES users(id)
);