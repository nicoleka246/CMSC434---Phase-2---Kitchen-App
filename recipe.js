// Data (will be replaced with API later)
// Data (will be replaced with API later)
const defaultRecipes = [
  {
    id: 1,
    title: "Vegan Tacos",
    diet: ["Vegan"],
    cuisine: "Mexican",
    time: 25,
    difficulty: "beginner",
    ingredients: ["Tortillas", "Black beans", "Avocado", "Lime"],
    instructions: "Assemble all ingredients and enjoy!",
  },
  {
    id: 2,
    title: "Chicken Alfredo",
    diet: ["Dairy-Free"],
    cuisine: "Italian",
    time: 40,
    difficulty: "medium",
    ingredients: ["Pasta", "Chicken", "Cream", "Garlic"],
    instructions: "Cook pasta, make sauce, mix together.",
  },
  {
    id: 3,
    title: "Greek Salad",
    diet: ["Vegetarian", "Gluten-Free"],
    cuisine: "Mediterranean",
    time: 15,
    difficulty: "beginner",
    ingredients: ["Cucumber", "Tomatoes", "Feta", "Olives", "Olive oil"],
    instructions: "Chop vegetables, mix in bowl, drizzle with olive oil.",
  },
  {
    id: 4,
    title: "Avocado Toast",
    diet: ["Vegan"],
    cuisine: "American",
    time: 10,
    difficulty: "beginner",
    ingredients: ["Bread", "Avocado", "Lemon", "Salt", "Pepper"],
    instructions: "Toast bread, mash avocado, and top with lemon juice and pepper.",
  },
  {
    id: 5,
    title: "Butter Chicken",
    diet: [],
    cuisine: "Indian",
    time: 50,
    difficulty: "hard",
    ingredients: ["Chicken", "Butter", "Tomatoes", "Cream", "Spices"],
    instructions: "Cook chicken in sauce until rich and flavorful.",
  },
  {
    id: 6,
    title: "French Crepes",
    diet: ["Vegetarian"],
    cuisine: "French",
    time: 20,
    difficulty: "medium",
    ingredients: ["Flour", "Eggs", "Milk", "Butter"],
    instructions: "Mix batter, cook thin layers on pan, and add your favorite filling.",
  },
];

// Combine default + stored recipes
const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
const recipes = [...defaultRecipes, ...storedRecipes];

let pantryItems = ["Tortillas", "Garlic"];

// State
const state = {
  searchQuery: "",
  selectedDiets: [],
  selectedCuisine: "",
  selectedTime: "",
  selectedDifficulty: "",
  showShoppingList: false,
};

// Dom elements
const searchInput = document.getElementById("search-input");
const dietBadges = document.getElementById("diet-badges");
const cuisineSelect = document.getElementById("cuisine-select");
const timeSelect = document.getElementById("time-select");
const difficultySelect = document.getElementById("difficulty-select");
const clearFiltersBtn = document.getElementById("clear-filters");
const recipeGrid = document.getElementById("recipe-grid");
const noResults = document.getElementById("no-results");

// Popup elements
const recipePopup = document.getElementById("recipe-popup");
const popupBody = document.getElementById("popup-body");
const closePopupBtn = document.getElementById("close-popup");

// Init
function init() {
  setupEventListeners();
  renderRecipes(); // show recipes on load
}

// Event Listeners
function setupEventListeners() {
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderRecipes();
  });
  dietBadges.addEventListener("click", (e) => {
    if (e.target.classList.contains("badge")) {
      const diet = e.target.dataset.diet;
      toggleDiet(diet);
      e.target.classList.toggle("active");
      renderRecipes();
      updateClearButton();
    }
  });
  cuisineSelect.addEventListener("change", (e) => {
    state.selectedCuisine = e.target.value;
    renderRecipes();
    updateClearButton();
  });
  timeSelect.addEventListener("change", (e) => {
    state.selectedTime = e.target.value;
    renderRecipes();
    updateClearButton();
  });
  difficultySelect.addEventListener("change", (e) => {
    state.selectedDifficulty = e.target.value;
    renderRecipes();
    updateClearButton();
  });
  clearFiltersBtn.addEventListener("click", clearAllFilters);
  closePopupBtn.addEventListener("click", closePopup);
  recipePopup.querySelector(".popup-overlay").addEventListener("click", closePopup);
}

