import { useRef, useState } from "react";
import Ball from "./Ball";
import Border from "./Border";
import { useFrame } from "@react-three/fiber";
import Player from "./player";
import { useKeyboard } from "../hooks/useKeyBoard";
import { useUserInput } from "../context/UserInputContext";
import { useGameStatus } from "../context/GameContext";
import { useSocketTools } from "../context/SocketContext";
// import { movePlayer } from "../Methods/HelperMethods";
// import { moveBall } from "../../../workers/chunkWorker";

function Scene() {
  const mapsizeWidth = 20;
  const mapsizeHeight = 10;
  const mapBorderThinkness = 2;
  const [testbool, setTestBool] = useState(false);
  // const { jump, moveDown, moveLeft, moveRight } = useKeyboard();
  const { jump, moveDown, moveLeft, moveRight, attack, inputHolds, handleInputLogic } = useUserInput();
  const { balls_status, players_status, player_id } = useGameStatus();
  const { socket } = useSocketTools();
  // const { jump, moveDown, moveLeft, moveRight } = useUserInput()

  const WorldConstants = {
    acc: [0, -0.01, 0],
    vel: [0, 0, 0],
    speedHoz: 0.1,
    speedVert: 0.1,
    jumpAcc: [0, 1, 0],
  };

  const testFrame = useRef(0);

  function sendInputUpdate() {
    if (socket) {
      // console.log('happening')
      socket.emit("C_Update_player_Inputs", {inputs:{
        jump,
        moveDown,
        moveLeft,
        moveRight,
        attack: inputHolds.current.attack.act,
      }});
    }
  }

  useFrame(() => {
    // movePlayer();

    if (testFrame.current > 0) {
      testFrame.current = 0;
      if (player_id.current) {
        // console.log('HELLLLLLOOOOO  ')
        handleInputLogic(players_status.current[player_id.current]);

        sendInputUpdate();
      }
      // moveBall();
    }
    testFrame.current += 1;
    setTestBool(!testbool);
  });

  return (
    <>
      <ambientLight />
      <Border sizeW={mapsizeWidth} sizeH={mapsizeHeight} borderThickness={mapBorderThinkness} />
      {Object.keys(players_status.current).map((pl_id, ind) => {
        let pl = players_status.current[pl_id];
        // console.log(players_status)
        return (
          <Player
            key={`players-${ind}`}
            position={[...pl.position]}
            boxHeight={pl.boxHeight}
            boxWidth={pl.boxWidth}
            relavancyRadius={pl.relavancyRadius}
            rightfacing={pl.rightfacing}
          />
        );
      })}
      {/* <Player /> */}

      {balls_status.current.map((ballinfo, ind) => {
        return <Ball key={`MainBall-${ind}`} position={ballinfo.position} ballRadius={[ballinfo.ballRadius]} />;
      })}
      {/* {
      ballstatus.current.midFrameBallArr.map((pos,ind)=>{
        return(
          <Ball key={`withinframeball-${ind}`} position={pos} ballRadius={[ballstatus.current.ballRadius]} color="orange" />
        )
      })} */}
    </>
  );
}

export default Scene;
