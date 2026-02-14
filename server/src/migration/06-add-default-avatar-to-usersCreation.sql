-- Update rows in 'users' where condition is met
UPDATE users
SET avatar_url = '/app/src/uploads/avatars/defaults/default-avatar.png'
WHERE avatar_url IS NULL;