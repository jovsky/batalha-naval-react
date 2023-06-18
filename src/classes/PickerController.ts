// import ShipPicker from "../components/ShipPicker";
import { PickerControllerInterface, ShipMap } from "../interfaces/interfaces";
import { generateShipSet } from "../utils/Utils";
import Board from "./Board";

export default class PickerController implements PickerControllerInterface {
    draggedId: string | null = null;
    shipMap: ShipMap = new Map();
    constructor(public board: Board) {
        this.board.clearShips();
        const ships = generateShipSet(this.board.player);
        ships.forEach((ship) =>
            this.shipMap.set(ship.id, {
                ship,
                placed: "picker",
            })
        );
    }

    draggedToBoard() {
        if (!this.draggedId) {
            return;
        }
        const ship = this.shipMap.get(this.draggedId)!.ship;
        this.shipMap.set(this.draggedId, { ship, placed: "board" });
        this.unsetDraggedShipId();
    }

    draggedToPicker() {
        if (!this.draggedId) {
            return;
        }
        const ship = this.shipMap.get(this.draggedId)!.ship;
        this.shipMap.set(this.draggedId, { ship, placed: "picker" });
        this.unsetDraggedShipId();
    }

    setDraggedShipId(id: string) {
        this.draggedId = id;
    }

    unsetDraggedShipId() {
        this.draggedId = null;
    }
}
