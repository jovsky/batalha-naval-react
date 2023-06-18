import React, { createContext, useState } from "react";
import GameController from "../classes/GameController";
import { createGame } from "../classes/Simulation";

interface GameContextInterface {
    game: GameController;
    restartGame: () => void;
}

const GameContext = createContext<GameContextInterface>({
    game: createGame(),
    restartGame: () => {},
});

function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<GameController>(createGame());

    function restartGame() {
        setGame(createGame());
    }

    console.log("update game");
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
