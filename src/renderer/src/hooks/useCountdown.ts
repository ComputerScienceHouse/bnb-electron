import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function useCountdown(redirectTo: string, time: number) {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(time);

    useEffect(() => {
        if (countdown === 0) {
            navigate({to: redirectTo});
            return; 
        }
        const timer = setTimeout(() => {
            setCountdown((prevCountdown: number) => prevCountdown - 1);
        }, 1000); 

        return () => clearTimeout(timer);
    }, [countdown, navigate, redirectTo]); 

    return countdown
}