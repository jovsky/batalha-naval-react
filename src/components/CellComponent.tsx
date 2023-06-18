import { useContext } from "react";
import { BoardCell, GameStatus } from "../interfaces/interfaces";
import { getCellShipClass } from "../utils/Utils";
import PickerController from "../classes/PickerController";
import { GameContext } from "../context/GameContext";
import Board from "../classes/Board";

interface BoardProps {
    cell: BoardCell;
    board: Board;
    controller: PickerController | null;
}

function CellComponent({ cell, controller }: BoardProps) {
    const { game } = useContext(GameContext);

    function handleDragStart() {
        if (game.status !== GameStatus.Starting || !cell.ship) {
            return;
        }
        controller?.setDraggedShipId(cell.ship.id);
    }

    function handleDragEnd() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        controller?.unsetDraggedShipId();
    }

    function handleDragDrop() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        controller?.draggedToBoard();
    }

    return (
        <div
            draggable={game.status === GameStatus.Starting && !!controller}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`cell-paint bg-neutral-700 ${getCellShipClass(
                cell.ship
            )}`}
            // style={cell.ship ? { backgroundColor: cell.ship.color } : {}}
        />
    );
}

export default CellComponent;
