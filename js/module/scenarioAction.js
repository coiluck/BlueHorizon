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

export function changeCharacterImage(object, character, imagePath, isActive = false) {
  const modal = document.getElementById(`modal-${object}`);
  let characterImageContainer = modal.querySelector(`.character-image-container`);
  
  // 存在しない場合は新しく作成
  if (!characterImageContainer) {
    const newCharacterImageContainer = document.createElement("div");
    newCharacterImageContainer.classList.add("character-image-container");
    modal.appendChild(newCharacterImageContainer);
    characterImageContainer = newCharacterImageContainer;
  }
  let newImageSrc;
  if (character === "mina") {
    newImageSrc = `./assets/images/characters/${imagePath}.avif`;
  } else {
    newImageSrc = `./assets/images/characters/${character}/${imagePath}.avif`;
  }
  let characterImg = characterImageContainer.querySelector(`img[data-character="${character}"]`);

  if (!characterImg) {
    // 存在しない場合は新しく作成
    characterImg = document.createElement("img");
    characterImg.dataset.character = character;
    characterImageContainer.appendChild(characterImg);
  }
  characterImg.src = newImageSrc;
  if (isActive) {
    characterImg.classList.remove("active");
    characterImg.classList.add("active");
  } else {
    characterImg.classList.remove("active");
  }
}