const socket = io();

let currentUsername = null;


function  joinChat(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('usernameInput');
  const username = usernameInput.value.trim(); 
  if (!username) {
    showError('joinError', 'Please enter a username');
    return;
  }
  socket.emit('userJoin', username);
}

function  sendMessage(event) {
  event.preventDefault();

  const messageInput = document.getElementById('messageInput');
  const content = messageInput.value.trim() ;
  
  if (!content) {
    showError('messageError', 'Message cannot be empty');
    return ;
  }
  socket.emit('sendMessage', { content: content });
  messageInput.value = '';
}

function  showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;

  setTimeout(() => {
    errorElement.textContent = '';
  }, 3000);
}

function displayMessage(username, content, timestamp, isSystem = false) {
  const container = document.getElementById('messagesContainer');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + (isSystem ? 'system' : 'regular');
  
  const messageContent = `
    <div class="message-header">
      <span class="username">${username}</span>
      <span class="timestamp">${timestamp}</span>
    </div>
    <div class="message-content">${content}</div>
  `;
  
  messageDiv.innerHTML = messageContent;
  container.appendChild(messageDiv);
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function displayUsers(users) {
  const usersList = document.getElementById('usersList');
  
  if (users.length === 0) {
    usersList.innerHTML = '<p class="no-users">No users online</p>';
    return;
  }
  
  usersList.innerHTML = users.map(user => `
    <div class="user-item">
      <span class="user-dot">●</span>
      <span class="user-name">${user.username}</span>
    </div>
  `).join('');
}

// when connected to server

socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

socket.on('welcome', (data) => {
  currentUsername = data.username;
  // Hide join form, show chat
  document.getElementById('joinForm').style.display = 'none';
  document.getElementById('chatArea').style.display = 'flex';
  displayMessage('System', data.message, new Date().toLocaleTimeString(), true);
});

socket.on('error', (message) => {
  showError('joinError', message);
})

// when new messge received
socket.on('newMessage', (data) => {
  displayMessage(data.username, data.content, data.timestamp);
});

// when user joins
socket.on('userJoined', (data) => {
  displayMessage('System', data.message, new Date().toLocaleTimeString(), true);
  document.getElementById('totalUsers').textContent = 'Users: ' + data.totalUsers;
  // refresh users list
  socket.emit('getUsers');
})

// When user leave

socket.on('userLeft', (data) => {
  displayMessage('System', data.message, new Date().toLocaleTimeString(), true);
  document.getElementById('totalUsers').textContent = 'Users: ' + data.totalUsers;
  // refresh users list
  socket.emit('getUsers');
});



socket.on('usersList', (data) => {
  displayUsers(data.users);
});

// When disconnected
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
socket.emit('getUsers');