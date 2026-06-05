const fortunes = [
  "오늘은 평소와 다른 메뉴에 도전하면 행운이 따를 거예요!",
  "따뜻한 한 끼가 오늘 하루를 더 좋게 만들어 줄 거예요.",
  "친구와 함께 먹는 식사가 행복을 두 배로 만들어 줍니다.",
  "가볍게 먹어도 괜찮아요. 오늘은 속을 편하게 채워 보세요.",
  "오늘의 선택이 내일의 좋은 기운으로 이어질 거예요.",
  "천천히 음미하면 맛이 더 깊어지는 하루가 될 거예요.",
];

const menus = [
  { name: "김치볶음밥", emoji: "🍚" },
  { name: "김치찌개", emoji: "🍲" },
  { name: "닭볶음탕", emoji: "🍗" },
  { name: "된장찌개", emoji: "🥘" },
  { name: "떡볶이", emoji: "🌶️" },
  { name: "미역국", emoji: "🥣" },
  { name: "샤브샤브", emoji: "🫕" },
  { name: "알리오올리오 파스타", emoji: "🍝" },
];

const drawCookieBtn = document.getElementById("drawCookieBtn");
const fortuneModal = document.getElementById("fortuneModal");
const fortuneModalBox = document.getElementById("fortuneModalBox");
const modalFortuneText = document.getElementById("modalFortuneText");
const modalMenuEmoji = document.getElementById("modalMenuEmoji");
const modalMenuText = document.getElementById("modalMenuText");
const recipeSelectBtn = document.getElementById("recipeSelectBtn");
const modalCloseBtn = document.getElementById("modalCloseBtn");

function pickRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function openFortuneModal() {
  if (!fortuneModal) return;

  const menu = pickRandomItem(menus);

  modalFortuneText.textContent = pickRandomItem(fortunes);
  modalMenuEmoji.textContent = menu.emoji;
  modalMenuText.textContent = menu.name;
  fortuneModal.classList.add("show");
}

function closeFortuneModal() {
  if (!fortuneModal) return;
  fortuneModal.classList.remove("show");
}

if (drawCookieBtn) {
  drawCookieBtn.addEventListener("click", openFortuneModal);
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeFortuneModal);
}

if (recipeSelectBtn) {
  recipeSelectBtn.addEventListener("click", () => {
    window.location.href = "recipe.html";
  });
}

if (fortuneModal) {
  fortuneModal.addEventListener("click", closeFortuneModal);
}

if (fortuneModalBox) {
  fortuneModalBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFortuneModal();
  }
});
