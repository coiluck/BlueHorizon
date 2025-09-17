// ending.js
const EndingData = {
  loadToTruth: {
    name: '真実への道標',
    requirements: [
      '記憶の欠片を10個すべて集める',
      '希望が70以上',
      'セレスティア号の性能が最大',
      '浄水装置を1つ以上所持'
    ],
    scenario: 1,
    firstImage: './assets/images/horizon2.webp'
  },
  lastingDays: {
    name: '続く日常',
    requirements: [
      '記憶の欠片を7個以上集める',
      '希望が50以上',
      '浄水装置を1つ以上所持'
    ],
    scenario: 2,
    firstImage: './assets/images/city.avif'
  },
  hometown: {
    name: '故郷への帰還',
    requirements: ['浄水装置を1つ以上所持',],
    scenario: 3,
    firstImage: './assets/images/city.avif'
  },
  seek: {
    name: '飽くなき探求心',
    requirements: [
      '浄水装置を所持していない',
      '記憶の欠片を7個以上集める'
    ],
    scenario: 4,
    firstImage: './assets/images/undersea.avif'
  },
  blueDespair: {
    name: '蒼い絶望',
    requirements: [
      '希望か満腹度が0以下'
    ],
    scenario: 5,
    firstImage: './assets/images/ending/sea1.webp'
  },
  outOfTime: {
    name: '時は止まらず',
    requirements: ['30日が経過した'],
    scenario: 6,
    firstImage: './assets/images/ending/sea2.avif'
  },
};

import { globalGameState } from './module/gameState.js';
import { checkEndingAchievement } from './module/Addachieve.js';

export function checkEndingType() {
  let EndingType = null;

  // バットエンドは最初にチェックしないとうまくいかない
  if (globalGameState.gameState.hope <= 0 ||
    globalGameState.gameState.hunger <= 0) {
    // 青い絶望
    EndingType = 'blueDespair';
  } else if (globalGameState.gameState.memoryPieceArray.length >= 10 &&
    globalGameState.gameState.hope >= 70 &&
    globalGameState.gameState.CelestiaUpgrade.engine >= 2 &&
    globalGameState.gameState.CelestiaUpgrade.sonar >= 2 &&
    globalGameState.gameState.CelestiaUpgrade.arm >= 2 &&
    globalGameState.gameState.CelestiaUpgrade.fuel >= 2 &&
    globalGameState.gameState.CelestiaUpgrade.living >= 2 &&
    globalGameState.gameState.items['water_purifier'] >= 1) {
    // 真実への道標
    EndingType = 'loadToTruth';
  } else if (globalGameState.gameState.memoryPieceArray.length >= 7 &&
    globalGameState.gameState.hope >= 50 &&
    globalGameState.gameState.items['water_purifier'] >= 1) {
    // 続く日常
    EndingType = 'lastingDays';
  } else if (globalGameState.gameState.items['water_purifier'] >= 1) {
    // 故郷への帰還
    EndingType = 'hometown';
  } else if (globalGameState.gameState.items['water_purifier'] <= 0 &&
    globalGameState.gameState.memoryPieceArray.length >= 7) {
    // 飽くなき探求心
    EndingType = 'seek';
  } else if (globalGameState.gameState.day >= 30) {
    // 時は止まらず
    EndingType = 'outOfTime';
  } else {
    console.error('ending type is not set');
  }
  console.log(`EndingType: ${EndingType}`);
  goToEnding(EndingType);
  // 実績
  checkEndingAchievement(EndingType);
  // ローカルストレージに保存
  const currentEndings = JSON.parse(localStorage.getItem('ending')) || [];
  const scenarioId = EndingData[EndingType].scenario;
  if (!currentEndings.includes(scenarioId)) {
    currentEndings.push(scenarioId);
    localStorage.setItem('ending', JSON.stringify(currentEndings));
    console.log(`新しいエンディング ${scenarioId} を保存しました`);
  }
}

import { changeModal } from './module/changeModal.js';

function goToEnding(EndingType) {
  changeModal('ending');
  const endingData = EndingData[EndingType];
  document.getElementById('modal-ending').innerHTML = `
    <div class="ending-background-image">
      <img src="./assets/images/asase.avif" alt="エンディング背景画像">
    </div>
    <div id="ending-requirements-container"></div>
  `;
  const requirementsHTML = endingData.requirements.map(requirement => 
    `<div class="ending-requirement">${requirement}</div>`
  ).join('');
  document.getElementById('ending-requirements-container').innerHTML = `
    <div class="ending-title">${endingData.name}</div>
    <div class="ending-requirements">
      ${requirementsHTML}
    </div>
    <div class="ending-click-text">- 画面をクリックして次へ進む -</div>
  `;
  const scenarioType = EndingData[EndingType].scenario;
  switch (scenarioType) {
    case 1:
      Scenario = endingScenarioTYPE1;
      Choices = endingChoicesTYPE1;
      break;
    case 2:
      Scenario = endingScenarioTYPE2;
      Choices = endingChoicesTYPE2;
      break;
    case 3:
      Scenario = endingScenarioTYPE3;
      Choices = endingChoicesTYPE3;
      break;
    case 4:
      Scenario = endingScenarioTYPE4;
      Choices = endingChoicesTYPE4;
      break;
    case 5:
      Scenario = endingScenarioTYPE5;
      Choices = endingChoicesTYPE5;
      break;
    case 6:
      Scenario = endingScenarioTYPE6;
      Choices = endingChoicesTYPE6;
      break;
    default:
      console.error('Invalid scenario type:', scenarioType);
      return;
  }
  document.getElementById('modal-ending').addEventListener('click', () => {
    setUpEnding(EndingType);
  }, { once: true }); // これすごい、便利すぎる
}

