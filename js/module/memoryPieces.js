// memoryPieces.js
const memoryPiecesData = {
  piece_1: {
    id: 1,
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
  piece_2: {
    id: 2,
    name: '避難勧告',
    image: 'emergency.avif',
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
  piece_4: {
    id: 4,
    name: '研究者の警告日誌',
    image: 'book.webp',
    story: [
      { text: '――「プロジェクト・アルカディア」、第一段階完了。' },
      { text: '古代地層より採取した特殊プランクトンの培養に成功。' },
      { text: '通常の数千倍の速度で塩分を分解し、淡水を生成する能力を確認。' },
      { text: '...これがあれば、海の上でも人は生きていけるだろう' },
      { text: 'ひとまずはプロトタイプを娘のいる街に送っておこう。' },
      { text: 'ノートの最後には複雑な数式と、なんらかの装置のスケッチが描かれていた。' },
    ],
  },
  piece_5: {
    id: 5,
    name: '最後の授業',
    image: 'school.avif',
    story: [
      { text: '【2287.01.11 - 教員日誌】' },
      { text: '明日から臨時休校になる。海面上昇の影響で、学校の1階部分が浸水し始めた。' },
      { text: '子どもたちには「少しの間お休み」だと伝えたが、みんな薄々感づいているようだった。' },
      { text: '最後の授業で、タカシが「先生、また会えるよね？」と聞いてきた。' },
      { text: '「もちろん」と答えたが、声が震えてしまった。' },
      { text: '黒板に「みんな、元気で」と書き残して、教室を後にした。' },
      { text: 'きっと、もう戻ることはないだろう。' }
    ],
  },
  piece_6: {
    id: 6,
    name: '新種の微生物の報告',
    image: 'book.webp',
    story: [
      { text: '……信じられない……！ ' },
      { text: 'この新種のプランクトン……いや、微生物群は、まるで連携して動いている。' },
      { text: '彼らが発する微弱な生体電気信号を解析した結果、驚くべきパターンが見つかった。' },
      { text: 'これは……コミュニケーションだ。彼らは意思疎通を図っている。' },
      { text: 'まるで、海全体を覆う巨大な神経ネットワークのように。' },
      { text: '私は、この海の囁きを聞いてしまったのかもしれない……' },
    ],
  },
  piece_7: {
    id: 7,
    name: '微生物に関するメモ',
    image: 'book.webp',
    story: [
      { text: '海洋汚染が集中する海域において、例の微生物群の活動が極端に活発化するデータを得た。' },
      { text: 'さらにその海域は、海面上昇の中心地だ。' },
      { text: '彼らは汚染物質を分解している？' },
      { text: '……その先は、水で滲んで読めない。' },
    ],
  },
  piece_8: {
    id: 8,
    name: '研究者の最後のメッセージ',
    image: 'book.webp',
    story: [
      { text: '【ENTRY: 2287.03.18】' },
      { text: '微生物ネットワークとの「対話」を試みるも、失敗続きだ。' },
      { text: '彼らの意識はあまりに巨大で、純粋すぎる。' },
      { text: '汚染された海を浄化しようとする、そのあまりに強大な意志の前に、我々の論理や科学は無力だ。' },
      { text: '彼らはただ、自らを守ろうとしているだけだ。その防衛本能が、我々にとっては文明の終わりを意味する。'},
      { text: '必要なのは、彼らの意志を理解し、受け入れられる、純粋な精神を持つ「調停者」。……そんな人間が、果たして存在するのだろうか。' }
    ],
  },
  piece_9: {
    id: 9,
    name: '海との交感実験',
    image: 'rouka.avif',
    story: [
      { text: '【実験記録 - 2286.11.18】' },
      { text: '深海探査中、異常な体験をした。' },
      { text: '培養槽から漏れた微生物溶液に手が触れた瞬間、頭の中に「声」が響いた。' },
      { text: '声ではない。感情だった。悲しみと……愛情？' },
      { text: '【実験記録 - 2286.11.25】' },
      { text: '再現実験を試みた。微生物群との直接接触時間を延長。' },
      { text: '今度ははっきりと「聞こえた」。' },
      { text: '《…傷ついている…助けて…》' },
    ]
  },
  piece_10: {
    id: 10,
    name: '希望の座標',
    image: 'light.avif',
    story: [
      { text: '（研究所の設計図の一部）' },
      { text: '結論として、物理的手段による海面上昇の抑制は不可能と断定。' },
      { text: '微生物ネットワークとの融和こそが、人類が生き残る唯一の道である。' },
      { text: '（最後には、一つの座標が記されている）' }
    ],
  }
};

import { globalGameState } from './gameState.js';
import { checkMemoryPieceAchievement } from './addAchieve.js';

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
      // 実績用のチェック
      checkMemoryPieceAchievement();
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
    if (id === 1) {
      updateDay('path10');
    } else {
      updateDay();
    }
    changeModal('game');
  }
}