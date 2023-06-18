export default class BattleShip {
    name: string;
    size: number;
    hits: number;
    color: string;
    id: string;

    constructor(name: string, length: number, color: string, id: string) {
        this.name = name;
        this.size = length;
        this.hits = 0;
        this.color = color;
        this.id = id;
    }

    get destroyed() {
        return this.hits === this.size;
    }
}
