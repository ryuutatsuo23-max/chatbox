// Replace 'YourChannelName' with your actual Twitch username
const CHANNEL_NAME = 'drago_horse';

ComfyJS.onChat = (user, message, flags, self, extra) => {
  const chatContainer = document.getElementById('chat-container');

  // Create message elements
  const msgWrapper = document.createElement('div');
  msgWrapper.classList.add('message-wrapper');

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('user-name');
  nameSpan.innerText = `${user}:`;
  nameSpan.style.color = extra.userColor || '#9146FF'; // Use user's Twitch color or default purple

  const textSpan = document.createElement('span');
  textSpan.classList.add('message-text');
  textSpan.innerText = message;

  // Assemble and append
  msgWrapper.appendChild(nameSpan);
  msgWrapper.appendChild(textSpan);
  chatContainer.appendChild(msgWrapper);

  // Keep only the last 20 messages to prevent lag
  if (chatContainer.children.length > 20) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
};

ComfyJS.Init(CHANNEL_NAME);