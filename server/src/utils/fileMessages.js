import  {__dirname} from './fileDB.js';
import  path    from    'path';
import  fs from 'node:fs';

const   filePath = path.join(__dirname, '..', 'data', 'messages.json');


export  const   readMessages = () => {
    const   messages = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(messages);
}



export const  saveMessage = (message) => {
    const mess = readMessages();
    mess.push(message);
    fs.writeFileSync(filePath, JSON.stringify(mess, null, 2));
}