const input = document.querySelector('.chat__input');
const output = document.querySelector('.chat__output');
const chat = document.querySelector('.chat');

chat.onsubmit = () => {
  const div = document.createElement('p');
  div.innerHTML = input.value;
  output.appendChild(div);
  return false;
};
