import Navbar from "./components/Navbar";
import Board from './components/Board';
import Keyboard from "./components/Keyboard";

import { useState, useEffect } from "react";
import TutorialDialog from "./components/TutorialDialog";

import { words } from './utils/words'

const validLetters = "QWERTYUIOPASDFGHJKLÑZXCVBNM".split("");

const test = words[parseInt(Math.random() * words.length)].toUpperCase();
console.log("Respuesta: ", test)

const getCellResults = (correctWord, currentWord) => {
    console.log("dsadsa", correctWord, currentWord)
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

function App() {
    const [tutorial, setTutorial] = useState(false);
    const [game, setGame] = useState({
        "previous": [],
        "current": [],
        "end": false
    });

    const isWordValid = (word) => {
        return true;
    }

    const addPressedKey = (key) => {
        key = key.toUpperCase();

        setGame(prev => {
            if (prev["end"]) return prev;

            let newCurrent = [...prev["current"]];
            let newPrevious = [...prev["previous"]];
            let end = false;

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
                            const wordResult = getCellResults(test, word);
                            newPrevious.push(newCurrent.map((x, index) => [x, wordResult[index]]));
                            newCurrent = [];
                            if (newPrevious.length === 6 || test === word) end = true;
                        }
                    }
                    break;
                default:
                    if (newCurrent.length < 5 && validLetters.includes(key)) newCurrent.push(key);
                    break;
            }
    
            return {...prev, "previous": newPrevious, "current": newCurrent, "end": end};
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
            <Navbar onButtonRulesClick={() => setTutorial(true)} />
            <div className="flex-1 flex flex-col justify-between overflow-clip">
                <div className="flex-1 flex flex-col justify-center">
                    <Board current={game["current"]} previous={game["previous"]} />
                </div>
                <div>
                    <Keyboard onKeyPressed={key => addPressedKey(key)} />
                </div>
            </div>
            <TutorialDialog hidden={!tutorial} onClose={() => setTutorial(false)} />
        </div>
    );
}

export default App;
