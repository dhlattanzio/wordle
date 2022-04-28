import Cell from "./Cell";
import { XIcon } from "@heroicons/react/solid"

export default function Dialog(props) {
    const classes = "absolute transition-all duration-300 left-0 top-0 bg-white dark:bg-zinc-900 w-full h-full overflow-hidden " + (props.hidden ? "invisible opacity-0" : "opacity-100");
    const main = "relative h-full transition-all duration-300 max-w-lg mx-auto overflow-auto " + (props.hidden ? "top-20" : "top-0");

    return (
        <div className={classes}>
            <div className={main}>
                <div className="relative flex justify-end items-center py-4 mb-5 border-b">
                    <div className="absolute w-full text-center">
                        <h2 className="text-xl font-bold">HOW TO PLAY</h2>
                    </div>
                    <button className="mr-3 hover:text-red-700 z-10" onClick={props.onClose}>
                        <XIcon className="h-6 hover:text-zinc-500" />
                    </button>
                </div>
                <div className="px-2">
                    {props.children}
                </div>
            </div>
        </div>
    );
}