import BattleShip from "./BattleShip";
import BoardCell from "./BoardCell";
import GameController from "./GameController";

export default class Board {
    private cellsMap: BoardCell[][] = [];
    private ships: BattleShip[] = [];

    constructor(
        public boardSize: number,
        public player: 1 | 2,
        public game: GameController
    ) {
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (!this.cellsMap[r]) {
                    this.cellsMap[r] = [];
                }
                this.cellsMap[r][c] = new BoardCell(this, r, c);
            }
        }
    }

    getCellsMap() {
        return this.cellsMap;
    }

    placeShip(row: number, col: number, ship: BattleShip): void {
        for (let i = 0; i < ship.size; i++) {
            const cell =
                ship.getDirection() === "vertical"
                    ? this.cellsMap[row + i][col]
                    : this.cellsMap[row][col + i];
            cell.setShip(ship, i);
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
                    !this.isCellEmpty(row, c) ||
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
                    !this.isCellEmpty(r, col) ||
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
        if (cell.wasAttacked) {
            throw new Error("Attack error: cell already played");
        }
        const hit = cell.attack();
        return hit;
    }

    isCellEmpty(row: number, col: number) {
        return this.cellsMap[row][col].isEmpty;
    }

    cellHasShip(row: number, col: number, ship: BattleShip) {
        return this.cellsMap[row][col].hasShip(ship);
    }

    hasAdjacentShip(row: number, col: number) {
        const neighbors = [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
        ];
        for (let i = 0; i < neighbors.length; i++) {
            const [r, c] = neighbors[i];
            if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
                if (!this.isCellEmpty(r, c)) {
                    return true;
                }
            }
        }
        return false;
    }

    isBoardDestroyed(): boolean {
        if (!this.ships.length) {
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
        this.ships = [];
        this.getAllCells().forEach((cell) => {
            cell.removeShip();
        });
    }

    getAllCells() {
        return this.cellsMap.flat();
    }

    removeShip(ship: BattleShip) {
        const index = this.ships.indexOf(ship);
        if (index === -1) {
            return;
        }
        this.ships.splice(index, 1);
        this.getAllCells().forEach((cell) => {
            if (cell.hasShip(ship)) {
                cell.removeShip();
            }
        });
    }
}
