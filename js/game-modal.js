function openGameModal(modalEl) {
  if (!modalEl) return;

  const content = modalEl.querySelector(".modal-content");
  modalEl.classList.add("show");
  document.body.classList.add("game-modal-open");

  if (!content) return;

  content.classList.remove("is-emerging");
  requestAnimationFrame(() => {
    content.classList.add("is-emerging");
  });
}

function closeGameModal(modalEl) {
  if (!modalEl) return;

  const content = modalEl.querySelector(".modal-content");
  modalEl.classList.remove("show");

  if (content) {
    content.classList.remove("is-emerging");
  }

  if (!document.querySelector(".game-modal-overlay.show")) {
    document.body.classList.remove("game-modal-open");
  }
}

function lockGameModalOverlay(modalEl) {
  if (!modalEl) return;

  modalEl.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  const content = modalEl.querySelector(".modal-content");
  if (content) {
    content.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}
