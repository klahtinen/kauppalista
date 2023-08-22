document.addEventListener("DOMContentLoaded", function () {
    const itemInput = document.getElementById("item");
    const itemList = document.getElementById("itemList");
    const voiceButton = document.getElementById("voiceButton");

    // Function to add a new item to the list and save the list
    function addItemAndSave(itemName) {
        const listItem = document.createElement("li");

        // Create a label for the item name (clickable)
        const label = document.createElement("label");
        label.textContent = itemName;

        // Append the label to the list item
        listItem.appendChild(label);

        // Add an event listener to the list item to remove it when clicked
        listItem.addEventListener("click", function () {
            listItem.remove();
            saveShoppingList(); // Save the list when an item is removed
        });

        // Append the list item to the shopping list
        itemList.appendChild(listItem);

        saveShoppingList(); // Save the list when an item is added

        // Clear the text input box
        itemInput.value = "";
    }

    // Function to save the shopping list to local storage
    function saveShoppingList() {
        const listItems = Array.from(itemList.getElementsByTagName("li"));
        const shoppingList = listItems.map(function (listItem) {
            return listItem.textContent; // Use textContent to get the label text
        });

        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }

    // Load the shopping list from local storage on page load
    const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    savedList.forEach(addItemAndSave);

    // Event listener for pressing the Enter key in the input field
    itemInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const itemName = itemInput.value.trim();
            if (itemName !== "") {
                addItemAndSave(itemName);
            }
        }
    });

    // Voice recognition functionality
    voiceButton.addEventListener("click", function () {
        const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
        recognition.lang = 'fi-FI';

        recognition.onresult = function (event) {
            const result = event.results[0][0].transcript;
            if (result.trim() !== "") {
                addItemAndSave(result.trim());
            }
        };

        recognition.start();
    });
});