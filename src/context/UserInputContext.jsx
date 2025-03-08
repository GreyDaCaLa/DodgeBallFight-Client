import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useKeyboard } from "../hooks/useKeyBoard";


const UserInputContext = createContext({});

export const UserInputProvider = (props) =>{
    const { jump, moveDown, moveLeft, moveRight, attack } = useKeyboard();
    const inputHolds = useRef({
        attack:{
          dn:false,
          ps:20,
          tt:0,
          act: false,
        }
      })
    // const [holds,setHolds] = useState({attacking:{dn:100}})
    // const [ho]


    // function handleAttackInput(){
    //     console.log()
    // }

    // useEffect(()=>{
    //     if(attack){
    //         handleAttackInput()
    //     }

    // },[jump, moveDown, moveLeft, moveRight, attack])

    return(
        <UserInputContext.Provider value={{
            jump, moveDown, moveLeft, moveRight, attack, inputHolds
        }}>
            {props.children}
        </UserInputContext.Provider>
    )
}


export const useUserInput = () => {
    return useContext(UserInputContext)
}