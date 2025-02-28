import { useEffect, useRef, useState } from "react";

function actionByKey(key) {
  const keyActionMap = {
    KeyW: "jump",
    KeyS: "moveDown",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    ArrowUp: "jump",
    ArrowDown: "moveDown",
    ArrowLeft: "moveLeft",
    ArrowRight: "moveRight",
    Space: "attack",
  };
  return keyActionMap[key];
}

export const useKeyboard = () => {
//   const actions = useRef({
//     moveDown: false,
//     moveLeft: false,
//     moveRight: false,
//     jump: false,
//     attack: false,
//     buttonspressed: 0,
//   });
  const [actions, setActions] = useState({
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    attack: false,
    buttonspressed: 0,
  });

//   const handleKeyDown = (e) => {
//     // console.log(e)
//     const action = actionByKey(e.code);
//     if (!actions.current[action]) {
//       let inputChange = {};
//       inputChange[action] = true;
//       actions.current = { ...actions.current, ...inputChange };
//       actions.current.buttonspressed += 1;
//     //   console.log({ down: action });
//     //   console.log(actions.current.buttonspressed);
//     }

    
//     let temp = actions.current	

//     actions.current = { ...temp};
//     // return
//   };

//   const handleKeyUp = (e) => {
//     const action = actionByKey(e.code);

//     let inputChange = {};
//     inputChange[action] = false;
//     actions.current = { ...actions.current, ...inputChange };
//     actions.current.buttonspressed -= 1;
//     console.log({ up: action });
//     console.log(actions.current.buttonspressed);

//     let temp = actions.current

//     actions.current = { ...temp};
//   };

  const handleKeyDownState = (e) => {
	  handleKeyStateHelper(e,true)
  };

  const handleKeyUpState = (e) => {
	handleKeyStateHelper(e,false)

  };

  const handleKeyStateHelper = (e,val)=>{
	// console.log(e)
	const action = actionByKey(e.code);
	if ( action in actions) {
	let inputChange = {};
	inputChange[action] = val;
	const newactions = { ...actions, ...inputChange };
	// newactions.buttonspressed += 1;
	setActions(newactions)
	}
  }

  useEffect(() => {
    // document.addEventListener("keydown", handleKeyDown);
    // document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDownState);
    document.addEventListener("keyup", handleKeyUpState);
    return () => {
    //   document.removeEventListener("keydown", handleKeyDown);
    //   document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDownState);
      document.removeEventListener("keyup", handleKeyUpState);
    };
  }, [handleKeyDownState, handleKeyUpState]);

//   return actions.current;
  return actions;
};
