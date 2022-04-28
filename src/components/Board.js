import Cell from "./Cell";
import words from "../utils/words";

console.log(words[0]);

export default function Board() {
    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-2 mx-20">
            <Cell value="D"/><Cell value="I"/><Cell value="E"/><Cell value="G"/><Cell value="O"/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
        </div>
    );
}