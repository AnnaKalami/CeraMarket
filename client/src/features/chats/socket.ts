import { io } from 'socket.io-client';


// "undefined" means the URL will be computed from the `window.location` object
// const URL = 'http://31.129.49.27:80';
const URL = 'http://127.0.0.1:4000';
const socket = io(URL);

export default socket;
