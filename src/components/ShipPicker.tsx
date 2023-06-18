import React from "react";
import BattleShip from "../classes/BattleShip";
import Draggable from "react-draggable";
import { getCellShipClass } from "../utils/Utils";

interface ShipPickerProps {
    player: 1 | 2;
}

type ShipSlot = {
    ship: BattleShip | null;
};

export default class ShipPicker extends React.Component<ShipPickerProps> {
    pickerArea: ShipSlot[] = [];

    setShips(ships: BattleShip[]) {
        this.pickerArea = ships.map((ship) => ({
            ship,
            direction: "horizontal",
        }));
    }

    render() {
        return (
            <div className="flex flex-col">
                {this.pickerArea.map((shipSlot, index) => (
                    <div className="w-60 p-2 border-r border-gray-600 mr-6">
                        {shipSlot.ship ? (
                            <Draggable key={index}>
                                <div className="flex bg-black p-[1px] gap-[1px] w-fit">
                                    {Array.from({
                                        length: shipSlot.ship.size,
                                    }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`cell-paint ${getCellShipClass(
                                                shipSlot.ship
                                            )}`}
                                        />
                                    ))}
                                </div>
                            </Draggable>
                        ) : null}
                    </div>
                ))}
            </div>
        );
    }
}
