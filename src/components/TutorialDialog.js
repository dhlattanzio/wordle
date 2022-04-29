import Dialog from "./Dialog";
import Cell from "./Cell";

export default function TutorialDialog(props) {
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

    const tutorialWord1 = getCellResults("W____", "WEARY").map(x => x === 1 ? x : -2);
    const tutorialWord2 = getCellResults("____I", "PILLS").map(x => x === 0 ? x : -2);
    const tutorialWord3 = getCellResults("_____", "VAGUE").map((x, index) => index === 3 ? x : -2);

    return (
        <Dialog onClose={props.onClose} hidden={props.hidden} title="HOW TO PLAY">
            <p>Guess the WORDLE in six tries.</p>
            <p className="my-3">Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
            <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

            <hr className="my-4 border-zinc-500" />

            <h3 className="font-semibold mb-4">Examples</h3>

            <div className="flex mt-8 h-12">
                {"WEARY".split("").map((x, index) => <Cell size="small" key={index} result={tutorialWord1[index]} value={x} />)}
            </div>

            <p className="my-3">The letter <span className="font-bold">W</span> is in the word and in the correct spot.</p>

            <div className="flex mt-8 h-12">
                {"PILLS".split("").map((x, index) => <Cell size="small" key={index} result={tutorialWord2[index]} value={x} />)}
            </div>

            <p className="my-3">The letter <span className="font-bold">I</span> is in the word but in the wrong spot.</p>

            <div className="flex mt-8 h-12">
                {"VAGUE".split("").map((x, index) => <Cell size="small" key={index} result={tutorialWord3[index]} value={x} />)}
            </div>

            <p className="my-3">The letter <span className="font-bold">U</span> is not in the word in any spot.</p>

            <hr className="my-4 border-zinc-500" />
            <p className="my-3 font-semibold">A new WORDLE will be available each day!</p>
        </Dialog>
    );
}