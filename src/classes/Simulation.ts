import gameSettings from "../gameSettings.json";
import GameController from "./GameController";

export function createGame() {
    const game = new GameController(gameSettings.board.length);

    return game;
}
