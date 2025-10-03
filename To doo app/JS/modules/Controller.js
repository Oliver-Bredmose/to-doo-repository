import { getData, saveData, makeNewData } from "./module.js"
import { makeListsView, showList, editList, deleteList } from "./View.js"   
// #region CONTROLLER CODE

let currentData = null;

export function initapp() {
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

export function listViewCallBack(action, index) {
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