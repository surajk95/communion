// import socketIO from 'socket.io-client';
// export const socket = socketIO.connect('http://localhost:4000');

import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:2000';
const URL = 'https://communion-io-backend.vercel.app/';

export const socket = io(URL, {
    autoConnect: true,
});