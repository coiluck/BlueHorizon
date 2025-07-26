// opening.js

import { openingScenario, openingChoices } from './module/scenario.js';

const Scenario = [...openingScenario];
const Choices = openingChoices;
let openingStoryIndex = 0;
let isDisplayingSelection = false;
// 分岐用
let branchScenario = null;
let branchIndex = 0;

document.getElementById('modal-opening').addEventListener('click', () => {
  if (isDisplayingSelection) {
    return; // 選択肢表示中は選択肢ボタン以外受け付けない
  }
  updateStory();
});

function updateStory() {
  const isBranch = !!branchScenario;
  const currentScenario = isBranch ? branchScenario : Scenario;
  const currentIndex = isBranch ? branchIndex : openingStoryIndex;

  // 現在のシナリオが終了
  if (currentIndex >= currentScenario.length) {
    if (isBranch) {
      // 分岐ストーリー -> 共通ルートに復帰
      branchScenario = null;
      updateStory();
    } else {
      // 共通ルート -> ストーリー終了
      alert('ストーリー終了');
    }
    return;
  }

  // 表示する現在のストーリーデータを取得
  const story = currentScenario[currentIndex];

  // テキストを表示
  document.getElementById('opening-text').textContent = story.text;

  // actionが設定されていれば実行
  if (typeof story.action === 'function') {
    story.action();
  }

  if (isBranch) {
    branchIndex++;
  } else {
    openingStoryIndex++;
  }

  // choiceIdが設定されていれば選択肢を表示
  if (story.choiceId) {
    displayChoices(story.choiceId);
  }
}

function displayChoices(choiceId) {
  isDisplayingSelection = true;

  document.getElementById('opening-choices-container').innerHTML = '';

  const choiceData = Choices[choiceId];
  if (!choiceData) return;

  choiceData.forEach(choice => {
    const button = document.createElement('button');
    button.classList.add('opening-choice-button');
    button.textContent = choice.buttonText;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      isDisplayingSelection = false;
      document.getElementById('opening-choices-container').innerHTML = '';
      
      // 選択された分岐ストーリーをセット
      branchScenario = choice.branch;
      branchIndex = 0;
      
      updateStory(); // 分岐の最初のストーリーを開始
    });
    document.getElementById('opening-choices-container').appendChild(button);
  });
}

// 最初に一度だけ実行（HTMLに入れてあるデフォルトテキストを変更するため）
updateStory();

