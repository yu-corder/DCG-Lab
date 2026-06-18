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
    targetingContext,
    selectTargetFollower,
    setSelectedMyCardIndex,
    handleMulliganConfirm,
    endTurn,
    attackToLeader,
    evolveFollower,
    exEvolveFollower,
    attackToFollower,
    enemyPlayCard,
    playCard,
    cancelTargeting,
  } = useGameState();

  const isTargetMode = targetingContext !== null;

  return (
    <div className="App" style={{
      backgroundColor: '#11141a',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '10px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {isMulligan ? (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#ffcc00' }}>引き直すカードを選択してください</p>
          <MulliganView hand={hand} onConfirm={handleMulliganConfirm} />
        </div>
      ) : (
        <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 20px)', flexDirection: 'column' }}>
          {isTargetMode && (
            <div style={{
              width: '100%',
              background: 'linear-gradient(90deg, rgba(255,0,0,0) 0%, rgba(255,77,77,0.2) 50%, rgba(255,0,0,0) 100%)',
              border: '1px solid #ff4d4d',
              padding: '10px 0',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#ff4d4d',
              letterSpacing: '1px',
              animation: 'pulse 2s infinite',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px'
            }}>
              ⚠️ 効果の対象となる敵フォロワーを選択してください
            </div>
          )}

          <div style={{ display: 'flex', flex: 1, width: '100%', minHeight: 0 }}>
            <div style={{ 
              flex: 1, 
              minWidth: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              paddingRight: '20px' 
            }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  cursor: (selectedMyCardIndex !== null && !isTargetMode) ? 'pointer' : 'default',
                  padding: '10px',
                  background: (selectedMyCardIndex !== null && !isTargetMode) ? 'rgba(255, 0, 0, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: (selectedMyCardIndex !== null && !isTargetMode) ? '2px dashed #ff4d4d' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  opacity: isTargetMode ? 0.4 : 1,
                  pointerEvents: isTargetMode ? 'none' : 'auto'
                }}
                onClick={() => {
                  if (selectedMyCardIndex !== null && !isTargetMode) attackToLeader(selectedMyCardIndex);
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>ENEMY LEADER</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff4d4d', textShadow: '0 0 10px rgba(255,77,77,0.5)' }}>
                    ライフ: {enemyHealth}
                  </div>
                </div>
                <button onClick={enemyPlayCard} style={{ backgroundColor: '#2a2f3a', color: '#ccc', border: '1px solid #444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                  フォロワー展開 (デバッグ)
                </button>
              </div>

              {/* 敵フィールドエリア */}
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '140px',
                background: isTargetMode ? 'rgba(255,0,0,0.05)' : 'rgba(0,0,0,0.2)',
                borderRadius: '16px',
                border: isTargetMode ? '1px solid rgba(255,77,77,0.3)' : '1px solid rgba(255,255,255,0.05)',
                padding: '10px',
                transition: 'all 0.3s',
                cursor: isTargetMode ? 'pointer' : 'default'
              }}
              onClick={() => {
                if (isTargetMode) {
                  cancelTargeting();
                }
              }}
              >
                {enemyField.map((card, index) => (
                  <div 
                    key={`${card.id}-${index}`} 
                    style={{
                      position: 'relative',
                      border: isTargetMode 
                        ? '2px solid #ff4d4d' 
                        : selectedMyCardIndex !== null 
                          ? '2px solid #ff9900' 
                          : '2px solid #555',
                      borderRadius: '10px',
                      width: '90px',
                      height: '120px',
                      backgroundColor: '#1c1f26',
                      boxShadow: isTargetMode 
                        ? '0 0 15px rgba(255,77,77,0.8)' 
                        : '0 4px 10px rgba(0,0,0,0.5)',
                      cursor: (isTargetMode || selectedMyCardIndex !== null) ? 'pointer' : 'default',
                      transform: isTargetMode ? 'scale(1.03)' : 'scale(1)',
                      transition: 'all 0.2s'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (isTargetMode) {
                        selectTargetFollower(index);
                      } else if (selectedMyCardIndex !== null) {
                        attackToFollower(selectedMyCardIndex, index);
                      }
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', padding: '5px', textAlign: 'center', borderBottom: '1px solid #333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.name}</div>
                    
                    <div style={{ position: 'absolute', bottom: '5px', left: '5px', backgroundColor: '#0055ff', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>{card.attack}</div>
                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', backgroundColor: '#ff1a1a', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>{card.defense}</div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '140px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px dashed rgba(255,255,255,0.1)',
                padding: '10px',
                opacity: isTargetMode ? 0.4 : 1,
                pointerEvents: isTargetMode ? 'none' : 'auto'
              }}>
                {field.map((card, index) => {
                  const isSelected = selectedMyCardIndex === index;
                  return (
                    <div 
                      key={`${card.id}-${index}`} 
                      style={{
                        position: 'relative',
                        border: isSelected ? '2px solid #ffcc00' : card.isExEvolved ? '2px solid #b300ff' : card.isEvolved ? '2px solid #00ffcc' : '2px solid #888',
                        borderRadius: '10px',
                        width: '90px',
                        height: '120px',
                        backgroundColor: isSelected ? '#2d2a1e' : '#1c1f26',
                        boxShadow: isSelected ? '0 0 15px #ffcc00' : '0 4px 10px rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '4px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: card.isExEvolved ? '#e0a3ff' : card.isEvolved ? '#a3ffee' : '#fff' }}>{card.name}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 4px', zIndex: 2 }}>
                        <button
                          onClick={() => setSelectedMyCardIndex(isSelected ? null : index)}
                          disabled={card.hasAttacked}
                          style={{ fontSize: '0.6rem', padding: '2px', backgroundColor: card.hasAttacked ? '#333' : '#ffcc00', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          {card.hasAttacked ? '待機中' : isSelected ? '解除' : '攻撃選択'}
                        </button>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          <button
                            disabled={turn < 4 || card.isEvolved}
                            onClick={() => evolveFollower(index)}
                            style={{ flex: 1, fontSize: '0.5rem', padding: '2px 0', backgroundColor: '#00ffcc', color: '#000', border: 'none', borderRadius: '2px', cursor: 'pointer', opacity: (turn < 4 || card.isEvolved) ? 0.4 : 1 }}
                          >
                            進化
                          </button>
                          <button
                            disabled={turn < 6 || card.isEvolved}
                            onClick={() => exEvolveFollower(index)}
                            style={{ flex: 1, fontSize: '0.5rem', padding: '2px 0', backgroundColor: '#b300ff', color: '#fff', border: 'none', borderRadius: '2px', cursor: 'pointer', opacity: (turn < 6 || card.isEvolved) ? 0.4 : 1 }}
                          >
                            超進
                          </button>
                        </div>
                      </div>
                      <div style={{ position: 'absolute', bottom: '5px', left: '5px', backgroundColor: card.isEvolved ? '#00cc88' : '#0055ff', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', zIndex: 1 }}>{card.attack}</div>
                      <div style={{ position: 'absolute', bottom: '5px', right: '5px', backgroundColor: '#ff1a1a', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', zIndex: 1 }}>{card.defense}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '5px',
                opacity: isTargetMode ? 0.4 : 1,
                pointerEvents: isTargetMode ? 'none' : 'auto'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#888', paddingLeft: '10px' }}>HANDS（手札）</div>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  padding: '10px',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '12px',
                  minHeight: '60px'
                }}>
                  {hand.map(card => (
                    <button 
                      key={card.id} 
                      onClick={() => playCard(card)}
                      style={{
                        backgroundColor: pp >= card.cost ? '#2c323f' : '#1a1d24',
                        color: pp >= card.cost ? '#fff' : '#555',
                        border: pp >= card.cost ? '1px solid #55aaff' : '1px solid #333',
                        boxShadow: pp >= card.cost ? '0 0 8px rgba(85,170,255,0.3)' : 'none',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        cursor: pp >= card.cost ? 'pointer' : 'not-allowed',
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ color: '#ffcc00', fontWeight: 'bold', marginRight: '5px' }}>[{card.cost}]</span>
                      {card.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div style={{
              width: '200px',
              flexShrink: 0,
              background: '#1c1f26',
              borderLeft: '1px solid #2d3340',
              borderRadius: '16px',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-4px 0 15px rgba(0,0,0,0.3)',
              opacity: isTargetMode ? 0.4 : 1,
              pointerEvents: isTargetMode ? 'none' : 'auto'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>TURN</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffcc00' }}>{turn}</div>
                </div>
                
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: '4px' }}>PP（プレイポイント）</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#55aaff' }}>{pp} / {maxPP}</div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#333', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${(pp / (maxPP || 1)) * 100}%`, height: '100%', backgroundColor: '#55aaff', transition: 'width 0.3s' }}></div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>自分のHP:</span>
                  <span style={{ fontWeight: 'bold', color: '#ff4d4d', fontSize: '1.2rem' }}>{myHealth}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>残りEP:</span>
                  <span style={{ fontWeight: 'bold', color: '#00ffcc' }}>{myEp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>残りExEP:</span>
                  <span style={{ fontWeight: 'bold', color: '#b300ff' }}>{myExEp}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textAlign: 'center' }}>山札の残り: {deck.length} 枚</div>
                <button 
                  onClick={endTurn} 
                  style={{
                    width: '100%',
                    padding: '15px 0',
                    backgroundColor: '#ff9900',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255,153,0,0.3)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffaa22'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff9900'}
                >
                  ターン終了
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;