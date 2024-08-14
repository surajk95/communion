import HostControls from './host-controls';
import useStore from './store'
import useSocket from './use-socket'

export default function Lobby() {
  const { connect, isConnected, dataEvents, sendData } = useSocket();
  const lobby = useStore(state => state.lobby)
  const id = useStore(state => state.id)

  console.log(`zzz lobby`, lobby, id)
  
  return (
    <div className="p-6">
      This is the lobby
      <div>Code: {lobby?.code}</div>
      <div>Host: {lobby?.host}</div>
      <div>
        <div>players:</div>
        {
          !lobby?.players || lobby?.players.length===0 && 'None'
        }
        {
          lobby?.players.map((player) => {
            return (
              <div key={player.socketId}>{player.socketId}</div>
            )
          })
        }
        {
          lobby?.host === id &&
          <HostControls />
        }
      </div>
    </div>
  )
}
