const CHANNEL_NAME = 'arcticfoxtato';

ComfyJS.onChat = (user, message, flags, self, extra) => {
  console.log("New message from:", user);
  const chatContainer = document.getElementById('chat-container');

  const msgWrapper = document.createElement('div');
  msgWrapper.classList.add('message-wrapper');

  let iconPath = 'IconReg.png';
  if (flags.broadcaster) iconPath = 'IconStreamer.png';
  else if (flags.mod) iconPath = 'IconMod.png';
  else if (flags.vip) iconPath = 'IconVIP.png';
  else if (flags.subscriber) iconPath = 'IconSub.png';

  const iconImg = document.createElement('img');
  iconImg.src = iconPath;
  iconImg.classList.add('user-icon');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('message-content');

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('user-name');
  nameSpan.innerText = user;
  nameSpan.style.color = extra.userColor || '#b496ff';

  const textSpan = document.createElement('span');
  textSpan.classList.add('message-text');

// Manual Emote Handling with V2 links and Cross-Origin support
  let formattedMessage = message;
  if (extra.messageEmotes) {
    const emoteIds = Object.keys(extra.messageEmotes);
    emoteIds.forEach(id => {
      const positions = extra.messageEmotes[id];
      const position = positions[0].split('-');
      const start = parseInt(position[0]);
      const end = parseInt(position[1]);
      const emoteName = message.substring(start, end + 1);
      
      // Using the V2 Twitch Emote API for better compatibility
      const emoteUrl = `https://static-cdn.jtvnw.net/emotes/v2/${id}/default/dark/1.0`;
      
      // Added 'crossorigin' and 'loading' attributes to help the browser
      const emoteHtml = `<img src="${emoteUrl}" class="chat-emote" crossorigin="anonymous" loading="lazy">`;
      formattedMessage = formattedMessage.replaceAll(emoteName, emoteHtml);
    });
  }
  
  textSpan.innerHTML = formattedMessage;

  contentDiv.appendChild(nameSpan);
  contentDiv.appendChild(textSpan);
  msgWrapper.appendChild(iconImg);
  msgWrapper.appendChild(contentDiv);
  chatContainer.appendChild(msgWrapper);

  if (chatContainer.children.length > 10) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
};

ComfyJS.Init(CHANNEL_NAME);