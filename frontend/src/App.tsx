import { useEffect, useState } from 'react'
import './App.css'
import type { Card } from '../../shared/types';

function App() {
  const [hand, setHand] = useState<Card[]>([]);
  const [field, setField] = useState<Card[]>([]);
  const [pp, setPP] = useState(1);
  const [health, setHealth] = useState(20);
  const [maxPP, setMaxPP] = useState(1);
  const [turn, setTurn] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3000/api/cards')
      .then(res => res.json())
      .then((data: Card[]) => {
        setHand(data);
      });
  }, []);

  const endTurn = () => {
    setTurn(prev => prev + 1);

    const nextMaxPP = Math.min(maxPP + 1, 10);
    setMaxPP(nextMaxPP);

    setPP(nextMaxPP);
    console.log(`Turn ${turn + 1} stared. MaxPP is ${nextMaxPP}`);
  }


  const playCard = (targetCard: Card) => {
    
    if (pp < targetCard.cost) {
      alert("ppが足りません。");
      return;
    }

    console.log("aiueo");

    setHand(prev => prev.filter(c => c.id !== targetCard.id));
    setField(prev => [...prev, targetCard]);

    setPP(prev => prev - targetCard.cost);

    console.log(targetCard);

    targetCard.abilities.forEach(ability => {
      if (ability.trigger === 'Fanfare') {
        console.log(`[Fanfare発動]: ${ability.description}`);
        if (ability.effectType === 'Damage') {
          setHealth(prev => prev - (targetCard.attack || 0));
        }
      }
    });
  }

  return (
    <>
    <p>Hello Word!</p>
    <div>相手のHP: {health}</div>
    <div style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
      <h2>第 {turn} ターン</h2>
      <div>相手のHP: {health}</div>
      <div>PP: {pp} / {maxPP}</div>
      <button onClick={endTurn} style={{ backgroundColor: '#444', marginTop: '10px' }}>
        ターン終了
      </button>
    </div>
    <h3>盤面</h3>
    <div style={{ 
      display: 'flex', 
      gap: '10px', 
      justifyContent: 'center', 
      minHeight: '120px', 
      border: '1px dashed #666',
      padding: '20px' 
    }}>
      {field.map((card, index) => (
        <div key={`${card.id}-${index}`} style={{
          border: '2px solid #555',
          borderRadius: '8px',
          padding: '10px',
          width: '80px',
          backgroundColor: '#222'
        }}>
          <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>{card.name}</div>
          <div style={{ fontWeight: 'bold' }}>
            {card.attack} / {card.defense}
          </div>
        </div>
      ))}
    </div>
    <h3>手札</h3>
    {hand.map(card => (
      <button key={card.id} onClick={() => playCard(card)}>
        {card.name} をプレイ (コスト: {card.cost})
      </button>
    ))}
    </>
  )
}

export default App
