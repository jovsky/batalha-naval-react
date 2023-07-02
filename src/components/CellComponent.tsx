import { useContext, useState, useEffect } from "react";
import { Direction, GameStatus } from "../interfaces/interfaces";
import { getCellShipClass, useRedraw } from "../utils/Utils";
import { GameContext } from "../context/GameContext";
import BattleShip from "../classes/BattleShip";
import DraggableShip from "./DraggableShip";
import BoardCell from "../classes/BoardCell";

interface BoardProps {
    cell: BoardCell;
    player: 1 | 2;
    redraw: () => void;
}

export default function CellComponent({ cell, player, redraw }: BoardProps) {
    const { game } = useContext(GameContext);

    const board = game.getBoard(player);
    const pickerController = game.getPickerController(player);

    const [shipHead, setShipHead] = useState<boolean>(false);

    function handleDragDrop() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        pickerController?.draggedToBoard(cell.row, cell.col);
        redraw();
    }

    useEffect(() => {
        cell.setShipHeadUpdater((value) => {
            setShipHead(value);
            redraw();
        });
    }, []);

    const ship = cell.getShip();
    if (ship && shipHead) {
        console.log(cell.row, cell.col, ship);
    }

    return (
        <div className="relative">
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDragDrop}
                className={`cell-paint bg-neutral-700 outline outline-1 ${
                    pickerController.isPlacing ? "" : getCellShipClass(ship)
                } `}
            />
            {pickerController.isPlacing && shipHead && ship ? (
                <div className="absolute z-10 top-[-1px] left-[-1px]">
                    <DraggableShip ship={ship} player={player} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
