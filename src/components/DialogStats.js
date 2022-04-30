import Dialog from "./Dialog";
import { ShareIcon } from "@heroicons/react/solid";
import { addZeroIfLower10, calculateTimeLeftNewWord } from "../utils/utils";
import { useState, useEffect } from "react";

export default function DialogStats(props) {
    const [timeForNextWord, setTimeForNextWord] = useState({});

    useEffect(() => {
        const calculate = () => {
            const timeLeft = calculateTimeLeftNewWord();
            setTimeForNextWord({
                hours: addZeroIfLower10(timeLeft.hours),
                minutes: addZeroIfLower10(timeLeft.minutes),
                seconds: addZeroIfLower10(timeLeft.seconds)
            })
        }

        calculate();
        const interval = setInterval(() => {
            calculate();
        }, 1000);
        return () => interval;
    }, []);

    const stats = props.stats;
    const wins = stats["wins"];
    const winsPerc = stats["played"] === 0 ? 0 : parseInt(wins / stats["played"] * 100);
    const distribution = stats["dist"];

    return (
        <Dialog onClose={props.onClose} hidden={props.hidden} title="STATISTICS">
            <div className="flex justify-center mb-4">
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">{stats["played"]}</p>
                    <p className="font-extralight text-xs">Played</p>
                </div>
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">{winsPerc}</p>
                    <p className="font-extralight text-xs">Win %</p>
                </div>
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">{stats["streak"]}</p>
                    <p className="font-extralight text-xs">Current Streak</p>
                </div>
                <div className="text-center w-16 p-2">
                    <p className="font-semibold text-3xl mb-2">{stats["maxStreak"]}</p>
                    <p className="font-extralight text-xs">Max Streak</p>
                </div>
            </div>

            <h2 className="text-center font-semibold text-lg mt-6 mb-4">GUESS DISTRIBUTION</h2>

            <div className="text-sm mb-8 mx-14">
                {distribution.map((x, index) => {
                    const percentage = x === 0 ? 0 : parseInt(x / wins * 100);
                    const styles = x > 0 ? { "width": percentage + "%" } : {};

                    return (
                        <div key={index} className="flex mb-2">
                            <span className="pr-2">{index + 1}</span>
                            <span style={styles} className={`px-2 ${x === 0 ? "bg-gray-700" : "bg-green-700"} text-white text-right`}>{x}</span>
                        </div>
                    )
                })}
            </div>

            <div className={`flex items-center mb-4 ${props.showTimer ? "" : "hidden"}`}>
                <div className="flex-1 text-center font-semibold">
                    <p className="">NEXT WORDLE</p>
                    <p className="text-3xl">
                        {`${timeForNextWord.hours ?? "00"}:${timeForNextWord.minutes ?? "00"}:${timeForNextWord.seconds ?? "00"}`}
                    </p>
                </div>
                <div className="self-stretch w-px bg-gray-500"></div>
                <div className="flex-1 flex justify-center">
                    <button onClick={() => (console.log("share"))} className="flex justify-center items-center text-white text-xl px-6 py-2 font-semibold rounded-md bg-green-700 hover:bg-green-800">
                        <span>SHARE</span> <ShareIcon className="inline-block w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </Dialog>
    );
}