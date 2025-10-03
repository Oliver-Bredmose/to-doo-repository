
export function makeListsView(data) {


// #region VIEW CODE 
const contentsection = document.getElementById('content');
contentsection.innerHTML = '';
addButton.style.display = "inline-block"; // show Add List button

data.list.forEach((list, index) => {
    let listContainer = document.createElement('div');
listContainer.classList.add('list-container');

// create elements
let title = document.createElement('h2');
title.textContent = list.listName;
title.addEventListener('click', () => showList(index)); // ShowList

let editBtn = document.createElement('button');
editBtn.textContent = 'Edit';
editBtn.addEventListener('click', () => editList(index));

let deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';
deleteBtn.addEventListener('click', () => deleteList(index));

// append to container
listContainer.appendChild(title);
listContainer.appendChild(editBtn);
listContainer.appendChild(deleteBtn);

contentsection.appendChild(listContainer);

})}


export function showList(index) {
    contentsection.innerHTML = ""
    addButton.style.display = "none"; 

    // back button
    let backBtn = document.createElement('button')
    backBtn.innerText = "← Back"
    backBtn.onclick = () => makeListsView(currentData)
    contentsection.appendChild(backBtn)

    // list title
    let title = document.createElement('h2')
    title.innerText = currentData.list[index].listName
    contentsection.appendChild(title)


    // items
    currentData.list[index].items.forEach((item, itemIndex) => {
        let itemContainer = document.createElement('div')
        itemContainer.classList.add('item-kontainer')
        itemContainer.innerHTML = `
            <input type="checkbox" ${item.done ? "checked" : ""} 
                   onchange="toggleItemDone(${index}, ${itemIndex})">
            <div onclick="editItem(${index}, ${itemIndex})">${item.name}</div>
            <button onclick="deleteItem(${index}, ${itemIndex})">Delete</button>
            
        `
        contentsection.appendChild(itemContainer)
    })

    // add item button
    let addBtn = document.createElement('button')
    addBtn.innerText = "Lav ny ToDoo"
    addBtn.onclick = () => addItem(index)
    contentsection.appendChild(addBtn)
}

export function editList(index) {
    const newName = prompt("Tilføj nyt list navn:", currentData.list[index].listName)
    if (newName) {
        currentData.list[index].listName = newName
        saveData(currentData)
        makeListsView(currentData)
    }
}

export function deleteList(index) {
    if (confirm("Sikker på du vil slette?")) {
        currentData.list.splice(index, 1)
        saveData(currentData)
        makeListsView(currentData)
    }
}

export function addItem(listIndex) {
    const itemName = prompt("Navngiv ToDoo:")
    if (itemName) {
        currentData.list[listIndex].items.push({ name: itemName, done: false })
        saveData(currentData)
        showList(listIndex)
    }
}

export function deleteItem(listIndex, itemIndex) {
    if (confirm("Sikker på du vil slette?")) {
        currentData.list[listIndex].items.splice(itemIndex, 1)
        saveData(currentData)
        showList(listIndex)
    }
}

export function toggleItemDone(listIndex, itemIndex) {
    let item = currentData.list[listIndex].items[itemIndex]
    item.done = !item.done
    saveData(currentData)
}

export function editItem(listIndex, itemIndex) {
    const newName = prompt("Tilføj nyt list navn:", currentData.list[listIndex].items[itemIndex].name)
    if (newName) {
        currentData.list[listIndex].items[itemIndex].name = newName
        saveData(currentData)
        showList(listIndex)
    }
}

export function toggleAllItems(listIndex, markDone) {
    currentData.list[listIndex].items.forEach(item => {
        item.done = markDone
    })
    saveData(currentData)
    showList(listIndex)
}

// Toggle Light/Dark mode
export function ToggleTheme() {
    var element = document.body;
    const textEl = document.querySelector('#DarkModeButton');
    const addButton = document.getElementById('addButton'); 
  
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      element.classList.remove("darkmode");
      if (textEl) textEl.textContent = "Light";
    } else {
      localStorage.setItem("theme", "dark");
      element.classList.add("darkmode");
      if (textEl) textEl.textContent = "Dark";
    }
  }

// #endregion VIEW - LISTS