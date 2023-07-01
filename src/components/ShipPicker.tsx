import React from "react";
import BattleShip from "../classes/BattleShip";
import { GameContext } from "../context/GameContext";
import { GameContextInterface } from "../interfaces/interfaces";
import DraggableShip from "./DraggableShip";

interface ShipPickerProps {
    player: 1 | 2;
    redraw: () => void;
}

interface ShipPickerState {
    shipsAvailable: Array<BattleShip>;
}

export default class ShipPicker extends React.Component<
    ShipPickerProps,
    ShipPickerState
> {
    static contextType = GameContext;

    constructor(props: ShipPickerProps) {
        super(props);
        this.state = {
            shipsAvailable: [],
        };
    }

    get game() {
        return (this.context as GameContextInterface).game;
    }

    get pickerController() {
        return this.game.getPickerController(this.props.player);
    }

    componentDidMount(): void {
        if (!this.game.isStarting) {
            return;
        }
        const shipsAvailable = this.pickerController.startPicker(this);
        this.setState({ shipsAvailable });
    }

    componentWillUnmount(): void {
        this.pickerController.finishPicker();
    }

    handleDragDrop() {
        this.pickerController?.draggedToPicker();
        this.props.redraw();
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
                className="flex flex-col mr-6 rounded-xl bg-slate-700 px-10 pt-5 gap-2 h-[450px] w-[250px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => this.handleDragDrop()}
            >
                {this.state.shipsAvailable.map((ship) => (
                    <DraggableShip
                        ship={ship}
                        player={this.props.player}
                        key={ship.id}
                    />
                ))}
            </div>
        );
    }
}
