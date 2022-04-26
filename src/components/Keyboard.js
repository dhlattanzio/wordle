export default function Keyboard() {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
        ['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BORRAR']
    ]

    const createKey = (key) => {
        return (
            <div className="flex-1 flex px-2 h-14 items-center justify-center border 
            border-gray-400 mx-0.5 rounded-md font-semibold bg-gray-200 
            hover:bg-gray-300 select-none cursor-pointer">{key}</div>
        );
    }

    return (
        <div className="flex flex-col mt-10 mb-24 mx-2">
            {
                keys.map(line => <div className="flex mb-2">{line.map(key => createKey(key))}</div>)
            }
        </div>
    );
}