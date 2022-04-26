import Cell from "./Cell";

export default function Board() {
    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-3 mx-20">
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
            <Cell/><Cell/><Cell/><Cell/><Cell/>
        </div>
    );
}