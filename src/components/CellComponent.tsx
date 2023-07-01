import { useContext, useState } from "react";
import { BoardCell, Direction, GameStatus } from "../interfaces/interfaces";
import { getCellShipClass } from "../utils/Utils";
import PickerController from "../classes/PickerController";
import { GameContext } from "../context/GameContext";
import Board from "../classes/Board";
import BattleShip from "../classes/BattleShip";
import DraggableShip from "./DraggableShip";

interface BoardProps {
    cell: BoardCell;
    player: 1 | 2;
    redraw: () => void;
}

function CellComponent({ cell, player, redraw }: BoardProps) {
    const { game } = useContext(GameContext);

    const board = game.getBoard(player);
    const pickerController = game.getPickerController(player);

    const [shipHead, setShipHead] = useState<{
        ship: BattleShip;
        direction: Direction;
    } | null>(null);

    function handleDragDrop() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        pickerController?.draggedToBoard(cell.row, cell.col);
        redraw();
    }

    return (
        <>
            <div
                draggable={pickerController.isPlacing && !!cell.ship}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDragDrop}
                className={`cell-paint bg-neutral-700 outline outline-1 ${
                    pickerController.isPlacing
                        ? getCellShipClass(cell.ship)
                        : ""
                } `}
            />
            {pickerController.isPlacing && shipHead && cell.ship ? (
                <DraggableShip ship={shipHead.ship} player={player} />
            ) : (
                ""
            )}
        </>
    );
}

export default CellComponent;
