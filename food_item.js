function start(){
    if(localStorage.getItem("edit-item") !== null){
        let index = localStorage.getItem("edit-item");
        localStorage.removeItem("edit-item")
        edit_existing_item(index);
    }
}
function edit_existing_item(index){
    let items = JSON.parse(localStorage.getItem("items"));
    let ite = items[index];
    document.getElementById("item-name").value  = ite.name
    let category_arr = document.getElementsByName('category-choice');
    for (i = 0; i < category_arr.length; i++) {
        if (category_arr[i].value == ite.category){
            category_arr[i].checked = true;
            break;
        }
    }
    document.getElementById("quantity").value = ite.quantity;
    document.getElementById("item-unit").value = ite.units;
    document.getElementById("item-exp-date").value = ite.date;
    let storage_arr = document.getElementsByName('storage-choice');
    for (i = 0; i < storage_arr.length; i++) {
        if (storage_arr[i].value == ite.storage){
            storage_arr[i].checked = true;
            break;
        }
    }
    if(ite.notes){
        document.getElementById("item-notes").value = ite.notes;
    }
    localStorage.setItem("editing-existing-item", index);
}
function go_back_to_pantry(){
    window.location.href = 'pantry.html';
}
function save_new_item(){
    let name = document.getElementById("item-name").value;
    let category_arr = document.getElementsByName('category-choice');
    let quan = document.getElementById("quantity").value;
    let units = document.getElementById("item-unit").value;
    let category_choice;
    let date = document.getElementById("item-exp-date").value;
    let storage_arr = document.getElementsByName('storage-choice');
    let storage_choice;
    let additional_notes = document.getElementById("item-notes").value;

    for (i = 0; i < category_arr.length; i++) {
        if (category_arr[i].checked){
            category_choice = category_arr[i].value;
        }
    }

    for (i = 0; i < storage_arr.length; i++) {
        if (storage_arr[i].checked){
            storage_choice = storage_arr[i].value;
        }
    }
    let item = new Object();
    item.name = name;
    item.category = category_choice;
    item.quantity = quan;
    item.units = units;
    item.date = date;
    item.storage = storage_choice;
    item.notes = additional_notes;
    console.log(item);
    let items = JSON.parse(localStorage.getItem("items"));

    if(localStorage.getItem("editing-existing-item") !== null){
        let index = localStorage.getItem("editing-existing-item");
        items[index] = item;
        localStorage.removeItem("editing-existing-item");
    }else{
        items.push(item);
    }
    localStorage.setItem("items", JSON.stringify(items));
    window.location.href = 'pantry.html';
}