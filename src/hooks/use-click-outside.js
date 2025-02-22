import { useEffect } from "react";

export default function useClickOutSide(elementRef, handler){
    useEffect(() =>{
        const callback = (e) =>{
            if(!elementRef.current?.contains(e.target)){
                handler();
            }
        }
        document.addEventListener("mousedown", callback)

        return () =>{
            document.removeEventListener("mousedown",callback)
        }
    },[elementRef, handler])
}