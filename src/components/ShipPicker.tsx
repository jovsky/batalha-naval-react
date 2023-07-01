import React from "react";
import BattleShip from "../classes/BattleShip";
import { getCellShipClass } from "../utils/Utils";
import PickerController from "../classes/PickerController";

interface ShipPickerProps {
    controller: PickerController;
}

interface ShipPickerState {
    shipsAvailable: Array<BattleShip>;
}

export default class ShipPicker extends React.Component<
    ShipPickerProps,
    ShipPickerState
> {
    constructor(props: ShipPickerProps) {
        super(props);
        this.state = {
            shipsAvailable: [],
        };
    }

    componentDidMount(): void {
        this.setState({ shipsAvailable: this.props.controller.getShips() });
        this.props.controller.setPicker(this);
    }

    handleDragStart(ship: BattleShip) {
        this.props.controller.setDraggedShip(ship);
    }

    handleDragEnd() {
        this.props.controller.unsetDraggedShip();
    }

    handleDragDrop() {
        this.props.controller?.draggedToPicker();
    }

    addShipToSlot(newShip: BattleShip) {
        const hasShip = this.state.shipsAvailable.some(
            (ship) => ship.id === newShip.id
        );
        if (!hasShip) {
            this.state.shipsAvailable.push(newShip);
            this.setState({ shipsAvailable: this.state.shipsAvailable });
        }
    }

    removeShipFromSlot(shipToRemove: BattleShip) {
        const index = this.state.shipsAvailable.findIndex(
            (ship) => ship.id === shipToRemove.id
        );
        if (index !== -1) {
            this.state.shipsAvailable.splice(index, 1);
            this.setState({ shipsAvailable: this.state.shipsAvailable });
        }
    }

    render() {
        return (
            <div
                className="flex flex-col border-r border-gray-600 mr-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => this.handleDragDrop()}
            >
                {this.state.shipsAvailable.map((ship, index) => (
                    <div className="w-60 p-2" key={index}>
                        <div
                            className="flex bg-black p-[1px] gap-[1px] w-fit"
                            key={ship.id}
                            draggable
                            onDragStart={() => this.handleDragStart(ship)}
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
                    </div>
                ))}
            </div>
        );
    }
}
