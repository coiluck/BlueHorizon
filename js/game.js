// save.js
import { saveData, loadSaveTitle } from './module/save.js';
import { playSoundEffect } from './module/audio.js';

// セーブボタンを押したら表示
/*
document.getElementById('game-parameter-save').addEventListener('click', () => {
  document.getElementById('save-modal').style.display = 'flex';
  document.getElementById('save-modal').classList.remove('fade-out');
  document.getElementById('save-modal').classList.add('fade-in');
  // localStrageのデータを読み込んでタイトルを表示
  loadSaveTitle('.save-slot');
});
*/
// キャンセルボタンを押したら非表示
document.getElementById('close-save-modal-button').addEventListener('click', () => {
  playSoundEffect('click1');
  document.getElementById('save-modal').classList.remove('fade-in');
  document.getElementById('save-modal').classList.add('fade-out');
  setTimeout(() => {
    document.getElementById('save-modal').style.display = 'none';
  }, 500);
});
// 保存ボタンを押したら保存
document.querySelectorAll('.save-slot-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    playSoundEffect('click1');
    const slotNumber = index + 1;
    // 問題なく保存できた時のみモーダルを閉じる
    if (saveData(slotNumber)) {
      document.getElementById('save-modal').classList.remove('fade-in');
      document.getElementById('save-modal').classList.add('fade-out');
      setTimeout(() => {
        document.getElementById('save-modal').style.display = 'none';
      }, 500);
    }
  });
});

import { globalGameState } from './module/gameState.js';
import { addTooltipEvents } from './module/addToolTip.js';
import { checkEndingType } from './ending.js';

export async function initGame() {
  // 画面上部パラメーターの更新
  document.querySelector('.game-parameter-container').innerHTML = `
      <div class="game-parameter-item" data-tooltip="現在の希望。0になるとゲームが終了します。">
      <p class="game-parameter-item-title">希望</p>
      <p id="game-parameter-hope" class="game-parameter-item-value">${globalGameState.gameState.hope}</p>
    </div>
    <div class="game-parameter-item" data-tooltip="記憶の欠片。獲得すると特殊なストーリーが再生されます。">
      <p class="game-parameter-item-title">記憶の欠片</p>
      <p id="game-parameter-memory" class="game-parameter-item-value">${globalGameState.gameState.memoryPiece}</p>
    </div>
    <div class="game-parameter-item" data-tooltip="現在の満腹度。0になるとゲームが終了します。">
      <p class="game-parameter-item-title">満腹度</p>
      <p id="game-parameter-hunger" class="game-parameter-item-value">${globalGameState.gameState.hunger}</p>
    </div>
    <div class="game-parameter-item" data-tooltip="経過日数。30日を超えるとゲームが終了します。">
      <p class="game-parameter-item-title">DAY</p>
      <p id="game-parameter-day" class="game-parameter-item-value">${globalGameState.gameState.day}</p>
    </div>
    <div class="game-parameter-item" id="game-parameter-save" data-tooltip="ここからセーブできます。">
      <p class="game-parameter-item-title">セーブ</p>
      <img src="./assets/images/save_icon.avif" alt="セーブアイコン">
    </div>
  `;
  if (globalGameState.gameState.items['water_purifier'] >= 1) {
    document.querySelector('.game-parameter-container').innerHTML += `
      <div class="game-parameter-item" id="game-parameter-end" data-tooltip="獲得した浄水装置を持ち帰り、エンディングに進みます。ここを押さなくても30日を超えるとゲームが終了します。">
        <p class="game-parameter-item-title">帰還する</p>
      </div>
    `;
    document.getElementById('game-parameter-end').addEventListener('click', () => {
      playSoundEffect('click1');
      checkEndingType();
    });
  }
  // 保存ボタンのイベントリスナを再設定
  document.getElementById('game-parameter-save').addEventListener('click', () => {
    playSoundEffect('click1');
    document.getElementById('save-modal').style.display = 'flex';
    document.getElementById('save-modal').classList.remove('fade-out');
    document.getElementById('save-modal').classList.add('fade-in');
    // localStrageのデータを読み込んでタイトルを表示
    loadSaveTitle('.save-slot');
  });
  // hover時の説明を設定
  const parameterItems = document.querySelectorAll('.game-parameter-item');
  parameterItems.forEach(item => {
    addTooltipEvents(item, null, item.dataset.tooltip, true);
  });
  // セレスティア号の改装の更新
  document.getElementById('game-main-upgrade-engine-level').textContent = globalGameState.gameState.CelestiaUpgrade.engine;
  document.getElementById('game-main-upgrade-sonar-level').textContent = globalGameState.gameState.CelestiaUpgrade.sonar;
  // document.getElementById('game-main-upgrade-body-level').textContent = globalGameState.gameState.CelestiaUpgrade.body;
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
      const quantity = globalGameState.gameState.items[itemId] || 0;
  
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
import { updateMapPathsState } from './map.js';
import { initUpgrade } from './upgrade.js';
import { initItem } from './item.js';

document.getElementById('game-main-upgrade').addEventListener('click', () => {
  playSoundEffect('click1');
  changeModal('upgrade', '.game-upgrade-left-panel', 500, true);
  initUpgrade();
});
document.getElementById('game-main-map').addEventListener('click', () => {
  changeModal('map');
  setTimeout(() => {
    // これは2回目以降（1回目は読み込みが間に合わないので./map.jsで実行）
    updateMapPathsState();
  }, 501);
});
document.getElementById('game-main-belongings').addEventListener('click', () => {
  playSoundEffect('click1');
  changeModal('item', '.game-item-list-container');
  initItem();
});

// 各modalからのcloseボタン
document.getElementById('game-upgrade-close-button').addEventListener('click', () => {
  playSoundEffect('click1');
  changeModal('game');
  initGame();
});
document.getElementById('game-map-close-button').addEventListener('click', () => {
  playSoundEffect('click1');
  initGame();
  changeModal('game');
});
document.getElementById('game-item-close-button').addEventListener('click', () => {
  playSoundEffect('click1');
  changeModal('game');
  initGame();
});