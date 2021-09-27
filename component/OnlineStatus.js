import { useEffect, useReducer } from 'react'
import { useSocket } from '../Provider/SocketProvider'

const reducer = (state, action) => {
    switch (action.type) {
        case "Change":
            {
                state = action.value;
                return state;
            }
        default:
            return state;
    }
}
function OnlineStatus() {
    const [data, dispatch] = useReducer(reducer, [])
    var { socket } = useSocket();
    var interval;
    useEffect(() => {
        if (socket) {
            interval = setInterval(() => {
                socket.emit('ClientCount');
            }, 1000);
        }
        return () => {
            interval && clearInterval(interval);
        }
    }, [socket]);
    if (socket)
        socket.on('ClientCount', count => {
            dispatch({ type: "Change", value: count })
        });
    return (
        <div className="row">
            {data && data.length > 0 ? data.map(e =>
                <div key={e.server} div className="col-xl-3 col-md-6 mb-4" >
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        {e.server}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{e.value}</div>
                                </div>
                                <div className="col-auto">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
        </div>
    )
}

export default OnlineStatus
