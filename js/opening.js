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
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    // enterキーでも進行可能に
    if (isDisplayingSelection) {
      return;
    }
    updateStory();
  }
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

  // 発話者を表示
  if (story.speaker) {
    document.getElementById('opening-character-name').style.visibility = 'visible';
    document.getElementById('opening-character-name').textContent = story.speaker;
  } else {
    document.getElementById('opening-character-name').style.visibility = 'hidden';
  }

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
  document.getElementById('opening-text').classList.remove('fade-in');
  document.getElementById('opening-choices-container').style.display = 'none';
  document.getElementById('opening-choices-container').style.pointerEvents = 'none';

  const choiceData = Choices[choiceId];
  if (!choiceData) {
    return;
  }

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

  setTimeout(() => {
    document.getElementById('opening-choices-container').style.display = 'flex';
    document.getElementById('opening-choices-container').classList.add('fade-in');
    document.getElementById('opening-choices-container').style.pointerEvents = 'auto';
  }, 500);
}

// 最初に一度だけ実行（HTMLに入れてあるデフォルトテキストを変更するため）
updateStory();


// skip-window全体
document.getElementById('opening-skip-window').addEventListener('click', (event) => {
  event.stopPropagation();
});
// skip-button
document.getElementById('opening-skip-button').addEventListener('click', (event) => {
  event.stopPropagation(); 
  // あとでスキップ処理書く
});
// skip-cancel
document.getElementById('opening-skip-cancel').addEventListener('click', (event) => {
  event.stopPropagation();
  document.getElementById('opening-skip-window').classList.add('fade-out');
  setTimeout(() => {
    document.getElementById('opening-skip-window').style.display = 'none';
  }, 500);
});