import Navbar from "./components/Navbar";
import Board from './components/Board';
import Keyboard from "./components/Keyboard";

import Dialog from "./components/Dialog";
import { useState } from "react";
import Cell from "./components/Cell";

function App() {
    const [tutorial, setTutorial] = useState(false);

    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen text-black dark:text-gray-200">
            <Navbar onButtonRulesClick={() => setTutorial(true)} />
            <div className="flex-1 flex flex-col justify-between overflow-clip">
                <div className="flex-1 flex flex-col justify-center">
                    <Board />
                </div>
                <div>
                    <Keyboard />
                </div>
            </div>
            <Dialog onClose={() => setTutorial(false)} hidden={!tutorial}>
            <p>Guess the WORDLE in six tries.</p>
                    <p className="my-3">Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
                    <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

                    <hr className="my-4" />

                    <h3 className="font-semibold mb-4">Examples</h3>

                    <div className="flex">
                        <Cell /><Cell /><Cell /><Cell /><Cell />
                    </div>

                    <p className="my-3">The letter W is in the word and in the correct spot.</p>

                    <div className="flex">
                        <Cell /><Cell /><Cell /><Cell /><Cell />
                    </div>

                    <p className="my-3">The letter I is in the word but in the wrong spot.</p>

                    <div className="flex">
                        <Cell /><Cell /><Cell /><Cell /><Cell />
                    </div>

                    <p className="my-3">The letter U is not in the word in any spot.</p>

                    <hr className="my-4" />
                    <p className="my-3 font-semibold">A new WORDLE will be available each day!</p>
            </Dialog>
        </div>
    );
}

export default App;
