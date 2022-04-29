const getColor = {
    "-1": "bg-zinc-700",
    "0": "bg-yellow-700",
    "1": "bg-green-700",
    "-2": ""
}

export default function Cell(props) {
    const color = getColor[props.result ?? -2];
    const hasLetter = props.value && props.value !== "";
    const isBloked = color !== "";
    const size = props.size ?? "big";

    const classes = `
    flex h-full ${size === "big" ? "w-16" : "w-12"} ${color === "" ? "border-2" : ""} mx-0.5 border-zinc-400 dark:border-zinc-600 
    justify-center items-center hover:border-gray-800 dark:hover:border-gray-400 select-none ${color} 
    ${(hasLetter && !isBloked) ? " animate-pulse border-black dark:border-zinc-400" : ""} ${isBloked ? "animate-flip" : ""}
    `;

    return (
        <div className={classes}>
            <span className="text-3xl font-bold">{props.value}</span>
        </div>
    );
}