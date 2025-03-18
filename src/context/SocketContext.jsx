import { createContext, useContext, useEffect, useRef, useState } from "react";
import GLOBAL_SETTINGS from "../Methods/Constants";
import { io } from "socket.io-client";
import { useGameStatus } from "./GameContext";

const SocketToolsContext = createContext({});

export const SocketToolsProvider = (props) => {
  const onlineserver = GLOBAL_SETTINGS.onlineserver;
  const Endpoint = GLOBAL_SETTINGS.ENDPOINT;
  const [S_Connected, setConn] = useState(false);
  // const [online,setOnline] = useState(false);
  const [socket, setSocket] = useState();

  const turnconnectionoff = false;

  const attemptedToConnect = useRef(false);

  const { balls_status, players_status, player_id } = useGameStatus();

  function getStatuses() {}

  useEffect(() => {
    if (socket) {
      socket.on("S_HeartBeat", (data) => {
        balls_status.current = data.balls_status;
        players_status.current = data.players_status;
      });

      socket.on("S_GivePlayerId", (data) => {
        player_id.current = data.id;
      });

      // S_GivePlayerId
    }

    if (!onlineserver && !socket) {
      setConn(true);
    }
  }, [socket]);

  //making connection
  useEffect(() => {
    if (!turnconnectionoff) {
      if (!onlineserver && !attemptedToConnect.current) {
        attemptedToConnect.current = true;
        const connectionOptions = {
          forceNew: true,
          reconnectionAttempts: "3",
          // 'max reconnection attempts' : '2',
          timeout: 10000,
          transports: ["websocket"],
        };
        try {
          const newSocket = io.connect(Endpoint, connectionOptions);
          setSocket(newSocket);
        } catch (error) {
          console.log(`CAN NOT FIND SERVER AT: ${Endpoint}`);
        }

        return () => {
          if (socket) {
            socket.close();
          }
          // newSocket.close()
        };
      }
    }
  }, []);

  return <SocketToolsContext.Provider value={{ socket, onlineserver }}>{props.children}</SocketToolsContext.Provider>;
};

export const useSocketTools = () => {
  return useContext(SocketToolsContext);
};
