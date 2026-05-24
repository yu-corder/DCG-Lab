import { useState } from 'react'
import type { Card } from '../../../shared/types';

interface SelectViewProps {
    enemyField: Card[];
    onConfirm: (selectedId: number) => void;
}

function selectView({ enemyField, onConfirm }: SelectViewProps) {
    const [isSelected, setIsSelected] = useState<number | null>(null);

    console.log("aiueokaikukeko");

    const selectClick = (index: number) => {
        if (isSelected === index) {
            setIsSelected(null);
        } else {
            setIsSelected(index);
        }
    }


    return (
        <div className='select-screen'>
            <h2>相手フィールドのカードを選択してください。</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                {enemyField.map((card, index) => {
                    const selected = isSelected === index;
                    return (<div 
                        key={card.id} 
                        onClick={() => selectClick(index)}
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

export default selectView;

