import Dialog from "./Dialog";
import { ShareIcon, PlayIcon } from "@heroicons/react/solid";
import { addZeroIfLower10, calculateTimeLeftNewWord, getDayOfYear } from "../utils/utils";
import { useState, useEffect } from "react";
import { lang } from "../data/strings";

export default function DialogStats(props) {
    const [timeForNextWord, setTimeForNextWord] = useState({});
    const [nextWordAvailable, setNextWordAvailable] = useState(false);

    const goToNextDayWordle = () => {
        window.location.reload();
    }

    useEffect(() => {
        const todayNumber = getDayOfYear();
        const calculate = () => {
            const timeLeft = calculateTimeLeftNewWord();
            setTimeForNextWord({
                hours: addZeroIfLower10(timeLeft.hours),
                minutes: addZeroIfLower10(timeLeft.minutes),
                seconds: addZeroIfLower10(timeLeft.seconds)
            })
        }

        if (!nextWordAvailable) {
            calculate();
            const interval = setInterval(() => {
                calculate();
                if (getDayOfYear() !== todayNumber) setNextWordAvailable(true);
            }, 1000);
            return () => interval;
        }
    }, [nextWordAvailable]);

    const stats = props.stats;
    const wins = stats["wins"];
    const winsPerc = stats["played"] === 0 ? 0 : parseInt(wins / stats["played"] * 100);
    const distribution = stats["dist"];

    return (
        <Dialog onClose={props.onClose} hidden={props.hidden} title={lang.dialog.statistics.title}>
            <div className="flex justify-center mb-4">
                <div className="text-center w-16 mx-1 p-2">
                    <p className="mb-2 font-semibold text-3xl">{stats["played"]}</p>
                    <p className="font-light text-sm">{lang.dialog.statistics.played}</p>
                </div>
                <div className="text-center w-16 mx-1 p-2">
                    <p className="mb-2 font-semibold text-3xl">{winsPerc}%</p>
                    <p className="font-light text-sm">{lang.dialog.statistics.win}</p>
                </div>
                <div className="text-center w-16 mx-1 p-2">
                    <p className="mb-2 font-semibold text-3xl">{stats["streak"]}</p>
                    <p className="font-light text-sm">{lang.dialog.statistics.currentStreak}</p>
                </div>
                <div className="text-center w-16 mx-1 p-2">
                    <p className="mb-2 font-semibold text-3xl">{stats["maxStreak"]}</p>
                    <p className="font-light text-sm">{lang.dialog.statistics.maxStreak}</p>
                </div>
            </div>

            <hr className="my-4 border-zinc-300 dark:border-zinc-700" />
            <h2 className="text-center mt-6 mb-4 font-semibold text-lg">{lang.dialog.statistics.distribution}</h2>

            <div className="mb-8 mx-14 text-sm">
                {distribution.map((x, index) => {
                    const percentage = x === 0 ? 0 : parseInt(x / wins * 100);
                    const styles = x > 0 ? { "width": percentage + "%" } : {};

                    return (
                        <div key={index} className="flex mb-2">
                            <span className="w-5 mr-2">{index + 1}</span>
                            <span style={styles} className={`min-w-[1.6rem] text-right px-2 ${x === 0 ? "bg-gray-700" : "bg-green-700"} text-white`}>{x}</span>
                        </div>
                    )
                })}
            </div>

            <hr className={`${props.showTimer ? "" : "hidden"} my-4 border-zinc-300 dark:border-zinc-700`} />
            <div className={`${props.showTimer ? "" : "hidden"} flex items-center mb-4`}>
                <div className="flex-1 text-center font-semibold">
                    {(() => {
                        if (nextWordAvailable) {
                            return <div className="inline-block">
                                <button onClick={goToNextDayWordle}
                                    className="flex justify-center items-center px-6 py-3 min-h-[4rem] 
                                             bg-green-700 hover:bg-green-800 
                                               rounded-md text-white text-base font-semibold">
                                    <span>{lang.dialog.statistics.nextWordle}</span> <PlayIcon className="inline-block w-6 h-6 ml-2" />
                                </button>
                            </div>
                        } else {
                            return (
                                <div>
                                    <p className="">{lang.dialog.statistics.nextWordle}</p>
                                    <p className="text-3xl">
                                        {`${timeForNextWord.hours ?? "00"}:${timeForNextWord.minutes ?? "00"}:${timeForNextWord.seconds ?? "00"}`}
                                    </p>
                                </div>
                            );
                        }
                    })()}
                </div>
                <div className="self-stretch w-px bg-zinc-300 dark:bg-zinc-700 mx-5"></div>
                <div className="flex flex-1 justify-center">
                    <button onClick={props.onShareClick}
                        className="flex justify-center items-center px-6 py-3 min-h-[4rem]
                        bg-green-700 hover:bg-green-800 
                        rounded-md text-white text-xl font-semibold">
                        <span>{lang.dialog.statistics.share}</span> <ShareIcon className="inline-block w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </Dialog>
    );
}