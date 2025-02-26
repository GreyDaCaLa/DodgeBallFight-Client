import { useEffect, useRef } from "react"

function actionByKey(key) {
	const keyActionMap = {
		KeyW: 'jump',
		KeyS: 'moveDown',
		KeyA: 'moveLeft',
		KeyD: 'moveRight',
        ArrowUp:"jump",
        ArrowDown:"moveDown",
        ArrowLeft:"moveLeft",
        ArrowRight:"moveRight",
        Space: "attack"

	}
	return keyActionMap[key]
}

export const useKeyboard = () => {
	const actions = useRef({
		moveDown: false,
		moveLeft: false,
		moveRight: false,
		jump: false,
        attack: false,
        buttonspressed: 0
	})

	const handleKeyDown = (e) => {
        // console.log(e)
		const action = actionByKey(e.code)
        if(!actions.current[action]){
            let inputChange = {}
            inputChange[action] = true
            actions.current={...actions.current,...inputChange}
            actions.current.buttonspressed+=1
            console.log({'down':action})
            console.log(actions.current.buttonspressed)
        }

        // return
	}

	const handleKeyUp = (e) => {
		const action = actionByKey(e.code)

            let inputChange = {}
            inputChange[action] = false
            actions.current={...actions.current,...inputChange}
            actions.current.buttonspressed-=1
            console.log({'up':action})
            console.log(actions.current.buttonspressed)

	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [handleKeyDown, handleKeyUp])

	return actions.current
}