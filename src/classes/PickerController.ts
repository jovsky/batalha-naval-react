import ShipPicker from "../components/ShipPicker";
import { generateShipSet } from "../utils/Utils";
import BattleShip from "./BattleShip";
import Board from "./Board";
import GameController from "./GameController";

export default class PickerController {
    private dragging: { ship: BattleShip; cellIndex: number } | null = null;
    private picker: ShipPicker | null = null;
    private ships: BattleShip[] = [];

    constructor(public game: GameController, public board: Board) {}

    get isPlacing() {
        return !!this.picker;
    }

    startPicker(picker: ShipPicker) {
        if (this.picker || !this.game.isStarting) {
            return [];
        }
        this.picker = picker;
        this.board.clearShips();
        this.ships = generateShipSet(this.board.player);
        this.ships.forEach((ship) => ship.setPlacePicker());
        return [...this.ships];
    }

    finishPicker() {
        if (!this.game.isStarting) {
            return;
        }
        this.picker = null;
        this.ships = [];
    }

    draggedToPicker() {
        if (!this.dragging || !this.picker) {
            return;
        }

        const ship = this.dragging.ship;

        if (ship.getPlace() === "board") {
            this.picker.addShipToSlot(ship);
            this.board.removeShip(ship);
            ship.setPlacePicker();
        }
    }

    draggedToBoard(row: number, col: number) {
        if (!this.dragging || !this.picker) {
            return;
        }

        const ship = this.dragging.ship;

        const { valid, ...shipHead } = this.getShipHeadPosition(row, col);
        if (!valid) {
            return;
        }
        row = shipHead.row;
        col = shipHead.col;

        if (!this.board.canPlaceShip(row, col, ship)) {
            return;
        }

        if (ship.getPlace() === "board") {
            this.board.removeShip(ship);
            this.board.placeShip(row, col, ship);
        } else {
            this.picker.removeShipFromSlot(ship);
            this.board.placeShip(row, col, ship);
            ship.setPlaceBoard();
        }
    }

    getShipHeadPosition(row: number, col: number) {
        const cellIndex = this.dragging!.cellIndex;
        if (cellIndex === 0) {
            return { valid: true, row, col };
        }
        if (this.dragging!.ship.getDirection() === "horizontal") {
            const newCol = col - cellIndex;
            return { valid: newCol >= 0, row, col: newCol };
        }
        const newRow = row - cellIndex;
        return { valid: newRow >= 0, row: newRow, col };
    }

    setDraggedShip(ship: BattleShip, cellIndex: number) {
        this.dragging = { ship, cellIndex };
    }

    unsetDraggedShip() {
        this.dragging = null;
    }
}
