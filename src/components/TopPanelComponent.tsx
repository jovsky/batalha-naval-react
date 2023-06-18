import { useContext } from "react";
import { GameContext } from "../context/GameContext";

function TopPanelComponent() {
    return (
        <div className="flex w-full items-center justify-center gap-10">
            <button
                className="custom-btn"
                onClick={useContext(GameContext).restartGame}
            >
                REINICIAR
            </button>
        </div>
    );
}

export default TopPanelComponent;
