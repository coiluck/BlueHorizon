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