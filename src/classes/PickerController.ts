import ShipPicker from "../components/ShipPicker";
import { Direction, ShipMap } from "../interfaces/interfaces";
import { generateShipSet } from "../utils/Utils";
import BattleShip from "./BattleShip";
import Board from "./Board";

export default class PickerController {
    draggedShip: BattleShip | null = null;
    shipMap = new Map<string, "picker" | "board">();
    picker: ShipPicker | null = null;
    private ships: BattleShip[] = [];

    constructor(public board: Board) {
        this.board.clearShips();
        this.ships = generateShipSet(this.board.player);
        this.ships.forEach((ship) => this.shipMap.set(ship.id, "picker"));
    }

    setPicker(picker: ShipPicker) {
        if (!this.picker) {
            this.picker = picker;
        }
    }

    getShips() {
        const ships = [...this.ships];
        this.ships = [];
        return ships;
    }

    getShipPlace(ship: BattleShip) {
        return this.shipMap.get(ship.id)!;
    }

    draggedToBoard(row: number, col: number, direction: Direction) {
        if (!this.draggedShip || !this.picker) {
            return;
        }

        const ship = this.draggedShip;

        if (!this.board.canPlaceShip(row, col, direction, ship.size)) {
            return;
        }

        if (this.getShipPlace(ship) === "board") {
            this.board.removeShip(ship);
            this.board.placeShip(row, col, direction, ship);
        } else {
            this.picker.removeShipFromSlot(ship);
            this.board.placeShip(row, col, direction, ship);
            this.shipMap.set(ship.id, "board");
        }
    }

    draggedToPicker() {
        if (!this.draggedShip || !this.picker) {
            return;
        }

        const ship = this.draggedShip;

        if (this.getShipPlace(ship) === "board") {
            this.picker.addShipToSlot(ship);
            this.board.removeShip(ship);
            this.shipMap.set(ship.id, "picker");
        }
    }

    setDraggedShip(ship: BattleShip) {
        this.draggedShip = ship;
    }

    unsetDraggedShip() {
        this.draggedShip = null;
    }
}
