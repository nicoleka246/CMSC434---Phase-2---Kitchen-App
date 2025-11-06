
let items = [];
let favorites = [];


const listEl = document.getElementById("sl-list");
const formEl = document.getElementById("sl-add-form");
const inputEl = document.getElementById("sl-item-input");
const addFavsBtn = document.getElementById("sl-add-favs");
const editFavsBtn = document.getElementById("sl-edit-favs");


const favModal = document.getElementById("sl-fav-modal");
const closeFavsBtn = document.getElementById("sl-close-favs");
const favInput = document.getElementById("sl-fav-input");
const favAddBtn = document.getElementById("sl-fav-add-btn");
const favListEl = document.getElementById("sl-fav-list");
const favEmpty = document.getElementById("sl-fav-empty");

// helper to render list
function renderItems() {
  listEl.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.done) li.classList.add("sl-checked");

    // left side: checkbox + text
    const left = document.createElement("div");
    left.className = "sl-left";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "sl-checkbox";
    cb.checked = item.done;
    cb.addEventListener("change", () => toggleDone(index));

    const text = document.createElement("span");
    text.className = "sl-text";
    text.textContent = item.text;

    left.appendChild(cb);
    left.appendChild(text);

    // push delete button to far right
    const spacer = document.createElement("div");
    spacer.className = "sl-spacer";

    const del = document.createElement("button");
    del.className = "sl-delete";
    del.type = "button";
    del.title = "Delete";
    del.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"/>
      </svg>`;
    del.addEventListener("click", () => removeItem(index));

    li.appendChild(left);
    li.appendChild(spacer);
    li.appendChild(del);

    listEl.appendChild(li);
  });
}


function renderFavorites() {
  favListEl.innerHTML = "";
  if (favorites.length === 0) {
    favEmpty.style.display = "block";
    return;
  }
  favEmpty.style.display = "none";

  favorites.forEach((fav, index) => {
    const li = document.createElement("li");
    li.textContent = fav;

    const del = document.createElement("button");
    del.className = "sl-delete";
    del.textContent = "Remove";
    del.addEventListener("click", () => {
      favorites.splice(index, 1);
      renderFavorites();
    });

    li.appendChild(del);
    favListEl.appendChild(li);
  });
}

// list actions
function addItem(text) {
  const t = text.trim();
  if (!t) return;
  items.push({ text: t, done: false });
  renderItems();
}

function toggleDone(i) {
  items[i].done = !items[i].done;
  renderItems();
}

function removeItem(i) {
  items.splice(i, 1);
  renderItems();
}

function addAllFavorites() {
  favorites.forEach((fav) => items.push({ text: fav, done: false }));
  renderItems();
}


formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addItem(inputEl.value);
  inputEl.value = "";
  inputEl.focus();
});

addFavsBtn.addEventListener("click", addAllFavorites);

editFavsBtn.addEventListener("click", () => {
  favModal.classList.add("sl-modal--open");
  renderFavorites();
});

closeFavsBtn.addEventListener("click", () => {
  favModal.classList.remove("sl-modal--open");
});

favAddBtn.addEventListener("click", () => {
  const val = favInput.value.trim();
  if (!val) return;
  favorites.push(val);
  favInput.value = "";
  renderFavorites();
});

favModal.addEventListener("click", (e) => {
  if (e.target === favModal) favModal.classList.remove("sl-modal--open");
});

const clearBtn = document.getElementById("sl-clear-btn");

clearBtn.addEventListener("click", () => {
  if (items.length === 0) return;           // do nothing if already empty
  const confirmClear = confirm("Clear all items?");
  if (confirmClear) {
    items = [];                             // remove all items
    renderItems();                          // refresh list visually
  }
});