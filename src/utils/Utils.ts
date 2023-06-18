import { BoardCell } from "../interfaces/interfaces";

export function getCellShipClass(ship: BoardCell["ship"]) {
    return ship ? `ship-cell ${ship.color}-ship` : "";
}
