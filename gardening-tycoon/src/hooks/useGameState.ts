import { useState, useCallback, useEffect } from 'react'
import type { GameState, GridItem } from '../types/store'
import { STORAGE_KEY } from '../types/store'

const defaultState: GameState = {
  coins: 500,
  inventory: [],
  layout: [
    { i: 'plot-1', x: 0, y: 0, w: 2, h: 2 },
    { i: 'plot-2', x: 2, y: 0, w: 2, h: 2 },
    { i: 'plot-3', x: 4, y: 0, w: 2, h: 2 },
  ],
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as GameState
      // Merge with default to ensure all keys exist
      return { ...defaultState, ...parsed, layout: parsed.layout ?? defaultState.layout }
    }
  } catch {
    // ignore parse errors
  }
  return defaultState
}

function saveState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const setLayout = useCallback((newLayout: GridItem[]) => {
    setState((prev) => ({ ...prev, layout: newLayout }))
  }, [])

  const setCoins = useCallback((updater: (prev: number) => number) => {
    setState((prev) => ({ ...prev, coins: updater(prev.coins) }))
  }, [])

  return {
    coins: state.coins,
    layout: state.layout,
    setLayout,
    setCoins,
  }
}
