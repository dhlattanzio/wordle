import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Board from './components/Board';
import Keyboard from "./components/Keyboard";
import DialogTutorial from "./components/DialogTutorial";
import DialogStats from "./components/DialogStats";
import Notification from "./components/Notification";

import { words } from './data/words'
import { random, getDayOfYear, getYear, getCellResults } from "./utils/utils";
import { Config } from "./config";
import { lang } from "./data/strings";

// Start Theme
if (localStorage.getItem("darkMode") === "true") document.querySelector("html").classList.add("dark");

// Today Word
const seed = Config.seed + (getYear() * 1000 + getDayOfYear());
const allWords = [...words];
const todayWordIndex = random(seed, 0, allWords.length);
const todayWord = allWords[todayWordIndex].toUpperCase();

// Current State & Statistics
const startState = (localStorage.getItem("boardState") && JSON.parse(localStorage.getItem("boardState")));
const startStatistics = (localStorage.getItem("stats") ? JSON.parse(localStorage.getItem("stats")) : {
    played: 0,
    wins: 0,
    streak: 0,
    maxStreak: 0,
    dist: [...Array(6).fill(0)]
});

function App() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [tutorialDialog, setTutorialDialog] = useState(false);
    const [statsDialog, setStatsDialog] = useState(false);
    const [openDialogAtEnd, setOpenDialogAtEnd] = useState(true);
    const [invalidWord, setInvalidWord] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const [game, setGame] = useState(startState && startState["seed"] === seed ? startState : {
        "previous": [],
        "current": [],
        "end": false,
        "notifications": [],
        "nid": 0,
        "correct": todayWord,
        "seed": seed
    });

    const [stats, setStats] = useState(startStatistics);

    // Used keys
    useEffect(() => {
        const tmpMap = {};
        game["previous"].map(x => {
            x.map(y => {
                tmpMap[y[0]] = Math.max(tmpMap[y[0]] ?? -2, y[1]);
                return y;
            });
            return x;
        });
        setUsedKeys(tmpMap);
    }, [game]);

    // Open statistics dialog if board is completed
    if (game["end"] && openDialogAtEnd) {
        setOpenDialogAtEnd(false);
        setTimeout(() => {
            setStatsDialog(true);
        }, 1500);
    }

    const toggleTheme = () => {
        localStorage.setItem("darkMode", !darkMode);
        setDarkMode(!darkMode);
        document.querySelector("html").classList.toggle("dark");
    }

    const isWordValid = (word) => {
        return words.has(word.toLowerCase());
    }

    const copyShareInfoToClipboard = () => {
        const win = stats["streak"] > 0;
        const notifications = [...game["notifications"]];
        const totalTries = game["previous"].length;
        const nid = game["nid"];

        const boardString = game["previous"].reduce((i, x) => {
            const line = x.reduce((j, [letter, result]) => {
                return j + (result === -1 ? "⬛" : (result === 0 ? "🟨" : "🟩"));
            }, "");
            return i + (i !== "" ? "\n" : "") + line;
        }, "");

        navigator.clipboard.writeText(`${lang.title}  ${win ? totalTries : "X"}/6\n\n${boardString}`);

        if (notifications.length > 8) notifications.pop();
        notifications.unshift([lang.notifications.copyToClipboard, nid + 1]);
        setGame(prev => ({ ...prev, "nid": nid + 1, "notifications": notifications }));
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

    const processPressedKey = (key) => {
        key = key.toUpperCase();

        setGame(prev => {
            if (prev["end"]) return prev;

            let newCurrent = [...prev["current"]];
            let newPrevious = [...prev["previous"]];
            let notification = [...prev["notifications"]];
            let end = false;
            let nid = prev["nid"];
            const correctWord = prev["correct"];

            if (notification.length > 8) notification.pop();

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

                            setUsedKeys(prev => {
                                const result = { ...prev };
                                newCurrent.map((x, index) => result[x] = Math.max(result[x] ?? -2, wordResult[index]))
                                return result;
                            });

                            newCurrent = [];
                            if (newPrevious.length === 6 || correctWord === word) {
                                end = true;
                                nid++;
                                if (correctWord === word) {
                                    notification.unshift([lang.notifications.correct, nid]);
                                    updateStats(true, newPrevious.length);
                                } else {
                                    notification.unshift([`${correctWord}`, nid]);
                                    updateStats(false, newPrevious.length);
                                }
                            }
                        } else {
                            nid++;
                            notification.unshift([lang.notifications.invalidWord, nid]);
                            setInvalidWord(true);
                        }
                    }
                    break;
                default:
                    if (newCurrent.length < 5 && Config.validLetters.includes(key)) newCurrent.push(key);
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
            localStorage.setItem("boardState", JSON.stringify({ ...result, "notifications": [] }));
            return result;
        });
    };

    useEffect(() => {
        const keyDownListener = (key) => processPressedKey(key.key);
        document.addEventListener("keydown", keyDownListener, false);

        return () => document.removeEventListener("keydown", keyDownListener, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col max-w-lg h-full mx-auto text-zinc-800 dark:text-gray-200">
            <Navbar
                darkMode={darkMode}
                onButtonThemeClick={() => toggleTheme()}
                onButtonRulesClick={() => setTutorialDialog(true)}
                onButtonStatsClick={() => setStatsDialog(true)} />

            <div className="flex flex-col flex-1 justify-between overflow-clip">
                <div className="flex flex-col flex-1 justify-center">
                    <Board
                        onAnimationEnd={() => setInvalidWord(false)}
                        invalidWord={invalidWord}
                        current={game["current"]}
                        previous={game["previous"]} />
                </div>
                <div>
                    <Keyboard
                        usedKeys={usedKeys}
                        onKeyPressed={processPressedKey} />
                </div>
            </div>

            <DialogTutorial
                hidden={!tutorialDialog}
                onClose={() => setTutorialDialog(false)} />

            <DialogStats
                onShareClick={copyShareInfoToClipboard}
                showTimer={game["end"]}
                stats={stats}
                hidden={!statsDialog}
                onClose={() => setStatsDialog(false)} />

            <Notification
                list={game["notifications"]} />
        </div>
    );
}

export default App;
