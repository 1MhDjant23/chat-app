const socket = io();

let currentUsername = null;


function  joinChat(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('usernameInput');
  const username = usernameInput.ariaValueMax.trim();
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

function  displayMessage(Username, content, timestamp, isSystem = false) {
  const container = document.getElementById('messageContainer');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message' + (isSystem ? 'system' : 'regular');





}

socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

socket.on('welcome', (data) => {
  console.log(data.message);
});

socket.on('userJoined', (data) => {

});

socket.on('error', (message) => {
  shower
})