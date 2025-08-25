// item.js
import { globalGameState } from "./module/gameState.js";

let itemsDataCache = null;
async function getItemsData() {
  if (!itemsDataCache) {
    const response = await fetch('item.json');
    itemsDataCache = await response.json();
  }
  return itemsDataCache;
}

export function initItem() {
  setUpItemList();
  setUpItemCraft();
}

async function setUpItemList() {
  const itemsData = await getItemsData();
  const itemListContainer = document.querySelector('.game-item-list-container');
  itemListContainer.innerHTML = '';
  const itemListTitle = document.createElement('div');
  itemListTitle.classList.add('game-item-list-title');
  itemListTitle.textContent = `所持アイテム`;
  itemListContainer.appendChild(itemListTitle);
  itemsData.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('game-item-list-card');
    itemElement.dataset.itemId = item.id;
    if (item.type === 'consumable') {
      itemElement.innerHTML = `
        <div class="game-item-list-item-icon"><img src="${item.image}"></div>
        <div class="game-item-list-item-texts">
          <div class="game-item-list-item-name">${item.name}</div>
          <div class="game-item-list-item-description">${item.description}</div>
        </div>
        <div class="game-item-list-button-container">
          <div class="game-item-list-item-count">所持 ${globalGameState.gameState.items[item.id] || 0}</div>
          <button class="game-item-list-button">食べる</button>
        </div>
      `;
      const eatButton = itemElement.querySelector('.game-item-list-button');
      if (eatButton) {
        eatButton.addEventListener('click', () => eatItem(item));
      }
    } else {
      itemElement.innerHTML = `
        <div class="game-item-list-item-icon"><img src="${item.image}"></div>
        <div class="game-item-list-item-texts">
          <div class="game-item-list-item-name">${item.name}</div>
          <div class="game-item-list-item-description">${item.description}</div>
        </div>
        <div class="game-item-list-item-count">所持 ${globalGameState.gameState.items[item.id] || 0}</div>
      `;
    }
    itemListContainer.appendChild(itemElement);
  });
}

function getItemNameById(itemId, allItems) {
  const item = allItems.find(i => i.id === itemId);
  return item ? item.name : '不明なアイテム';
}

function checkAvailability(recipe, playerItems) {
  for (const requirement of recipe) {
    if (requirement.anyOf) {
      // 食材の場合
      const requiredQuantity = requirement.anyOf[0].quantity;
      const totalAvailable = requirement.anyOf.reduce((sum, option) => sum + (playerItems[option.itemId] || 0), 0);
      if (totalAvailable < requiredQuantity) {
        return false; // 合計所持数が足りなければ作成不可
      }
    } else {
      // 通常の条件
      if (!playerItems[requirement.itemId] || playerItems[requirement.itemId] < requirement.quantity) {
        return false; // 1つでも足りなければ作成不可
      }
    }
  }
  return true; // 全ての条件を満たせば作成可能
}

async function setUpItemCraft() {
  const craftContainer = document.querySelector('.game-item-craft-recipe-container');
  craftContainer.innerHTML = '';
  const itemData = await getItemsData();
  const craftItems = itemData.filter(item => item.source === 'craft');
  for (const item of craftItems) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('game-item-craft-recipe');
    recipeElement.dataset.itemId = item.id;

    let materialsHTML = '';
    for (const requirement of item.recipe) {
      let materialName = '';
      let materialCount = 0;

      // 料理
      if (requirement.anyOf) {
        const names = requirement.anyOf.map(option => getItemNameById(option.itemId, itemData)).join('・');
        if (requirement.anyOf.some(o => o.itemId.includes('fish') || o.itemId.includes('squid'))) {
          materialName = `食材（${names}）`;
        } else if (requirement.anyOf.some(o => o.itemId.includes('bonfire') || o.itemId.includes('shichirin'))) {
          materialName = `火（${names}）`;
        } else {
          materialName = `いずれか（${names}）`;
        }
        materialCount = requirement.anyOf[0].quantity; // anyOf内の必要数は同じと仮定
      } else {
        // 通常のレシピ
        materialName = getItemNameById(requirement.itemId, itemData);
        materialCount = requirement.quantity;
      }

      materialsHTML += `
        <div class="game-item-craft-material">
          <div class="game-item-craft-material-icon"></div>
          <div class="game-item-craft-material-name">${materialName}</div>
          <div class="game-item-craft-material-count">×${materialCount}</div>
        </div>
      `;
    }

    // クラフト可能か判定
    const isAvailable = checkAvailability(item.recipe, globalGameState.gameState.items);
    const buttonClass = isAvailable ? 'available' : 'insufficient';
    const buttonText = isAvailable ? 'クラフト' : 'アイテム不足';

    recipeElement.innerHTML = `
      <div class="game-item-craft-recipe-header">
        <div class="game-item-craft-recipe-name">${item.name}</div>
        <div class="game-item-craft-recipe-result no-display">
          <span>+1個</span>
        </div>
      </div>
      <div class="game-item-craft-materials">
        ${materialsHTML}
      </div>
      <div class="game-item-craft-actions">
        <div class="game-item-craft-quantity">
          <span class="game-item-craft-quantity-label">個数:</span>
          <div class="game-item-craft-quantity-wrapper">
            <button class="game-item-craft-quantity-btn decrease" onclick="changeValue(this, -1)">-</button>
            <div class="game-item-craft-quantity-input">1</div>
            <button class="game-item-craft-quantity-btn increase" onclick="changeValue(this, 1)">+</button>
          </div>
        </div>
        <button class="game-item-craft-button ${buttonClass}">${buttonText}</button>
      </div>
    `;

    craftContainer.appendChild(recipeElement);
    recipeElement.querySelector('.game-item-craft-button').addEventListener('click', craftExecute);
  }
}