// Filter Functions
function toggleDiet(diet) {
  const index = state.selectedDiets.indexOf(diet);
  if (index > -1) state.selectedDiets.splice(index, 1);
  else state.selectedDiets.push(diet);
}
function clearAllFilters() {
  state.selectedDiets = [];
  state.selectedCuisine = "";
  state.selectedTime = "";
  state.selectedDifficulty = "";
  document.querySelectorAll(".badge.active").forEach((badge) =>
    badge.classList.remove("active")
  );
  cuisineSelect.value = "";
  timeSelect.value = "";
  difficultySelect.value = "";
  renderRecipes();
  updateClearButton();
}
function updateClearButton() {
  const hasFilters =
    state.selectedDiets.length > 0 ||
    state.selectedCuisine ||
    state.selectedTime ||
    state.selectedDifficulty;
  clearFiltersBtn.classList.toggle("hidden", !hasFilters);
}
function filterRecipes() {
  return recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(state.searchQuery) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(state.searchQuery)
      );
    const matchesDiet =
      state.selectedDiets.length === 0 ||
      state.selectedDiets.some((diet) => recipe.diet.includes(diet));
    const matchesCuisine =
      !state.selectedCuisine || recipe.cuisine === state.selectedCuisine;
    const matchesTime = (() => {
      if (!state.selectedTime) return true;
      if (state.selectedTime === "under-15") return recipe.time < 15;
      if (state.selectedTime === "15-30") return recipe.time >= 15 && recipe.time <= 30;
      if (state.selectedTime === "30-60") return recipe.time > 30 && recipe.time <= 60;
      if (state.selectedTime === "over-60") return recipe.time > 60;
      return true;
    })();
    const matchesDifficulty =
      !state.selectedDifficulty || recipe.difficulty === state.selectedDifficulty;
    return matchesSearch && matchesDiet && matchesCuisine && matchesTime && matchesDifficulty;
  });
}

// Render Functions
function renderRecipes() {
  // Always get the latest recipes from localStorage
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const filteredRecipes = filterRecipes();
  if (filteredRecipes.length === 0) {
    recipeGrid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");
  recipeGrid.innerHTML = filteredRecipes.map(createRecipeCard).join("");
  // Add click listeners for popup
  document.querySelectorAll(".recipe-card").forEach((card) =>
    card.addEventListener("click", () => openPopup(card.dataset.id))
  );
}
function createRecipeCard(recipe) {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <div class="card-info">
        <h3>${recipe.title}</h3>
        <p>${recipe.cuisine} • ${recipe.time} min • ${recipe.difficulty}</p>
        <div class="badges">${recipe.diet.map((d) => `<span>${d}</span>`).join(", ")}</div>
      </div>
    </div>
  `;
}

// Popup Functions
function openPopup(id) {
  const recipe = recipes.find((r) => r.id == id);
  if (!recipe) return;
  renderPopup(recipe);
  recipePopup.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closePopup() {
  recipePopup.classList.add("hidden");
  document.body.style.overflow = "";
}
function renderPopup(recipe) {
  const available = recipe.ingredients.filter((ing) => pantryItems.includes(ing));
  const missing = recipe.ingredients.filter((ing) => !pantryItems.includes(ing));
  popupBody.innerHTML = `
    <h2>${recipe.title}</h2>
    <p>${recipe.instructions}</p>
    <h3>Shopping List</h3>
    <p><strong>In Pantry:</strong> ${available.join(", ") || "None"}</p>
    <p><strong>Need to Buy:</strong> ${missing.join(", ") || "All set!"}</p>
    </div>
      <button class="edit-recipe-btn" onclick="editRecipe(${recipe.id})">Edit</button>
       <button class="delete-recipe-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
    </div>
  `;
}

function editRecipe(recipeId) {
  const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeIndex = storedRecipes.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) return;
    localStorage.setItem("editing-existing-recipe", recipeIndex);
    window.location.href = "add_recipe.html";
}

function deleteRecipe(recipeId) {
  let storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  storedRecipes = storedRecipes.filter(r => r.id != recipeId);
  localStorage.setItem("recipes", JSON.stringify(storedRecipes));
  closePopup();
  const card = document.querySelector(`.recipe-card[data-id="${recipeId}"]`);
  if (card) card.remove();
  renderRecipes();
}

function startNewRecipe() {
    localStorage.removeItem("editing-existing-recipe");
    window.location.href = "add_recipe.html";
}

// Start
init();
