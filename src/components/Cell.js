import { useState } from "react";

const getColor = {
    "-1": "bg-zinc-700",
    "0": "bg-yellow-700",
    "1": "bg-green-700",
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
    const [animNumber, setAnimNumer] = useState(1);

    const hasResult = (props.result ?? -2) !== -2;
    const hasLetter = props.value && props.value !== "";
    const showResult = hasResult && animNumber > 1;
    const currentColor = getColor[props.result ?? -2];

    const cellSize = cellSizes[props.size ?? "big"];
    const delay = props.delay ?? 0;
    
    if (hasResult && active) {
        setActive(false);
        const timeout = setTimeout(() => {
            setFlipping(true);
        }, delay);
        return () => clearTimeout(timeout);
    }

    const classes = `
    flex h-full ${cellSize} ${!showResult ? "border-2" : ""} mx-0.5 border-zinc-400 dark:border-zinc-600 
    justify-center items-center hover:border-gray-800 dark:hover:border-gray-400 select-none 
    ${showResult ? currentColor : ""} 
    ${(hasLetter && !hasResult) ? " animate-pulse border-black dark:border-zinc-400" : ""} 
    ${(hasResult && !active) ? (flipping ? (animNumber === 1 ? "scale-y-0 animate-flipStart " : "animate-flipEnd") : "") : ""}
    `;

    const onAnimationEnd = () => {
        if (!active) {
            if (animNumber === 2) {
                setFlipping(false);
            } else {
                setAnimNumer(n => n + 1);
            }
        }
    }

    return (
        <div onAnimationEnd={onAnimationEnd} className={classes}>
            <span className="text-3xl font-bold">{props.value}</span>
        </div>
    );
}