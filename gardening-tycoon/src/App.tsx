import { useGameState } from './hooks/useGameState'
import { TerrainCanvas } from './components/TerrainCanvas'
import eggImg from './assets/clicker-panel/egg.png'
import './App.css'

function App() {
  const { coins, layout, setLayout, setCoins } = useGameState()

  return (
    <div className="game-layout">
      <div className="column column-left">
        <div className="coins-section">
          <div className="coins-display">🪙 {coins}</div>
          <div className="coin-button-wrapper">
            <button
              className="coin-button"
              onClick={() => setCoins((prev) => prev + 1)}
            >
              <img src={eggImg} alt="Click egg" />
            </button>
          </div>
        </div>
      </div>
      <div className="column column-center">
        <TerrainCanvas layout={layout} onLayoutChange={setLayout} />
      </div>
      <div className="column column-right">
      </div>
    </div>
  )
}

export default App
