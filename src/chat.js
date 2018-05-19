import ChatEngineCore from 'chat-engine';

const input = document.querySelector('.chat__input');
const output = document.querySelector('.chat__output');
const info = document.querySelector('.info');

const getName = () => {
  const heroes = [
    'Superhealer',
    'tank007',
    'krasotochka',
    'lodossteam',
    'GoOdHuNtEr',
    'vsemkonets',
    'SlavaPanchenko',
  ];
  return heroes[Math.floor(Math.random() * heroes.length)];
};

const getColor = () => {
  const colors = [
    '#3060ad',
    '#2fad3a',
    '#ada42f',
    '#ad6b2f',
    '#ad2f89',
    '#ccc3c9',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getAvatar = () => {
  const avatars = [
    'girl_draenei',
    'girl_violet-hair',
    'girl_white-hair',
    'goblin',
    'man_draenei',
    'troll',
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

const ChatEngine = ChatEngineCore.create(
  {
    publishKey: 'pub-c-4b36da47-51c2-4924-b90c-b480014708ec',
    subscribeKey: 'sub-c-710951a6-5805-11e8-a697-1afc57e8b539',
  },
  {
    globalChannel: 'chat-engine-demo-js',
    insecure: true,
  },
);

ChatEngine.connect(getName(), {
  color: getColor(),
  avatar: getAvatar(),
});

ChatEngine.on('$.ready', (data) => {
  const infoAvatar = document.createElement('div');
  infoAvatar.classList.add(
    'info__avatar',
    `info__avatar_${data.me.state.avatar}`,
  );
  info.appendChild(infoAvatar);

  const sendChat = () => {
    ChatEngine.global.emit('message', {
      text: input.value,
    });
    input.value = '';
    return false;
  };

  input.onkeypress = (e) => {
    if (e.keyCode === 13) {
      sendChat();
    }
  };

  ChatEngine.global.on('message', (payload) => {
    const date = new Date();
    const div = document.createElement('p');
    const outputText = payload.data.text.replace(/</g, '&lt;');
    div.innerHTML = `${date.toLocaleTimeString()} [${
      payload.sender.uuid
    }]: ${outputText}`;
    div.style.color = payload.sender.state.color;
    output.appendChild(div);
  });

  ChatEngine.global.onAny((event) => {
    console.info(event, data);
  });
});
