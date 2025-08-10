import { globalGameState } from './module/gameState.js';

export async function initUpgrade() {
  // アップデート項目を取得

  // 所持アイテムを取得
  const response = await fetch('item.json');
  const itemsData = await response.json();
  const salvageItems = itemsData.filter(item => item.source === 'salvage');
  document.querySelector('.game-upgrade-resources-section').innerHTML = '<div class="game-upgrade-section-title">所持アイテム</div>';
  for (const item of salvageItems) {
    const itemId = item.id;
    // 食材はreturn
    if (item.type === 'consumable') {
      continue;
    }
    const quantity = globalGameState.gameState.items[itemId] || 0;
    document.querySelector('.game-upgrade-resources-section').innerHTML += `
      <div class="game-upgrade-resource-item">
        <div class="game-upgrade-resource-icon"></div>
        <span>${item.name}: ${quantity}</span>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 3Dモデルの設定
});