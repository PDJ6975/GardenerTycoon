import { useState, useEffect } from 'react'
import eggImg from './assets/clicker-panel/egg.png'
import coinImg from './assets/clicker-panel/coin.png'
import './App.css'

function App() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('gardening-tycoon-coins')
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem('gardening-tycoon-coins', coins.toString())
  }, [coins])

  return (
    <div className="game-layout">
      <div className="column column-left">
        <div className="coins-section">
          <div className="coins-display">
            <img src={coinImg} alt="Coin" className="coin-icon" />
            <span>{coins}</span>
          </div>
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
      </div>
      <div className="column column-right">
      </div>
    </div>
  )
}

export default App