import { message } from "./module/message.js";

// クラフトの量を変更するやつ
window.changeValue = async function changeValue(button, change) {
  if (isProcessing) return;
  const recipeElement = button.closest('.game-item-craft-recipe');
  const input = recipeElement.querySelector('.game-item-craft-quantity-input');
  const currentValue = Number(input.textContent);
  const min = 1;
  const max = 5;
  const newValue = currentValue + change;

  if (newValue >= min && newValue <= max) {
    input.textContent = newValue;

    const itemId = recipeElement.dataset.itemId;
    const itemData = await getItemsData();
    const item = itemData.find(i => i.id === itemId);

    // クラフト個数に応じた一時的なレシピ(tempRecipe)を作成
    const tempRecipe = JSON.parse(JSON.stringify(item.recipe)); // 元のレシピをコピー
    tempRecipe.forEach(requirement => {
      if (requirement.anyOf) {
        requirement.anyOf.forEach(option => {
          option.quantity *= newValue;
        });
      } else {
        requirement.quantity *= newValue;
      }
    });

    // 必要なアイテムを計算&表示
    const materialCountElements = recipeElement.querySelectorAll('.game-item-craft-material-count');
    item.recipe.forEach((requirement, index) => {
      let requiredQuantity;
      if (requirement.anyOf) {
        requiredQuantity = requirement.anyOf[0].quantity * newValue;
      } else {
        requiredQuantity = requirement.quantity * newValue;
      }
      // 表示を更新
      if (materialCountElements[index]) {
        materialCountElements[index].textContent = `×${requiredQuantity}`;
      }
    });

    // クラフト可能かチェック
    const isAvailable = checkAvailability(tempRecipe, globalGameState.gameState.items);
    const craftButton = recipeElement.querySelector('.game-item-craft-button');
    craftButton.className = `game-item-craft-button ${isAvailable ? 'available' : 'insufficient'}`;
    craftButton.textContent = isAvailable ? 'クラフト' : '材料不足';

    // ボタンにアニメーション
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = '';
    }, 100);
  } else if (newValue < min) {
    message('caution', '1以上の個数を入力してください', 3000);
  } else if (newValue > max) {
    message('caution', '5以下の個数を入力してください', 3000);
  }
}

let isProcessing = false;

// クラフトボタンを押したら
async function craftExecute(event) {
  if (isProcessing) return;
  isProcessing = true;
  const button = event.currentTarget;
  // クラフト不可の場合は処理を中断
  if (!button.classList.contains('available') || button.classList.contains('insufficient')) {
    message('caution', 'アイテムが不足しています。', 3000);
    return;
  }

  const recipeElement = button.closest('.game-item-craft-recipe');
  const quantity = Number(recipeElement.querySelector('.game-item-craft-quantity-input').textContent);
  const itemId = recipeElement.dataset.itemId;
  const itemData = await getItemsData();
  const item = itemData.find(i => i.id === itemId);

  // アイテム減算処理
  for (const requirement of item.recipe) {
    if (requirement.anyOf) {
      let needed = requirement.anyOf[0].quantity * quantity;
      for (const option of requirement.anyOf) {
        if (needed <= 0) break; // 必要な数を満たしたらループを抜ける
        
        const playerHas = globalGameState.gameState.items[option.itemId] || 0;
        const toConsume = Math.min(needed, playerHas); // 必要数と所持数のうち少ない方を消費
        
        if (toConsume > 0) {
          globalGameState.gameState.items[option.itemId] -= toConsume;
          needed -= toConsume;
        }
      }
    } else {
      // 通常の素材消費
      globalGameState.gameState.items[requirement.itemId] -= requirement.quantity * quantity;
    }
  }

  // アイテム加算処理
  if (!globalGameState.gameState.items[itemId]) {
    globalGameState.gameState.items[itemId] = 0;
  }
  globalGameState.gameState.items[itemId] += quantity;
  
  // 表示
  recipeElement.querySelector('.game-item-craft-recipe-result').classList.remove('no-display');
  recipeElement.querySelector('.game-item-craft-recipe-result span').textContent = `+${quantity}個`;
  recipeElement.querySelector('.game-item-craft-recipe-result').classList.add('active');
  message('success', `${item.name}を${quantity}個クラフトしました！`, 3000);
  setTimeout(() => {
    recipeElement.querySelector('.game-item-craft-recipe-result').classList.remove('active');
    // アイテムリスト更新
    initItem();
    isProcessing = false;
  }, 1500);
}

// 食べるボタンを押したら
async function eatItem(item) {
  // アイテムの所持数をチェック
  if ((globalGameState.gameState.items[item.id] || 0) <= 0) {
    message('caution', `${item.name}を持っていません。`, 3000);
    return;
  }

  // アイテムを1つ減らす
  globalGameState.gameState.items[item.id]--;

  // hungerを回復（最大値は100と仮定）
  const hungerAmount = {
    fish_1: 7,
    fish_2: 10,
    squid: 7,
    cooked_food: 15,
  }
  const recoveryAmount = hungerAmount[item.id] || 0;
  globalGameState.gameState.hunger += recoveryAmount;
  if (globalGameState.gameState.hunger > 100) {
    globalGameState.gameState.hunger = 100;
  }
  
  message('success', `${item.name}を食べた。満腹度が${recoveryAmount}回復した。`, 3000);

  // アイテムリストの表示を更新
  setUpItemList();
}