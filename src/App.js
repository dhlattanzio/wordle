import Navbar from "./components/Navbar";
import Board from './components/Board';
import Keyboard from "./components/Keyboard";

function App() {
    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen">
            <div className="border-b mb-2">
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-center">
                    <Board />
                </div>
                <div>
                    <Keyboard />
                </div>
            </div>
        </div>
    );
}

export default App;
