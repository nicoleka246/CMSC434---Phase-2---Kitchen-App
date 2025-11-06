// Dom elements
const fruit_b = document.getElementById("fruit_b");
const veg_b = document.getElementById("veg_b");
const protein_b = document.getElementById("protein_b");
const dairy_b = document.getElementById("dairy_b");
const other_b = document.getElementById("other_b");
const noResults = document.getElementById("no-results");
const sortBySelect = document.getElementById("sortby-select");

const state = {
    sortBy: "Recently Added"
};

function setListeners(){
    fruit_b.addEventListener('click', () => {
        fruit_b.classList.toggle('active');
    });
    veg_b.addEventListener('click', () => {
        veg_b.classList.toggle('active');
    });
    protein_b.addEventListener('click', () => {
        protein_b.classList.toggle('active');
    });
    dairy_b.addEventListener('click', () => {
        dairy_b.classList.toggle('active');
    });
    other_b.addEventListener('click', () => {
        other_b.classList.toggle('active');
    });
    sortBySelect.addEventListener("change", (e) => {
        console.log(e.target.value);
        if(e.target.value == "Quantity"){
            state.sortBy = e.target.value;
            sort_by_quantity();
        }else if(e.target.value == "Expiration Date"){
            state.sortBy = e.target.value;
            sort_expiration_date();
        }else{
            state.sortBy = e.target.value;
            sort_by_recently_added();
        }
    });
}

function start(){
    if(!localStorage.getItem("firstTime")){
        let items = Array();
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("firstTime", "true");
        localStorage.setItem("fruit_pressed", "false");
        localStorage.setItem("veg_pressed", "false");
        localStorage.setItem("protein_pressed", "false");
        localStorage.setItem("dairy_pressed", "false");
        localStorage.setItem("other_pressed", "false");
    }else{
        let items = JSON.parse(localStorage.getItem("items"));
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("fruit_pressed", "false");
        localStorage.setItem("veg_pressed", "false");
        localStorage.setItem("protein_pressed", "false");
        localStorage.setItem("dairy_pressed", "false");
        localStorage.setItem("other_pressed", "false");

    }
    populate_items();
    setListeners();

}

function pressed_fruit(){
    if(localStorage.getItem("fruit_pressed") == "false"){
        localStorage.setItem("fruit_pressed", "true");
    }else{
        localStorage.setItem("fruit_pressed", "false");
    }
    populate_some_items();
}

function pressed_veg(){
    if(localStorage.getItem("veg_pressed") == "false"){
        localStorage.setItem("veg_pressed", "true");
    }else{
        localStorage.setItem("veg_pressed", "false");
    }
    populate_some_items();
}

function pressed_protein(){
    if(localStorage.getItem("protein_pressed") == "false"){
        localStorage.setItem("protein_pressed", "true");
    }else{
        localStorage.setItem("protein_pressed", "false");
    }
    populate_some_items();
}

function pressed_dairy(){
    if(localStorage.getItem("dairy_pressed") == "false"){
        localStorage.setItem("dairy_pressed", "true");
    }else{
        localStorage.setItem("dairy_pressed", "false");
    }
    populate_some_items();
}

function pressed_other(){
    if(localStorage.getItem("other_pressed") == "false"){
        localStorage.setItem("other_pressed", "true");
    }else{
        localStorage.setItem("other_pressed", "false");
    }
    populate_some_items();
}

