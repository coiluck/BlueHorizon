// achievement.js
import { changeModal } from './module/changeModal.js';
import { playSoundEffect } from './module/audio.js';

document.getElementById('achievement-close-button').addEventListener('click', () => {
  changeModal('top');
  playSoundEffect('click1');
});
document.getElementById('top-icon-achievement').addEventListener('click', () => {
  setUpAchievement();
  setUpEnding();
});

export const achievementList = [
  {
    id: 1,
    title: "記憶の欠片",
    description: "記憶の欠片を一つ集める",
  },
  {
    id: 2,
    title: "記憶の探究者",
    description: "記憶の欠片を十個すべて集める",
  },
  {
    id: 3,
    title: "父の面影",
    description: "一度のゲームでミナの父に関連する「記憶の欠片」を全て集める",
  },
  {
    id: 4,
    title: "小さな発明家",
    description: "初めてアイテムを合成する",
  },
  {
    id: 5,
    title: "街の希望",
    description: "浄水装置をクラフトする",
  },
  {
    id: 6,
    title: "過去の遺産",
    description: "最果ての島で浄水装置を発見する",
  },
  {
    id: 7,
    title: "セレスティア号、改装",
    description: "セレスティア号の性能を引き上げる",
  },
  {
    id: 8,
    title: "蒼海の翼",
    description: "セレスティア号の性能を最大まで引き上げる",
  },
  {
    id: 9,
    title: "一流のサルベージャー",
    description: "一度のゲームのサルベージで100個以上のアイテムを手に入れる",
  },
  {
    id: 10,
    title: "海のコレクター",
    description: "一度のゲームで全種類のサルベージ品を収集する",
  },
  {
    id: 11,
    title: "神がかった大漁",
    description: "一度のサルベージで10個以上のサルベージ品を獲得する",
  },
  {
    id: 12,
    title: "深海からの生還",
    description: "海底渓谷での探索を完了する",
  },
  {
    id: 13,
    title: "蒼の世界の冒険家",
    description: "一度のゲームでマップ上の全ての探索ポイントを発見する",
  },
  {
    id: 14,
    title: "光速の救世主",
    description: "20日以内に街を救う",
  },
  {
    id: 15,
    title: "揺るぎない希望",
    description: "パラメータ「希望」を一度も80以下に下げずにグッドエンディングに到達する",
  },
  {
    id: 16,
    title: "絶望の底から",
    description: "「希望」が10以下になった後、グッドエンディングに到達する",
  },
  {
    id: 17,
    title: "オンボロ潜水艇の奇跡",
    description: "セレスティア号を一度もアップグレードせずにクリアする",
  },
  {
    id: 18,
    title: "応答なし",
    description: "街からの通信を一定回数以上無視する",
  },
];

function setUpAchievement() {
  const achievementItemContainer = document.querySelector('.achievement-item-container');
  achievementItemContainer.innerHTML = '';
  // ローカルストレージから取得
  const userAchievement = JSON.parse(localStorage.getItem('achievement')) || [];
  achievementList.forEach(achievement => {
    const achievementItem = document.createElement('div');
    achievementItem.classList.add('achievement-item');
    // 達成済みか未達成か判定
    if (userAchievement.includes(achievement.id)) {
      achievementItem.classList.add('achieved');
    } else {
      achievementItem.classList.add('unachieved');
    }
    // 生成
    achievementItem.innerHTML = `
      <p class="achievement-item-title">${achievement.title}</p>
      <p class="achievement-item-description">${achievement.description}</p>
    `;
    achievementItemContainer.appendChild(achievementItem);
  });
}

export const endingList = [
  {
    id: 1,
    title: "真実への道標",
    description: "世界の真実を解き明かした",
    image: "./assets/images/light.avif",
  },
  {
    id: 2,
    title: "続く日常",
    description: "世界の真実に迫った",
    image: "./assets/images/city.avif",
  },
  {
    id: 3,
    title: "故郷への帰還",
    description: "浄水装置を持って帰り、街を救った",
    image: "./assets/images/title_watercolor.avif",
  },
  {
    id: 4,
    title: "飽くなき探求心",
    description: "街よりも大事なものを見つけた",
    image: "./assets/images/seabed.avif",
  },
  {
    id: 5,
    title: "蒼い絶望",
    description: "希望か食糧が尽き、探索をあきらめた",
    image: "./assets/images/ending/sea1.webp",
  },
  {
    id: 6,
    title: "時は止まらず",
    description: "30日が経過し、街の浄水装置が壊れた",
    image: "./assets/images/ending/sea2.avif",
  }
];
function setUpEnding() {
  const achievementItemEndContainer = document.querySelector('.achievement-item-end-container');
  achievementItemEndContainer.innerHTML = '';
  // ローカルストレージから取得
  const userEnding = JSON.parse(localStorage.getItem('ending')) || [];
  // 生成
  endingList.forEach(ending => {
    const achievementItemEnd = document.createElement('div');
    achievementItemEnd.classList.add('achievement-item-end');
    if (userEnding.includes(ending.id)) {
      achievementItemEnd.classList.add('achieved-end');
      achievementItemEnd.innerHTML = `
      <img src="${ending.image}" alt="${ending.title}">
      <div class="ending-info">
        <p class="ending-info-title">${ending.title}</p>
        <p class="ending-info-description">${ending.description}</p>
      </div>
    `;
    } else {
      achievementItemEnd.classList.add('unachieved-end');
      achievementItemEnd.innerHTML = `<img src="./assets/images/black.avif" alt="未達成用の黒い画像">`;
    }
    achievementItemEndContainer.appendChild(achievementItemEnd);
  });
}