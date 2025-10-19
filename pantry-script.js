let items = Array()
function call_add_item(){
    window.location.href = 'food_item.html';
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
    let items = JSON.parse(localStorage.getItem("items"));

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    
    window.location.href = 'pantry.html';
    // populate_inventory();

}

function get_inventory(){

}

function populate_inventory(){
    let tmp = JSON.parse(localStorage.getItem("items"));

    console.log("hi");
    console.log(tmp[0]);
}
populate_inventory();

