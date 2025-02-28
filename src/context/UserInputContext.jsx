import { createContext, useContext, useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyBoard";


const UserInputContext = createContext({});

export const UserInputProvider = (props) =>{
    const { jump, moveDown, moveLeft, moveRight, attack } = useKeyboard();

    return(
        <UserInputContext.Provider value={{
            jump, moveDown, moveLeft, moveRight, attack
        }}>
            {props.children}
        </UserInputContext.Provider>
    )
}


export const useUserInput = () => {
    return useContext(UserInputContext)
}