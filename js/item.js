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
    itemElement.innerHTML = `
      <div class="game-item-list-item-icon"><img src="${item.image}"></div>
      <div class="game-item-list-item-texts">
        <div class="game-item-list-item-name">${item.name}</div>
        <div class="game-item-list-item-description">${item.description}</div>
      </div>
      <div class="game-item-list-item-count">所持 ${globalGameState.gameState.items[item.id] || 0}</div>
    `;
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
      const hasAny = requirement.anyOf.some(option => playerItems[option.itemId] >= option.quantity);
      if (!hasAny) {
        return false; // 所持数が足りなければ作成不可
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

    recipeElement.innerHTML = `
      <div class="game-item-craft-recipe-header">
        <div class="game-item-craft-recipe-name">${item.name}</div>
        <div class="game-item-craft-recipe-result">
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
        <button class="game-item-craft-button ${buttonClass}">クラフト</button>
      </div>
    `;

    craftContainer.appendChild(recipeElement);
  }
}

import { message } from "./module/message.js";

// クラフトの量を変更するやつ
window.changeValue = function changeValue(button, change) {
  const parent = button.parentElement;
  const input = parent.querySelector('.game-item-craft-quantity-input');
  const currentValue = Number(input.textContent);
  const min = 1
  const max = 5
  const newValue = currentValue + change;
  if (newValue >= min && newValue <= max) {
    input.textContent = newValue;
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