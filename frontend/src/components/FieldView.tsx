import React from 'react';
import type { Card } from '../../../shared/types';

interface FieldViewProps {
  cards: Card[];
  isTargetMode: boolean;
  isMyTargetMode: boolean;
  isEnemyTargetMode: boolean;
  isCardSelected: boolean;
  selectedMyCardId: string | null;
  onCardClick: (card: Card, index: number) => void;
  onDropEvolve?: (cardId: string, evolveType: 'normal' | 'ex') => void;
  isEnemy?: boolean;
  pp?: number;
  onPlayAct?: (card: Card, index: number) => void;
}

export default function FieldView({
  cards,
  isTargetMode,
  isMyTargetMode,
  isEnemyTargetMode,
  isCardSelected,
  selectedMyCardId,
  onCardClick,
  onDropEvolve,
  isEnemy = false,
  pp = 0,
  onPlayAct
}: FieldViewProps) {
  
  const isThisFieldTargetMode = isEnemy ? isEnemyTargetMode : isMyTargetMode;
  const isOpponentFieldTargetMode = isEnemy ? isMyTargetMode : isEnemyTargetMode;

  return (
    <div 
      style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '140px',
        background: isThisFieldTargetMode ? 'rgba(0,255,204,0.05)' : 'rgba(255,255,255,0.02)',
        borderRadius: '16px',
        border: isThisFieldTargetMode 
          ? '1px solid rgba(0,255,204,0.3)' 
          : isEnemy 
            ? '1px solid rgba(255,255,255,0.05)' 
            : '1px dashed rgba(255,255,255,0.1)',
        padding: '10px',
        opacity: isOpponentFieldTargetMode ? 0.4 : 1,
        pointerEvents: isOpponentFieldTargetMode ? 'none' : 'auto',
        cursor: isTargetMode ? 'pointer' : 'default',
        transition: 'all 0.3s'
      }}
    >
      {cards.map((card, index) => {
        const isSelected = selectedMyCardId === card.instanceId;
        const canSelectAsAttacker = card.type === 'Follower' && !card.hasAttacked;

        const canPlayAct = !isEnemy && card.actCost !== undefined && pp >= card.actCost;

        // カード個別のボーダー色判定
        let borderColor = '2px solid #555';
        if (isEnemy) {
          borderColor = isEnemyTargetMode 
            ? '2px solid #ff4d4d' 
            : isCardSelected && !isTargetMode && card.type === 'Follower'
              ? '2px solid #ff9900' 
              : '2px solid #555';
        } else {
          borderColor = isMyTargetMode
            ? '2px solid #00ffcc'
            : isSelected 
              ? '2px solid #ffcc00' 
              : card.type === 'Amulet'
                ? '2px solid #55aaff'
                : card.isExEvolved 
                  ? '2px solid #b300ff' 
                  : card.isEvolved 
                    ? '2px solid #00ffcc' 
                    : '2px solid #888';
        }

        // カード個別の背景色判定
        let backgroundColor = card.type === 'Amulet' ? '#1a2233' : '#1c1f26';
        if (!isEnemy) {
          backgroundColor = isMyTargetMode 
            ? '#1c2624' 
            : isSelected 
              ? '#2d2a1e' 
              : card.type === 'Amulet'
                ? '#141d2d'
                : '#1c1f26';
        }

        // カーソルスタイル判定
        const cursorStyle = isEnemy
          ? ((isEnemyTargetMode || (isCardSelected && !isTargetMode && card.type === 'Follower')) ? 'pointer' : 'default')
          : (isMyTargetMode ? 'pointer' : !canSelectAsAttacker && card.type === 'Follower' ? 'not-allowed' : 'pointer');

        return (
          <div 
            key={card.instanceId || `${card.id}-${index}`}
            onDragOver={(e) => !isEnemy && e.preventDefault()}
            onDrop={(e) => {
              if (isEnemy || !onDropEvolve || card.type !== 'Follower') return;
              e.preventDefault();
              const evolveType = e.dataTransfer.getData('evolveType') as 'normal' | 'ex';
              onDropEvolve(card.instanceId!, evolveType);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(card, index);
            }}
            style={{
              position: 'relative',
              border: borderColor,
              borderRadius: '10px',
              width: '90px',
              height: '120px',
              backgroundColor: backgroundColor,
              boxShadow: isEnemy
                ? (isEnemyTargetMode ? '0 0 15px rgba(255,77,77,0.8)' : '0 4px 10px rgba(0,0,0,0.5)')
                : (isMyTargetMode ? '0 0 15px rgba(0,255,204,0.6)' : isSelected ? '0 0 15px #ffcc00' : '0 4px 10px rgba(0,0,0,0.5)'),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '4px',
              boxSizing: 'border-box',
              cursor: cursorStyle,
              opacity: !isEnemy && !isMyTargetMode && card.type === 'Follower' && card.hasAttacked ? 0.6 : 1,
              transform: (isEnemy ? isEnemyTargetMode : isMyTargetMode) ? 'scale(1.03)' : 'scale(1)',
              transition: 'all 0.2s'
            }}
          >
            {/* カード名 */}
            <div style={{ 
              fontSize: '0.75rem', 
              padding: '5px', 
              textAlign: 'center', 
              borderBottom: '1px solid #333', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
              color: !isEnemy && card.isExEvolved ? '#b300ff' : !isEnemy && card.isEvolved ? '#00ffcc' : '#fff'
            }}>
              {card.name}
            </div>
            
            {/* 状態テキスト（自分側のみ、またはアミュレット判定） */}
            <div style={{ textAlign: 'center', fontSize: '0.65rem', color: isThisFieldTargetMode ? '#00ffcc' : isSelected ? '#ffcc00' : '#888', zIndex: 2, pointerEvents: 'none' }}>
              {isThisFieldTargetMode 
                ? '【対象に選択】' 
                : card.type === 'Amulet'
                  ? '【設置中】'
                  : !isEnemy && card.hasAttacked 
                    ? '【待機中】' 
                    : !isEnemy && isSelected 
                      ? '【攻撃選択中】' 
                      : isEnemy 
                        ? '' 
                        : '選択可'}
            </div>

            {canPlayAct && onPlayAct && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAct(card, index);
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#00ffcc',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 0 8px rgba(0,255,204,0.6)',
                  zIndex: 10
                }}
              >
                アクト ({card.actCost})
              </button>
            )}

            {/* フォロワーのスタッツ表示 */}
            {card.type === 'Follower' && (
              <>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '5px', 
                  left: '5px', 
                  backgroundColor: !isEnemy && card.isEvolved ? '#00cc88' : '#0055ff', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '22px', 
                  height: '22px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 'bold', 
                  fontSize: '0.85rem', 
                  zIndex: 1 
                }}>
                  {card.attack}
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '5px', 
                  right: '5px', 
                  backgroundColor: '#ff1a1a', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '22px', 
                  height: '22px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 'bold', 
                  fontSize: '0.85rem', 
                  zIndex: 1 
                }}>
                  {card.defense}
                </div>
              </>
            )}

            {/* アミュレットの識別用テキスト */}
            {card.type === 'Amulet' && (
              <div style={{ fontSize: '0.6rem', color: '#888', textAlign: 'center', marginBottom: '10px' }}>AMULET</div>
            )}
          </div>
        );
      })}
    </div>
  );
}