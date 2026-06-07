const rouletteMenus = [
  { name: "김치볶음밥", key: "kimchiFriedRice", emoji: "🍚" },
  { name: "김치찌개", key: "kimchiStew", emoji: "🍲" },
  { name: "닭볶음탕", key: "dakbokkeumtang", emoji: "🍗" },
  { name: "된장찌개", key: "doenjangStew", emoji: "🥘" },
  { name: "떡볶이", key: "tteokbokki", emoji: "🌶️" },
  { name: "미역국", key: "seaweedSoup", emoji: "🥣" },
  { name: "샤브샤브", key: "shabuShabu", emoji: "🫕" },
  { name: "알리오올리오", key: "aglioOlio", emoji: "🍝" },
];

const rouletteWheel = document.getElementById("roulette-wheel");
const rouletteSpinBtn = document.getElementById("roulette-spin-btn");
const rouletteResult = document.getElementById("roulette-result");
const rouletteModal = document.getElementById("roulette-modal");
const rouletteModalEmoji = document.getElementById("roulette-modal-emoji");
const rouletteModalName = document.getElementById("roulette-modal-name");
const rouletteModalLink = document.getElementById("roulette-modal-link");
const rouletteRetryBtn = document.getElementById("roulette-retry-btn");

const SEGMENT_DEG = 360 / rouletteMenus.length;
let isSpinning = false;
let selectedMenu = null;

function buildDividers() {
  return Array.from({ length: rouletteMenus.length }, (_, index) => {
    const dividerAngle = index * SEGMENT_DEG;
    return `<div class="roulette-divider" style="--divider-angle: ${dividerAngle}deg"></div>`;
  }).join("");
}

function buildLabels() {
  return rouletteMenus
    .map((menu, index) => {
      const labelAngle = index * SEGMENT_DEG + SEGMENT_DEG / 2;

      return `
      <div class="roulette-label" style="--label-angle: ${labelAngle}deg">
        <div class="roulette-label-text">
          <span class="roulette-emoji">${menu.emoji}</span>
          <span class="roulette-name">${menu.name}</span>
        </div>
      </div>
    `;
    })
    .join("");
}

function buildRouletteWheel() {
  if (!rouletteWheel) return;

  rouletteWheel.innerHTML = `
    <div class="roulette-face" aria-hidden="true"></div>
    ${buildDividers()}
    ${buildLabels()}
  `;
}

function openRouletteModal(menu) {
  if (!rouletteModal) return;

  if (rouletteModalEmoji) rouletteModalEmoji.textContent = menu.emoji;
  if (rouletteModalName) rouletteModalName.textContent = menu.name;
  if (rouletteModalLink) {
    rouletteModalLink.href = `form.html?menu=${menu.key}&source=roulette`;
  }

  openGameModal(rouletteModal);
}

function spinRoulette() {
  if (!rouletteWheel || !rouletteSpinBtn || isSpinning) return;

  isSpinning = true;
  rouletteSpinBtn.disabled = true;
  closeGameModal(rouletteModal);

  if (rouletteResult) {
    rouletteResult.textContent = "룰렛이 돌아가는 중...";
  }

  const winIndex = Math.floor(Math.random() * rouletteMenus.length);
  selectedMenu = rouletteMenus[winIndex];

  const extraSpins = 360 * (4 + Math.floor(Math.random() * 3));
  const targetAngle =
    extraSpins + (360 - winIndex * SEGMENT_DEG - SEGMENT_DEG / 2);

  rouletteWheel.style.transform = `rotate(${targetAngle}deg)`;

  window.setTimeout(() => {
    isSpinning = false;
    rouletteSpinBtn.disabled = false;

    if (rouletteResult) {
      rouletteResult.textContent = "오늘의 메뉴가 정해졌어요!";
    }

    openRouletteModal(selectedMenu);
  }, 4000);
}

function initRoulette() {
  isSpinning = false;
  selectedMenu = null;

  if (rouletteSpinBtn) {
    rouletteSpinBtn.disabled = false;
  }

  if (rouletteWheel) {
    rouletteWheel.style.transform = "";
    buildRouletteWheel();
  }

  if (rouletteResult) {
    rouletteResult.textContent = "버튼을 눌러 룰렛을 돌려보세요";
  }

  closeGameModal(rouletteModal);
}

if (rouletteSpinBtn) {
  rouletteSpinBtn.addEventListener("click", spinRoulette);
}

if (rouletteRetryBtn) {
  rouletteRetryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.reload();
  });
}

if (rouletteModal) {
  lockGameModalOverlay(rouletteModal);
}
