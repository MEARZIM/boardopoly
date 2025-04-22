const surpriseCards = [
    { message: "Found treasure! +100$", effect: (p: any) => ({ ...p, balance: p.balance + 100 }) },
    { message: "Pay fine -50$", effect: (p: any) => ({ ...p, balance: p.balance - 50 }) },
];

export function drawSurprise(player: any) {
    const card = surpriseCards[Math.floor(Math.random() * surpriseCards.length)];
    return { updatedPlayer: card.effect(player), message: card.message };
}