function populate_some_items(){
    let name = document.getElementById("search-input").value;
    let items = JSON.parse(localStorage.getItem("items"));
    let all_items = new Array();
    const pantryGrid = document.getElementById("pantry-grid");
    let pantryIHTML = "";
    let addAllItems = "false";
    let addAllItems_count = 0;


    if(localStorage.getItem("fruit_pressed") == "false" && 
        localStorage.getItem("veg_pressed") == "false" &&
        localStorage.getItem("protein_pressed") == "false" &&
        localStorage.getItem("dairy_pressed") == "false" &&
        localStorage.getItem("other_pressed") == "false"){
        addAllItems = "true";
    }
   
    for(i = 0; i < items.length; i++){
        let tmp = items[i];
        if(addAllItems == "true"){
            if(name == ""){
                addAllItems_count++;
                all_items.push(tmp);
            }else{
                if(tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
        }else{
            if(name == ""){
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }else{
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
            
        }
    }

    if(state.sortBy == "Recently Added"){
        all_items.reverse();
    }else if(state.sortBy == "Quantity"){
        all_items.sort((a, b) => a.quantity - b.quantity);
    }else{
        all_items.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    pantryIHTML += all_items.map(createPantryCard).join("");
    pantryGrid.innerHTML = pantryIHTML;
    if(pantryIHTML == ""){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    } 
}

function createPantryCard(pantry) {
    return `
      <div class="pantry-card" data-id="${pantry.name}">
        <div class="card-info">
          <h3>${pantry.name}</h3>
          <p>${pantry.category} • ${pantry.quantity} ${pantry.units} • ${pantry.storage} </p>
          <p><b>Expiration Date:</b> ${pantry.date}<p>
          <p><b>Notes:</b> ${pantry.notes}<p>
          <div class="button-style">
            <button id = "edit-button" data-name = "${pantry.name}" class= "button-styling" type = "button" onclick = "edit_item(this)">Edit</button>&nbsp;&nbsp;
            <button id = "delete-button" data-name = "${pantry.name}" class = "button-styling" type = "button" onclick = "delete_item(this)">Delete</button>
          </div>
        </div>
      </div>
    `;
}

function delete_item(button){
    const name = button.dataset.name;
    let items = JSON.parse(localStorage.getItem("items"));
    let i = 0;
    for(i = 0; i < items.length; i++){
        let te = items[i];
        if(te.name === name){
            items.splice(i, 1);
        }
    }
    localStorage.setItem("items", JSON.stringify(items));
    start();
}

function edit_item(button){
    const name = button.dataset.name;
    let items = JSON.parse(localStorage.getItem("items"));
    let i = 0;
    for(i = 0; i < items.length; i++){
        let te = items[i];
        if(te.name === name){
            localStorage.setItem("edit-item", i);
            break;
        }
    }
    window.location.href = 'food_item.html';
}

function search_for_item(){
    let name = document.getElementById("search-input").value;
    let items = JSON.parse(localStorage.getItem("items"));
    let all_items = new Array();
    const pantryGrid = document.getElementById("pantry-grid");
    let pantryIHTML = "";
    let addAllItems = "false";
    let addAllItems_count = 0;


    if(localStorage.getItem("fruit_pressed") == "false" && 
        localStorage.getItem("veg_pressed") == "false" &&
        localStorage.getItem("protein_pressed") == "false" &&
        localStorage.getItem("dairy_pressed") == "false" &&
        localStorage.getItem("other_pressed") == "false"){
        addAllItems = "true";
    }
   
    for(i = 0; i < items.length; i++){
        let tmp = items[i];
        if(addAllItems == "true"){
            if(name == ""){
                addAllItems_count++;
                all_items.push(tmp);
            }else{
                if(tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
        }else{
            if(name == ""){
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }else{
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
            
        }
    }
    
    if(state.sortBy == "Recently Added"){
        all_items.reverse();
    }else if(state.sortBy == "Quantity"){
        all_items.sort((a, b) => a.quantity - b.quantity);
    }else{
        all_items.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    pantryIHTML += all_items.map(createPantryCard).join("");
    pantryGrid.innerHTML = pantryIHTML;
    if(pantryIHTML == ""){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    } 
}

function sort_by_recently_added(){
    let items = JSON.parse(localStorage.getItem("items"));
    let all_items = new Array();
    const pantryGrid = document.getElementById("pantry-grid");
    let pantryIHTML = "";
    let addAllItems = "false";
    let addAllItems_count = 0;


    if(localStorage.getItem("fruit_pressed") == "false" && 
        localStorage.getItem("veg_pressed") == "false" &&
        localStorage.getItem("protein_pressed") == "false" &&
        localStorage.getItem("dairy_pressed") == "false" &&
        localStorage.getItem("other_pressed") == "false"){
        addAllItems = "true";
    }
   
    for(i = 0; i < items.length; i++){
        let tmp = items[i];
        if(addAllItems == "true"){
            if(name == ""){
                addAllItems_count++;
                all_items.push(tmp);
            }else{
                if(tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
        }else{
            if(name == ""){
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }else{
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
            
        }
    }
    all_items.reverse();
    pantryIHTML += all_items.map(createPantryCard).join("");
    pantryGrid.innerHTML = pantryIHTML;
    if(pantryIHTML == ""){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    } 
}

function sort_by_quantity(){
    let items = JSON.parse(localStorage.getItem("items"));
    let all_items = new Array();
    const pantryGrid = document.getElementById("pantry-grid");
    let pantryIHTML = "";
    let addAllItems = "false";
    let addAllItems_count = 0;


    if(localStorage.getItem("fruit_pressed") == "false" && 
        localStorage.getItem("veg_pressed") == "false" &&
        localStorage.getItem("protein_pressed") == "false" &&
        localStorage.getItem("dairy_pressed") == "false" &&
        localStorage.getItem("other_pressed") == "false"){
        addAllItems = "true";
    }
   
    for(i = 0; i < items.length; i++){
        let tmp = items[i];
        if(addAllItems == "true"){
            if(name == ""){
                addAllItems_count++;
                all_items.push(tmp);
            }else{
                if(tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
        }else{
            if(name == ""){
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }else{
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
        }
    }
    all_items.sort((a, b) => a.quantity - b.quantity);
    pantryIHTML += all_items.map(createPantryCard).join("");
    pantryGrid.innerHTML = pantryIHTML;
    if(pantryIHTML == ""){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    } 
}

function sort_expiration_date(){
    let items = JSON.parse(localStorage.getItem("items"));
    let all_items = new Array();
    const pantryGrid = document.getElementById("pantry-grid");
    let pantryIHTML = "";
    let addAllItems = "false";
    let addAllItems_count = 0;


    if(localStorage.getItem("fruit_pressed") == "false" && 
        localStorage.getItem("veg_pressed") == "false" &&
        localStorage.getItem("protein_pressed") == "false" &&
        localStorage.getItem("dairy_pressed") == "false" &&
        localStorage.getItem("other_pressed") == "false"){       
        addAllItems = "true";
    }
   
    for(i = 0; i < items.length; i++){
        let tmp = items[i];
        if(addAllItems == "true"){
            if(name == ""){
                addAllItems_count++;
                all_items.push(tmp);
            }else{
                if(tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
        }else{
            if(name == ""){
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true"){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }else{
                if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true" && tmp.name.toLowerCase().includes(name.toLowerCase())){
                    addAllItems_count++;
                    all_items.push(tmp);
                }
            }
            
        }
    }
    all_items.sort((a, b) => new Date(a.date) - new Date(b.date));
    pantryIHTML += all_items.map(createPantryCard).join("");
    pantryGrid.innerHTML = pantryIHTML;
    if(pantryIHTML == ""){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    } 
}

function populate_items(){
    let items = JSON.parse(localStorage.getItem("items"));
    let all_items = new Array();
    const pantryGrid = document.getElementById("pantry-grid");
    let pantryIHTML = "";
    let addAllItems = "false";
    let addAllItems_count = 0;


    if(localStorage.getItem("fruit_pressed") == "false" && 
        localStorage.getItem("veg_pressed") == "false" &&
        localStorage.getItem("protein_pressed") == "false" &&
        localStorage.getItem("dairy_pressed") == "false" &&
        localStorage.getItem("other_pressed") == "false"){
        addAllItems = "true";
    }
   
    for(i = 0; i < items.length; i++){
        let tmp = items[i];
        if(addAllItems == "true"){
            addAllItems_count++;
            all_items.push(tmp);
        }else{
            if(tmp.category == "Fruits" && localStorage.getItem("fruit_pressed") == "true"){
                addAllItems_count++;
                all_items.push(tmp);
            }else if(tmp.category == "Vegetables" && localStorage.getItem("veg_pressed") == "true"){
                addAllItems_count++;
                all_items.push(tmp);
            }else if(tmp.category == "Protein" && localStorage.getItem("protein_pressed") == "true"){
                addAllItems_count++;
                all_items.push(tmp);
            }else if(tmp.category == "Dairy" && localStorage.getItem("dairy_pressed") == "true"){
                addAllItems_count++;
                all_items.push(tmp);
            }else if(tmp.category == "Other" && localStorage.getItem("other_pressed") == "true"){
                addAllItems_count++;
                all_items.push(tmp);
            }
        }
    }
    if(state.sortBy == "Recently Added"){
        all_items.reverse();
    }else if(state.sortBy == "Quantity"){
        all_items.sort((a, b) => a.quantity - b.quantity);
    }else{
        all_items.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    pantryIHTML += all_items.map(createPantryCard).join("");
    pantryGrid.innerHTML = pantryIHTML;
    if(pantryIHTML == ""){
        noResults.classList.remove("hidden");
    }else{
        noResults.classList.add("hidden");
    }  
}

function call_add_item(){
    window.location.href = 'food_item.html';
}