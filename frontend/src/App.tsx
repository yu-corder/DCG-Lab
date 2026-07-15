import './App.css';
import MulliganView from './components/MulliganView';
import FieldView from './components/FieldView';
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
    selectedMyCardId,
    targetingContext,
    selectTargetFollower,
    setSelectedMyCardId,
    handleMulliganConfirm,
    endTurn,
    attackToLeader,
    evolveFollower,
    exEvolveFollower,
    attackToFollower,
    enemyPlayCard,
    playCard,
    cancelTargeting,
    damageMyLeader,
    playAct,
  } = useGameState();

  const isTargetMode = targetingContext !== null;
  const isCardSelected = selectedMyCardId !== null;
  const isMyTargetMode = isTargetMode && targetingContext.targetTeam === 'my';
  const isEnemyTargetMode = isTargetMode && targetingContext.targetTeam === 'enemy';

  const handleDragStart = (e: React.DragEvent, evolveType: 'normal' | 'ex') => {
    e.dataTransfer.setData('evolveType', evolveType);
  };

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
              ⚠️ 効果の対象となる{targetingContext.targetTeam === 'my' ? '味方' : '敵'}カードを選択してください
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
              {/* 敵リーダーエリア */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  cursor: (isCardSelected && !isTargetMode) ? 'pointer' : 'default',
                  padding: '10px',
                  background: (isCardSelected && !isTargetMode) ? 'rgba(255, 0, 0, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: (isCardSelected && !isTargetMode) ? '2px dashed #ff4d4d' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  opacity: isTargetMode ? 0.4 : 1,
                  pointerEvents: isTargetMode ? 'none' : 'auto'
                }}
                onClick={() => {
                  if (isCardSelected && !isTargetMode) attackToLeader(selectedMyCardId!);
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
              <div onClick={() => isTargetMode && cancelTargeting()}>
                <FieldView 
                  cards={enemyField}
                  isTargetMode={isTargetMode}
                  isMyTargetMode={isMyTargetMode}
                  isEnemyTargetMode={isEnemyTargetMode}
                  isCardSelected={isCardSelected}
                  selectedMyCardId={selectedMyCardId}
                  isEnemy={true}
                  onCardClick={(card, index) => {
                    if (isEnemyTargetMode) {
                      selectTargetFollower(index);
                    } else if (isCardSelected && !isTargetMode && card.type === 'Follower') {
                      attackToFollower(selectedMyCardId!, card.instanceId!);
                    }
                  }}
                  pp={pp} 
                  onPlayAct={(card, index) => playAct(card)}
                />
              </div>

              {/* 自分フィールドエリア */}
              <div onClick={() => isTargetMode && cancelTargeting()}>
                <FieldView 
                  cards={field}
                  isTargetMode={isTargetMode}
                  isMyTargetMode={isMyTargetMode}
                  isEnemyTargetMode={isEnemyTargetMode}
                  isCardSelected={isCardSelected}
                  selectedMyCardId={selectedMyCardId}
                  onDropEvolve={(cardId, evolveType) => {
                    if (evolveType === 'normal') evolveFollower(cardId);
                    if (evolveType === 'ex') exEvolveFollower(cardId);
                  }}
                  onCardClick={(card, index) => {
                    if (isMyTargetMode) {
                      selectTargetFollower(index);
                      return;
                    }
                    const canSelectAsAttacker = card.type === 'Follower' && !card.hasAttacked;
                    if (!canSelectAsAttacker) return;
                    setSelectedMyCardId(selectedMyCardId === card.instanceId ? null : card.instanceId!);
                  }}
                  pp={pp} 
                  onPlayAct={(card, index) => playAct(card)}
                />
              </div>

              {/* 手札エリア */}
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
                      key={card.instanceId}
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

            {/* コントロール・ステータスパネル（右サイドバー） */}
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
                  <button
                      onClick={() => damageMyLeader(1)}
                      style={{
                        backgroundColor: '#3a1a1a',
                        color: '#ff4d4d',
                        border: '1px solid #662222',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.65rem',
                        fontWeight: 'bold'
                      }}
                  >
                    自傷
                  </button>
                </div>
                
                {/* 残りEP（通常進化用ドラッグソース） */}
                <div 
                  draggable={myEp > 0 && turn >= 4}
                  onDragStart={(e) => handleDragStart(e, 'normal')}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: (myEp > 0 && turn >= 4) ? '1px dashed #00ffcc' : '1px solid transparent',
                    cursor: (myEp > 0 && turn >= 4) ? 'grab' : 'not-allowed',
                    backgroundColor: (myEp > 0 && turn >= 4) ? 'rgba(0, 255, 204, 0.05)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                  title={(myEp > 0 && turn >= 4) ? "フォロワーにドラッグして進化" : ""}
                >
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                    {(myEp > 0 && turn >= 4) ? '⣿ 残りEP:' : '残りEP:'}
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#00ffcc' }}>{myEp}</span>
                </div>

                {/* 残りExEP（超進化用ドラッグソース） */}
                <div 
                  draggable={myExEp > 0 && turn >= 6}
                  onDragStart={(e) => handleDragStart(e, 'ex')}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: (myExEp > 0 && turn >= 6) ? '1px dashed #b300ff' : '1px solid transparent',
                    cursor: (myExEp > 0 && turn >= 6) ? 'grab' : 'not-allowed',
                    backgroundColor: (myExEp > 0 && turn >= 6) ? 'rgba(179, 0, 255, 0.05)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                  title={(myExEp > 0 && turn >= 6) ? "フォロワーにドラッグして超進化" : ""}
                >
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                    {(myExEp > 0 && turn >= 6) ? '⣿ 残りExEP:' : '残りExEP:'}
                  </span>
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