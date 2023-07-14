import BattleShip from "../classes/BattleShip";
import React from "react";
import { getCellShipClass } from "../utils/Utils";
import { GameContext } from "../context/GameContext";
import { GameContextInterface } from "../interfaces/interfaces";
import { Dragg } from "react-draggable";

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
                className={`flex w-fit ${this.state.dragging ? "hide" : ""}`}
                draggable
                onDragStart={() => this.setDraggedShip()}
                onDragEnd={() => this.unsetDraggedShip()}
                onDragOver={(e) =>
                    this.pickerController.isPlacing ? e.preventDefault() : null
                }
                onDrop={() => {}}
            >
                {Array.from({
                    length: this.props.ship.size,
                }).map((_, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => this.updateCellIndex(index)}
                        className={`cell-paint
                        ${getCellShipClass(this.props.ship)} 
                        ${
                            this.props.ship.getDirection() === "horizontal"
                                ? "rotate-90"
                                : ""
                        }}`}
                    />
                ))}
            </div>
        );
    }
}
