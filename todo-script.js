//local storage
const LS_ITEMS_KEY = 'sl_items';
const LS_FAVS_KEY = 'sl_favorites';

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

let items = load(LS_ITEMS_KEY, []);
let favorites = load(LS_FAVS_KEY, []);

const listEl = document.getElementById("sl-list");
const formEl = document.getElementById("sl-add-form");
const inputEl = document.getElementById("sl-item-input");
const addFavsBtn = document.getElementById("sl-add-favs");
const editFavsBtn = document.getElementById("sl-edit-favs");

// modal
const favModal = document.getElementById("sl-fav-modal");
const closeFavsBtn = document.getElementById("sl-close-favs");
const favInput = document.getElementById("sl-fav-input");
const favAddBtn = document.getElementById("sl-fav-add-btn");
const favListEl = document.getElementById("sl-fav-list");
const favEmpty = document.getElementById("sl-fav-empty");


const clearBtn = document.getElementById("sl-clear-btn");

// ------- Renderers -------
function renderItems() {
  listEl.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.done) li.classList.add("sl-checked");

    // left: checkbox + text
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

    // pushing delete to far right
    const spacer = document.createElement("div");
    spacer.className = "sl-spacer";

    // delete button 
    const del = document.createElement("button");
    del.className = "sl-delete";
    del.type = "button";
    del.title = "Delete";
    //to use w no internet, will later change to favicon as png
    del.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"/>
      </svg>
    `;
    del.addEventListener("click", () => removeItem(index));

    li.appendChild(left);
    li.appendChild(spacer);
    li.appendChild(del);

    listEl.appendChild(li);
  });

  // to persist
  save(LS_ITEMS_KEY, items);

}

function renderFavorites() {
  favListEl.innerHTML = "";
  if (favorites.length === 0) {
    if (favEmpty) favEmpty.style.display = "block";
    // also persist just in case edits made it empty
    save(LS_FAVS_KEY, favorites);
    return;
  }
  if (favEmpty) favEmpty.style.display = "none";

  favorites.forEach((fav, index) => {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = fav;

    const remove = document.createElement("button");
    remove.className = "sl-delete";
    remove.type = "button";
    remove.title = "Remove from favorites";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      favorites.splice(index, 1);
      save(LS_FAVS_KEY, favorites);
      renderFavorites();
    });

    li.appendChild(name);
    li.appendChild(remove);
    favListEl.appendChild(li);
  });

  // persist 
  save(LS_FAVS_KEY, favorites);
}

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
  if (!favorites.length) return;
  favorites.forEach(f => {
    const t = (f || "").trim();
    if (t) items.push({ text: t, done: false });
  });
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
  if (favInput) {
    favInput.value = "";
    setTimeout(() => favInput.focus(), 0);
  }
});

closeFavsBtn.addEventListener("click", () => {
  favModal.classList.remove("sl-modal--open");
});

favAddBtn.addEventListener("click", () => {
  const val = (favInput.value || "").trim();
  if (!val) return;
  favorites.push(val);
  save(LS_FAVS_KEY, favorites);
  favInput.value = "";
  renderFavorites();
});

favModal.addEventListener("click", (e) => {
  if (e.target === favModal) favModal.classList.remove("sl-modal--open");
});

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (items.length === 0) return;
    if (confirm("Clear all items?")) {
      items = [];
      renderItems();
    }
  });
}

renderItems();
