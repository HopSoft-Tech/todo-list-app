// Get references to DOM elements
const input = document.querySelector("#input");
const addItemButton = document.querySelector("#add_item");

// Function to add a new item to the to-do list
const addItem = (text) => {
  // Check if the input is empty
  if (text.trim() === "") {
    alert("Enter Something");
    return;
  }

  // Create DOM elements for the new item
  const item = document.createElement("div");
  const textElement = document.createElement("p");
  const iconsContainer = document.createElement("div");
  const checkIcon = document.createElement("i");
  const trashIcon = document.createElement("i");

  // Set classes and text content
  item.className = "item";
  textElement.textContent = text;
  checkIcon.className = "fas fa-check-square";
  checkIcon.style.color = "lightgray";
  trashIcon.className = "fas fa-trash";
  trashIcon.style.color = "darkgray";

  // Event listener for the check icon
  checkIcon.addEventListener("click", () => {
    checkIcon.style.color = "limegreen";
  });

  // Event listener for the trash icon
  trashIcon.addEventListener("click", () => {
    item.remove();
  });

  // Append icons to icons container
  iconsContainer.append(checkIcon, trashIcon);

  // Append text and icons container to the item
  item.append(textElement, iconsContainer);

  // Append item to the to-do list
  document.querySelector("#to_do_list").appendChild(item);

  // Clear input field after adding item
  input.value = "";
};

// Event listener for keydown event on input field
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem(input.value);
  }
});

// Event listener for click event on add item button
addItemButton.addEventListener("click", () => {
  addItem(input.value);
});
