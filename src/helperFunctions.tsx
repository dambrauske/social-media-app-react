import React, {useEffect} from "react";

export const formatDateFromTimestamp = (originalTimestamp: string | undefined) => {
    if (!originalTimestamp) {
        return ''
    }
    const parsedTimestamp = new Date(originalTimestamp)

    const year = parsedTimestamp.getFullYear()
    const month = (parsedTimestamp.getMonth() + 1).toString().padStart(2, '0')
    const day = parsedTimestamp.getDate().toString().padStart(2, '0')
    const hours = parsedTimestamp.getHours().toString().padStart(2, '0')
    const minutes = parsedTimestamp.getMinutes().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
}

type CallbackFunction = () => void;


export const useOutsideClick = (callback: CallbackFunction, ref:React.RefObject<HTMLElement>) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback()
        }
    }

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            handleClickOutside(event)
            event.stopPropagation()
        }

        document.addEventListener("click", clickHandler)

        return () => {
            document.removeEventListener("click", clickHandler)
        }
    },[])
}


