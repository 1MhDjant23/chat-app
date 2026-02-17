import  { fileURLToPath }   from "node:url";
import  path                from 'node:path';
import  { qwery }           from "../db/pool.js";
import  fs                  from 'node:fs';

const   __fileName = fileURLToPath(import.meta.url);
const   __dirname = path.dirname(__fileName);

const   UPLOADS_DIR = path.join('uploads', 'avatars');


export  const   updateAvatar = async (req, res) => {
    try {
        if (!req.file) {
            console.log('in this:', req.file);
            return res.status(400).json({error: 'No file uploaded'});
        }

        const   oldAvatarResult = await qwery('SELECT avatar_url FROM users WHERE id = $1', [req.user.id]);7
        const   oldAvatarPath = oldAvatarResult.rows[0].avatar_url;

        const   fullPathOnDisk = path.join(__dirname, '..', oldAvatarPath);

        console.log("OLD:", fullPathOnDisk);
        if (oldAvatarPath) {
            if(fs.existsSync(fullPathOnDisk)) {
                fs.unlinkSync(fullPathOnDisk);
                console.log('✅ Deleted old avatar:', fullPathOnDisk);
            }
        }

        const   avatarPath = `${UPLOADS_DIR}/${req.file.filename}`;
        const result = await qwery("UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING id, username, email, avatar_url, created_at",
            [avatarPath, req.user.id]
        );
        const   userUpdated = result.rows[0];

        res.json({
            ok: true,
            message: 'Avatar uploaded successfully',
            user: userUpdated
        });
        
    } catch (error) {
        console.log("we can't goo here");
        console.log('Upload failled');
        res.status(500).json({
            error: error.message
        });
    }
}


export  const   UpdateInfo = async (req, res) => {
    try {
        const   {username, email} = req.body;
        if(!username && !email || (username.trim() === '' && email.trim() === ''))
            res.status(400).json({error: 'All fields required'});
        if(username.length < 3 || username.length > 12)
            return res.status(400).json({error: 'username must be 3-20 characters'});
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
            return res.status(400).json({error: 'Invalid email format'});

        const   updRes = await qwery('UPDATE users SET username = $1, email = $2 WHERE id = $3\
            RETURNING id, username, email, avatar_url, created_at', [username, email, req.user.id]);
        res.json({
            message: 'Profile updated successfully',
            user: updRes.rows[0]
        })

    } catch (error) {
        console.error('error Profile upd:',error);
        res.status(500).json({error: error.message});
    }
}