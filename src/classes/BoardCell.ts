import BattleShip from "./BattleShip";
import Board from "./Board";

class BoardCell {
    private ship: BattleShip | null = null;
    private shipPartIndex = -1;
    private attacked = false;
    private onShipHeadUpdate: (b: boolean) => void = () => {};

    constructor(
        public readonly board: Board,
        public readonly row: number,
        public readonly col: number
    ) {}

    get game() {
        return this.board.game;
    }

    get isEmpty() {
        return !this.ship;
    }

    get wasAttacked() {
        return this.attacked;
    }

    get hasAttackHit() {
        return this.attacked && !!this.ship;
    }

    get hasAttackMissed() {
        return this.attacked && !this.ship;
    }

    get isShipHead() {
        return this.shipPartIndex === 0;
    }

    getShip() {
        return this.ship;
    }

    setShip(ship: BattleShip, index: number) {
        if (!this.game.isStarting) {
            throw new Error(
                "Placement error: can only place before game start."
            );
        }
        if (this.ship) {
            throw new Error("Placement error: cell is not empty");
        }
        this.ship = ship;
        this.attacked = false;
        this.shipPartIndex = index;
        this.onShipHeadUpdate(this.isShipHead);
    }

    hasShip(ship: BattleShip) {
        return !!this.ship && this.ship.id === ship.id;
    }

    removeShip() {
        if (!this.ship) {
            return;
        }
        this.ship = null;
        this.attacked = false;
        this.shipPartIndex = -1;
        this.onShipHeadUpdate(false);
    }

    attack() {
        this.attacked = true;
        if (this.ship) {
            this.ship.attacked();
            return true;
        }
        return false;
    }

    setShipHeadUpdater(fn: typeof this.onShipHeadUpdate) {
        this.onShipHeadUpdate = fn;
    }
}

export default BoardCell;
