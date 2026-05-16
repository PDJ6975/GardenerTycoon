import { useState } from 'react'
import './App.css'

function App() {
  const [coins, setCoins] = useState(0)

  return (
    <div className="game-layout">
      <div className="column column-left">
        <div className="coins-section">
          <div className="coins-display">🪙 {coins}</div>
          <button
            className="coin-button"
            onClick={() => setCoins((prev) => prev + 1)}
          >
            +1 Moneda
          </button>
        </div>
      </div>
      <div className="column column-center">
      </div>
      <div className="column column-right">
      </div>
    </div>
  )
}

export default App
