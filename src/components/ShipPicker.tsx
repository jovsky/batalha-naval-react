import React from "react";
import BattleShip from "../classes/BattleShip";
import { getCellShipClass } from "../utils/Utils";
import PickerController from "../classes/PickerController";
interface ShipPickerProps {
    controller: PickerController;
}

function startShipsAvailable(controller: PickerController) {
    const shipsAvailable: Array<BattleShip | null> = [];
    controller.shipMap.forEach(({ ship, placed }) => {
        shipsAvailable.push(placed === "picker" ? ship : null);
    });
    return shipsAvailable;
}

export default class ShipPicker extends React.Component<ShipPickerProps> {
    shipsAvailable: Array<BattleShip | null> = startShipsAvailable(
        this.props.controller
    );

    handleDragStart(shipId: string) {
        this.props.controller.setDraggedShipId(shipId);
    }

    handleDragEnd() {
        this.props.controller.unsetDraggedShipId();
    }

    handleDragDrop() {
        this.props.controller.draggedToPicker();
    }

    render() {
        return (
            <div
                className="flex flex-col border-r border-gray-600 mr-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => this.handleDragDrop()}
            >
                {this.shipsAvailable.map((ship, index) => (
                    <div className="w-60 p-2" key={index}>
                        {ship ? (
                            <div
                                className="flex bg-black p-[1px] gap-[1px] w-fit"
                                key={ship.id}
                                draggable
                                onDragStart={() =>
                                    this.handleDragStart(ship.id)
                                }
                                onDragEnd={() => this.handleDragEnd()}
                            >
                                {Array.from({
                                    length: ship.size,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`cell-paint ${getCellShipClass(
                                            ship
                                        )}`}
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        );
    }
}
