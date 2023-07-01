import BattleShip from "../classes/BattleShip";
import React from "react";
import { getCellShipClass } from "../utils/Utils";
import { GameContext } from "../context/GameContext";
import { GameContextInterface } from "../interfaces/interfaces";

interface DraggableShipProps {
    ship: BattleShip;
    player: 1 | 2;
}

interface DraggableShipState {
    cellIndex: number;
    dragging: boolean;
}

export default class DraggableShip extends React.Component<
    DraggableShipProps,
    DraggableShipState
> {
    static contextType = GameContext;
    state = { cellIndex: 0, dragging: false };

    get pickerController() {
        const game = (this.context as GameContextInterface).game;
        return game.getPickerController(this.props.player);
    }

    updateCellIndex(cellIndex: number) {
        if (this.state.dragging) {
            return;
        }
        this.setState({ cellIndex });
    }

    setDraggedShip() {
        this.setState({ dragging: true });
        this.pickerController.setDraggedShip(
            this.props.ship,
            this.state.cellIndex
        );
    }

    unsetDraggedShip() {
        this.setState({ dragging: false });
        this.pickerController.unsetDraggedShip();
    }

    render() {
        return (
            <div
                className="flex bg-black p-[1px] gap-[1px] w-fit"
                draggable
                onDragStart={() => this.setDraggedShip()}
                onDragEnd={() => this.unsetDraggedShip()}
            >
                {Array.from({
                    length: this.props.ship.size,
                }).map((_, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => this.updateCellIndex(index)}
                        className={`cell-paint ${getCellShipClass(
                            this.props.ship
                        )}`}
                    />
                ))}
            </div>
        );
    }
}
