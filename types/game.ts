export type TileType = 'city' | 'airport' | 'tax' | 'jail' | 'surprise' | 'treasure' | 'start';

export interface Tile {
  id: number;
  name: string;
  type: TileType;
  price?: number;
  rent?: number;
  owner?: string;
}

export interface Player {
  id: string;
  name: string;
  position: number;
  balance: number;
  properties: number[];
  inJail: boolean;
}
