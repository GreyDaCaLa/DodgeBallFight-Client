import { useUserInput } from "../context/UserInputContext";
import AttackingWalls from "./AttackingWalls";

function Player({position=[3,3,0], boxHeight=3, boxWidth=1.2}) {
    


    return (
      <>
        {/* {console.log(position)} */}
        <group>
          <mesh position={position}>
            <boxGeometry args={[boxWidth,boxHeight,1]}/>
            <meshStandardMaterial color={'burlywood'}/>
          </mesh>
        </group>
        <AttackingWalls playerPosition={position} />

        <group position={position}>

          {[0,1,-1,.5,-.5].map((val,ind)=>{
            return (
              <mesh key={`${ind}-hotbox`} position={[0, val, 1]}>
                <ringGeometry args={[.5, .6, 20, 1, 0, (2 * Math.PI)]} />
                {/* args?: [
                  innerRadius?: number | undefined,
                  outerRadius?: number | undefined,
                  thetaSegments?: number | undefined,
                  phiSegments?: number | undefined,
                  thetaStart?: number | undefined,
                  thetaLength?: number | undefined
                  ] */}
                <meshStandardMaterial color={'red'} />
              </mesh>

            )
          })}

            </group>
      </>
    );
  }
  
  export default Player;
  