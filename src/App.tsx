import { GameProvider } from "./context/GameContext";
import PlayerDashboardComponent from "./components/PlayerDashboardComponent";
import TopPanelComponent from "./components/TopPanelComponent";

function App() {
    return (
        <GameProvider>
            <div className="flex flex-col w-full h-full items-center mt-40 gap-10">
                <TopPanelComponent />
                <div className="flex w-full  items-center">
                    <PlayerDashboardComponent player={1} />
                    {/* <PlayerDashboardComponent player={2} /> */}
                </div>
            </div>
        </GameProvider>
    );
}

export default App;
