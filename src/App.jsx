import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./components/Scene";

function App() {
  const mapsize = 10;

  return (
    <>
      <Canvas orthographic camera={{ position: [11, 6, 2], fov: 50, zoom: 50 }} style={{ background: "lightblue" }}>
        <OrbitControls target={[11, 6, 0]} />

        <Scene />

        <axesHelper scale={20} />
      </Canvas>
    </>
  );
}

export default App;
