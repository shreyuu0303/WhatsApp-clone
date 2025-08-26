const contacts = document.querySelectorAll('.contact');
const chatWith = document.getElementById('chat-with');
const chatAvatar = document.getElementById('chat-avatar');
const chatMessages = document.getElementById('chat-messages');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');

let currentChat = 'Alice';
let avatars = {
  'Alice': 'https://i.pravatar.cc/40?img=1',
  'Bob': 'https://i.pravatar.cc/40?img=2',
  'Charlie': 'https://i.pravatar.cc/40?img=3'
};

// Switch chats
contacts.forEach(contact => {
  contact.addEventListener('click', () => {
    contacts.forEach(c => c.classList.remove('active'));
    contact.classList.add('active');
    currentChat = contact.dataset.name;
    chatWith.textContent = currentChat;
    chatAvatar.src = avatars[currentChat];
    chatMessages.innerHTML = '';
  });
});

// Send message
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
  if(e.key === 'Enter') sendMessage();
});

// Emoji picker toggle
emojiBtn.addEventListener('click', () => {
  emojiPicker.style.display = emojiPicker.style.display === 'flex' ? 'none' : 'flex';
});

// Emoji click
emojiPicker.querySelectorAll('span').forEach(e => {
  e.addEventListener('click', () => {
    input.value += e.textContent;
  });
});

function sendMessage() {
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, 'sent');
  input.value = '';
  simulateReply();
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  
  if(type === 'received') {
    const img = document.createElement('img');
    img.src = avatars[currentChat];
    img.className = 'avatar';
    div.appendChild(img);
  }

  const span = document.createElement('span');
  span.textContent = text;
  div.appendChild(span);

  // Add timestamp
  const timestamp = document.createElement('span');
  timestamp.className = 'timestamp';
  const now = new Date();
  timestamp.textContent = `${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`;
  div.appendChild(timestamp);

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulate AI reply with typing
function simulateReply() {
  typingIndicator.style.display = 'block';
  setTimeout(() => {
    typingIndicator.style.display = 'none';
    const replies = ["😂","Sounds good!","Let's meet later","👍","❤️"];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    addMessage(reply, 'received');
  }, 1200);
}


