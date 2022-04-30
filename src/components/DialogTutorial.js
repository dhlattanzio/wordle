import Dialog from "./Dialog";
import Cell from "./Cell";
import { lang } from "../data/strings";

export default function DialogTutorial(props) {
    const wordCorrect = lang.dialog.tutorial.words.correct;
    const wordBadSpot = lang.dialog.tutorial.words.badSpot;
    const wordNotInWord = lang.dialog.tutorial.words.notInWord;

    const tutorialWord1 = wordCorrect[0].split("").map(x => x === wordCorrect[2] ? 1 : -2);
    const tutorialWord2 = wordBadSpot[0].split("").map(x => x === wordBadSpot[2] ? 0 : -2);
    const tutorialWord3 = wordNotInWord[0].split("").map(x => x === wordNotInWord[2] ? -1 : -2);

    return (
        <Dialog onClose={props.onClose} hidden={props.hidden} title={lang.dialog.tutorial.title}>
            {lang.dialog.tutorial.details.map((x, index) => <p key={index} className="my-3">{x}</p>)}

            <hr className="my-4 mt-8 border-zinc-300 dark:border-zinc-700" />

            <h3 className="mb-4 font-semibold">{lang.dialog.tutorial.examples}</h3>

            <div className="flex h-12 mt-8">
                {wordCorrect[0].split("").map((x, index) => <Cell size="small" key={index} result={tutorialWord1[index]} value={x} />)}
            </div>

            <p className="my-3">
                {wordCorrect[1]} <span className="font-bold">{wordCorrect[2]}</span> {wordCorrect[3]}
            </p>

            <div className="flex h-12 mt-8">
                {wordBadSpot[0].split("").map((x, index) => <Cell size="small" key={index} result={tutorialWord2[index]} value={x} />)}
            </div>

            <p className="my-3">
                {wordBadSpot[1]} <span className="font-bold">{wordBadSpot[2]}</span> {wordBadSpot[3]}
            </p>

            <div className="flex h-12 mt-8">
                {wordNotInWord[0].split("").map((x, index) => <Cell size="small" key={index} result={tutorialWord3[index]} value={x} />)}
            </div>

            <p className="my-3">
                {wordNotInWord[1]} <span className="font-bold">{wordNotInWord[2]}</span> {wordNotInWord[3]}
            </p>

            <hr className="my-4 border-zinc-300 dark:border-zinc-700" />
            <p className="my-3 font-semibold">{lang.dialog.tutorial.newWordleEveryDay}</p>
        </Dialog>
    );
}