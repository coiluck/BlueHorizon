// memoryPieces.js
const memoryPiecesData = {
  piece_1: {
    id: 1,
    name: '研究者の警告日誌',
    image: 'book.webp',
    story: [
      { text: '【ENTRY: 2286.08.15】' },
      { text: '海底地殻の微振動が止まらない。' },
      { text: 'これは単なる前兆現象ではない。星が悲鳴を上げている。' },
      { text: '計算上、三ヶ月以内に大規模な地殻変動が発生し、それに伴い未曾有の海面上昇が起こるだろう。' },
      { text: '学会で何度訴えても、彼らは私を狂人扱いするだけだ。' },
      { text: '文明そのものが消え去る瀬戸際だというのに！' },
      { text: '【ENTRY: 2286.10.02】' },
      { text: 'もう時間がない。' },
      { text: 'すこしずつ、世界が沈んでいく。' },
      { text: '私はここに残り、最後まで手を打つつもりだ。' },
      { text: '...正直、一人娘のことが心配だ。' },
    ],
  },
  piece_2: {
    id: 2,
    name: '避難勧告',
    story: [
      { text: '『EMERGENCY_2287.01.12』――「蒼い沈黙」が始まった、あの日付だ。' },
      { text: '――緊急放送、緊急放送' },
      { text: '海面上昇がレベル5に達しました。' },
      { text: '一日以内に**県に避難してください。' },
      { text: '繰り返します。' },
      { text: '海面上昇がレベル5に達しました。' },
      { text: '一日以内に**県に避難してください。' },
    ],
  },
  piece_3: {
    id: 3,
    name: '研究ノートの断片',
    story: [
      { text: '――「プロジェクト・アルカディア」、第一段階完了。' },
      { text: '古代地層より採取した特殊プランクトンの培養に成功。' },
      { text: '通常の数千倍の速度で塩分を分解し、淡水を生成する能力を確認。' },
      { text: '...これがあれば、海の上でも人は生きていけるだろう' },
      { text: 'ひとまずはプロトタイプを娘のいる街に送っておこう。' },
      { text: 'ノートの最後には複雑な数式と、なんらかの装置のスケッチが描かれていた。' },
    ],
  },
  piece_4: {
    id: 4,
    name: '個人端末',
    story: [
      { text: '避難所の記録を発見した。' },
      { text: '「水位上昇により、レベル5まで浸水。住民は高層階へ避難中。」' },
      { text: '「食料備蓄：残り7日分。救助を待つ。」' },
      { text: '「...もう誰も来ない。最後の希望は『浮島』だけだ。」' },
      { text: '人々は最期まで希望を捨てなかったんだ...' }
    ],
  },
  piece_5: {
    id: 5,
    name: '『汐凪の街』創設期',
    image: 'city.avif',
    story: [
      { text: '数百メートルにも及ぶ海面上昇は、突如として人々の日常を奪い去った。だが、やがてその動きは静まり、残された世界は新しい秩序を模索し始める。' },
      { text: '人々は研究所から届けられた浄水装置を頼りに、荒れ果てた海辺に集い、新たな生活の拠点を築こうと決意した。' },
      { text: '波に飲み込まれた街や記憶は戻らない。しかし、絶望の底に沈みかけた人々の心には、確かな希望の灯がまだ息づいていた。' },
      { text: '瓦礫を運ぶ者、土を均す者、未来の居場所を描く者――誰もが力を合わせ、失われた大地の上に小さな夢を積み上げていった。' },
      { text: 'そしてその街は、荒ぶる潮がひととき静まり、人々に安息をもたらすよう願いを込めて「汐凪の街」と名付けられた。' }
    ],
  },
  piece_6: {
    id: 6,
    name: '生存者記録',
    story: [
      { text: '食料の備蓄が底をついた。' },
      { text: '幸い、雨が多いため水には困っていない。' },
      { text: 'しかし食料の問題は深刻だ。' },
      { text: '避難した高台の下に水が迫り、我々は小さい島に取り残された。' },
      { text: '島の草木を食べて生きていたが、冬になりそれも枯れてしまった。' },
      { text: '無線も通じず、救助の見込みもない。' },
      { text: '近くに島は見えないが、私は島の外へ行ってみるつもりだ。' },
    ],
  },
  piece_7: {
    id: 7,
    name: '浮島への航海記録',
    story: [
      { text: '古い航海記録を発見した。' },
      { text: '「北緯35度、東経140度...いや、違う。コンパスが狂っている。」' },
      { text: '「3日目。島影は見えない。だが、水の色が変わった。希望の青だ。」' },
      { text: '「この記録を見つけた者へ。浮島は存在する。ただし...それは島ではない。」' },
      { text: 'その先は、水で滲んで読めない。' }
    ],
  },
  piece_8: {
    id: 8,
    name: '研究者の最後のメッセージ',
    story: [
      { text: '暗号化されたメッセージファイルが見つかった。' },
      { text: 'セレスティア号が自動的に解読を開始する。' },
      { text: '「ミナ、もしお前がこれを見つけたなら...私は失敗した。」' },
      { text: '「ソラリスは暴走し、世界を沈めてしまった。だが、制御する方法はある。」' },
      { text: '「浮島と呼ばれる場所...それがソラリスの中枢だ。」' },
      { text: 'お父さん...あなたは最後まで、私のことを想っていてくれたんだね。' }
    ],
  },
  piece_9: {
    id: 9,
    name: 'システム暴走ログ',
    story: [
      { text: 'システムの緊急ログを発見した。' },
      { text: '「警告：浄化プロセス、閾値を超過」' },
      { text: '「エラー：手動停止コマンド、受付拒否」' },
      { text: '「致命的エラー：安全装置、全て無効化」' },
      { text: '「システム『ソラリス』、自律モードに移行」' },
      { text: 'システムは、もう人間の言うことを聞かなくなっていた...' }
    ],
  },
  piece_10: {
    id: 10,
    name: '希望の座標',
    story: [
      { text: '特殊な装置から、微弱な信号が発信されている。' },
      { text: 'これまで集めた記憶の欠片の情報が統合されていく...' },
      { text: '「座標確定：北緯35度47分、東経139度41分」' },
      { text: '「ソラリス制御タワー...通称『浮島』」' },
      { text: '「このメッセージを残した研究者より...娘へ」' },
      { text: '全ての謎が繋がった。お父さんが示してくれた、最後の希望への道筋。' }
    ],
  }
};

