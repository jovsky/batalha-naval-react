import { Direction, GameStatus } from "../interfaces/interfaces";
import Board from "./Board";
import BattleShip from "./BattleShip";

export default class GameController {
    public player1Board: Board;
    public player2Board: Board;
    public currentPlayer: number;
    public status: GameStatus;
    private dragPromiseResolve:
        | null
        | ((destiny: "board" | "picker" | "cancel") => void) = null;

    constructor(
        boardSize: number,
        player1Ships: BattleShip[] | null,
        player2Ships: BattleShip[] | null
    ) {
        this.player1Board = new Board(boardSize, player1Ships, 1, this);
        this.player2Board = new Board(boardSize, player2Ships, 2, this);
        this.currentPlayer = 1;
        this.status = GameStatus.Starting;
    }

    placeShipsRandomly(board: Board, ships: BattleShip[]) {
        board.clearShips();

        ships.forEach((ship) => {
            let placed = false;

            while (!placed) {
                const row = Math.floor(Math.random() * board.boardSize);
                const col = Math.floor(Math.random() * board.boardSize);

                const direction: Direction =
                    Math.random() < 0.5 ? "horizontal" : "vertical";

                if (board.canPlaceShip(row, col, direction, ship.size, true)) {
                    board.placeShip(row, col, direction, ship);
                    placed = true;
                }
            }
        });
    }

    canPlaceShip(
        board: Board,
        row: number,
        col: number,
        direction: string,
        shipLength: number
    ): boolean {
        if (direction === "horizontal") {
            if (col + shipLength > board.boardSize) {
                return false;
            }
            for (let c = col; c < col + shipLength; c++) {
                if (
                    board.cellHasShip(row, c) ||
                    board.hasAdjascentShip(row, c)
                ) {
                    return false;
                }
            }
        } else {
            if (row + shipLength > board.boardSize) {
                return false;
            }
            for (let r = row; r < row + shipLength; r++) {
                if (
                    board.cellHasShip(r, col) ||
                    board.hasAdjascentShip(r, col)
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    attack(player: number, row: number, column: number): void {
        if (this.status !== GameStatus.InProgress) {
            return; // Game already won or lost
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

    handleShipDrag() {
        if (this.dragPromiseResolve) {
            this.dragPromiseResolve("cancel");
        }
        const dragPromise = new Promise((resolve) => {
            this.dragPromiseResolve = resolve;
        });

        return dragPromise;
    }

    endDragging(destiny: "board" | "picker" | "cancel") {
        if (destiny !== "cancel") {
            this.dragPromiseResolve?.(destiny);
        }
        this.dragPromiseResolve = null;
    }
}
