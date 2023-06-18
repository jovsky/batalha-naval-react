import React from "react";
import { BoardCell } from "../interfaces/interfaces";
import { getCellShipClass } from "../utils/Utils";

interface BoardProps {
    cell: BoardCell;
}

class CellComponent extends React.Component<BoardProps> {
    render() {
        const { cell } = this.props;
        return (
            <div
                className={`cell-paint bg-neutral-700 ${getCellShipClass(
                    cell.ship
                )}`}
                // style={cell.ship ? { backgroundColor: cell.ship.color } : {}}
            />
        );
    }
}

export default CellComponent;
