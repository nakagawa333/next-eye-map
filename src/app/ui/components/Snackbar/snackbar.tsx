"use client"

import { Dispatch, SetStateAction } from "react"

type Props = {
    isOpen:boolean
    setIsOpen:Dispatch<SetStateAction<boolean>>
    type:string
    message:string
    time:number
}

export const Snackbar = (props:Props) => {

    setTimeout(() => {
        props.setIsOpen(false);
    },props.time);

    const closeClick = () => {
        props.setIsOpen(false);
    }
    
    return(
        <>
          {
            (props.isOpen && props.type === "sucess") ? (
                <div className="w-2/5 block border rounded-lg flex fixed top-1.5 right-2/4 p-2 bg-green-500 text-white translate-y-2/4 translate-x-2/4">
                    <p>{props.message}</p>
                    <span className="ml-auto" onClick={closeClick}>✕</span>
                </div>
            ): (props.isOpen && props.type === "error") ? (
                <div className="w-2/5 block border rounded-lg flex fixed top-1.5 right-2/4 p-2 bg-red-500 text-white translate-y-2/4 translate-x-2/4">
                    <p>{props.message}</p>
                    <span className="ml-auto" onClick={closeClick}>✕</span>
                </div>
            ) : null}

        </>
    )
}
