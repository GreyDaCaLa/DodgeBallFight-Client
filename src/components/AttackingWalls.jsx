import { useFrame } from "@react-three/fiber";
import { useUserInput } from "../context/UserInputContext";
import { useKeyboard } from "../hooks/useKeyBoard";

function AttackingWalls({ playerPosition = [3, 3, 0] }) {
  const { jump, moveDown, moveLeft, moveRight, attack } = useUserInput();

  useFrame(()=>{
    if(attack){
      console.log(attack )
    }
  })

  function displayPlayerWalls() {

    let midwalldirection = moveRight?-1:moveLeft?-5:-1
    let topcornerwalldirection = moveRight?0:moveLeft?2:0
    let botcornerwalldirection = moveRight?-2:moveLeft?-4:-2



    return (
      <>
        {attack && !moveDown && jump?
        <mesh position={[0, 1, 0]}>
          <ringGeometry args={[1, 1.2, 1, 1, (topcornerwalldirection/4) * Math.PI, 0.25 * (2 * Math.PI)]} />
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
          <ringGeometry args={[1, 1.1, 20, 1, (botcornerwalldirection/4)* Math.PI, 0.25 * (2 * Math.PI)]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>

        :<></>}
        {/* midmid */}
            {attack && !moveDown && !jump?
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[1, 1.1, 20, 1, (midwalldirection/4) * Math.PI, (1/4) * (2 * Math.PI)]} />
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
