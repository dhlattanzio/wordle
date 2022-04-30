import { BackspaceIcon } from '@heroicons/react/solid';
import { Config } from '../config';

const getColor = {
    "-1": "bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-800 dark:hover:bg-zinc-900 border-zinc-800 dark:border-zinc-600",
    "0": "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800 border-yellow-800 dark:border-yellow-600 ",
    "1": "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 border-green-800 dark:border-green-500 ",
    "-2": "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:hover:bg-zinc-700 "
}

export default function Keyboard(props) {
    const usedKeys = props.usedKeys;

    const createKey = (key, index, callback) => {
        return (
            <div key={index} className={`
            flex flex-1 items-center justify-center 
            h-14 mx-0.5 px-2 
            ${getColor[usedKeys[key] ?? -2]}
            border border-zinc-300 dark:border-zinc-500 rounded-md 
            font-semibold 
            select-none cursor-pointer`}
            onClick={() => callback(key)}>{
                (key === "DEL") ? <BackspaceIcon className='w-12 h-6'/> : key
            }</div>
        );
    }

    return (
        <div className="flex flex-col my-2 mb-4 mx-2">
            {
                Config.keyboard.keys.map((line, index) => <div key={index} className="flex mb-2">{line.map((key, index) => createKey(key, index, props.onKeyPressed))}</div>)
            }
        </div>
    );
}