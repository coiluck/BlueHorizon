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
  });
});

import { globalGameState } from './module/gameState.js';

export async function initGame() {
  // ゲームの初期化
  document.getElementById('game-parameter-hope').textContent = globalGameState.gameState.hope;
  document.getElementById('game-parameter-memory').textContent = globalGameState.gameState.memoryPiece;
  document.getElementById('game-parameter-day').textContent = globalGameState.gameState.day;
}
