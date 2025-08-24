// explore.js
const explorePlacesData = {
  path1: {
    name: '最果ての島',
    fishable: true,
    images: 'island.avif',
    story: [
      { text: "激しい嵐を抜け、セレスティア号はついに最果ての島へとたどり着いた。" },
      { text: "ごつごつとした岩肌が海面から突き出し、荒波が絶えず打ちつけている。" },
      { text: "島の浜辺に、何か金属製のコンテナのようなものが打ち上げられているのが見えた。",
        choice: [
          { text: "コンテナを調べる", action: "nomal" },
          { text: "釣りをする", action: "fishing" }
        ]
      },
      { text: "セレスティア号を慎重に浜辺へと近づけ、アームを伸ばす。" },
      { text: "分厚い扉は固く閉ざされていたが、力を込めると、鈍い音を立てて開いた。" }
    ],
    itemsWeight: {
      scrap_iron: 1,
      wood: 1,
      fiber_rope: 1,
      copper_wire_cable: 1,
      titanium_alloy_plate: 1,
      activated_carbon: 1,
      crystal_ore: 1,
      circuit_board: 1,
    },
    itemsWeightInFishing: {
      scrap_iron: 1,
      wood: 1,
      fiber_rope: 1,
      copper_wire_cable: 1,
      titanium_alloy_plate: 1,
      activated_carbon: 1,
      crystal_ore: 1,
      circuit_board: 1,
      fish_1: 2,
      fish_2: 3,
      squid: 3,
    },
    itemsRoll: {
      base: 4,
      rate: 4,
    }
  },
  path2: {
    name: 'これは見えないはず', // これはデータこれ以上書かない
  },
  path3: {
    name: '海底渓谷',
    fishable: true,
    images: 'seabed.avif',
    story: [
      { text: 'セレスティア号は、深く切り立った崖の間をゆっくりと進んでいく。' },
      { text: 'ソナーが示す地形は複雑で、両側に迫る巨大な岩壁が圧迫感を与える。' },
      { text: 'かつては川だったのだろうか。想像もつかないほどの時間が、この景色を創り上げたのかもしれない。' },
      {
        text: 'ふと、崖の途中に不自然な影が見えた。',
        choice: [
          { text: '崖を調べる', action: 'nomal' },
          { text: '釣りをする', action: 'fishing' },
        ]
      },
      { text: '慎重に機体を寄せ、ライトで影の正体を照らし出す。' },
      { text: 'それは岩の裂け目に挟まった、人工物の残骸だった。' },
      { text: 'かつてこの渓谷に架かっていた橋の一部だろうか。' },
      { text: 'セレスティア号のアームを慎重に伸ばし、掴み取る。' },
      { text: 'ごとり、と鈍い音を立てて、錆びついた塊がアームに収まった。' },
    ],
    itemsWeight: { // 20
      scrap_iron: 5,
      copper_wire_cable: 5,
      titanium_alloy_plate: 5,
      circuit_board: 5,
    },
    itemsWeightInFishing: {
      scrap_iron: 5,
      copper_wire_cable: 5,
      titanium_alloy_plate: 5,
      circuit_board: 5,
      fish_2: 10,
      squid: 10,
    },
    itemsRoll: {
      base: 3,
      rate: 2,
    }
  },
  path4: {
    name: '静寂の浅瀬',
    images: 'undersea.avif',
    story: [
      { text: 'セレスティア号の窓から、穏やかな海底に光のカーテンが揺れているのが見える。' },
      { text: 'ここは「静寂の浅瀬」。かつては海岸沿いの小さな町だった場所だ。' },
      { text: '砂に埋もれたアスファルトの道に沿って進むと、錆びついたバス停がぽつんと佇んでいた。' },
      {
        text: '屋根には藻が付着し、静かな海の住処となっている。',
        choice: [
          { text: 'バス停を調べる', action: 'nomal' },
          { text: '釣りをする', action: 'fishing' },
        ]
      },
      { text: 'セレスティア号をゆっくりと近づける。' },
      { text: 'ベンチの下のあたり、砂に半分埋もれるようにして、小さな収納ボックスのようなものが見えた。' },
      { text: 'アームで慎重にボックスを引き寄せる。' },
      { text: '固く閉ざされた蓋をこじ開けると、中から小さな包みが出てきた。' },
      ],
    fishable: true,
    itemsWeight: { // 25
      scrap_iron: 5,
      wood: 5,
      fiber_rope: 5,
      copper_wire_cable: 2,
      activated_carbon: 5,
      titanium_alloy_plate: 2,
      circuit_board: 1,
    },
    itemsWeightInFishing: {
      scrap_iron: 5,
      wood: 5,
      fiber_rope: 5,
      copper_wire_cable: 2,
      activated_carbon: 5,
      titanium_alloy_plate: 2,
      circuit_board: 1,
      fish_1: 15,
      fish_2: 5,
      squid: 5,
    },
    itemsRoll: {
      base: 2,
      rate: 2,
    }
  },
  path5: {
    name: '霧の湿地帯',
    fishable: true,
    images: 'shicchi.webp',
    story: [
      { text: "ここは「霧の湿地帯」。かつて生い茂っていた木々が、今は不気味な墓標のように立ち並んでいる。" },
      { text: "立ち枯れた木々の間を縫うように進んでいると、ひときわ大きな木の根元に何かが引っかかっているのが見えた。",
        choice: [
          { text: "根元を調べる", action: "nomal" },
          { text: "釣りをする", action: "fishing" }
        ]
      },
      { text: "セレスティア号を慎重に近づけ、絡みついた水草をアームで取り払う。" },
      { text: "泥の中から姿を現したのは、古びた防水コンテナだった。" },
      { text: "アームでこじ開けると、中から何かが出てきた。" }
    ],
    itemsWeight: { // 25
      scrap_iron: 1,
      wood: 7,
      fiber_rope: 7,
      copper_wire_cable: 1,
      activated_carbon: 7,
      titanium_alloy_plate: 1,
      circuit_board: 1,
    },
    itemsWeightInFishing: {
      scrap_iron: 1,
      wood: 7,
      fiber_rope: 7,
      copper_wire_cable: 1,
      activated_carbon: 7,
      titanium_alloy_plate: 1,
      circuit_board: 1,
      fish_1: 10,
      fish_2: 8,
      squid: 7,
    },
    itemsRoll: {
      base: 2,
      rate: 3,
    }
  },
  path6: {
    name: '忘れられた遺跡',
    fishable: true,
    itemsWeight: { // 40
      scrap_iron: 10,
      wood: 6,
      fiber_rope: 5,
      copper_wire_cable: 3,
      titanium_alloy_plate: 6,
      circuit_board: 10,
    },
    itemsWeightInFishing: {
      scrap_iron: 10,
      wood: 6,
      fiber_rope: 5,
      copper_wire_cable: 3,
      titanium_alloy_plate: 6,
      circuit_board: 10,
      fish_2: 20,
      squid: 20,
    },
    itemsRoll: {
      base: 3,
      rate: 4,
    }
  },
  path7: {
    name: '大陸周辺部',
    fishable: false,
    itemsWeight: { // 32
      scrap_iron: 7,
      wood: 5,
      fiber_rope: 3,
      copper_wire_cable: 7,
      titanium_alloy_plate: 7,
      activated_carbon: 2,
      circuit_board: 1,
    },
    itemsRoll: {
      base: 3,
      rate: 2,
    }
  },
  path8: {
    name: '海の孤島',
    fishable: true,
    images: 'island2.avif',
    itemsWeight: { // 17
      scrap_iron: 5,
      wood: 5,
      titanium_alloy_plate: 2,
      activated_carbon: 5,
    },
    itemsWeightInFishing: {
      scrap_iron: 5,
      wood: 5,
      titanium_alloy_plate: 2,
      activated_carbon: 5,
      fish_1: 10,
      fish_2: 5,
      squid: 2,
    },
    itemsRoll: {
      base: 2,
      rate: 2,
    }
  },
  path9: {
    name: '遥かなる大洋',
    fishable: true,
    images: 'horizon1.webp',
    story: [
      { text: 'セレスティア号は、どこまでも続く蒼い世界を静かに進んでいく。' },
      { text: '窓の外には、ただただ広大な海が広がっている。' },
      { text: 'ふと、ソナーが微かな反応を捉えた。こんな宙域に何があるというのだろう。',
        choice: [
          { text: '調査する', action: 'nomal' },
          { text: '釣りをする', action: 'fishing' },
        ]
      },
      { text: 'そこにあったのは、巨大な輸送船の残骸だった。' },
      { text: '船体は半ばで折れ、見るも無惨な姿を晒している。' },
      { text: '船倉だったと思われる場所に、ぽっかりと空いた穴がある。' },
      { text: 'セレスティア号のアームを慎重に伸ばして穴の奥を探ると、指先に硬い感触があった。' },
    ],
    itemsWeight: { // 20
      scrap_iron: 5,
      copper_wire_cable: 5,
      titanium_alloy_plate: 5,
      circuit_board: 5,
    },
    itemsWeightInFishing: {
      scrap_iron: 5,
      copper_wire_cable: 5,
      titanium_alloy_plate: 5,
      circuit_board: 5,
      fish_1: 5,
      fish_2: 7,
      squid: 8,
    },
    itemsRoll: {
      base: 3,
      rate: 2,
    }
  },
  path10: {
    name: '「汐凪の街」周辺',
    fishable: true, // 釣りが可能か
    images: 'undersea.avif',
    story: [
      { text: 'セレスティア号の窓から、見慣れた街の残骸が流れていく。' },
      { text: '街の周辺は、もう何度も潜った場所だ。' },
      { text: '機体をゆっくりと進めていると、いつも目にする半壊したオフィスビルの前にたどり着いた。' },
      {
        text: 'ぽっかりと口を開けたエントランスが、静かにこちらを窺っている。',
        choice: [
          { text: '辺りを探索する', action: 'nomal' },
          { text: '釣りをする', action: 'fishing' },
        ]
      },
      { text: '慎重にビルの中へ入る。' },
      { text: '海水に満たされたフロアは、奇妙なほど静まり返っていた。' },
      { text: 'ひっくり返った事務机、錆びついたキャビネット……。' },
      { text: '壁際にあったロッカーに目が留まる。扉が少しだけ開いているようだ。' },
      { text: 'セレスティア号のアームでこじ開けると、中から何かが出てきた。' },
    ],
    itemsWeight: {
      scrap_iron: 18,
      wood: 12,
      fiber_rope: 8,
      copper_wire_cable: 3,
      titanium_alloy_plate: 2,
      activated_carbon: 4,
      crystal_ore: 1,
      circuit_board: 2, // 6%の確率で30回試行時に4つ以上手に入る <- 40の時、今は50
    },
    itemsWeightInFishing: {
      scrap_iron: 18,
      wood: 12,
      fiber_rope: 8,
      copper_wire_cable: 3,
      titanium_alloy_plate: 2,
      activated_carbon: 4,
      crystal_ore: 1,
      circuit_board: 2,
      fish_1: 30,
      fish_2: 12,
      squid: 8,
    },
    itemsRoll: {
      base: 1, // 最低保証
      rate: 3, // n%の確率（一括で設定、10か20を想定）で増加するのをこの回数分繰り返す
    },
    memoryPiece: [5], // 記憶の欠片のID
    memoryPieceRate: 0.5, // 記憶の欠片の出現確率
  },
  path11: {
    name: '青の諸島',
    fishable: true,
    images: 'island2.avif',
    itemsWeight: { // 17
      scrap_iron: 5,
      wood: 5,
      titanium_alloy_plate: 2,
      activated_carbon: 5,
    },
    itemsWeightInFishing: {
      scrap_iron: 5,
      wood: 5,
      titanium_alloy_plate: 2,
      activated_carbon: 5,
      fish_2: 12,
      squid: 5,
    },
    itemsRoll: {
      base: 3,
      rate: 4,
    }
  },
  path12: {
    name: '「天を突く山」周辺',
    fishable: false,
    images: 'mountain.webp',
    story: [
      { text: 'セレスティア号を降りて、内陸で探索を続ける' },
      { text: '今でさえこの山は高く、その頂上は雲の上にある。' },
      { text: 'きっと「蒼い沈黙」前はもっと、人のいる土地から遠く、離れ、高かった場所なのだろう。' },
      { text: '何の痕跡もない中、私は歩き続けた。' },
      { text: 'しばらく歩くと、横の山肌から何かが見えた。' },
    ],
    itemsWeight: { // 32
      scrap_iron: 7,
      wood: 5,
      fiber_rope: 3,
      copper_wire_cable: 7,
      titanium_alloy_plate: 7,
      activated_carbon: 2,
      circuit_board: 1,
    },
    itemsRoll: {
      base: 2,
      rate: 3,
    }
  },
  path13: {
    name: '水晶の洞窟',
    fishable: true,
    images: 'cave.avif',
    story: [
      { text: 'セレスティア号のライトが、暗い洞窟の壁を照らし出す。' },
      { text: '壁一面にびっしりと生えた水晶が光を乱反射させ、辺りは幻想的な蒼い光に包まれていた。',
        choice: [
          { text: '根本を調べる', action: 'nomal' },
          { text: '釣りをする', action: 'fishing' },
        ]
      },
      { text: 'しばらく進むと、ひときわ大きく輝く水晶のクラスターが目に留まった。' },
      { text: 'その根本に、何か人工物のようなものが埋まっているのが見える。' },
      { text: '慎重にセレスティア号を寄せ、アームを伸ばす。' },
      { text: '水晶を傷つけないようにゆっくりと掘り返していくと、中から何かが姿を現した。' },
    ],
    itemsWeight: { // 25
      scrap_iron: 4,
      fiber_rope: 3,
      copper_wire_cable: 2,
      titanium_alloy_plate: 3,
      crystal_ore: 12,
      circuit_board: 1,
    },
    itemsWeightInFishing: {
      scrap_iron: 4,
      fiber_rope: 3,
      copper_wire_cable: 2,
      titanium_alloy_plate: 3,
      crystal_ore: 12,
      circuit_board: 1,
      fish_1: 10,
      fish_2: 8,
      squid: 7,
    },
    itemsRoll: {
      base: 2,
      rate: 3,
    }
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
import { getMemoryPieces, setUpMemoryPiece } from './module/memoryPieces.js';

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
  let isGetMemoryPiece = false;
  let memoryPieceId = null;

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
  
        // 記憶の欠片の獲得
        const memoryPiece = getMemoryPieces(placeData.memoryPiece, placeData.memoryPieceRate);
        if (memoryPiece) {
          // 獲得した場合は、メッセージ配列の末尾に追加
          getItemMessages.push(`記憶の欠片${memoryPiece.id} - 「${memoryPiece.name}」を獲得した！`);
          isGetMemoryPiece = true;
          memoryPieceId = memoryPiece.id;
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
        // 記憶の欠片の獲得
        if (isGetMemoryPiece) {
          changeModal('memoryPiece');
          setUpMemoryPiece(memoryPieceId);
          initGame();
          return;
        }
        // 記憶の欠片がない場合
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

      // 記憶の欠片の獲得
      const memoryPiece = getMemoryPieces(placeData.memoryPiece, placeData.memoryPieceRate);
      if (memoryPiece) {
        // 獲得した場合は、メッセージ配列の末尾に追加
        getItemMessages.push(`記憶の欠片${memoryPiece.id} - 「${memoryPiece.name}」を獲得した！`);
        isGetMemoryPiece = true;
        memoryPieceId = memoryPiece.id;
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