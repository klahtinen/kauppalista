document.addEventListener("DOMContentLoaded", function () {
    const itemInput = document.getElementById("item");
    const addButton = document.getElementById("addButton");
    const itemList = document.getElementById("itemList");

    addButton.addEventListener("click", function () {
        const itemName = itemInput.value.trim();
        if (itemName !== "") {
            const listItem = document.createElement("li");

            // Lisätään checkbox ja tuotteen nimi
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            listItem.appendChild(checkbox);
            const label = document.createElement("label");
            label.textContent = itemName;
            listItem.appendChild(label);

            // Checkboxin toiminnallisuus poistaa tuotteen
            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    listItem.remove();
                }
            });

            itemList.appendChild(listItem);
            itemInput.value = "";
        }
    });
});