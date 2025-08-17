// explore.js
const explorePlacesData = {
  path1: {
    name: '最果ての島',
    items: {
      scrap_iron: 10,
    }
  },
  path2: {
    name: 'これは見えないはず',
  },
  path3: {
    name: '海底渓谷',
  },
  path4: {
    name: '静寂の浅瀬',
  },
  path5: {
    name: '霧の湿地帯',
  },
  path6: {
    name: '忘れられた遺跡',
  },
  path7: {
    name: '大陸周辺部',
  },
  path8: {
    name: '海の孤島',
  },
  path9: {
    name: '遥かなる大洋',
  },
  path10: {
    name: '「汐凪の街」周辺',
    fishable: true, // 釣りが可能か
    images: 'undersea.avif',
    story: [
      { text: '崩れかけているビルの上部から、中に入ってみた。' },
      { text: 'ビルの中は静かだった。' },
    ],
    itemsWeight: {
      scrap_iron: 10,
      wood: 6,
    },
    itemsRoll: {
      base: 1, // 最低保証
      rate: 5, // n%の確率（一括で設定、10か20を想定）で増加するのをこの回数分繰り返す
    }
  },
  path11: {
    name: '青の諸島',
  },
  path12: {
    name: '「天を突く山」周辺',
  },
  path13: {
    name: '水晶の洞窟',
  }
}

import { changeBackgroundImage } from './module/scenarioAction.js';
import { changeModal } from './module/changeModal.js';

let itemsDataCache = null;
async function getItemsData() {
  if (!itemsDataCache) {
    const response = await fetch('item.json');
    itemsDataCache = await response.json();
  }
  return itemsDataCache;
}

export function explore(path) {
  // 背景画像を設定してmodalを表示
  const placeData = explorePlacesData[path];
  changeModal('explore');
  changeBackgroundImage('explore', placeData.images);
  // ストーリーを表示
  const storyContainer = document.getElementById('explore-text');
  storyContainer.innerHTML = '';
  let exploreIndex = 0;
  storyContainer.textContent = placeData.story[exploreIndex].text;
  // 獲得アイテム表示用
  let isShowingItems = false;
  let getItemMessages = [];
  let messageIndex = 0;

  // 更新用
  document.getElementById('modal-explore').addEventListener('click', async () => {
    if (!isShowingItems) {
      exploreIndex++;
      if (exploreIndex < placeData.story.length) {
        storyContainer.textContent = placeData.story[exploreIndex].text;
      } else {
        // ストーリーが終わった -> アイテム獲得処理
        isShowingItems = true;
        const getItemsList = getItems(placeData);
        // 獲得アイテムを種類ごとに集計
        const itemsCount = getItemsList.reduce((count, item) => {
          count[item] = (count[item] || 0) + 1;
          return count;
        }, {});
        // 集計結果をメッセージに変換して配列に格納
        for (const item in itemsCount) {
          const number = itemsCount[item];
          const itemData = await getItemsData();
          const itemName = itemData.find(i => i.id === item).name;
          getItemMessages.push(`${itemName}を${number}個、獲得した！`);
        }
        // 最初のメッセージを表示
        if (getItemMessages.length > 0) {
          storyContainer.textContent = getItemMessages[messageIndex];
        } else {
          // アイテムが一つもなかった場合
          storyContainer.textContent = 'しかし、めぼしいものは見つからなかった...';
        }
      }
    } else {
      // アイテムメッセージを順次表示
      messageIndex++;
      if (messageIndex < getItemMessages.length) {
        storyContainer.textContent = getItemMessages[messageIndex];
      } else if (messageIndex === getItemMessages.length) {
        // 全てのメッセージを表示し終えた -> 本日の探索は終了
        changeModal('game');
      }
    }
  });
};

function getItems(placeData) {
  const itemsList = [];
  // アイテム獲得回数を計算
  let itemsRollCount = 0;
  itemsRollCount += placeData.itemsRoll.base;
  for (let i = 0; i < placeData.itemsRoll.rate; i++) {
    if (Math.random() < 0.2) { // 20%の確率で増加
      itemsRollCount++;
    }
  }
  console.log(`${itemsRollCount}回のアイテム抽選を行います`);
  // 全体の重みを計算
  let totalWeight = 0;
  for (const item in placeData.itemsWeight) {
    totalWeight += placeData.itemsWeight[item];
  }
  // 獲得アイテムを抽選
  for (let i = 0; i < itemsRollCount; i++) {
    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0;
    
    for (const item in placeData.itemsWeight) {
      currentWeight += placeData.itemsWeight[item];
      if (randomValue < currentWeight) {
        itemsList.push(item);
        break;
      }
    }
  }
  return itemsList;
}