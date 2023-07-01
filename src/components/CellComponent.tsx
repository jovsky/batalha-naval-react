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
    redraw: () => void;
}

function CellComponent({ cell, controller, board, redraw }: BoardProps) {
    const { game } = useContext(GameContext);

    function handleDragStart() {
        if (game.status !== GameStatus.Starting || !cell.ship) {
            return;
        }
        controller?.setDraggedShip(cell.ship);
    }

    function handleDragEnd() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        controller?.unsetDraggedShip();
        redraw();
    }

    function handleDragDrop() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        controller?.draggedToBoard(cell.row, cell.col, "horizontal");
        redraw();
    }

    return (
        <div
            draggable={
                game.status === GameStatus.Starting &&
                !!controller &&
                !!cell.ship
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`cell-paint bg-neutral-700 outline outline-1
                ${getCellShipClass(cell.ship)}

            `}
            // style={{ boxShadow: "rgba(0, 0, 0, 0.367) 0px 0px 2px 2px inset" }}
        />
    );
}

export default CellComponent;
