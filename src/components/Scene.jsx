import { useRef, useState } from "react";
import Ball from "./Ball";
import Border from "./Border";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";

function Scene() {
  const mapsizeWidth = 20;
  const mapsizeHeight = 10;
  const mapBorderThinkness = 2;
  const [testbool, setTestBool] = useState(false);
  const frameWallDelay = {
    0:0,
    1:1,
    2:2,
    3:3,
    4:4,
  }
  const frameWallDelayActive = useRef(false)

  const ballstatus = useRef({
    position: [11, 6, 0],
    // direction: 0,
    // scalarVelocity: 0,
    direction: 30,
    scalarVelocity: 4,
    ballRadius: 0.25,
  });

  const testFrame = useRef(0);

  useFrame((state) => {
    if (testFrame.current > 60) {
      testFrame.current = 0;
    //   console.log("simple");
    if(!frameWallDelayActive.current){

        
        let [x, y, z] = ballstatus.current.position;
        let dir = ballstatus.current.direction;
        let vel = ballstatus.current.scalarVelocity;
        
      let rad = degToRad(dir);
      
      let dy = vel * Math.sin(rad);
      let dx = vel * Math.cos(rad);
      
      let [nx, ny, ndir] = checkBorderBoundries(x, y, dx, dy);
      // x+=dx
      // y+=dy
      
      // console.log({x,y,z})

      ballstatus.current.position = [nx, ny, z];
      ballstatus.current.direction = ndir;
      ballstatus.current.scalarVelocity = vel;
      // wait
      setTestBool(!testbool);
    }
    }
    testFrame.current +=1
  });
  function cleanUpdegree(deg) {
    if (deg >= 360) {
      return deg - 360;
    }
    if (deg < 0) {
      return deg + 360;
    }
    return deg;
  }

  function calcNewDir(border, dir) {
    let nd = dir;
    if (border == "top") {
      nd = 360 - dir;
      return cleanUpdegree(nd);
    }
    if (border == "bot") {
      nd = 360 - dir;
      return cleanUpdegree(nd);
    }
    if (border == "right") {
      nd = 180 - dir;
      return cleanUpdegree(nd);
    }
    if (border == "left") {
      nd = 180 - dir;
      return cleanUpdegree(nd);
    }

    return dir;
  }

  function checkBorderBoundries(x, y, dx, dy) {
    let dir = ballstatus.current.direction;
    let rad = degToRad(dir);
    const btk = mapBorderThinkness;
    const sw = mapsizeWidth;
    const sh = mapsizeHeight;
    const br = ballstatus.current.ballRadius;
    let leftlimit = btk / 2+br;
    let botlimit = btk / 2 +br;
    let rightlimit = btk / 2 + sw - br;
    let toplimit = btk / 2 + sh - br;

    if (y + dy > toplimit) {
    //   let travel_left = y + dy - toplimit;
    //   y = toplimit - travel_left;
    //   x +=dx

        let traveled = toplimit-y
        let ndx = traveled/Math.tan(rad)
        x+=ndx
        y=toplimit


      console.log(`I Hit top`)
      //i hit a wall cal new dir
      dir = calcNewDir("top", dir);
    } else if (x + dx > rightlimit) {
        // let travel_left = x + dx - rightlimit;
        // x = rightlimit - travel_left;
        // y +=dy

        let traveled = rightlimit -x
        let ndy = traveled/Math.tan(rad)
        y+=ndy
        x=rightlimit
        console.log(`I Hit right`)
        
        dir = calcNewDir("right", dir);
    } else if (y + dy < botlimit) {
        // let travel_left = y + dy - botlimit;
        // y = botlimit - travel_left;
        // x +=dx
        let traveled = y-botlimit
        let ndx = traveled/Math.tan(rad)
        x+=ndx*(dx/Math.abs(dx))
        y=botlimit
        console.log(`I Hit bot`)
        
        dir = calcNewDir("bot", dir);
    } else if (x + dx < leftlimit) {
        // let travel_left = x + dx - leftlimit;
        // x = leftlimit - travel_left;
        // y +=dy
        let traveled = x -leftlimit
        let ndy = Math.abs(traveled/Math.tan(rad))
        y+=ndy*(dy/Math.abs(dy))
        x=leftlimit
        console.log(`I Hit left`)

      dir = calcNewDir("left", dir);
    } else {
      y += dy;
      x += dx;
    }

    return [x, y, dir];
  }

  return (
    <>
      <ambientLight />
      <Border sizeW={mapsizeWidth} sizeH={mapsizeHeight} borderThickness={mapBorderThinkness} />
      <Ball position={ballstatus.current.position} ballRadius={[ballstatus.current.ballRadius]} />
    </>
  );
}

export default Scene;
