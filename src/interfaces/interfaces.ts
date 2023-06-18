import BattleShip from "../classes/BattleShip";
import GameController from "../classes/GameController";

export enum CellState {
    Empty,
    Ship,
    Hit,
    Miss,
}

export type BoardCell = {
    row: number;
    col: number;
    state: CellState;
    ship: BattleShip | null;
};

export enum GameStatus {
    Starting,
    InProgress,
    Finished,
}

export interface GameContextInterface {
    game: GameController;
    restartGame: () => void;
}

export interface PickerControllerInterface {
    draggedId: string | null;
    shipMap: ShipMap;
    draggedToBoard: () => void;
    draggedToPicker: () => void;
    setDraggedShipId: (id: string) => void;
    unsetDraggedShipId: () => void;
}

export type ShipMap = Map<
    string,
    {
        ship: BattleShip;
        placed: "board" | "picker";
    }
>;

export type Direction = "horizontal" | "vertical";
