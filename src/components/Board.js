import Cell from "./Cell";

export default function Board(props) {
    const previous = props.previous;
    const current = props.current;

    return (
        <div className="flex-1 flex flex-col mx-auto justify-center">
            {
                [...Array(6)].map((x, index1) => (
                    <div key={index1} className="flex flex-1 max-h-16 my-0.5">{
                        [...Array(5)].map((x, index2) => {
                            if (index1 < previous.length) {
                                const cell = previous[index1][index2];
                                return <Cell delay={index2 * 100} key={index2} value={cell[0]} result={cell[1]} />
                            } else if (index1 === previous.length) {
                                return <Cell delay={index2 * 100} key={index2} value={current[index2]} />
                            }
                            return <Cell key={index2} />
                        })
                    }</div>
                ))
            }
        </div>
    );
}