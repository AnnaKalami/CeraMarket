const form = document.getElementById('form');
const input = document.getElementById('m');
const messages = document.getElementById('messages');

const socket = new WebSocket(`ws://127.0.0.1:4000`);

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.send(input.value);
      input.value = '';
    }
  });
}

socket.addEventListener('message', function (event) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.textContent = event.data;
  messages.appendChild(li);
});
