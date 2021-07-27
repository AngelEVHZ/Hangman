import React, { useState } from "react";
import { useEffect } from "react";


interface TimerProps {
    time: number;
    callBack: () => void;
}

const Timer: React.FC<any> = (props: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);


    useEffect(() => {
        const remaining = props.time - seconds;
        if (remaining < 0 && isActive) {
            setIsActive(false);
            props.callBack();
        }

        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);


    const remaining = props.time - seconds;
    const secondsLeft = remaining < 0 ? 0 : remaining;

    return (
        <>
            <div>Time {secondsLeft}</div>
        </>
    );
};
export default Timer;