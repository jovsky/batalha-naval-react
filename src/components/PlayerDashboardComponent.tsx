import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import BoardComponent from "./BoardComponent";

interface BoardProps {
    player: 1 | 2;
}

function PlayerDashboardComponent({ player }: BoardProps) {
    const [rend, setRend] = useState(false);
    const { game } = useContext(GameContext);

    const board = player === 1 ? game.player1Board : game.player2Board;

    function placeShipsRandomly() {
        game.placeShipsRandomly(board);
        setRend(!rend); // Re-render ?
    }

    function enablePlayerToPlace() {}

    return (
        <>
            <div className="w-full flex flex-col gap-4 justify-center items-center h-full border-r border-gray-700">
                <h3>PLAYER {board.player}</h3>
                <div className="flex gap-3">
                    <button className="custom-btn" onClick={placeShipsRandomly}>
                        INICIAR
                    </button>
                    <button
                        className="custom-btn"
                        onClick={enablePlayerToPlace}
                    >
                        POSICIONAR
                    </button>
                </div>
                <BoardComponent board={board} />
            </div>
        </>
    );
}

export default PlayerDashboardComponent;
