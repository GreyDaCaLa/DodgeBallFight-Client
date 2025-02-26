
function Player({position=[3,3,0], boxHeight=3, boxWidth=1.2}) {
    


    return (
      <>
        {/* {console.log(position)} */}
        <group>
          <mesh position={position}>
            <boxGeometry args={[boxWidth,boxHeight,3]}/>
            <meshStandardMaterial color={'burlywood'}/>
          </mesh>
        </group>
      </>
    );
  }
  
  export default Player;
  