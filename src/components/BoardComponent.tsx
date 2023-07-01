import React from "react";
import Board from "../classes/Board";
import CellComponent from "./CellComponent";
import PickerController from "../classes/PickerController";

interface BoardProps {
    board: Board;
    controller: PickerController | null;
    redraw: () => void;
}

class BoardComponent extends React.Component<BoardProps> {
    render() {
        const { board } = this.props;
        return (
            <div className="flex flex-col w-fit h-fit ">
                {board.cellsMap.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row">
                        {row.map((cell, colIndex) => (
                            <CellComponent
                                cell={cell}
                                board={board}
                                controller={this.props.controller}
                                key={colIndex}
                                redraw={this.props.redraw}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default BoardComponent;
