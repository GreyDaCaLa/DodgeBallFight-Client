import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./components/Scene";
import { UserInputProvider } from "./context/UserInputContext";
import io from "socket.io-client";
import { SocketToolsProvider } from "./context/SocketContext";
import { GameStatusProvider } from "./context/GameContext";

function App() {

  function showgame() {
    return (
      <>
        <GameStatusProvider>
          <SocketToolsProvider>
            <UserInputProvider>
              <Canvas
                orthographic
                camera={{ position: [11, 6, 2], fov: 50, zoom: 30 }}
                style={{ background: "lightblue" }}
              >
                {/* <Canvas orthographic camera={{ position: [11, 6, 2], fov: 50, zoom: 50 }} style={{ background: "lightblue" }}> */}
                <OrbitControls target={[11, 6, 0]} />

                <Scene />

                <axesHelper scale={20} />
              </Canvas>
            </UserInputProvider>
          </SocketToolsProvider>
        </GameStatusProvider>
      </>
    );
  }

  return <>{showgame()}</>;
}

export default App;
