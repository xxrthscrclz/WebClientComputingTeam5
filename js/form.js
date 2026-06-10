const form = document.querySelector("#foodForm");
const message = document.querySelector("#formMessage");
const menuChoice = document.querySelector("#menuChoice");
const fallbackFieldset = document.querySelector("#fallbackFieldset");
const customFieldset = document.querySelector("#customFieldset");
const customFields = document.querySelector("#customFields");
const selectedMenuName = document.querySelector("#selectedMenuName");
const gameSource = document.querySelector("#gameSource");
const spicyGuide = document.querySelector(".spicy-guide");

if (spicyGuide) spicyGuide.classList.remove("visible");

const menuForms = Object.fromEntries(
  Object.entries(menuOptions).map(([menuKey, menu]) => [
    menuKey,
    {
      label: menu.label,
      recipeUrl: "recipe.html",
      fields: menu.fields,
    },
  ]),
);

const sourceLabels = {
  roulette: "룰렛 돌리기",
  tournament: "토너먼트",
  fortune: "포춘쿠키",
  guess: "음식 맞추기",
  recommend: "메뉴 추천",
};

if (form) {
  const params = new URLSearchParams(window.location.search);
  const initialMenu = params.get("menu");
  const source = params.get("source");

  function renderCustomFields(menuKey) {
    const menu = menuForms[menuKey];

    if (!menu) {
      selectedMenuName.textContent = "메뉴를 선택해주세요";
      customFields.innerHTML = "";
      customFieldset.hidden = true;
      return;
    }

    selectedMenuName.textContent = menu.label;
    const multiCheckboxFields = menu.fields
      .filter((field) => field.type === "multi")
      .map((field) => field.id);

    customFieldset.hidden = false;
    customFields.innerHTML = menu.fields
      .map((field) => {
        if (multiCheckboxFields.includes(field.id)) {
          const checkboxes = field.options
            .map(
              (option, index) => `
          <div class="checkbox-item">
            <input type="checkbox" id="${field.id}-${index}" name="${field.id}" value="${option}">
            <label for="${field.id}-${index}">${option}</label>
          </div>`,
            )
            .join("");

          return `
      <label class="field-label">${field.label}</label>
      <div class="checkbox-field">
        ${checkboxes}
      </div>
    `;
        }

        const options = field.options
          .map((option) => `<option value="${option}">${option}</option>`)
          .join("");

        return `
      <label for="${field.id}">${field.label}</label>
      <select id="${field.id}" name="${field.id}" required>
        <option value="">선택하세요</option>
        ${options}
      </select>
    `;
      })
      .join("");

    if (menuKey === "kimchiFriedRice") {
      if (menuKey === "kimchiFriedRice") {
        attachEggStyleToggle();
      }
    }

    if (spicyGuide) {
      spicyGuide.classList.remove("visible");
      const spicyFieldDef = menu.fields.find((f) => f.id === "spicyLevel");
      if (spicyFieldDef) {
        const spicySelect = document.getElementById("spicyLevel");
        if (spicySelect && !spicySelect.dataset.guideAttached) {
          const showGuide = () => spicyGuide.classList.add("visible");
          const hideGuide = () => spicyGuide.classList.remove("visible");
          spicySelect.addEventListener("focus", showGuide);
          spicySelect.addEventListener("click", showGuide);
          spicySelect.addEventListener("blur", () =>
            setTimeout(hideGuide, 140),
          );
          spicySelect.dataset.guideAttached = "true";
        }
      }
    }
  }

  function attachEggStyleToggle() {
    const eggCheckbox = customFields.querySelector(
      'input[name="topping"][value="계란"]',
    );
    const eggLabel = document.getElementById("eggStyleLabel");
    const eggSelect = document.getElementById("eggStyle");

    if (!eggCheckbox || !eggLabel || !eggSelect) return;

    const toggleEggStyleField = () => {
      const isChecked = eggCheckbox.checked;

      eggLabel.style.display = isChecked ? "block" : "none";
      eggSelect.style.display = isChecked ? "block" : "none";
      eggSelect.required = isChecked;

      if (!isChecked) {
        eggSelect.value = "";
      }
    };

    eggCheckbox.addEventListener("change", toggleEggStyleField);
    toggleEggStyleField();
  }

  function isEggToppingSelected() {
    return Boolean(
      customFields.querySelector('input[name="topping"][value="계란"]:checked'),
    );
  }

  function getSelectedOptions(menuKey) {
    const menu = menuForms[menuKey];
    const data = new FormData(form);
    const multiCheckboxFields = ["topping", "spicyTopping", "herb", "sauce"];

    const options = menu.fields.map((field) => ({
      id: field.id,
      label: field.label,
      value: multiCheckboxFields.includes(field.id)
        ? data.getAll(field.id) // -> ["치즈", "햄"]
        : data.get(field.id), // -> "매운맛"
    }));

    if (menuKey === "kimchiFriedRice") {
      options.push({
        id: "eggStyle",
        label: "계란",
        value: isEggToppingSelected() ? data.get("eggStyle") : "없음",
      });
    }

    return options;
  }

  function validate(menuKey) {
    if (!menuForms[menuKey]) {
      return "추천받은 메뉴를 선택해주세요.";
    }

    if (menuKey === "kimchiFriedRice" && isEggToppingSelected()) {
      const eggStyle = new FormData(form).get("eggStyle");
      if (!eggStyle) {
        return "계란 스타일(반숙/완숙)을 선택해주세요.";
      }
    }

    const hasEmptyOption = getSelectedOptions(menuKey).some((option) => {
      if (Array.isArray(option.value)) {
        return false;
      }
      return !option.value;
    });

    if (hasEmptyOption) {
      return "메뉴별 세부 선택을 모두 입력해주세요.";
    }

    return "";
  }

  function goToRecipe(menuKey) {
    const menu = menuForms[menuKey];
    const foodKey = menuKeyToFoodKey[menuKey];
    const recipeParams = new URLSearchParams();

    if (foodKey) {
      recipeParams.set("food", foodKey);
    }

    recipeParams.set("menu", menuKey);

    if (source) {
      recipeParams.set("source", source);
    }

    getSelectedOptions(menuKey).forEach((option) => {
      if (Array.isArray(option.value)) {
        option.value.forEach((value) => {
          recipeParams.append(option.id, value);
        });
      } else {
        recipeParams.set(option.id, option.value);
      }
    });

    window.location.href = `${menu.recipeUrl}?${recipeParams.toString()}`;
  }

  if (sourceLabels[source]) {
    gameSource.textContent = `${sourceLabels[source]}에서 추천됨`;
  }

  if (menuForms[initialMenu]) {
    menuChoice.value = initialMenu;
    fallbackFieldset.hidden = true;
  }

  renderCustomFields(menuChoice.value);

  menuChoice.addEventListener("change", (event) => {
    message.textContent = "";
    renderCustomFields(event.target.value);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedMenu = menuChoice.value;
    const error = validate(selectedMenu);

    if (error) {
      message.textContent = error;
      return;
    }

    message.textContent = "";
    goToRecipe(selectedMenu);
  });
}
