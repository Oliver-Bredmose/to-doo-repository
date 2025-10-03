
export let currentData = getData() || makeNewData()

// #region MODEL CODE

export function getData() {
    return JSON.parse(localStorage.getItem("toDooApp_v1"))
}

export function saveData(myData) {
    let serializedData = JSON.stringify(myData)
    localStorage.setItem("toDooApp_v1", serializedData)
}

export function makeNewData() {
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

export function GetDarkmode() {
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
  export function SetDarkmode() {
    var element = document.body;
    element.classList.add("darkmode");
    localStorage.setItem("theme", "dark");
  }
// #endregion MODEL