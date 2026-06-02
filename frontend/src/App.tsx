import './App.css';
import MulliganView from './components/MulliganView';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    deck,
    hand,
    field,
    pp,
    enemyHealth,
    myHealth,
    maxPP,
    turn,
    myEp,
    myExEp,
    isMulligan,
    enemyField,
    selectedMyCardIndex,
    setSelectedMyCardIndex,
    handleMulliganConfirm,
    endTurn,
    attackToLeader,
    evolveFollower,
    exEvolveFollower,
    attackToFollower,
    enemyPlayCard,
    playCard,
  } = useGameState();

  return (
    <>
      <div className="App">
        {isMulligan ? (
          <>
            <p>引き直すカードを選択してください</p>
            <MulliganView hand={hand} onConfirm={handleMulliganConfirm} />
          </>
        ) : (
          <>
            <div
              style={{ cursor: selectedMyCardIndex !== null ? 'pointer' : 'default' }}
              onClick={() => {
                if (selectedMyCardIndex !== null) {
                  attackToLeader(selectedMyCardIndex);
                }
              }}
            >
              相手のHP: {enemyHealth}
            </div>
            <button onClick={enemyPlayCard} style={{ backgroundColor: '#444', marginTop: '10px' }}>
              相手の盤面にフォロワー展開
            </button>
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
              <h2>第 {turn} ターン</h2>
              <div>相手のHP: {enemyHealth}</div>
              <div>PP: {pp} / {maxPP}</div>
              <button onClick={endTurn} style={{ backgroundColor: '#444', marginTop: '10px' }}>
                ターン終了
              </button>
            </div>
            
            {/* 敵フィールド */}
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              minHeight: '120px',
              border: '1px dashed #666',
              padding: '20px'
            }}>
              {enemyField.map((card, index) => (
                <div key={`${card.id}-${index}`} style={{
                  border: '2px solid #555',
                  borderRadius: '8px',
                  padding: '10px',
                  width: '80px',
                  backgroundColor: '#222',
                  cursor: selectedMyCardIndex !== null ? 'pointer' : 'default'
                }}
                  onClick={() => {
                    if (selectedMyCardIndex !== null) {
                      attackToFollower(selectedMyCardIndex, index);
                    }
                  }}
                >
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

            {/* 自分フィールド */}
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              minHeight: '120px',
              border: '1px dashed #666',
              padding: '20px',
              marginTop: '10px',
            }}>
              {field.map((card, index) => (
                <div key={`${card.id}-${index}`} style={{
                  border: selectedMyCardIndex === index ? '2px solid gold' : '2px solid #555',
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
                    onClick={() => setSelectedMyCardIndex(index)}
                    disabled={card.hasAttacked}
                    style={{ fontSize: '0.6rem', marginTop: '5px' }}
                  >
                    {card.hasAttacked ? '待機中' : '攻撃'}
                  </button>

                  <button
                    disabled={turn < 4 || card.isEvolved}
                    onClick={() => {
                      if (card.isEvolved !== null) {
                        evolveFollower(index);
                      }
                    }}
                  >
                    進化する
                  </button>

                  <button
                    disabled={turn < 6 || card.isEvolved}
                    onClick={() => {
                      if (card.isEvolved !== null) {
                        exEvolveFollower(index);
                      }
                    }}
                  >
                    超進化する
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
            <div>自分のHP: {myHealth}</div>
            <div>自分の残りEP: {myEp}</div>
            <div>自分の残りExEP: {myExEp}</div>
          </>
        )}
      </div>
    </>
  );
}

export default App;