
function Ball({position=[3,3,0],ballRadius=[1]}) {
    // console.log(position)
    return (
      <>
        
        {/* MOVING BALL*/}
        <group>
          <mesh position={position}>
            <sphereGeometry args={ballRadius}/>
            <meshStandardMaterial color={'red'}/>
          </mesh>
        </group>
      </>
    );
  }
  
  export default Ball;
  