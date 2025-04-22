import React from 'react';

export default function Dice({ onRoll }: { onRoll: (num: number) => void }) {
    const roll = () => {
        const value = Math.floor(Math.random() * 6) + 1;
        onRoll(value);
    };

    return <button onClick={roll}>🎲 Roll Dice</button>;
}
