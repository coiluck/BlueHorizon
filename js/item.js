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

export async function initItem() {
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
      <div class="game-item-list-item-icon"></div>
      <div class="game-item-list-item-texts">
        <div class="game-item-list-item-name">${item.name}</div>
        <div class="game-item-list-item-description">${item.description}</div>
      </div>
      <div class="game-item-list-item-count">所持 ${globalGameState.gameState.items[item.id] || 0}</div>
    `;
    itemListContainer.appendChild(itemElement);
  });
}


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
  }
}