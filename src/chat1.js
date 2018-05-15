import ChatEngineCore from 'chat-engine';

const input = document.querySelector('.chat__input');
const output = document.querySelector('.chat__output');
const chat = document.querySelector('.chat');
const now = new Date().getTime();


let userName = () => {
  let heroes = ['Superhealer','tank007','krasotochka','lodossteam','GoOdHuNtEr','vsemkonets','SlavaPanchenko'];
  let name = heroes[Math.floor(Math.random() * heroes.length)];
  console.log(name);
  return name;
};

const username = ['user', now].join('-');
//let sendChat = function () {};
//let checkSubmit =function(){};

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

ChatEngine.connect(username, 'auth-key');

ChatEngine.on('$.ready', () => {
  window.sendChat = function (e) {
    ChatEngine.global.emit('message', {
      text: input.value,
    });

    input.value = '';
    console.log('bye');
    return false;
  };


  window.checkSubmit = function (e) {
    if (e.keyCode == 13) {
      sendChat();
    }
  };


  ChatEngine.global.on('message', (payload) => {
    const div = document.createElement('p');
    div.innerHTML = `${payload.sender.uuid}: ${payload.data.text}`;
    output.appendChild(div);
  });

  ChatEngine.global.onAny((event, data) => {
    console.info(event, data);
  });
});

function hi() {
  alert('hi!');
}
