import Navbar from "./components/Navbar";
import Board from './components/Board';
import Keyboard from "./components/Keyboard";

import { useState, useEffect } from "react";
import TutorialDialog from "./components/TutorialDialog";
import StatsDialog from "./components/StatsDialog";
import Notification from "./components/Notification";

import { words } from './utils/words'

const validLetters = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split("");

const tmpArray = [...words];
const test = tmpArray[parseInt(Math.random() * tmpArray.length)].toUpperCase();
console.log("Respuesta: ", test)

const getCellResults = (correctWord, currentWord) => {
    const result = [];
    const correctLetters = {};
    correctWord.split("").map(x => correctLetters[x] = (correctLetters[x] ?? 0) + 1);

    currentWord.split("").map((x, index) => {
        if (x === correctWord[index]) {
            result.push(1);
        } else if (x in correctLetters) {
            result.push(0);
        } else {
            result.push(-1);
        }
        return x;
    })

    return result;
}

const startState = (localStorage.getItem("boardState") && JSON.parse(localStorage.getItem("boardState")));
const startStatistics = (localStorage.getItem("stats") ? JSON.parse(localStorage.getItem("stats")) : {
    played: 0,
    wins: 0,
    streak: 0,
    maxStreak: 0,
    dist: [...Array(6).fill(0)]
});

function App() {
    const [tutorialDialog, setTutorialDialog] = useState(false);
    const [statsDialog, setStatsDialog] = useState(false);
    const [openDialogAtEnd, setOpenDialogAtEnd] = useState(true);

    const [game, setGame] = useState(startState || {
        "previous": [],
        "current": [],
        "end": false,
        "notifications": [],
        "nid": 0,
        "correct": test
    });

    const [stats, setStats] = useState(startStatistics);

    if (game["end"] && openDialogAtEnd) {
        setOpenDialogAtEnd(false);
        setTimeout(() => {
            setStatsDialog(true);
        }, 1500);
    }

    const isWordValid = (word) => {
        return words.has(word.toLowerCase());
    }

    const updateStats = (win, tries) => {
        const currenStreak = win ? startStatistics["streak"] + 1 : 0;
        const curretDist = [...startStatistics["dist"]];
        if (win) curretDist[tries - 1] += 1;

        const newStats = {
            played: startStatistics["played"] + 1,
            wins: startStatistics["wins"] + (win ? 1 : 0),
            streak: currenStreak,
            maxStreak: Math.max(currenStreak, startStatistics["maxStreak"]),
            dist: curretDist
        }
        localStorage.setItem("stats", JSON.stringify(newStats));
        setStats(newStats);
    }

    const addPressedKey = (key) => {
        key = key.toUpperCase();

        setGame(prev => {
            if (prev["end"]) return prev;

            let newCurrent = [...prev["current"]];
            let newPrevious = [...prev["previous"]];
            let notification = [...prev["notifications"]];
            let end = false;
            let nid = prev["nid"];
            const correctWord = prev["correct"];

            switch (key) {
                case "BACKSPACE":
                case "DEL":
                    if (newCurrent.length > 0) newCurrent.pop();
                    break;
                case "ENTER":
                case "ENVIAR":
                    if (newCurrent.length === 5) {
                        const word = newCurrent.join("");
                        if (isWordValid(word)) {
                            const wordResult = getCellResults(correctWord, word);
                            newPrevious.push(newCurrent.map((x, index) => [x, wordResult[index]]));
                            newCurrent = [];
                            if (newPrevious.length === 6 || correctWord === word) {
                                end = true;
                                nid++;
                                if (correctWord === word) {
                                    notification.unshift(["Correcto!", nid]);
                                    updateStats(true, newPrevious.length);
                                } else {
                                    notification.unshift([`Respuesta: ${correctWord}`, nid]);
                                    updateStats(false, newPrevious.length);
                                }
                            }
                        } else {
                            const error = `word ${word} is not valid`;
                            if (notification.length > 8) notification.pop();
                            nid++;
                            notification.unshift([error, nid]);
                        }
                    }
                    break;
                default:
                    if (newCurrent.length < 5 && validLetters.includes(key)) newCurrent.push(key);
                    break;
            }
    
            const result = {
                ...prev,
                "previous": newPrevious,
                "current": newCurrent,
                "end": end,
                "notifications": notification,
                "nid": nid
            };
            localStorage.setItem("boardState", JSON.stringify({...result, "notifications": []}));
            return result;
        });
    };

    const temp = (key) => addPressedKey(key.key);
    useEffect(() => {
        document.addEventListener("keydown", temp, false);

        return () => {
            document.removeEventListener("keydown", temp, false);
        };
    }, []);

    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen text-black dark:text-gray-200">
            <Navbar onButtonRulesClick={() => setTutorialDialog(true)} onButtonStatsClick={() => setStatsDialog(true)}/>
            <div className="flex-1 flex flex-col justify-between overflow-clip">
                <div className="flex-1 flex flex-col justify-center">
                    <Board current={game["current"]} previous={game["previous"]} />
                </div>
                <div>
                    <Keyboard onKeyPressed={addPressedKey} />
                </div>
            </div>
            <TutorialDialog hidden={!tutorialDialog} onClose={() => setTutorialDialog(false)} />
            <StatsDialog stats={stats} hidden={!statsDialog} onClose={() => setStatsDialog(false)} />
            <Notification list={game["notifications"]}/>
        </div>
    );
}

export default App;
