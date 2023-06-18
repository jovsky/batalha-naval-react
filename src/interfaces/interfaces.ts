import BattleShip from "../classes/BattleShip";

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

export type Direction = "horizontal" | "vertical";
