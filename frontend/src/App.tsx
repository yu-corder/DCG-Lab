import { useEffect, useState } from 'react'
import './App.css'
import type { Card } from '../../shared/types';
import MulliganView  from './components/MulliganView';

function App() {
  const [hand, setHand] = useState<Card[]>([]);
  const [field, setField] = useState<Card[]>([]);
  const [pp, setPP] = useState(1);
  const [health, setHealth] = useState(20);
  const [maxPP, setMaxPP] = useState(1);
  const [turn, setTurn] = useState(1);
  const [deck, setDeck] = useState<Card[]>([]);
  const [isMulligan, setIsMulligan] = useState(true);

  function shuffle<T>(array: T[]) {
    const out = Array.from(array);
    for (let i = out.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = out[i];
      out[i] = out[r];
      out[r] = tmp;
    }
    return out;
  }

  const handleMulliganConfirm = (selectCards: Card[]) => {
    const count = selectCards.length;

    const newDrawnCards = deck.slice(0, count);

    const remainigDeck = deck.slice(count);

    const finalHand = hand
      .filter(h => !selectCards.some(s => s.id === h.id))
      .concat(newDrawnCards);

    const finalDeck = shuffle([...remainigDeck, ...selectCards]);

    setHand(finalHand);
    setDeck(finalDeck);
    setIsMulligan(false);

    startTurn(finalHand, finalDeck);
  }

  const drawCard = (array: Card[], array2: Card[]) => {
    if (array2.length == 0) {
      alert("バトルに敗北しました。");
      return 0;
    }
    const [firstCard, ...rest] = array2;
    if (array.length + 1 >= 10) {
      setHand(array);
    } else {
      setHand([...array, firstCard]);
    }
    setDeck(rest);
  }

  const startTurn = (array: Card[], array2: Card[]) => {
    drawCard(array, array2);
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/cards')
      .then(res => res.json())
      .then((data: Card[]) => {
        const shuffled = shuffle(data);

        const initialHand = shuffled.slice(0,4);
        const remainigDeck = shuffled.slice(4);

        setHand(initialHand);
        setDeck(remainigDeck);
      });
  }, []);

  const endTurn = () => {
    setTurn(prev => prev + 1);

    const nextMaxPP = Math.min(maxPP + 1, 10);
    setMaxPP(nextMaxPP);

    setPP(nextMaxPP);
    setField(prevField => prevField.map(card => ({ ...card, hasAttacked: false})));
    console.log(`Turn ${turn + 1} stared. MaxPP is ${nextMaxPP}`);

    startTurn(hand, deck);
  }

  const attackToLeader = (cardIndex: number) => {
    const targetCard = field[cardIndex];

    if (targetCard.hasAttacked) {
      alert("このフォロワーはもう攻撃できません。");
      return;
    }

    if (health - targetCard.attack === 0) {
      setHealth(prev => prev - (targetCard.attack || 0));
      alert("バトルに勝利しました。");
      return 0;
    }

    setHealth(prev => prev - (targetCard.attack || 0));

    setField(prevField => {
      const newField = [...prevField];
      newField[cardIndex] = { ...targetCard, hasAttacked: true};
      return newField;
    });

    console.log(`${targetCard.name}の攻撃!`);
  }


  const playCard = (targetCard: Card) => {
    
    if (pp < targetCard.cost) {
      alert("ppが足りません。");
      return;
    }

    if (field.length >= 5) return;

    console.log("aiueo");

    setHand(prev => prev.filter(c => c.id !== targetCard.id));
    

    setPP(prev => prev - targetCard.cost);

    console.log(targetCard);

    targetCard.abilities.forEach(ability => {
      if (ability.trigger === 'Fanfare') {
        console.log(`[Fanfare発動]: ${ability.description}`);
      }
      if (ability.abilityType === 'SHISSOU') {
        targetCard.hasAttacked = false;
        console.log(targetCard.hasAttacked);
      }
    });
    setField(prev => [...prev, targetCard]);
  }

  return (
    <>
    <div className="App">
      {isMulligan ? (
        <>
        <p>引き直すカードを選択してください</p>
        <MulliganView hand={hand} onConfirm={handleMulliganConfirm}/>
        </>
      ) : (
        <>
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
              <button
                onClick={() => attackToLeader(index)}
                disabled={card.hasAttacked}
                style={{ fontSize: '0.6rem', marginTop: '5px' }}
              >
                {card.hasAttacked ? '待機中' : '攻撃'}
              </button>
            </div>
            
          ))}
        </div>
        <h3>手札</h3>
        {hand.map(card => (
          <button key={card.id} onClick={() => playCard(card)}>
            {card.name} をプレイ (コスト: {card.cost})
          </button>
        ))}
        <h3>デッキ</h3>
        <p>残り枚数: {deck.length}</p>
        </>
      )}
    </div>
    </>
  )
}

export default App
