import BattleShip from "../classes/BattleShip";
import { BoardCell } from "../interfaces/interfaces";
import gameSettings from "../gameSettings.json";

export function getCellShipClass(ship: BoardCell["ship"]) {
    return ship ? `ship-cell ${ship.color}-ship` : "";
}

export function generateShipSet(player: 1 | 2) {
    const ships: BattleShip[] = [];
    gameSettings.ships.forEach((shipInfo) => {
        for (let index = 0; index < shipInfo.count; index++) {
            const newShip = new BattleShip(
                shipInfo.name,
                shipInfo.length,
                shipInfo.color,
                `${shipInfo.name}_${index}_P${player}`
            );

            ships.push(newShip);
        }
    });
    return ships;
}
