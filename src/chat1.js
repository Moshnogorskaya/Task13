import ChatEngineCore from 'chat-engine';

const input = document.querySelector('.chat__input');
const output = document.querySelector('.chat__output');
const chat = document.querySelector('.chat');
const now = new Date().getTime();
const getName = () => {
  const heroes = ['Superhealer', 'tank007', 'krasotochka', 'lodossteam', 'GoOdHuNtEr', 'vsemkonets', 'SlavaPanchenko'];
  return heroes[Math.floor(Math.random() * heroes.length)];
};

const getColor = () => {
  const colors = ['#3060ad', '#2fad3a', '#ada42f', '#ad6b2f', '#ad2f89', '#ccc3c9'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getAvatar = () => {
  const avatars = ['url("https://orig00.deviantart.net/2326/f/2012/110/c/3/new_tera_avatar_elf_slayer_by_mizukoiuchi-d4x09qp.jpg")',
    'url("http://forum.illyriad.co.uk/uploads/971/elvenMALE02.jpg")',
    'url("https://pre00.deviantart.net/8ef2/th/pre/f/2012/037/4/4/elf_child_by_sakimichan-d4oxa56.jpg")',
    'url("https://cdna.artstation.com/p/assets/images/images/005/958/496/micro_square/edgar-cardona-avatar-hera-f.jpg?1494995241")',
    'url("https://orig00.deviantart.net/7881/f/2008/154/d/d/lineage2_elf_avatar_by_lurker5.jpg")'];
     let avatarURL = avatars[Math.floor(Math.random() * avatars.length)];
};


// const username = ['user', now].join('-');
// let sendChat = function () {};
// let checkSubmit =function(){};

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

ChatEngine.connect(
  getName(), {
    color: getColor(),
  },
);

ChatEngine.on('$.ready', () => {
  window.sendChat = function (e) {
    ChatEngine.global.emit('message', {
      text: input.value,
    });
    input.value = '';
    return false;
  };


  window.checkSubmit = function (e) {
    if (e.keyCode == 13) {
      sendChat();
    }
  };


  ChatEngine.global.on('message', (payload) => {
    const date = new Date();
    const div = document.createElement('p');
    div.innerHTML = `${date.getHours()}:${date.getMinutes()} [${payload.sender.uuid}]: ${payload.data.text}`;
    div.style.color = payload.sender.state.color;
    output.appendChild(div);
  });

  ChatEngine.global.onAny((event, data) => {
    console.info(event, data);
  });
});
