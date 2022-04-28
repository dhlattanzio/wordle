import { BackspaceIcon } from '@heroicons/react/solid';

export default function Keyboard() {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
        ['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
    ]

    

    const createKey = (key, index) => {
        return (
            <div key={index} className="flex-1 flex px-2 h-14 items-center justify-center border 
            border-zinc-300 mx-0.5 rounded-md font-semibold bg-gray-200
            dark:bg-zinc-600 dark:border-zinc-500 dark:hover:bg-zinc-700
            hover:bg-zinc-300 select-none cursor-pointer">{
                (key === "DEL") ? <BackspaceIcon className='w-12 h-6'/> : key
            }</div>
        );
    }

    return (
        <div className="flex flex-col mt-10 mb-8vh mx-2">
            {
                keys.map((line, index) => <div key={index} className="flex mb-2">{line.map((key, index) => createKey(key, index))}</div>)
            }
        </div>
    );
}