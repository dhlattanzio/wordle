import { useState, useEffect } from "react";

const Item = (props) => {
    const [finish, setFinish] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("timeoooooout!");
            setFinish(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const classes = `transition-opacity duration-500 mt-5 px-10 py-4 rounded bg-zinc-100 text-center 
    shadow border border-zinc-400 ${finish ? "opacity-0 scale-50 animate-notificationOut" : "animate-notificationIn"}`;

    return (
        <div className={classes}>
            {props.value}
        </div>
    )
}

export default function Notification(props) {
    console.log("aaaaaa", props.list);
    return (
        <div className="flex flex-col items-center text-zinc-700 w-full top-0 absolute mt-14 left-0 h-5/6 overflow-hidden pointer-events-none">
            {props.list.reverse().map(elem => (
                <Item key={elem[1]} value={elem[0]}/>
            ))}
        </div>
    );
}