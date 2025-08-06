// save.js
import { saveData, loadSaveTitle } from './module/save.js';

// セーブボタンを押したら表示
document.getElementById('game-parameter-save').addEventListener('click', () => {
  document.getElementById('save-modal').style.display = 'flex';
  document.getElementById('save-modal').classList.remove('fade-out');
  document.getElementById('save-modal').classList.add('fade-in');
  // localStrageのデータを読み込んでタイトルを表示
  loadSaveTitle('.save-slot');
});
// キャンセルボタンを押したら非表示
document.getElementById('close-save-modal-button').addEventListener('click', () => {
  document.getElementById('save-modal').classList.remove('fade-in');
  document.getElementById('save-modal').classList.add('fade-out');
  setTimeout(() => {
    document.getElementById('save-modal').style.display = 'none';
  }, 500);
});
// 保存ボタンを押したら保存
document.querySelectorAll('.save-slot-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const slotNumber = index + 1;
    saveData(slotNumber);
    document.getElementById('save-modal').classList.remove('fade-in');
    document.getElementById('save-modal').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('save-modal').style.display = 'none';
    }, 500);
  });
});

import { globalGameState } from './module/gameState.js';

export async function initGame() {
  // 画面上部パラメーターの更新
  document.getElementById('game-parameter-hope').textContent = globalGameState.gameState.hope;
  document.getElementById('game-parameter-memory').textContent = globalGameState.gameState.memoryPiece;
  document.getElementById('game-parameter-hunger').textContent = globalGameState.gameState.hunger;
  document.getElementById('game-parameter-day').textContent = globalGameState.gameState.day;
  // セレスティア号の改装の更新
  document.getElementById('game-main-upgrade-engine-level').textContent = globalGameState.gameState.CelestiaUpgrade.engine;
  document.getElementById('game-main-upgrade-sonar-level').textContent = globalGameState.gameState.CelestiaUpgrade.sonar;
  document.getElementById('game-main-upgrade-body-level').textContent = globalGameState.gameState.CelestiaUpgrade.body;
  document.getElementById('game-main-upgrade-arm-level').textContent = globalGameState.gameState.CelestiaUpgrade.arm;
  document.getElementById('game-main-upgrade-fuel-level').textContent = globalGameState.gameState.CelestiaUpgrade.fuel;
  document.getElementById('game-main-upgrade-living-level').textContent = globalGameState.gameState.CelestiaUpgrade.living;
  // 所持アイテムの更新
  try {
    const response = await fetch('item.json');
    const itemsData = await response.json();
    const belongingsContainer = document.querySelector('.game-main-belongings-container');
    belongingsContainer.innerHTML = '';
  
    const salvageItems = itemsData.filter(item => item.source === 'salvage');
  
    salvageItems.forEach(item => {
      const itemId = item.id;
      const quantity = globalGameState.gameState.items[itemId] ? globalGameState.gameState.items[itemId].quantity : 0;
  
      const itemElement = document.createElement('div');
      itemElement.classList.add('game-main-belongings-item');
      itemElement.innerHTML = `
        <div class="game-main-belongings-name">${item.name}
          <span class="game-main-belongings-count">${quantity}</span>
        </div>
      `;
      belongingsContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error('アイテムの読み込みに失敗しました:', error);
  }
}

import { changeModal } from './module/changeModal.js';

document.getElementById('game-main-upgrade').addEventListener('click', () => {
  changeModal('upgrade', 0);
});
document.getElementById('game-main-map').addEventListener('click', () => {
  changeModal('map');
});
document.getElementById('game-main-belongings').addEventListener('click', () => {
  changeModal('belongings');
});