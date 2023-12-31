import React, { createContext, useState } from "react";
import GameController from "../classes/GameController";
import { createGame } from "../classes/Simulation";
import { GameContextInterface } from "../interfaces/interfaces";

const GameContext = createContext<GameContextInterface>({
    game: createGame(),
    restartGame: () => {},
});

function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<GameController>(createGame());

    function restartGame() {
        setGame(createGame());
    }

    return (
        <GameContext.Provider
            value={{
                game,
                restartGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };
