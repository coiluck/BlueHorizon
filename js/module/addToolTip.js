export function createTooltipElement() {
  if (document.getElementById('game-tooltip')) {
    return;
  }
  const el = document.createElement('div');
  el.id = 'game-tooltip';
  el.className = 'tooltip';
  document.body.appendChild(el);
}
export function addTooltipEvents(triggerElement, mapObjectElement, text) {
  const tooltipElement = document.getElementById('game-tooltip');

  const showTooltip = () => {
    // テキストを設定
    tooltipElement.textContent = text;
    tooltipElement.style.display = 'block';
    // 位置を計算
    if (mapObjectElement) {
      const mapRect = mapObjectElement.getBoundingClientRect();
      const triggerRect = triggerElement.getBoundingClientRect();
      const topPos = mapRect.top + triggerRect.top - tooltipElement.offsetHeight - 5; // 5pxのマージン
      const leftPos = mapRect.left + triggerRect.left + (triggerRect.width / 2) - (tooltipElement.offsetWidth / 2);
      tooltipElement.style.top = `${topPos}px`;
      tooltipElement.style.left = `${leftPos}px`;
    } else {
      const triggerRect = triggerElement.getBoundingClientRect();
      const topPos = triggerRect.top - tooltipElement.offsetHeight - 5; // 5pxのマージン
      const leftPos = triggerRect.left + (triggerRect.width / 2) - (tooltipElement.offsetWidth / 2);
      tooltipElement.style.top = `${topPos}px`;
      tooltipElement.style.left = `${leftPos}px`;
    }
  };

  const hideTooltip = () => {
    tooltipElement.style.display = 'none';
  };

  // イベントリスナーを設定
  triggerElement.addEventListener('mouseover', showTooltip);
  triggerElement.addEventListener('mouseout', hideTooltip);
  triggerElement.addEventListener('click', showTooltip);
}