function setUpEnding(EndingType) {
  changeModal('ending'); // フェードアウトしてから再度同じものを表示
  setTimeout(() => {
    document.getElementById('ending-requirements-container').innerHTML = '';
    document.getElementById('modal-ending').innerHTML += `
      <div class="text-container">
        <div id="ending-character-name"></div>
        <p id="ending-text">このメッセージは表示されないはずです</p>
      </div>
      <div id="ending-choices-container"></div>
    `;
    document.querySelector('.ending-background-image img').src = EndingData[EndingType].firstImage;
    document.getElementById('modal-ending').addEventListener('click', EndingClick);
    updateStory();
  }, 500);
}

// ストーリー表示用
import { endingScenarioTYPE1, endingChoicesTYPE1 } from './module/scenario.js';
import { endingScenarioTYPE2, endingChoicesTYPE2 } from './module/scenario.js';
import { endingScenarioTYPE3, endingChoicesTYPE3 } from './module/scenario.js';
import { endingScenarioTYPE4, endingChoicesTYPE4 } from './module/scenario.js';
import { endingScenarioTYPE5, endingChoicesTYPE5 } from './module/scenario.js';
import { endingScenarioTYPE6, endingChoicesTYPE6 } from './module/scenario.js';

let Scenario = null;
let Choices = null;
let endingStoryIndex = 0;
let isDisplayingSelection = false;
// 分岐用
let branchScenario = null;
let branchIndex = 0;

function EndingClick() {
  if (isDisplayingSelection) {
    return; // 選択肢表示中は選択肢ボタン以外受け付けない
  }
  updateStory();
}

function updateStory() {
  const isBranch = !!branchScenario;
  const currentScenario = isBranch ? branchScenario : Scenario;
  const currentIndex = isBranch ? branchIndex : endingStoryIndex;

  // 現在のシナリオが終了
  if (currentIndex >= currentScenario.length) {
    if (isBranch) {
      // 分岐ストーリー -> 共通ルートに復帰
      branchScenario = null;
      updateStory();
    } else {
      // 共通ルート -> ストーリー終了
      // ゲーム終了処理
      document.getElementById('modal-ending').classList.remove('fade-in');
      document.getElementById('modal-ending').classList.add('fade-out');
      setTimeout(() => {
        location.reload();
      }, 500);
    }
    return;
  }

  // 表示する現在のストーリーデータを取得
  const story = currentScenario[currentIndex];

  // テキストを表示
  document.getElementById('ending-text').textContent = story.text;

  // 発話者を表示
  if (story.speaker) {
    document.getElementById('ending-character-name').style.visibility = 'visible';
    document.getElementById('ending-character-name').textContent = story.speaker;
  } else {
    document.getElementById('ending-character-name').style.visibility = 'hidden';
  }

  // actionが設定されていれば実行
  if (typeof story.action === 'function') {
    story.action();
  }

  if (isBranch) {
    branchIndex++;
  } else {
    endingStoryIndex++;
  }

  // choiceIdが設定されていれば選択肢を表示
  if (story.choiceId) {
    displayChoices(story.choiceId);
  }
}

import { playSoundEffect } from './module/audio.js';

function displayChoices(choiceId) {
  isDisplayingSelection = true;

  document.getElementById('ending-choices-container').innerHTML = '';
  document.getElementById('ending-text').classList.remove('fade-in');
  document.getElementById('ending-choices-container').style.display = 'none';
  document.getElementById('ending-choices-container').style.pointerEvents = 'none';

  const choiceData = Choices[choiceId];
  if (!choiceData) {
    return;
  }

  choiceData.forEach(choice => {
    const button = document.createElement('button');
    button.classList.add('ending-choice-button');
    button.textContent = choice.buttonText;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      
      playSoundEffect('click1');
      
      isDisplayingSelection = false;
      document.getElementById('ending-choices-container').innerHTML = '';
      // 選択された分岐ストーリーをセット
      branchScenario = choice.branch;
      branchIndex = 0;
      
      updateStory(); // 分岐の最初のストーリーを開始
    });
    document.getElementById('ending-choices-container').appendChild(button);
  });

  setTimeout(() => {
    document.getElementById('ending-choices-container').style.display = 'flex';
    document.getElementById('ending-choices-container').style.pointerEvents = 'auto';
    document.querySelectorAll('.ending-choice-button').forEach(btn => {
      btn.classList.add('blur');
    });
  }, 500);
  setTimeout(() => {
    document.getElementById('ending-choices-container').classList.remove('fade-in');
  }, 1000);
}