import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import BoardComponent from "./BoardComponent";
import ShipPicker from "./ShipPicker";
import { GameStatus } from "../interfaces/interfaces";
import { generateShipSet } from "../utils/Utils";
import PickerController from "../classes/PickerController";

interface BoardProps {
    player: 1 | 2;
}

function PlayerDashboardComponent({ player }: BoardProps) {
    const { game } = useContext(GameContext);
    const board = player === 1 ? game.player1Board : game.player2Board;

    const [rend, setRend] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pickerController, setPickerController] =
        useState<PickerController | null>(null);

    function placeShipsRandomly() {
        const ships = generateShipSet(board.player);
        game.placeShipsRandomly(board, ships);
        setPickerVisible(false);
        setPickerController(null);
        redraw();
    }

    function redraw() {
        setRend(!rend);
    }

    function toggleManualPlace() {
        if (game.status !== GameStatus.Starting) {
            setPickerVisible(false);
            setPickerController(null);
            redraw();
            return;
        }
        const newVisibility = !pickerVisible;

        setPickerController(newVisibility ? new PickerController(board) : null);
        setPickerVisible(newVisibility);
        redraw();
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4 justify-center items-center h-full border-r border-gray-700">
                <h3>PLAYER {board.player}</h3>
                <div className="flex gap-3">
                    <button className="custom-btn" onClick={placeShipsRandomly}>
                        POSICIONAR ALEATORIAMENTE
                    </button>
                    <button className="custom-btn" onClick={toggleManualPlace}>
                        POSICIONAR MANUALMENTE
                    </button>
                </div>
                <div className="flex gap-2">
                    {pickerVisible && pickerController ? (
                        <ShipPicker controller={pickerController} />
                    ) : null}
                    <BoardComponent
                        board={board}
                        controller={pickerController}
                        redraw={redraw}
                    />
                </div>
            </div>
        </>
    );
}

export default PlayerDashboardComponent;
