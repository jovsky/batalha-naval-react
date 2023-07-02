import { Direction } from "../interfaces/interfaces";

export default class BattleShip {
    readonly name: string;
    readonly size: number;
    readonly color: string;
    readonly id: string;
    private hits: number = 0;
    private direction: Direction = "horizontal";
    private placedAt: "board" | "picker" = "board";

    constructor(name: string, length: number, color: string, id: string) {
        this.name = name;
        this.size = length;
        this.color = color;
        this.id = id;
    }

    getHits() {
        return this.hits;
    }
    getDirection() {
        return this.direction;
    }
    getPlace() {
        return this.placedAt;
    }

    setPlacePicker() {
        this.placedAt = "picker";
    }

    setPlaceBoard() {
        this.placedAt = "board";
    }

    attacked() {
        this.hits++;
    }

    setDirection(direction: Direction) {
        this.direction = direction;
    }

    get destroyed() {
        return this.hits === this.size;
    }
}
