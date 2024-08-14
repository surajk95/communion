import { createLobby } from "./lobby.js";
import { socketIO } from "../index.js";
let users = []
let lobby = null

function sendData(socket, data) {
    socket.emit('data', data)
}

function broadcastData(data) {
  socketIO.emit('data', data)
}

function throwError(data) {
  broadcastData({
    type: 'error',
    data,
  })
}

export function setEventListeners() {
    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} connected.`)  
        sendData(socket, {
          type: 'socketId',
          id: socket.id,
        })
        socket.on("data", data => {
          console.log(`data from client`, data, socket.id)
          socketIO.emit("messageResponse", data)
          handleData(data, socket)
        })
     
        socket.on('disconnect', () => {
          console.log(`${socket.id} disconnected.`);
          if(lobbyExists()) {
            const targetUser = lobby.players.filter(i => i.socketId === socket.id)
            lobby.players = lobby.players.filter(i => i.socketId !== socket.id)
            broadcastData({
              type: 'update',
              data: `${targetUser?.username} left`
            })
          }
          socket.disconnect()
        });
    });
}

export const handleData = (data, socket) => {
    switch(data.type) {
        case 'set-game': {
          broadcastData({
            type: 'set-game',
            index: data.index,
          })
          break
        }
        case 'host-lobby': {
            lobby = createLobby(data.data, socket.id)
            sendData(socket, {
              type: 'update-lobby',
              lobby
            })
            break
        }
        case 'join-lobby': {
            const username = data.data.username ? data.data.username : socket.id
            if(!lobbyExists()) {
              sendData(socket, {
                type: 'error',
                data: 'lobby doesn\'t exist',
              })
            }
            else {
              lobby.players.push({
                socketId: socket.id,
                username,
              })
              broadcastData({
                type: 'update-lobby',
                lobby,
              })
              broadcastData({
                type: 'update',
                data: `${username} joined`
              })
            }
            break
        }
        default: {
            console.log(`invalid data`)
        }
    }
    console.log(`config now`, lobby)
}

function lobbyExists() {
  return lobby && Object.keys(lobby).length > 0
}