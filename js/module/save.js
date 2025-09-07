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





// セーブデータのダウンロード・アップロード
export async function downloadGameData() {
  const dataToExport = {};
  // localStorageのkeyを取得
  const keysToExport = ['ending', 'achievement'];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('saveSlot_')) {
      keysToExport.push(key);
    }
  }
  keysToExport.forEach(key => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      dataToExport[key] = value;
    }
  });
  //データがない -> 処理を中断
  if (Object.keys(dataToExport).length === 0) {
    message('error', 'バックアップするデータがありません。', 3000);
    return;
  }
  // JSONデータを文字列として用意
  const dataPart = JSON.stringify(dataToExport, null, 2);
  // SHA-256を計算
  const encoder = new TextEncoder();
  const data = encoder.encode(dataPart);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // データとハッシュを結合
  const fileContent = `----BEGIN DATA----
${dataPart}
----END DATA----
----HASH----
${hashHex}
----END HASH----`;
  // ダウンロードを実行
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  // ファイル名
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  a.download = `BlueHorizon_gameData_${formattedDate}.txt`;
  document.body.appendChild(a);
  a.click();
  // 後処理
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  message('success', '保存ファイルをダウンロードしました。', 3000);
}

export function uploadGameData(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  // 読み込み成功
  reader.onload = async (e) => {
    const fileContent = e.target.result;
    // ハッシュをチェック
    const { isValid, data } = await checkHash(fileContent);
    if (!isValid) {
      message('error', 'データファイルが変更された可能性があります', 3000);
      event.target.value = '';
      return;
    }
    try {
      const importedData = JSON.parse(data);
      // 復元する前に最終確認
      if (!confirm('現在のセーブデータを上書きして、ファイルから復元しますか？この操作は元に戻せません。')) {
        // valueをクリア
        event.target.value = '';
        return;
      }
      // データをlocalStorageに書き込む
      for (const key in importedData) {
        // オブジェクト自身のプロパティか確認
        if (Object.prototype.hasOwnProperty.call(importedData, key)) {
          localStorage.setItem(key, importedData[key]);
        }
      }
      message('success', 'データを復元しました', 3000);
      // セーブタイトルの表示を更新
      loadSaveTitle('.save-slot');
      loadSaveTitle('.top-save-data-button');
    } catch (error) {
      message('error', 'ファイルの解析に失敗しました', 3000);
    } finally {
      // valueをクリア
      event.target.value = '';
    }
  };
  // 読み込み失敗
  reader.onerror = () => {
    message('error', 'ファイルの読み込みに失敗しました。', 3000);
    event.target.value = '';
  };
  reader.readAsText(file);
}
async function checkHash(fileContent) {
  // 正規表現でハッシュ部分を抽出
  const match = fileContent.match(/----BEGIN DATA----([\s\S]*?)----END DATA----[\r\n]+----HASH----([\s\S]*?)----END HASH----/);
  if (!match) {
    message('error', '想定されていないファイル形式です', 3000);
    return { isValid: false, data: null };
  }
  const dataPart = match[1].trim(); // データ部分
  const hashPart = match[2].trim(); // ハッシュ値
  // データ部分からハッシュ値を再計算
  const encoder = new TextEncoder();
  const data = encoder.encode(dataPart);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  // ArrayBufferを16進数の文字列に変換
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // ファイルのハッシュ値と再計算したハッシュ値を比較
  if (calculatedHashHex === hashPart) {
    // 一致
    return { isValid: true, data: dataPart };
  } else {
    // 不一致
    return { isValid: false, data: null };
  }
}