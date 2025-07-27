// scenarioAction.js
export function changeBackgroundImage(object, imagePath) {
  const modal = document.getElementById(`modal-${object}`);
  const newImageSrc = `./assets/images/${imagePath}`;

  // フェードアウト
  modal.classList.remove("fade-in");
  modal.classList.add("fade-out");
  modal.style.pointerEvents = "none";

  // アニメーション後
  setTimeout(() => {
    const tempImage = new Image();
    tempImage.src = newImageSrc;
    
    // 画像の読み込み完了後
    tempImage.onload = () => {
      const backgroundImage = modal.querySelector(`.${object}-background-image img`);
      backgroundImage.src = newImageSrc;
      // フェードイン
      modal.classList.remove("fade-out");
      modal.classList.add("fade-in");
      modal.style.pointerEvents = "auto";
    };
  }, 500);
}