import {useEffect, useRef, RefObject} from "react";
import {noop} from "../utils/misc";

interface NuiMessageData<T = unknown> {
    action?: string;
    event?: string;
    data?: T;
    state?: boolean;
}

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: "something"}>("setVisible", (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export const useNuiEvent = <T = any>(action: string, handler: (data: T) => void) => {
    const savedHandler: RefObject<NuiHandlerSignature<T>> = useRef(noop);
    
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    
    useEffect(() => {
        const eventListener = (event: MessageEvent) => {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (savedHandler.current) {
                if (data.event === action) {
                    savedHandler.current(data as T);
                }
                else if (data.action === action) {
                    savedHandler.current(data.data as T);
                }
            }
        };
        
        window.addEventListener("message", eventListener);
        return () => window.removeEventListener("message", eventListener);
    }, [action]);
};