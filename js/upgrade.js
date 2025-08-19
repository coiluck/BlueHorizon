import { globalGameState } from './module/gameState.js';

const upgradeText = {
  engine: "推進システムの効率を改善し、より長距離の移動が可能になります。マップから選択できる探索先が広がります。",
  sonar: "パッシブソナーを強化し、より遠くの信号を探知できるようになります。探索中の選択肢が増加します。",
  // body: "潜水艇の外殻を強化し、水圧や障害物からの保護性能を最大限まで向上させています。", <- なくした（移動モジュール以外の判定が面倒なので）
  arm: "操作アームを強化し、より大きな荷物を運ぶことができます。探索中の選択肢が増加します。",
  fuel: "燃料タンクを強化し、より多くの燃料の搭載が可能になります。マップから選択できる探索先が広がります。",
  living: "居住区画を強化し、より快適な生活環境を提供します。「希望」のパラメータの低下を抑えることができます。",
}

const upgradeCost = {
  engine: {
    1: [
      { "itemId": "scrap_iron", "quantity": 3 },
      { "itemId": "copper_wire_cable", "quantity": 2 }
    ],
    2: [
      { "itemId": "titanium_alloy_plate", "quantity": 3 },
      { "itemId": "control_board", "quantity": 1 },
      { "itemId": "pipe_parts", "quantity": 2 }
    ]
  },
  sonar: {
    1: [
      { "itemId": "circuit_board", "quantity": 2 },
      { "itemId": "copper_wire_cable", "quantity": 4 },
      { "itemId": "scrap_iron", "quantity": 3 }
    ],
    2: [
      { "itemId": "decryption_tool", "quantity": 1 },
      { "itemId": "crystal_ore", "quantity": 2 },
      { "itemId": "control_board", "quantity": 2 }
    ]
  },
  /*body: {
    1: [
      { "itemId": "scrap_iron", "quantity": 8 },
      { "itemId": "fiber_rope", "quantity": 4 }
    ],
    2: [
      { "itemId": "titanium_alloy_plate", "quantity": 5 },
      { "itemId": "emergency_repair_kit", "quantity": 1 }
    ]
  },*/
  arm: {
    1: [
      { "itemId": "scrap_iron", "quantity": 4 },
      { "itemId": "fiber_rope", "quantity": 2 }
    ],
    2: [
      { "itemId": "titanium_alloy_plate", "quantity": 3 },
      { "itemId": "cutting_tool", "quantity": 1 },
      { "itemId": "control_board", "quantity": 1 }
    ]
  },
  fuel: {
    1: [
      { "itemId": "titanium_alloy_plate", "quantity": 2 },
      { "itemId": "scrap_iron", "quantity": 2 }
    ],
    2: [
      { "itemId": "titanium_alloy_plate", "quantity": 4 },
      { "itemId": "pipe_parts", "quantity": 2 }
    ]
  },
  living: {
    1: [
      { "itemId": "paper_and_pen", "quantity": 1 },
      { "itemId": "wood", "quantity": 5 }
    ],
    2: [
      { "itemId": "simple_communicator", "quantity": 1 },
      { "itemId": "flashlight", "quantity": 1 }
    ]
  }
}

let itemsDataCache = null;
async function getItemsData() {
  if (!itemsDataCache) {
    const response = await fetch('item.json');
    itemsDataCache = await response.json();
  }
  return itemsDataCache;
}

export async function initUpgrade() {
  const upgradeItems = document.querySelectorAll('.game-upgrade-list-item');
  upgradeItems.forEach(item => {
    const upgradeType = item.dataset.upgrade;
    const currentLevel = globalGameState.gameState.CelestiaUpgrade[upgradeType];
    const maxLevel = 2;
    // レベルテキストを更新
    const levelElement = item.querySelector('.game-upgrade-item-level');
    levelElement.textContent = `Lv ${currentLevel}/${maxLevel}`;
    // ドット表示を更新
    const dotsContainer = item.querySelector('.game-upgrade-item-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < maxLevel; i++) {
      const dot = document.createElement('div');
      dot.classList.add('game-upgrade-dot');
      if (currentLevel === maxLevel) {
        dot.classList.add('max');
      } else if (i < currentLevel) {
        dot.classList.add('active');
      }
      dotsContainer.appendChild(dot);
    }
    // クリックのイベントリスナを設定
    item.addEventListener('click', () => {
      // 選択状態の処理
      upgradeItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      // 詳細パネルを更新
      setUpUpgradeDetail(upgradeType);
    });
  });

  // 右パネルをリセット
  setUpUpgradeDetail('engine');

  // 所持アイテムを取得
  const itemsData = await getItemsData();
  const displayItems = itemsData.filter(item => {
    // 食べ物と火は除外
    return item.type !== 'consumable' && item.id !== 'shichirin' && item.id !== 'bonfire';
  });
  document.querySelector('.game-upgrade-resources-section').innerHTML = '<div class="game-upgrade-section-title">所持アイテム</div>';
  for (const item of displayItems) {
    const itemId = item.id;
    const quantity = globalGameState.gameState.items[itemId] || 0;
    document.querySelector('.game-upgrade-resources-section').innerHTML += `
      <div class="game-upgrade-resource-item">
        <div class="game-upgrade-resource-icon"><img src="${item.image}"></div>
        <span>${item.name}: ${quantity}</span>
      </div>
    `;
  }
}

