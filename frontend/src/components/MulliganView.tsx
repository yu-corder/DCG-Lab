import { useState } from 'react'
import type { Card } from '../../../shared/types';

interface MulliganViewProps {
    hand: Card[];
    onConfirm: (selectedIds: Card[]) => void;
}

function MulliganView({ hand, onConfirm }: MulliganViewProps) {
    const [isSelected, setIsSelected] = useState<Card[]>([]);

    const selectClick = (arg: Card) => {
        const isAlreadySelected = isSelected.some(c => c.id === arg.id);

        if (isAlreadySelected) {
            setIsSelected(isSelected.filter(c => c.id !== arg.id));
        } else {
            setIsSelected([...isSelected, arg]);
        }
    }


    return (
        <div className='mulligan-screen'>
            <h2>マリガン: 交換するカードを選んでください。</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                {hand.map(card => {
                    const selected = isSelected.some(c => c.id === card.id);
                    return (<div 
                        key={card.id} 
                        onClick={() => selectClick(card)}
                        style={{
                            border: selected ? '2px solid red' : '1px solid gray',
                            opacity: selected ? 0.6 : 1,
                            cursor: 'pointer',
                            padding: '10px'
                        }}
                    >
                        <p>{card.name}</p>
                    </div>);
                })}
            </div>
            <button onClick={() => onConfirm(isSelected)}>
                決定
            </button>
        </div>
    );
}

export default MulliganView;

