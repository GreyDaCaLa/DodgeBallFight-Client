import { createContext, useContext, useEffect, useRef, useState } from "react";
import GLOBAL_SETTINGS from "../Methods/Constants";
import { io } from "socket.io-client";

const GameStatusContext = createContext({});



export const GameStatusProvider = (props) => {


    const balls_status = useRef([{
      position: [11, 6, 0],
      oldBallPosition: [11,6,0],
      midFrameBallArr: [],
      // direction: 0,
      // scalarVelocity: 0,
      direction: 90,
      scalarVelocity: .25,
      ballRadius: 0.25,
      hitDelay:{
        pr:100,
        dn:false,
        tt:0,
        act:false
      },
      ballwashit:false,
      ballwashitangle:0,
      ballwashitchange:[0,0,0]
    }]);
    
    const players_status = useRef({});

    const player_id = useRef('')

  return <GameStatusContext.Provider value={{balls_status,players_status,player_id}}>{props.children}</GameStatusContext.Provider>;
};

export const useGameStatus = () => {
  return useContext(GameStatusContext);
};
