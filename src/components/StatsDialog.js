import Dialog from "./Dialog";
import { ShareIcon } from "@heroicons/react/solid";

export default function StatsDialog(props) {
    return (
        <Dialog onClose={props.onClose} hidden={props.hidden} title="STATISTICS">
            <div className="flex justify-center mb-4">
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">1</p>
                    <p className="font-extralight text-xs">Played</p>
                </div>
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">100</p>
                    <p className="font-extralight text-xs">Win %</p>
                </div>
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">1</p>
                    <p className="font-extralight text-xs">Current Streak</p>
                </div>
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">1</p>
                    <p className="font-extralight text-xs">Max Streak</p>
                </div>
            </div>

            <h2 className="text-center font-semibold text-lg mt-6 mb-4">GUESS DISTRIBUTION</h2>

            <div className="text-sm mb-8 mx-14">
                <div className="flex mb-2">
                    <span className="pr-2">1</span>
                    <span className="w-full px-2 bg-green-700 text-white text-right">1</span>
                </div>
                {[...Array(5)].map((x, index) => (
                    <div key={index} className="flex mb-2">
                        <span className="pr-2">{index + 2}</span>
                        <span className="px-2 bg-gray-700 text-white text-right">0</span>
                    </div>
                ))}
            </div>

            <div className="flex items-center mb-4">
                <div className="flex-1 text-center font-semibold">
                    <p className="">NEXT WORDLE</p>
                    <p className="text-3xl">01:18:57</p>
                </div>
                <div className="self-stretch w-px bg-gray-500"></div>
                <div className="flex-1 flex justify-center">
                    <button onClick={() => (console.log("das"))} className="flex justify-center items-center text-white text-xl px-6 py-2 font-semibold rounded-md bg-green-700 hover:bg-green-800">
                        <span>SHARE</span> <ShareIcon className="inline-block w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </Dialog>
    );
}