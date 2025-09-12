
// #region GLOBALS

const contentsection = document.getElementById('content');
const addButton = document.getElementById('addButton');
let currentData = null;
// #endregion GLOBALS

initapp()
GetDarkmode();



// #region MODEL CODE

function getData() {
    return JSON.parse(localStorage.getItem("toDooApp_v1"))
}

function saveData(myData) {
    let serializedData = JSON.stringify(myData)
    localStorage.setItem("toDooApp_v1", serializedData)
}

function makeNewData() {
    return {
        DarkMode: false,
        list: [
            {
                listName: "liste 1",
                items: [
                    { name: "item 1", done: false },
                    { name: "item 2", done: true },
                    { name: "item 3", done: false }
                ]
            },
            {
                listName: "indkøb",
                items: [
                    { name: "Kød", done: false },
                    { name: "salat", done: true },
                    { name: "agurk", done: false }
                ]
            }
        ]
    }
}

function GetDarkmode() {
    var element = document.body;
    const textEl = document.querySelector('#DarkModeButton .toggle-text');
    if (localStorage.getItem("theme") === "dark") {
      element.classList.add("darkmode");
      if (textEl) textEl.textContent = "Dark";
    } else {
      element.classList.remove("darkmode");
      if (textEl) textEl.textContent = "Light";
    }
  }
  
  // Set Darkmode
  function SetDarkmode() {
    var element = document.body;
    element.classList.add("darkmode");
    localStorage.setItem("theme", "dark");
  }
// #endregion MODEL


// #region CONTROLLER CODE

function initapp() {
    currentData = getData()

    if (currentData == null) {
        currentData = makeNewData()
        saveData(currentData)
    }

    makeListsView(currentData)

    // global "Add List" button
    addButton.addEventListener("click", () => {
        const newName = prompt("Navngiv den nye ToDoo:")
        if (newName) {
            currentData.list.push({ listName: newName, items: [] })
            saveData(currentData)
            makeListsView(currentData)
        }
    })
}

function listViewCallBack(action, index) {
    switch (action) {
        case "ShowList":
            showList(index)
            break;
        case "EditList":
            editList(index)
            break;
        case "DeleteList":
            deleteList(index)
            break;
        default:
            console.log("no action");
    }
}
// #endregion CONTROLLER


// #region VIEW CODE 

function makeListsView(data) {
    contentsection.innerHTML = '';
    addButton.style.display = "inline-block"; // show Add List button

    data.list.forEach((list, index) => {
        let listContainer = document.createElement('div')
        listContainer.innerHTML = `
            <h2 onclick="listViewCallBack('ShowList', ${index})">${list.listName}</h2>
            <button onclick="listViewCallBack('EditList', ${index})">Edit</button>
            <button onclick="listViewCallBack('DeleteList', ${index})">Delete</button>
        `
        contentsection.appendChild(listContainer)
    });
}

function showList(index) {
    contentsection.innerHTML = ""
    addButton.style.display = "none"; // hide Add List button when inside a list

    // back button
    let backBtn = document.createElement('button')
    backBtn.innerText = "← Back"
    backBtn.onclick = () => makeListsView(currentData)
    contentsection.appendChild(backBtn)

    // list title
    let title = document.createElement('h2')
    title.innerText = currentData.list[index].listName
    contentsection.appendChild(title)

    // mark all toggle button
    let markAllBtn = document.createElement('button')
    const allDone = currentData.list[index].items.every(item => item.done)
    markAllBtn.innerText = allDone ? "Mark All Undone" : "Mark All Done"
    markAllBtn.onclick = () => toggleAllItems(index, !allDone)
    contentsection.appendChild(markAllBtn)

    // items
    currentData.list[index].items.forEach((item, itemIndex) => {
        let itemContainer = document.createElement('div')
        itemContainer.innerHTML = `
            <input type="checkbox" ${item.done ? "checked" : ""} 
                   onchange="toggleItemDone(${index}, ${itemIndex})">
            ${item.name}
            <button onclick="editItem(${index}, ${itemIndex})">Edit</button>
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

function editList(index) {
    const newName = prompt("Tilføj nyt list navn:", currentData.list[index].listName)
    if (newName) {
        currentData.list[index].listName = newName
        saveData(currentData)
        makeListsView(currentData)
    }
}

function deleteList(index) {
    if (confirm("Sikker på du vil slette?")) {
        currentData.list.splice(index, 1)
        saveData(currentData)
        makeListsView(currentData)
    }
}

function addItem(listIndex) {
    const itemName = prompt("Navngiv ToDoo:")
    if (itemName) {
        currentData.list[listIndex].items.push({ name: itemName, done: false })
        saveData(currentData)
        showList(listIndex)
    }
}

function deleteItem(listIndex, itemIndex) {
    if (confirm("Sikker på du vil slette?")) {
        currentData.list[listIndex].items.splice(itemIndex, 1)
        saveData(currentData)
        showList(listIndex)
    }
}

function toggleItemDone(listIndex, itemIndex) {
    let item = currentData.list[listIndex].items[itemIndex]
    item.done = !item.done
    saveData(currentData)
}

function editItem(listIndex, itemIndex) {
    const newName = prompt("Tilføj nyt list navn:", currentData.list[listIndex].items[itemIndex].name)
    if (newName) {
        currentData.list[listIndex].items[itemIndex].name = newName
        saveData(currentData)
        showList(listIndex)
    }
}

function toggleAllItems(listIndex, markDone) {
    currentData.list[listIndex].items.forEach(item => {
        item.done = markDone
    })
    saveData(currentData)
    showList(listIndex)
}

// Toggle Light/Dark mode
function ToggleTheme() {
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