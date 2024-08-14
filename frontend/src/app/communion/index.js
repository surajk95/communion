"use client"
import useSocket from './use-socket'
import useStore from './store';
import Lobby from './lobby';

export default function Home() {
  const { connect, isConnected, dataEvents, sendData } = useSocket();
  const lobby = useStore(state => state.lobby)
  const initHost = () => {
    sendData({
      type: 'host-lobby',
      data: {code: 420,},
    })
  }
  const onSubmit = (e) => {
    if(e) e.preventDefault()
    sendData({
      type: 'join-lobby',
      data: {code: 420, username: ''},
    })
  }

  // console.log(`zzz index`, lobby)
  return (
    <div>
      Communion
      <br/>
      {/* <button onClick={connect}>Connect</button> */}
      {/* <button onClick={() => sendData('lobbycode 69')}>Send</button> */}
      {
        !lobby ?
        <>
              <button onClick={() => initHost()}>Host</button>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter lobby code here"
          />
          <button type="submit">Join</button>
        </form>
      </div>
      </>
      :
      <Lobby />
      }

    </div>
  )
}
