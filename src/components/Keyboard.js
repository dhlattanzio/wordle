import { BackspaceIcon } from '@heroicons/react/solid';
import { Config } from '../config';

export default function Keyboard(props) {
    const createKey = (key, index, callback) => {
        return (
            <div key={index} className="
            flex flex-1 items-center justify-center 
            h-14 mx-0.5 px-2 
            bg-gray-200 hover:bg-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 
            border border-zinc-300 dark:border-zinc-500 rounded-md 
            font-semibold 
            select-none cursor-pointer"
            onClick={() => callback(key)}>{
                (key === "DEL") ? <BackspaceIcon className='w-12 h-6'/> : key
            }</div>
        );
    }

    return (
        <div className="flex flex-col mt-2 mb-[8vh] mx-2">
            {
                Config.keyboard.keys.map((line, index) => <div key={index} className="flex mb-2">{line.map((key, index) => createKey(key, index, props.onKeyPressed))}</div>)
            }
        </div>
    );
}