import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import BoardComponent from "./BoardComponent";
import ShipPicker from "./ShipPicker";
import { GameStatus } from "../interfaces/interfaces";
import { generateShipSet } from "../utils/Utils";

interface BoardProps {
    player: 1 | 2;
}

function PlayerDashboardComponent({ player }: BoardProps) {
    const { game } = useContext(GameContext);

    const board = game.getBoard(player);
    const pickerController = game.getPickerController(player);

    const [rend, setRend] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);

    function placeShipsRandomly() {
        const ships = generateShipSet(board.player);
        game.placeShipsRandomly(board, ships);
        setPickerVisible(false);
        redraw();
    }

    function redraw() {
        setRend(!rend);
    }

    function toggleManualPlace() {
        if (game.status !== GameStatus.Starting) {
            return;
        }
        setPickerVisible(!pickerVisible);
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
                        <ShipPicker player={player} redraw={redraw} />
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
