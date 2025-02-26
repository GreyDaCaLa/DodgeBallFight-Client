

function Border({sizeW=20,sizeH=10, borderThickness=2}) {
    const borderdepth = 2
    // console.log('border')


    function displayBorder(){
        const btk = borderThickness
        const bdp = borderdepth
        const sw = sizeW
        const sh = sizeH

        return(
            <>
            {/* bottomleft & bttom */}
          <mesh position={[0,0,0]}>
            <meshStandardMaterial color={"lightgreen"} />
            <boxGeometry args={[btk, btk, btk]} />
          </mesh>
          <mesh position={[btk/2+sw/2, 0, 0]}>
            <meshStandardMaterial color={"green"} />
            <boxGeometry args={[sw, btk, btk]} />
          </mesh>


          {/* bottomRight & right */}
          <mesh position={[btk+sw, 0, 0]}>
            <meshStandardMaterial color={"darkgoldenrod"} />
            <boxGeometry args={[btk, btk, btk]} />
          </mesh>
          <mesh position={[btk+sw, btk/2+sh/2, 0]}>
            <meshStandardMaterial color={"darkkhaki"} />
            <boxGeometry args={[btk, sh, btk]} />
          </mesh>


          {/* topRight & top */}
          <mesh position={[btk+sw, btk+sh, 0]}>
            <meshStandardMaterial color={"yellow"} />
            <boxGeometry args={[btk, btk, btk]} />
          </mesh>
          <mesh position={[btk/2+sw/2, btk+sh, 0]}>
            <meshStandardMaterial color={"yellowgreen"} />
            <boxGeometry args={[sw, btk, btk]} />
          </mesh>


          {/* topLeft & left */}
          <mesh position={[0, btk+sh, 0]}>
            <meshStandardMaterial color={"pink"} />
            <boxGeometry args={[btk, btk, btk]} />
          </mesh>
          <mesh position={[0, btk/2+sh/2, 0]}>
            <meshStandardMaterial color={"plum"} />
            <boxGeometry args={[btk, sh, btk]} />
          </mesh>
            </>
        )
    }
  
    return (
      <>
        
        {/* SQUARE FIELD/BORDER */}
        <group>
          {displayBorder()}
        </group>


      </>
    );
  }
  
  export default Border;
  