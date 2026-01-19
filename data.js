/** 
 * here we store our message
 */

let messages = [];
let users = [];


export function getAllMessages() {
  return messages;
}

export  function  addMessage(username, content) {
  const newMessage = {
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    username: username,
    content: content,
    timestamp: new Date(),
    formatedTime: new Date().toLocaleTimeString()
  };
  messages.push(newMessage);
  return newMessage;
}

export function getAllUsers() {
  return users;
}

export  function  addUser(socketId, username) {
  const newUser = {
    socketId: socketId,
    username: username,
    joinedAt: new Date()
  };
  users.push(newUser);
  return newUser;
}

export  function  removeUser(socketId) {
  users = users.filter(u => u.socketId !== socketId);
}

export  function  getUserBySocketId(socketId) {
  return users.find(u => u.socketId === socketId);
}

export  function  usernameExists(username) {
  return users.some(u => u.username === username);
}

