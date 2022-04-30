import { XIcon } from "@heroicons/react/solid"

export default function Dialog(props) {
    return (
        <div className={`${props.hidden ? "invisible opacity-0" : "opacity-100"}
        absolute left-0 top-0 w-full h-full 
        bg-white dark:bg-zinc-900 
        overflow-hidden transition-all duration-300`}>
            <div className={`relative ${props.hidden ? "top-20" : "top-0"} max-w-lg h-full mx-auto 
            overflow-auto transition-all duration-300`}>
                <div className="relative flex justify-end items-center mb-5 py-4 border-b border-zinc-300 dark:border-zinc-700">
                    <div className="absolute w-full text-center">
                        <h2 className="text-xl font-bold">{props.title}</h2>
                    </div>
                    <button className="mr-3 z-10" onClick={props.onClose}>
                        <XIcon className="h-6 hover:text-zinc-400" />
                    </button>
                </div>
                <div className="px-2">
                    {props.children}
                </div>
            </div>
        </div>
    );
}