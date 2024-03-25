// Get References to DOM Elements
const input = document.querySelector('#addItem-input');
const addItemButton = document.querySelector('#add_item');
const itemFilter = document.getElementById("filter");
const itemList = document.getElementById("to_do_list");

// Function to add item to the to-do list
const addItem = (text) => {
	// check if the input is empty
	if (text.trim() === "") {
    alert("Enter Something");
    input.value = ""; // Clear the input field
    input.focus(); // Set the focus back to the input field
		return;
	}

	// Create DOM Elements for the New Item
	const item = document.createElement('div');
	const textElement = document.createElement('p');
	const iconsContainer = document.createElement('div');
	const checkIcon = document.createElement('i');
	const trashIcon = document.createElement('i');

	// Set Classes and Text Content
	item.className = "item";
	textElement.textContent = text;
	checkIcon.className = 'fa-solid fa-square-check lightgray';
  // checkIcon.classList.add('checkIcon-color');
	trashIcon.className = 'fa-solid fa-trash';
	trashIcon.style.color = 'darkgray';

	// Register Event Listener for the Check Icon
	checkIcon.addEventListener('click', () => {
		checkIcon.classList.toggle('lightgray');
	});

	// Add Eventlistener for the Trash Icon
	trashIcon.addEventListener('click', () => {
		if(confirm('Are you sure you want to delete this Todo?'))
		item.remove(); // This removes the item from the DOM	
	});

	// Append the Icons to the IconsContainer
	iconsContainer.append(checkIcon, trashIcon);

	// Append the Text and the iconsContainer to the item
	item.append(textElement, iconsContainer);

	// Append the item to the to-do list
	document.querySelector('#to_do_list').append(item);

	// clear Input Field after Adding Items
	input.value = '';
};

// The Filter Input Function
function filterItems(e) {
  const items = itemList.querySelectorAll("div.item");
  // change the case of every character from the input element
  const text = e.target.value.toLowerCase();
  // console.log(text);
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Add Event Listener for the Filter Input
itemFilter.addEventListener("input", filterItems);

// Add Event Listener for Keydown Events on the Input Field
input.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addItem(input.value);
	}
});

// Add Event Listener on the AddItem Button
addItemButton.addEventListener('click', () => {
	addItem(input.value);
});