import { useState } from "react";


export const togglePassword = () => {
    const [ toggle , setToggle] = useState(false)
    /* const [type , setType] = useState("password")
    const [icon , setIcon] = useState(eyeOff) */

    const handleToggle = () => {
        /*  if(type === "password"){
                setType("text")
                setIcon(eye)
            }
            if(type === "text"){
                setIcon(eyeOff)
                setType("password")
            } */
            /* type === "password" ? setType("text") || setIcon(eye) : setType("password") || setIcon(eyeOff) */
            setToggle(prev => !prev)
        }
    return {
        toggle,
        handleToggle
    }
}
