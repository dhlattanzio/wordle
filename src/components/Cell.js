import { useState } from "react";
import { act } from "react-dom/test-utils";

const getColor = {
    "-1": "bg-zinc-400 dark:bg-zinc-700 border-zinc-800 dark:border-zinc-500",
    "0": "bg-yellow-500 dark:bg-yellow-700 border-yellow-800 dark:border-yellow-600 ",
    "1": "bg-green-500 dark:bg-green-700 border-green-800 dark:border-green-500 ",
    "-2": ""
}

const cellSizes = {
    "small": "w-12",
    "medium": "w-14",
    "big": "w-16"
}

export default function Cell(props) {
    const [active, setActive] = useState(true);
    const [flipping, setFlipping] = useState(false);
    const [animNumber, setAnimNumber] = useState(1);

    if (props.hidden) {
        if (!active) setActive(true);
        if (flipping) setFlipping(false);
        if (animNumber !== 1) setAnimNumber(1);
    }

    const hasResult = (props.result ?? -2) !== -2;
    const hasLetter = props.value && props.value !== "";
    const showResult = hasResult && animNumber > 1;
    const currentColor = getColor[props.result ?? -2];

    const cellSize = cellSizes[props.size ?? "big"];
    const delay = props.delay ?? 0;

    if (hasResult && active && !props.hidden) {
        setActive(false);
        const timeout = setTimeout(() => {
            setFlipping(true);
        }, delay);
        return () => clearTimeout(timeout);
    }

    const classes = `
    flex h-full justify-center items-center 
    ${cellSize} mx-0.5 
    border ${!showResult ? "border-zinc-400 dark:border-zinc-600" : ""} 
    hover:border-gray-800 dark:hover:border-gray-400 rounded 
    ${showResult ? currentColor : ""} 
    ${(hasLetter && !hasResult && props.active) ? "border-black dark:border-zinc-400 animate-pulse " : ""} 
    ${(hasResult && !active) ? (flipping ? (animNumber === 1 ? "scale-y-0 animate-flipStart " : "animate-flipEnd ") : "") : ""}
    select-none ${props.hidden ? "animate-none" : ""}
    `;

    const onAnimationEnd = () => {
        if (!active) {
            if (animNumber === 2) {
                setFlipping(false);
            } else {
                setAnimNumber(n => n + 1);
            }
        }
    }

    return (
        <div onAnimationEnd={onAnimationEnd} className={classes}>
            <span className="text-3xl font-bold">{props.value}</span>
        </div>
    );
}