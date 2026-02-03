import { readUsers } from "./fileDB.js";

export  const   getUserById = (uid) => {

    const   users = readUsers();

    return users.find(u => u.id === uid);
}