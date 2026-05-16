export interface GridItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  static?: boolean
}

export interface OwnedItem {
  instanceId: string
  itemId: string
  purchasedAt: number
}

export interface GameState {
  coins: number
  inventory: OwnedItem[]
  layout: GridItem[]
}

export const STORAGE_KEY = 'gardening-tycoon-state'
