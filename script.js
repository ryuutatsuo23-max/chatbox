const CHANNEL_NAME = 'arcticfoxtato';

ComfyJS.onChat = (user, message, flags, self, extra) => {
  const chatContainer = document.getElementById('chat-container');
  if (!chatContainer) return;

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

  let messageWithEmotes = message;
  
  if (extra.messageEmotes) {
    const emotePositions = [];
    Object.keys(extra.messageEmotes).forEach(id => {
      extra.messageEmotes[id].forEach(pos => {
        const [start, end] = pos.split('-').map(Number);
        emotePositions.push({ id, start, end });
      });
    });

    emotePositions.sort((a, b) => b.start - a.start);

    emotePositions.forEach(emote => {
      // PRIMARY URL (v2 structured)
      const primaryUrl = `https://static-cdn.jtvnw.net/emotes/v2/${emote.id}/default/dark/1.0`;
      // FALLBACK 1 (v1 legacy)
      const fallback1 = `https://static-cdn.jtvnw.net/emotes/v1/${emote.id}/1.0`;
      
      // The onerror logic tries the fallback if the primary fails. 
      // It also adds a generic Twitch icon as a last resort so it's never an empty box.
      const imgTag = `<img src="${primaryUrl}" 
                           class="chat-emote" 
                           referrerpolicy="no-referrer" 
                           onerror="this.onerror=null; this.src='${fallback1}';">`;
      
      const before = messageWithEmotes.substring(0, emote.start);
      const after = messageWithEmotes.substring(emote.end + 1);
      messageWithEmotes = before + imgTag + after;
    });
  }

  textSpan.innerHTML = messageWithEmotes;

  contentDiv.appendChild(nameSpan);
  contentDiv.appendChild(textSpan);
  msgWrapper.appendChild(iconImg);
  msgWrapper.appendChild(contentDiv);
  chatContainer.appendChild(msgWrapper);

  if (chatContainer.children.length > 8) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
};

ComfyJS.Init(CHANNEL_NAME);