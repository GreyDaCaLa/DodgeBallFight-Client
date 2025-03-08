import { useFrame } from "@react-three/fiber";
import { useUserInput } from "../context/UserInputContext";
import { useKeyboard } from "../hooks/useKeyBoard";

function AttackingWalls({ playerPosition = [3, 3, 0], wallSpecs={mid:1.2,top:1.2,bot:1.2},rightfacing=false }) {
  const { jump, moveDown, moveLeft, moveRight, attack, inputHolds } = useUserInput();

  // useFrame(()=>{
  //   if(attack){
  //     console.log(attack )
  //   }
  // })

  function displayPlayerWalls() {

    let midwalldirection = rightfacing?-1:-5
    let topcornerwalldirection = rightfacing?0:2
    let botcornerwalldirection = rightfacing?-2:-4



    return (
      <>
          {/* topCorner */}
        {attack && !moveDown && jump?
        <mesh position={[0, 1, 0]}>
          <ringGeometry args={[wallSpecs['top']-.1, wallSpecs['top'], 1, 1, (topcornerwalldirection/4) * Math.PI, 0.25 * (2 * Math.PI)]} />
          {/* args?: [
            innerRadius?: number | undefined,
            outerRadius?: number | undefined,
            thetaSegments?: number | undefined,
            phiSegments?: number | undefined,
            thetaStart?: number | undefined,
            thetaLength?: number | undefined
            ] */}
          <meshStandardMaterial color={'blue'} />
        </mesh>
        :<></>}
        {/* botCorner */}
        {attack && moveDown && !jump?
        <mesh position={[0, -1, 0]}>
          <ringGeometry args={[wallSpecs['bot']-.1, wallSpecs['bot'], 20, 1, (botcornerwalldirection/4)* Math.PI, 0.25 * (2 * Math.PI)]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>

        :<></>}
        {/* midmid */}
            {inputHolds.current['attack'].act && !moveDown && !jump?
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[wallSpecs['mid']-.1, wallSpecs['mid'], 20, 1, (midwalldirection/4) * Math.PI, (1/4) * (2 * Math.PI)]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
            
            :<></>}
      </>
    );
  }

  return (
    <>
      <group position={playerPosition}>
        {displayPlayerWalls()}
      </group>
    </>
  );
}

export default AttackingWalls;
