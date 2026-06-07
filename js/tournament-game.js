const tournamentFoods = [
  { name: "김치볶음밥", key: "kimchiFriedRice" },
  { name: "김치찌개", key: "kimchiStew" },
  { name: "닭볶음탕", key: "dakbokkeumtang" },
  { name: "된장찌개", key: "doenjangStew" },
  { name: "떡볶이", key: "tteokbokki" },
  { name: "미역국", key: "seaweedSoup" },
  { name: "샤브샤브", key: "shabuShabu" },
  { name: "알리오올리오", key: "aglioOlio" },
];

const leftCard = document.getElementById("left-card");
const rightCard = document.getElementById("right-card");
const leftImg = document.getElementById("left-img");
const rightImg = document.getElementById("right-img");
const leftName = document.getElementById("left-name");
const rightName = document.getElementById("right-name");
const roundNameEl = document.getElementById("round-name");
const roundMatchCurrentEl = document.getElementById("round-match-current");
const roundMatchTotalEl = document.getElementById("round-match-total");
const winnerModal = document.getElementById("winner-modal");
const winnerImg = document.getElementById("winner-img");
const winnerName = document.getElementById("winner-name");
const shortcutLink = document.getElementById("shortcut-link");

let currentRound = [];
let nextRound = [];
let matchIndex = 0;
let totalMatches = 0;

function shuffle(list) {
  const copied = [...list];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }

  return copied;
}

function getFoodImage(name) {
  return `./assets/image/game/${name}.png`;
}

function setFoodCard(imgEl, nameEl, food) {
  imgEl.style.backgroundImage = `url(${getFoodImage(food.name)})`;
  nameEl.textContent = food.name;
}

// 8강 → 4강 → 결승전
function getRoundName(count) {
  if (count === 2) return "결승전";
  return `${count}강`;
}

function updateRoundInfo() {
  if (roundNameEl) {
    roundNameEl.textContent = getRoundName(currentRound.length);
  }
  if (roundMatchCurrentEl) {
    roundMatchCurrentEl.textContent = String(matchIndex + 1);
  }
  if (roundMatchTotalEl) {
    roundMatchTotalEl.textContent = String(totalMatches);
  }
}

function showCurrentMatch() {
  const leftFood = currentRound[matchIndex * 2];
  const rightFood = currentRound[matchIndex * 2 + 1];

  setFoodCard(leftImg, leftName, leftFood);
  setFoodCard(rightImg, rightName, rightFood);
  updateRoundInfo();
}

function openWinnerModal(food) {
  setFoodCard(winnerImg, winnerName, food);
  shortcutLink.href = `form.html?menu=${food.key}&source=tournament`;
  openGameModal(winnerModal);
}

function closeWinnerModal() {
  closeGameModal(winnerModal);
}

function startRound(foods) {
  currentRound = foods;
  nextRound = [];
  matchIndex = 0;
  totalMatches = currentRound.length / 2;
  showCurrentMatch();
}

function pickWinner(side, event) {
  if (winnerModal?.classList.contains("show")) return;

  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const winner = side === "left"
    ? currentRound[matchIndex * 2]
    : currentRound[matchIndex * 2 + 1];

  nextRound.push(winner);
  matchIndex += 1;

  if (matchIndex < totalMatches) {
    showCurrentMatch();
    return;
  }

  if (nextRound.length === 1) {
    const finalWinner = nextRound[0];
    requestAnimationFrame(() => openWinnerModal(finalWinner));
    return;
  }

  startRound(nextRound);
}

//  초기화  (새로고침,헤더 클릭 시)
function initTournament() {
  if (!leftCard || !rightCard) return;
  closeWinnerModal();
  startRound(shuffle(tournamentFoods));
}

if (leftCard) {
  leftCard.addEventListener("click", (event) => pickWinner("left", event));
}

if (rightCard) {
  rightCard.addEventListener("click", (event) => pickWinner("right", event));
}

const tournamentRetryBtn = document.getElementById("tournament-retry-btn");

if (tournamentRetryBtn) {
  tournamentRetryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.reload();
  });
}

if (winnerModal) {
  lockGameModalOverlay(winnerModal);
}
