import { useUserInput } from "../context/UserInputContext";
import AttackingWalls from "./AttackingWalls";

function Player({position=[3,3,0], boxHeight=3, boxWidth=1.2, relavancyRadius=.3,wallSpecs,rightfacing}) {
    


    return (
      <>
        {/* {console.log(position)} */}
        <group>
          <mesh position={position}>
            <boxGeometry args={[boxWidth,boxHeight,1]}/>
            <meshStandardMaterial color={'burlywood'}/>
          </mesh>
        </group>
        <AttackingWalls playerPosition={position} wallSpecs={wallSpecs} rightfacing={rightfacing} />

        {/* player hit box display */}
        <group position={position}>
          {[0,1,-1,.5,-.5].map((val,ind)=>{
            return (
              <mesh key={`${ind}-hitbox`} position={[0, val, 1]}>
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

          {/* player relavence circle */}
          <group position={position}>
              <mesh position={[0, 0, 1]}>
                <ringGeometry args={[relavancyRadius-.1, relavancyRadius, 20, 1, 0, (2 * Math.PI)]} />
                {/* args?: [
                  innerRadius?: number | undefined,
                  outerRadius?: number | undefined,
                  thetaSegments?: number | undefined,
                  phiSegments?: number | undefined,
                  thetaStart?: number | undefined,
                  thetaLength?: number | undefined
                  ] */}
                <meshStandardMaterial color={'darkred'} />
              </mesh>
            </group>
      </>
    );
  }
  
  export default Player;
  