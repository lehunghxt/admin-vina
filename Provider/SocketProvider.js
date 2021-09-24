import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'

export const WebSocketContext = createContext();

export const useSocket = () => { return useContext(WebSocketContext) };

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket)
        return () => {
            newSocket.disconnect();
        }
    }, []);
    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider >
    )
}

export default SocketProvider;