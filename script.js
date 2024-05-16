// Get References to DOM Elements
const input = document.querySelector("#addItem-input");
const addItemButton = document.querySelector("#add_item");
const itemFilter = document.getElementById("filter");
const itemList = document.getElementById("to_do_list");
const clearBtn = document.getElementById("clear");
let isEditMode = false;

function displayItems() {
  // Get all items from local storage
  const itemsFromStorage = getItemsFromStorage();
  // Loop through the items and add them to the DOM
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
}

// Function to add item to the to-do list
const onAddItem = (text) => {
  // check if the input is empty
  if (text.trim() === "") {
    alert("Enter Something");
    input.value = ""; // Clear the input field
    input.focus(); // Set the focus back to the input field
    return;
  }

  // check if editMode is true, then allow edit
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.parentElement.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(text)) {
      alert("The todo you are trying to add already exists!");
      return;
    }
  }
  // Adds the todoItem to the DOM
  addItemToDom(text);

  // Add item to local storage
  addItemToStorage(text);

  // Call checkUI to Know if clearbtn should be added back to the DOM After the first item is added
  checkUI();
};

function addItemToDom(text) {
  // Create DOM Elements for the New Item
  const item = document.createElement("div");
  const textElement = document.createElement("p");
  const iconsContainer = document.createElement("div");
  const checkIcon = document.createElement("i");
  const trashIcon = document.createElement("i");

  // Set Classes and Text Content
  item.className = "item";
  textElement.className = "itemText";
  textElement.textContent = text;
  checkIcon.className = "fa-solid fa-square-check lightgray";
  // checkIcon.classList.add('checkIcon-color');
  trashIcon.className = "fa-solid fa-trash";
  trashIcon.style.color = "darkgray";

  // Register Event Listener for the Check Icon
  checkIcon.addEventListener("click", () => {
    checkIcon.classList.toggle("lightgray");
  });

  // Append the Icons to the IconsContainer
  iconsContainer.append(checkIcon, trashIcon);

  // Append the Text and the iconsContainer to the item
  item.append(textElement, iconsContainer);

  // Add Event Listener to Either Delete or Edit Specific item
  item.addEventListener("click", onClickItem);

  // Append the item to the to-do list
  document.querySelector("#to_do_list").append(item);
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Add new item to the array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.classList.contains("fa-trash")) {
    removeTodoItem(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains("itemText")) {
    setItemToEdit(e.target);
  }
}

// Code block to prevent the addition of Duplicate Items
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  // Selects all itemList & removes the edit mode on all, so it can be added to just one or the clicked item
  itemList
    .querySelectorAll(".item p")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  addItemButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  addItemButton.classList.remove("add");
  addItemButton.classList.add("update");
  input.value = item.textContent;
}

function removeTodoItem(item) {
  if (confirm("Are you sure you want to delete this Todo?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.firstChild.textContent);
    checkUI(); //call the checkUI() again to check if there is no more list item.
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  // filter out the item to be removed from the array
  itemsFromStorage = itemsFromStorage.filter(
    (itemFromStorage) => itemFromStorage !== item
  );

  // Re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// The Filter Input Function
function filterItems(e) {
  const items = itemList.querySelectorAll(".item");
  if (items.length === 0) {
    alert("There is Nothing to Filter");
    itemFilter.value = ""; // Clear the input field
    itemFilter.focus();
    return;
  } else {
    // change the case of every character from the input element
    const text = e.target.value.toLowerCase();
    items.forEach((item) => {
      const itemName = item.firstChild.textContent.toLowerCase();
      if (itemName.includes(text)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }
}

function clearItems() {
  if (confirm("Do you really want to clear All todos?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    // clear from localStorage using the default removeItem method
    // passing the keys to the method
    localStorage.removeItem("items");
  }

  checkUI(); //
}

function checkUI() {
  // clear Input Field
  input.value = "";

  // Gets all todo items
  const items = itemList.querySelectorAll(".item");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    // itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
  }

  addItemButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  addItemButton.classList.remove("update");
  addItemButton.classList.add("add");

  isEditMode = false; // Makes sure the isEditMode is set back to false.
}

// Initialize App
function initializer() {
  // Register Event Listeners for adding Items to the DOM either by clicking or with the Enter Key

  // Add Event Listener on the AddItem Button
  addItemButton.addEventListener("click", () => {
    onAddItem(input.value);
  });

  // Add Event Listener for Keydown Events on the Input Field
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      onAddItem(input.value);
    }
  });

  // clear all todo Items
  clearBtn.addEventListener("click", clearItems);

  // Add Event Listener for the Filter Input
  itemFilter.addEventListener("input", filterItems);

  document.addEventListener("DOMContentLoaded", displayItems);

  // Calls the checkUI, once the DOM is Loaded
  checkUI();
}

initializer();
