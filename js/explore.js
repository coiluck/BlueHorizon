// explore.js
const explorePlacesData = {
  path1: {
    name: '最果ての島',
    fishable: true,
    items: {
      scrap_iron: 10,
    }
  },
  path2: {
    name: 'これは見えないはず', // これはデータこれ以上書かない
  },
  path3: {
    name: '海底渓谷',
    fishable: true,
  },
  path4: {
    name: '静寂の浅瀬',
    fishable: true,
  },
  path5: {
    name: '霧の湿地帯',
    fishable: true,
  },
  path6: {
    name: '忘れられた遺跡',
    fishable: true,
  },
  path7: {
    name: '大陸周辺部',
    fishable: false,
  },
  path8: {
    name: '海の孤島',
    fishable: true,
  },
  path9: {
    name: '遥かなる大洋',
    fishable: true,
    images: 'horizon1.webp',
    story: [
      { text: 'この海は、深くて暗い。' },
      { text: '海の向こうには、何かがあるようだ。' },
    ],
    itemsWeight: {
      scrap_iron: 10,
    },
    itemsRoll: {
      base: 1,
      rate: 5,
    }
  },
  path10: {
    name: '「汐凪の街」周辺',
    fishable: true, // 釣りが可能か
    images: 'undersea.avif',
    story: [
      { text: '「汐凪の街」周辺の、崩れかけたビルについた。' },
      { text: '「汐凪の街」周辺の、崩れかけたビルについた。',
        choice: [
          { text: 'ビルの中に入ってみる', action: 'nomal' },
          { text: '釣りをする', action: 'fishing' },
        ]
       },
      { text: '崩れかけているビルの上部から、中に入ってみた。' },
      { text: 'ビルの中は静かだった。' },
      { text: 'そのまま、ビルの中を歩いていくと、ある部屋にたどり着いた。' },
    ],
    itemsWeight: {
      scrap_iron: 10,
      wood: 6,
    },
    itemsWeightInFishing: {
      scrap_iron: 10,
      wood: 6,
      fish_1: 10,
      fish_2: 3,
      squid: 3,
    },
    itemsRoll: {
      base: 1, // 最低保証
      rate: 5, // n%の確率（一括で設定、10か20を想定）で増加するのをこの回数分繰り返す
    }
  },
  path11: {
    name: '青の諸島',
    fishable: true,
  },
  path12: {
    name: '「天を突く山」周辺',
    fishable: false,
  },
  path13: {
    name: '水晶の洞窟',
    fishable: false,
  }
}

const fishingStory = [
  { text: '海に糸を垂らしてみた...' },
  { text: 'しばらくすると、ググッと強い引きがあった！' },
  { text: 'うまく引き上げることができた！' },
];

import { changeBackgroundImage } from './module/scenarioAction.js';
import { changeModal } from './module/changeModal.js';
import { globalGameState } from './module/gameState.js';
import { initGame } from './game.js';

let itemsDataCache = null;
async function getItemsData() {
  if (!itemsDataCache) {
    const response = await fetch('item.json');
    itemsDataCache = await response.json();
  }
  return itemsDataCache;
}

// イベントリスナーを管理するための変数
let currentExploreListener = null;

