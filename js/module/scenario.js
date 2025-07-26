// scenario.js
export const openingScenario = [
  { text: 'こんにちは、このゲームはテストです。' },
  { 
    text: 'このゲームを続けますか？',
    choiceId: 'opening'
  },
  { text: 'あなたは選択を終えた。' },
  { text: 'これは共通ルートの続きです。' },
  { text: 'ゲームクリア！' }
];

export const openingChoices = {
  opening: [
    {
      buttonText: 'はい',
      branch: [
        { text: 'あなたは首を縦に振った。' },
        { text: '「はい」を選んだ後のストーリーです。' }
      ]
    },
    {
      buttonText: 'いいえ',
      branch: [
        { text: 'あなたは断った。' },
        { 
          text: '何かのアクションが実行される…。',
          action: () => {
            alert("アクションが実行されました！");
          }
        }
      ]
    }
  ]
};
