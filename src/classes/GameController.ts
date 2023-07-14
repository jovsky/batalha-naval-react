import { GameStatus } from "../interfaces/interfaces";
import Board from "./Board";
import BattleShip from "./BattleShip";
import PickerController from "./PickerController";

export default class GameController {
    public player1Board: Board;
    public player2Board: Board;
    public player1Picker: PickerController;
    public player2Picker: PickerController;
    public currentPlayer: number;
    public status: GameStatus;

    constructor(boardSize: number) {
        this.player1Board = new Board(boardSize, 1, this);
        this.player2Board = new Board(boardSize, 2, this);
        this.player1Picker = new PickerController(this, this.player1Board);
        this.player2Picker = new PickerController(this, this.player2Board);

        this.currentPlayer = 1;
        this.status = GameStatus.Starting;
    }

    getBoard(player: 1 | 2) {
        return player === 1 ? this.player1Board : this.player2Board;
    }

    getPickerController(player: 1 | 2) {
        return player === 1 ? this.player1Picker : this.player2Picker;
    }

    get isStarting() {
        return this.status === GameStatus.Starting;
    }

    placeShipsRandomly(board: Board, ships: BattleShip[]) {
        board.clearShips();

        ships.forEach((ship) => {
            let placed = false;

            while (!placed) {
                const row = Math.floor(Math.random() * board.boardSize);
                const col = Math.floor(Math.random() * board.boardSize);

                ship.setDirection(
                    Math.random() < 0.5 ? "horizontal" : "vertical"
                );

                if (board.canPlaceShip(row, col, ship, true)) {
                    board.placeShip(row, col, ship);
                    placed = true;
                }
            }
        });
    }

    attack(player: number, row: number, column: number): void {
        if (this.status !== GameStatus.InProgress) {
            return;
        }

        const board = player === 1 ? this.player2Board : this.player1Board;
        board.attack(row, column);

        if (board.isBoardDestroyed()) {
            this.status = GameStatus.Finished;
        } else {
            this.currentPlayer = player === 1 ? 2 : 1;
        }
    }

    getCurrentPlayer(): number {
        return this.currentPlayer;
    }

    getStatus(): GameStatus {
        return this.status;
    }
}
