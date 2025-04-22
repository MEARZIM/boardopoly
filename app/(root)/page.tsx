'use client';

import { useState } from 'react';
import Dice from '@/components/Dice';
import { Tile, Player } from '@/types/game';
import { rollDice, movePlayer, purchaseProperty } from '@/lib/gameLogic';
import { drawSurprise } from '@/utils/surpriseCard';

const initialBoard: Tile[] = [
  { id: 0, name: 'Start', type: 'start' },
  { id: 1, name: 'Paris', type: 'city', price: 200, rent: 50 },
  { id: 2, name: 'Surprise!', type: 'surprise' },
  { id: 3, name: 'Jail', type: 'jail' },
  { id: 4, name: 'Airport', type: 'airport', price: 150, rent: 40 },
];

export default function GamePage() {
  const [board, setBoard] = useState<Tile[]>(initialBoard);
  const [player, setPlayer] = useState<Player>({
    id: 'p1',
    name: 'You',
    position: 0,
    balance: 1000,
    properties: [],
    inJail: false,
  });

  const [message, setMessage] = useState('');

  const handleRoll = (value: number) => {
    if (player.inJail) {
      setMessage("You're in Jail!");
      return;
    }

    const moved = movePlayer(player, value, board.length);
    const tile = board[moved.position];

    setMessage(`You landed on ${tile.name}`);
    let updatedPlayer = { ...moved };

    switch (tile.type) {
      case 'city':
      case 'airport':
        updatedPlayer = purchaseProperty(moved, tile);
        setBoard(prev => prev.map(t => t.id === tile.id ? { ...t, owner: moved.id } : t));
        break;

      case 'surprise':
        const surprise = drawSurprise(moved);
        updatedPlayer = surprise.updatedPlayer;
        setMessage(surprise.message);
        break;

      case 'jail':
        updatedPlayer.inJail = true;
        break;
    }

    setPlayer(updatedPlayer);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎲 Boardopoly - Local</h1>
      <p>{message}</p>
      <Dice onRoll={handleRoll} />
      <p>Balance: ${player.balance}</p>
      <p>Position: {player.position}</p>
      <p>Properties: {player.properties.join(', ') || 'None'}</p>
    </div>
  );
}
