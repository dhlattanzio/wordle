export default function Cell(props) {
    return (
        <div className="flex h-16 border-2 dark:border-zinc-600 
        justify-center items-center hover:border-gray-800 dark:hover:border-gray-400 select-none">
            <span className="text-3xl font-bold">{props.value}</span>
        </div>
    );
}