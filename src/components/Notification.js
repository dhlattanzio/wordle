import { useState, useEffect } from "react";

const Item = (props) => {
    const [finish, setFinish] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFinish(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const classes = `transition-opacity duration-500 mt-5 px-10 py-4 
    bg-zinc-100 shadow 
    border border-zinc-400 rounded 
    text-center 
    ${finish ? "opacity-0 scale-50 animate-notificationOut" : "animate-notificationIn"}`;

    return (
        <div className={classes}>
            {props.value}
        </div>
    )
}

export default function Notification(props) {
    return (
        <div className="absolute top-0 left-0 flex flex-col items-center w-full h-5/6 mt-14 
         text-zinc-700 overflow-hidden pointer-events-none">
            {props.list.map(elem => (
                <Item key={elem[1]} value={elem[0]} />
            ))}
        </div>
    );
}