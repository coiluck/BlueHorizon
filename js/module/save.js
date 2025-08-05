// save.js
import { globalGameState } from './gameState.js';
import { message } from './message.js';

export function saveData(slotNumber) {
  // タイトルを取得
  const titleInput = document.getElementById('save-title-input');
  const title = titleInput.value.trim();
  if (title === '') {
    message('info', 'セーブタイトルを入力してください', 3000);
    return;
  } else if (title.length > 8) {
    message('info', 'セーブタイトルは8文字以内にしてください', 3000);
    return;
  }
  // 保存するもの
  const dataToSave = {
    title: title,
    data: globalGameState,
  };
  // localStrageに'saveSlot_1', 'saveSlot_2'のように保存
  const key = `saveSlot_${slotNumber}`;
  // オブジェクトをJSON文字列に変換して保存
  localStorage.setItem(key, JSON.stringify(dataToSave));

  // 保存後にセーブタイトルの表示を更新
  loadSaveTitle('.save-slot');
  message('success', `データを保存しました。`, 2000);
}

export function loadSaveTitle(slotSelector) {
  const saveSlots = document.querySelectorAll(slotSelector);

  saveSlots.forEach((slot, index) => {
    const slotNumber = index + 1;
    const key = `saveSlot_${slotNumber}`;
    const savedDataString = localStorage.getItem(key);

    let dataSpan;
    let saveButton;

    // slot要素のクラス名に応じて、対象となる要素を特定する
    if (slot.matches('.save-slot')) {
      // gameの保存の場合
      dataSpan = slot.querySelector('.save-slot-data');
      saveButton = slot.querySelector('.save-slot-button');
    } else if (slot.matches('.top-save-data-button')) {
      // Topページの場合
      dataSpan = slot.querySelector('span');
      saveButton = null; // 「上書き」とかのボタンはない
    } else {
      // 想定外 -> スキップ
      return;
    }

    if (savedDataString) {
      // データがある場合
      const savedData = JSON.parse(savedDataString);
      dataSpan.textContent = `DAY ${savedData.data.gameState.day} - ${savedData.title}`;
      if (saveButton) {
        saveButton.textContent = '上書き保存';
      }
    } else {
      // データがない場合
      dataSpan.textContent = 'データなし';
      if (saveButton) {
        saveButton.textContent = 'ここに保存';
      }
    }
  });
}

import { setGlobalGameState } from './gameState.js';

export function loadGame(slotNumber) {
  const key = `saveSlot_${slotNumber}`;
  const savedDataString = localStorage.getItem(key);

  if (savedDataString) {
    const savedData = JSON.parse(savedDataString);
    setGlobalGameState(savedData.data);
    message('success', `データをロードしました。`, 3000);
    return true;
  } else {
    message('warning', 'セーブデータがありません。', 3000);
    return false;
  }
}