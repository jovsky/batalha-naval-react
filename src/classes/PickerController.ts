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

    draggedToBoard(row: number, col: number) {
        if (!this.dragging || !this.picker) {
            return;
        }

        const ship = this.dragging.ship;

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

    getShipHeadPosition(
        row: number,
        col: number,
        ship: BattleShip,
        cellIndex: number
    ) {}

    setDraggedShip(ship: BattleShip, cellIndex: number) {
        this.dragging = { ship, cellIndex };
    }

    unsetDraggedShip() {
        this.dragging = null;
    }
}
