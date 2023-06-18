import React from "react";
import Board from "../classes/Board";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board;
}

class BoardComponent extends React.Component<BoardProps> {
    render() {
        const { board } = this.props;
        return (
            <div className="flex flex-col border  bg-black gap-[1px] p-[1px] w-fit">
                {board.cellsMap.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row gap-[1px]">
                        {row.map((cell, colIndex) => (
                            <CellComponent cell={cell} key={colIndex} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default BoardComponent;
