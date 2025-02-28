import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./components/Scene";
import { UserInputProvider } from "./context/UserInputContext";

function App() {
  const mapsize = 10;

  return (
    <>
    <UserInputProvider>

      <Canvas orthographic camera={{ position: [11, 6, 2], fov: 50, zoom: 30 }} style={{ background: "lightblue" }}>
      {/* <Canvas orthographic camera={{ position: [11, 6, 2], fov: 50, zoom: 50 }} style={{ background: "lightblue" }}> */}
        <OrbitControls target={[11, 6, 0]} />

        <Scene />

        <axesHelper scale={20} />
      </Canvas>
    </UserInputProvider>
    </>
  );
}

export default App;
