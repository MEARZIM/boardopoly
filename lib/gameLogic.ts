import { Player, Tile } from '@/types/game';

export function rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
}

export function movePlayer(player: Player, steps: number, totalTiles: number): Player {
    let newPos = (player.position + steps) % totalTiles;
    return { ...player, position: newPos };
}

export function purchaseProperty(player: Player, tile: Tile): Player {
    if (tile.owner || tile.price === undefined || player.balance < tile.price) return player;
    return {
        ...player,
        balance: player.balance - tile.price,
        properties: [...player.properties, tile.id],
    };
}

export function payRent(player: Player, tile: Tile, owner: Player): [Player, Player] {
    if (!tile.owner || tile.owner === player.id || tile.rent === undefined) return [player, owner];
    return [
        { ...player, balance: player.balance - tile.rent },
        { ...owner, balance: owner.balance + tile.rent },
    ];
}
