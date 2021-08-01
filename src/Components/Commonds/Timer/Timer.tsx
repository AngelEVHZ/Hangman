import React, { useState } from "react";
import { useEffect } from "react";
import "./Timer.css";

interface TimerProps {
    time: number;
    stop?: boolean;
    hide?: boolean;
    callBack: () => void;
}

const Timer: React.FC<any> = (props: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const remaining = props.time - seconds;
    const secondsLeft = remaining < 0 ? 0 : remaining;
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;


    const remainingPathColor = secondsLeft <= ALERT_THRESHOLD ? "red" :
        secondsLeft <= WARNING_THRESHOLD ? "orange" : "green";

    useEffect(() => {
        if (props.stop) return;
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


    const calculateTimeFraction = (secondsLeft: number) => {
        const rawTimeFraction = secondsLeft / props.time;
        return rawTimeFraction - (1 / props.time) * (1 - rawTimeFraction);
    }

    const getCircleDasharray = `${(
        calculateTimeFraction(secondsLeft) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;


    return (
        <>{!props.hide &&
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                        <path
                            id="base-timer-path-remaining"
                            stroke-dasharray={`${getCircleDasharray}`}
                            className={`base-timer__path-remaining ${remainingPathColor}`}
                            d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0
                            "
                        ></path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">
                    {secondsLeft}
                </span>
            </div>
        }</>
    );
};
export default Timer;