export async function explore(path) {
  // DOM要素を取得
  const modal = document.getElementById('modal-explore');
  const storyContainer = document.getElementById('explore-text');
  const choiceContainer = document.getElementById('explore-choices-container');

  const placeData = explorePlacesData[path];

  // 古いリスナーを削除
  if (currentExploreListener) {
    modal.removeEventListener('click', currentExploreListener);
  }

  // 初期設定
  changeModal('explore');
  changeBackgroundImage('explore', placeData.images);
  storyContainer.innerHTML = '';
  choiceContainer.innerHTML = '';

  // 状態を管理する変数
  let exploreIndex = 0;
  let fishingIndex = 0;
  let isShowingItems = false;
  let isFishing = false;
  let getItemMessages = [];
  let messageIndex = 0;

  // 現在のストーリーと選択肢を表示する関数
  const displayStep = () => {
    const currentStep = placeData.story[exploreIndex];
    storyContainer.textContent = currentStep.text;
    choiceContainer.innerHTML = ''; // 古い選択肢をクリア

    // fishableがtrueで、かつchoiceが存在する場合にボタンを表示
    if (placeData.fishable && currentStep.choice) {
      currentStep.choice.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('explore-choice-button');
        button.classList.add('blur');
        button.textContent = choice.text;
        button.addEventListener('click', (event) => {
          // 親要素のモーダルクリックイベントを発火させないようにする
          event.stopPropagation();
          if (choice.action === 'nomal') {
            exploreIndex++;
            displayStep(); // 通常ストーリーを次に進める
          } else if (choice.action === 'fishing') {
            isFishing = true;
            displayFishingStep(); // 釣りストーリーを開始
          }
        });
        choiceContainer.appendChild(button);
      });
    }
  };

  // 釣りストーリーを表示する関数
  const displayFishingStep = () => {
    choiceContainer.innerHTML = ''; // 釣り中は選択肢を非表示
    if (fishingIndex < fishingStory.length) {
      storyContainer.textContent = fishingStory[fishingIndex].text;
    }
  };

  // モーダルがクリックされたときのメインの処理
  currentExploreListener = async () => {
    // 釣り中の処理
    if (isFishing) {
      fishingIndex++;
      if (fishingIndex < fishingStory.length) {
        displayFishingStep();
      } else {
        // 釣りストーリーが終了 -> アイテム獲得処理（特殊な重みを生成して使用）へ
        isShowingItems = true;
        isFishing = false;
        const getItemsList = await getItemsInFishing(placeData);
        const itemsCount = getItemsList.reduce((count, item) => {
          count[item] = (count[item] || 0) + 1;
          return count;
        }, {});

        // gameStateに反映
        for (const item in itemsCount) {
          if (globalGameState.gameState.items.hasOwnProperty(item)) {
            globalGameState.gameState.items[item] += itemsCount[item];
          } else {
            alert('アイテムが見つかりませんでした');
          }
        }
  
        const itemData = await getItemsData();
        for (const item in itemsCount) {
          const number = itemsCount[item];
          const itemName = itemData.find(i => i.id === item).name;
          getItemMessages.push(`${itemName}を${number}個、獲得した！`);
        }
  
        if (getItemMessages.length > 0) {
          storyContainer.textContent = getItemMessages[0];
        } else {
          storyContainer.textContent = 'しかし、めぼしいものは見つからなかった...';
          // アイテムがない場合でも、次のクリックで終了するようにダミーを入れる
          getItemMessages.push(null);
        }
      }
      return;
    }

    // アイテム表示中の処理
    if (isShowingItems) {
      messageIndex++;
      if (messageIndex < getItemMessages.length) {
        storyContainer.textContent = getItemMessages[messageIndex];
      } else {
        initGame();
        changeModal('game');
      }
      return;
    }

    // 通常ストーリー進行中の処理
    // 現在のステップに選択肢がある場合は、ボタンが押されるまで待機
    if (placeData.story[exploreIndex].choice && placeData.fishable) {
      return;
    }

    exploreIndex++;
    if (exploreIndex < placeData.story.length) {
      displayStep();
    } else {
      // ストーリーが終了 -> アイテム獲得処理へ
      isShowingItems = true;
      const getItemsList = getItems(placeData);
      const itemsCount = getItemsList.reduce((count, item) => {
        count[item] = (count[item] || 0) + 1;
        return count;
      }, {});

      // gameStateに反映
      for (const item in itemsCount) {
        if (globalGameState.gameState.items.hasOwnProperty(item)) {
          globalGameState.gameState.items[item] += itemsCount[item];
        }
      }

      const itemData = await getItemsData();
      for (const item in itemsCount) {
        const number = itemsCount[item];
        const itemName = itemData.find(i => i.id === item).name;
        getItemMessages.push(`${itemName}を${number}個、獲得した！`);
      }

      if (getItemMessages.length > 0) {
        storyContainer.textContent = getItemMessages[0];
      } else {
        storyContainer.textContent = 'しかし、めぼしいものは見つからなかった...';
        // アイテムがない場合でも、次のクリックで終了するようにダミーを入れる
        getItemMessages.push(null);
      }
    }
  };

  // イベントリスナーを登録
  modal.addEventListener('click', currentExploreListener);

  // 最初のステップを表示
  displayStep();
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

async function getItemsInFishing(placeData) {
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
  for (const item in placeData.itemsWeightInFishing) {
    totalWeight += placeData.itemsWeightInFishing[item];
  }
  // 獲得アイテムを抽選
  for (let i = 0; i < itemsRollCount; i++) {
    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0;
    
    for (const item in placeData.itemsWeightInFishing) {
      currentWeight += placeData.itemsWeightInFishing[item];
      if (randomValue < currentWeight) {
        itemsList.push(item);
        break;
      }
    }
  }
  // sonarのアップグレードボーナス
  if (globalGameState.gameState.CelestiaUpgrade.sonar > 0) {
    const BonusProbability = 20 + (globalGameState.gameState.CelestiaUpgrade.sonar - 1) * 30; // 20%か30%
    if (Math.random() * 100 < BonusProbability) {
      const allItemData = await getItemsData();
      const bonusItems = []; // itemsListの食べ物のみここに保管
      for (let i = 0; i < itemsList.length; i++) {
        const currentItemId = itemsList[i];
        const foundItem = allItemData.find(itemDetail => itemDetail.id === currentItemId);
        if (foundItem && foundItem.type === 'consumable') {
          bonusItems.push(currentItemId);
        }
      }
      for (let i = 0; i < bonusItems.length; i++) {
        itemsList.push(bonusItems[i]);
      }
    }
  }
  return itemsList;
}