import { BoardCell, CellState } from "../interfaces/interfaces";
import BattleShip from "./BattleShip";
import GameController from "./GameController";

export default class Board {
    public cellsMap: BoardCell[][];

    constructor(
        public boardSize: number,
        private ships: BattleShip[] | null,
        public player: 1 | 2,
        public game: GameController
    ) {
        this.cellsMap = Array.from({ length: boardSize }, (_, row) =>
            Array.from({ length: boardSize }, (_, col) => ({
                row,
                col,
                state: CellState.Empty,
                ship: null,
            }))
        );
    }

    placeShip(row: number, col: number, ship: BattleShip): void {
        const cells = [];
        if (ship.getDirection() === "vertical") {
            for (let r = row; r < row + ship.size; r++) {
                const cell = this.cellsMap[r][col];
                if (cell.state !== CellState.Empty) {
                    throw new Error("Placement error: cell is not empty");
                }
                cell.state = CellState.Ship;
                cell.ship = ship;
                cells.push({ r, c: col });
            }
        } else {
            for (let c = col; c < col + ship.size; c++) {
                const cell = this.cellsMap[row][c];
                if (cell.state !== CellState.Empty) {
                    throw new Error("Placement error: cell is not empty");
                }
                cell.state = CellState.Ship;
                cell.ship = ship;
                cells.push({ r: row, c });
            }
        }
        ship.setCells(cells);
        if (!this.ships) {
            this.ships = [];
        }
        this.ships.push(ship);
    }

    canPlaceShip(
        row: number,
        col: number,
        ship: BattleShip,
        blockAdjacent = false
    ): boolean {
        const shipSize = ship.size;
        if (ship.getDirection() === "horizontal") {
            if (col + shipSize > this.boardSize) {
                return false;
            }
            for (let c = col; c < col + shipSize; c++) {
                if (
                    this.cellHasShip(row, c) ||
                    (blockAdjacent && this.hasAdjacentShip(row, c))
                ) {
                    return false;
                }
            }
        } else {
            if (row + shipSize > this.boardSize) {
                return false;
            }
            for (let r = row; r < row + shipSize; r++) {
                if (
                    this.cellHasShip(r, col) ||
                    (blockAdjacent && this.hasAdjacentShip(r, col))
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    attack(row: number, col: number): boolean {
        const cell = this.cellsMap[row][col];
        if (cell.state === CellState.Hit || cell.state === CellState.Miss) {
            throw new Error("Attack error: cell already played");
        }
        if (cell.state === CellState.Ship) {
            cell.state = CellState.Hit;
            if (!cell.ship) {
                throw new Error(
                    "Attack error: cell state is 'Ship' but actually there is no ship"
                );
            }

            cell.ship.attacked();
            return true;
        }
        cell.state = CellState.Miss;
        return false;
    }

    getCellState(row: number, col: number): CellState {
        return this.cellsMap[row][col].state;
    }

    isCellEmpty(row: number, col: number) {
        return this.getCellState(row, col) === CellState.Empty;
    }

    cellHasShip(row: number, col: number) {
        return !!this.cellsMap[row][col].ship;
    }

    hasAdjacentShip(row: number, col: number) {
        const neighbors = [
            [row - 1, col - 1],
            [row - 1, col + 1],
            [row + 1, col - 1],
            [row + 1, col + 1],
        ];
        for (let i = 0; i < neighbors.length; i++) {
            const [r, c] = neighbors[i];
            if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
                if (this.cellHasShip(r, c)) {
                    return true;
                }
            }
        }
        return false;
    }

    isBoardDestroyed(): boolean {
        if (!this.ships) {
            return false;
        }
        for (const ship of this.ships) {
            if (!ship.destroyed) {
                return false;
            }
        }
        return true;
    }

    clearShips() {
        if (!this.ships) {
            return;
        }
        this.ships = null;

        this.getAllCells().forEach((cell) => {
            const ship = cell.ship;
            cell.ship = null;
            cell.state = CellState.Empty;
            if (ship) ship.clearCells();
        });
    }

    getAllCells() {
        return this.cellsMap.flat();
    }

    removeShip(ship: BattleShip) {
        if (!this.ships) {
            return;
        }
        const index = this.ships.indexOf(ship);
        if (index === -1) {
            return;
        }
        this.ships.splice(index, 1);
        ship.getCells().forEach(({ r, c }) => {
            const cell = this.cellsMap[r][c];
            if (cell.ship && cell.ship.id === ship.id) {
                cell.ship = null;
                cell.state = CellState.Empty;
            }
        });
    }
}
