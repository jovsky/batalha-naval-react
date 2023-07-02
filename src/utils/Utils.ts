import BattleShip from "../classes/BattleShip";
import { useState } from "react";
import gameSettings from "../gameSettings.json";
import BoardCell from "../classes/BoardCell";

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

export function useRedraw() {
    const [val, setVal] = useState(false);
    return () => setVal(!val);
}
