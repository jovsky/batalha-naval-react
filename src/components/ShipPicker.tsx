import React from "react";
import BattleShip from "../classes/BattleShip";
import Draggable from "react-draggable";
import { getCellShipClass } from "../utils/Utils";

interface ShipPickerProps {
    ships: BattleShip[];
    player: 1 | 2;
}

type ShipSlot = {
    ship: BattleShip | null;
};

export default class ShipPicker extends React.Component<ShipPickerProps> {
    pickerArea: ShipSlot[] = [];

    componentDidMount(): void {
        const { ships } = this.props;

        this.pickerArea = ships.map((ship) => ({
            ship,
            direction: "horizontal",
        }));
    }

    render() {
        return (
            <div className="flex flex-col">
                {this.pickerArea.map((shipSlot, index) => (
                    <div className="w-40 border-b border-black p-4">
                        {shipSlot.ship ? (
                            <Draggable key={index}>
                                <div className="flex bg-black p-[1px] gap-[1px]">
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
                        ) : null}{" "}
                        ?
                    </div>
                ))}
            </div>
        );
    }
}