// 右パネルの更新
async function setUpUpgradeDetail(upgradeType) {
  const currentLevel = globalGameState.gameState.CelestiaUpgrade[upgradeType];
  const maxLevel = 2;

  // 名前の更新
  const listItem = document.querySelector(`.game-upgrade-list-item[data-upgrade="${upgradeType}"]`);
  document.querySelector('.upgrade-detail-name').textContent = listItem.querySelector('.game-upgrade-item-name').textContent;

  // レベル表示の更新
  document.querySelector('.upgrade-detail-level-text').textContent = `Lv ${globalGameState.gameState.CelestiaUpgrade[upgradeType]}/${maxLevel}`;
  document.querySelector('.upgrade-detail-level-dots').innerHTML = '';
  for (let i = 0; i < maxLevel; i++) {
    const dot = document.createElement('div');
    dot.classList.add('upgrade-detail-level-dot');
    if (currentLevel === maxLevel) {
      dot.classList.add('max');
    } else if (i < currentLevel) {
      dot.classList.add('active');
    }
    document.querySelector('.upgrade-detail-level-dots').appendChild(dot);
  }

  // 説明文の更新
  document.querySelector('.upgrade-detail-description').textContent = upgradeText[upgradeType];

  // 必要アイテムとボタンの状態を更新
  document.querySelector('.upgrade-detail-cost-items').innerHTML = '';
  if (currentLevel >= maxLevel) {
    const message = document.createElement('span');
    message.classList.add('upgrade-detail-max-level-message');
    message.textContent = '最大レベル';
    document.querySelector('.upgrade-detail-cost-items').appendChild(message);
    document.querySelector('.upgrade-detail-button').disabled = true;
    document.querySelector('.upgrade-detail-button').textContent = '最大レベル';
    document.querySelector('.upgrade-detail-button').classList.remove('insufficient');
    document.querySelector('.upgrade-detail-button').classList.remove('available');
    document.querySelector('.upgrade-detail-button').classList.add('max-level');
  } else {
    let canUpgrade = true;

    const itemsData = await getItemsData();

    const requiredItems = upgradeCost[upgradeType][currentLevel + 1];

    for (const req of requiredItems) {
      const itemData = itemsData.find(item => item.id === req.itemId);
      const ownedQuantity = globalGameState.gameState.items[req.itemId] || 0;
      const hasEnough = ownedQuantity >= req.quantity;

      if (!hasEnough) {
        canUpgrade = false;
      }
      
      const costItemDiv = document.createElement('div');
      costItemDiv.classList.add('upgrade-detail-cost-item');
      
      costItemDiv.innerHTML = `
        <div class="detail-cost-icon"></div>
        <span>${itemData.name} × ${req.quantity} (所持: ${ownedQuantity})</span>
      `;
      document.querySelector('.upgrade-detail-cost-items').appendChild(costItemDiv);
    }

    if (canUpgrade) {
      document.querySelector('.upgrade-detail-button').disabled = true;
      document.querySelector('.upgrade-detail-button').classList.add('available');
      document.querySelector('.upgrade-detail-button').classList.remove('insufficient');
      document.querySelector('.upgrade-detail-button').classList.remove('max-level');
      document.querySelector('.upgrade-detail-button').textContent = 'アップグレード';
    } else {
      document.querySelector('.upgrade-detail-button').disabled = false;
      document.querySelector('.upgrade-detail-button').classList.add('insufficient');
      document.querySelector('.upgrade-detail-button').classList.remove('available');
      document.querySelector('.upgrade-detail-button').classList.remove('max-level');
      document.querySelector('.upgrade-detail-button').textContent = 'アイテム不足';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 3Dモデルの設定
});