import { BoardCell, CellState, Direction } from "../interfaces/interfaces";
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

    placeShip(
        row: number,
        col: number,
        direction: Direction,
        ship: BattleShip
    ): void {
        if (direction === "vertical") {
            ship.cells = [];
            for (let r = row; r < row + ship.size; r++) {
                const cell = this.cellsMap[r][col];
                if (cell.state !== CellState.Empty) {
                    throw new Error("Placement error: cell is not empty");
                }
                cell.state = CellState.Ship;
                cell.ship = ship;
                ship.cells.push({ r, c: col });
            }
        } else {
            for (let c = col; c < col + ship.size; c++) {
                const cell = this.cellsMap[row][c];
                if (cell.state !== CellState.Empty) {
                    throw new Error("Placement error: cell is not empty");
                }
                cell.state = CellState.Ship;
                cell.ship = ship;
                ship.cells.push({ r: row, c });
            }
        }
        if (!this.ships) {
            this.ships = [];
        }
        this.ships.push(ship);
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

            cell.ship.hits++;
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
            if (ship) ship.cells = [];
        });
    }

    getAllCells() {
        return this.cellsMap.flat();
    }

    getShips() {
        return this.ships;
    }

    handleDrop(rowIndex: number, colIndex: number) {
        console.log(rowIndex, colIndex);
        // event.preventDefault();
        // const shipId = event.dataTransfer.getData('text/plain');
        // const ship = ships.find((ship) => ship.id === shipId);
        // if (ship) {
        //   const canPlace = canPlaceShip(ship, rowIndex, colIndex);
        //   if (canPlace) {
        //     const newBoard = [...board];
        //     for (let i = 0; i < ship.length; i++) {
        //       if (ship.isHorizontal) {
        //         newBoard[rowIndex][colIndex + i] = ship;
        //       } else {
        //         newBoard[rowIndex + i][colIndex] = ship;
        //       }
        //     }
        //     setBoard(newBoard);
        //     // onBoardDrop(ship.id, rowIndex, colIndex);
        //   }
        // }
    }

    onBoardDragOver() {}
}
