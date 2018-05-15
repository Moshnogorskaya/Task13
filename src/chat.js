import ChatEngineCore from 'chat-engine';

// const input = document.querySelector('.chat__input');
// const output = document.querySelector('.chat__output');
// const chat = document.querySelector('.chat');
// const now = new Date().getTime();
// const username = ['user', now].join('-');


const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-4b36da47-51c2-4924-b90c-b480014708ec',
  subscribeKey: 'sub-c-710951a6-5805-11e8-a697-1afc57e8b539',
});

ChatEngine.connect('marina', { team: 'lodoss' });

ChatEngine.on('$.ready', () => {
  console.log('ChatEngine ready to go!');
});