import { globalGameState } from './gameState.js';

export function getMemoryPieces(array, rate) {
  if (Math.random() < rate) {
    // まだ獲得していないものだけ
    const unacquiredItems = array.filter(
      item => !globalGameState.gameState.memoryPieceArray.includes(item)
    );
    if (unacquiredItems.length > 0) {
      // ランダムに選ばれたアイテムを取得
      const randomIndex = Math.floor(Math.random() * unacquiredItems.length);
      const selectedItem = unacquiredItems[randomIndex];
      globalGameState.gameState.memoryPieceArray.push(selectedItem);
      globalGameState.gameState.memoryPiece += 1;
      // dataを渡す
      const pieceData = memoryPiecesData[`piece_${selectedItem}`];
      console.log(`${pieceData.name}を獲得した！`);
      return {
        name: pieceData.name,
        id: pieceData.id,
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function setUpMemoryPiece(id) {
  const pieceData = memoryPiecesData[`piece_${id}`];
  // 背景画像の設定
  document.querySelector('.memory-piece-background-image img').src = `./assets/images/${pieceData.image}`;
  // イベントリスナの設定
  currentMemoryPieceListener = () => updateText(id);
  document.getElementById('modal-memory-piece').addEventListener('click', currentMemoryPieceListener);
  // 初回のテキストの設定
  memoryPieceIndex = 0;
  updateText(id);
}

import { changeModal } from './changeModal.js';
import { updateDay } from '../explore.js';
import { initGame } from '../game.js';

let memoryPieceIndex = 0;

let currentMemoryPieceListener = null; // イベントリスナの消去用

function updateText(id) {
  const pieceData = memoryPiecesData[`piece_${id}`];
  if (memoryPieceIndex < pieceData.story.length) {
    document.getElementById('memory-piece-text').textContent = pieceData.story[memoryPieceIndex].text;
    memoryPieceIndex++;
  } else {
    if (currentMemoryPieceListener) {
      document.getElementById('modal-memory-piece').removeEventListener('click', currentMemoryPieceListener);
      currentMemoryPieceListener = null; // 後処理として変数をクリア
    }
    initGame();
    if (id === 5) {
      updateDay('path10');
    } else {
      updateDay();
    }
    changeModal('game');
  }
}