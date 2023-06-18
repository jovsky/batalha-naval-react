import React, { useContext, useState, useRef, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import BoardComponent from "./BoardComponent";
import ShipPicker from "./ShipPicker";
import { GameStatus } from "../interfaces/interfaces";

interface BoardProps {
    player: 1 | 2;
}

function PlayerDashboardComponent({ player }: BoardProps) {
    const [rend, setRend] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const picker = useRef<ShipPicker>(null);

    const { game } = useContext(GameContext);

    const board = player === 1 ? game.player1Board : game.player2Board;

    function placeShipsRandomly() {
        picker.current?.setShips([]);
        setShowPicker(false);
        const ships = game.generateShipSet(board.player);
        game.placeShipsRandomly(board, ships);
        setRend(!rend);
    }

    function enablePlayerToPlace() {
        const newValue = !showPicker;
        if (game.status !== GameStatus.Starting || !newValue) {
            setShowPicker(false);
            setRend(!rend);
            return;
        }
        setShowPicker(true);
    }

    useEffect(() => {
        if (!showPicker) {
            return;
        }
        let ships = board.clearShips();
        if (!ships) {
            ships = game.generateShipSet(board.player);
        }
        picker.current?.setShips(ships);
        setRend(!rend);
    }, [showPicker]);

    return (
        <>
            <div className="w-full flex flex-col gap-4 justify-center items-center h-full border-r border-gray-700">
                <h3>PLAYER {board.player}</h3>
                <div className="flex gap-3">
                    <button className="custom-btn" onClick={placeShipsRandomly}>
                        POSICIONAR ALEATORIAMENTE
                    </button>
                    <button
                        className="custom-btn"
                        onClick={enablePlayerToPlace}
                    >
                        POSICIONAR MANUALMENTE
                    </button>
                </div>
                <div className="flex gap-2">
                    {showPicker ? (
                        <ShipPicker player={board.player} ref={picker} />
                    ) : null}
                    <BoardComponent board={board} />
                </div>
            </div>
        </>
    );
}

export default PlayerDashboardComponent;
