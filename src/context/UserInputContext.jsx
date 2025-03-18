import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useKeyboard } from "../hooks/useKeyBoard";


const UserInputContext = createContext({});

export const UserInputProvider = (props) =>{
    const { jump, moveDown, moveLeft, moveRight, attack} = useKeyboard();
    const inputHolds = useRef({
        attack:{
          dn:false,
          ps:20,
          tt:0,
          act: false,
        }
      })

      function handleInputLogic(pl){
        //double check holds
        // console.log({pl})
        let plyin = pl.inputs
        // console.log({attackplyin:plyin.attack})
        if (attack || inputHolds.current["attack"].tt) {
          console.log(attack,inputHolds.current.attack.tt)
          // console.log(`att-${inputHolds.current['attack'].act} - ${inputHolds.current['attack'].tt}`)
          inputHolds.current["attack"].act = true;
      
          inputHolds.current["attack"].tt += 1;
          if (inputHolds.current["attack"].tt >= inputHolds.current["attack"].ps) {
            inputHolds.current["attack"].dn = true;
            inputHolds.current["attack"].tt = 0;
            inputHolds.current["attack"].act = false;
          }
        }
      }

    return(
        <UserInputContext.Provider value={{
            jump, moveDown, moveLeft, moveRight, attack, inputHolds,handleInputLogic
        }}>
            {props.children}
        </UserInputContext.Provider>
    )
}


export const useUserInput = () => {
    return useContext(UserInputContext)
}