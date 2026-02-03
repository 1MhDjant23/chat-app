import  fs  from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';


const   __filename = fileURLToPath(import.meta.url);
export const   __dirname = dirname(__filename);



const   filePath = path.join(__dirname, '..', 'data', 'users.json');

export const   readUsers = () => {
    try {
        const   data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
        
    } catch (error) {
        console.log('error get users');
        return [];
    }
};

export const   addUser = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

