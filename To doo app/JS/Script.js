
// #region globals
const contentsection = document.getElementById('content');
console.log(contentsection);

let currentData=null;
//#endregion globals

initapp()

// #region MODEL CODE
function getData(){
    console.log('getData');
return JSON.parse(localStorage.getItem("toDooApp_v1")) 
}

function saveData(myData){
    console.log('saveData');
    let serializedData=JSON.stringify(myData)

    localStorage.setItem("toDooApp_v1", serializedData)
}

function makeNewData(){
    console.log('makeNewData');
// dummy data husk at tømme lister inden deployment
    let NewData={
DarkMode:false,
 list:[
    {
        listName: "liste 1",
        items:[{name:"item 1",done:false},{name:"item 2",done:true},{name:"item 3",done:false}]
    },
    {
        listName: "indkøb",
        items:[{name:"Kød",done:false},{name:"salat",done:true},{name:"agurk",done:false}]
    }
 ]  
    }
    
    return NewData;
}


//#endregion model code

// #region CONTROLLER CODE
function initapp(){
    console.log('initapp');
    
    //hent data
    currentData=getData()
    
    //evaluer data 

    if (currentData==null) {
// vi har ikke data      
    currentData=makeNewData()
    saveData(currentData)
    }

    // vi har data
    makeListsView(currentData)
}


//#endregion controller code

// #region VIEW CODE
function listViewCallBack(action,index){
    console.log('listViewCallBack');
    console.log(action);
    console.log(index);

    switch(action){
        case "ShowList":
            //showList(index)
            console.log(currentData.list[index])
            contentsection.innerHTML = ""

            currentData.list[index].items.forEach((item) => {
                let itemContainer = document.createElement('div')
                itemContainer.innerHTML = `<h2>${item.name} - ${item.done}</h2>`
                contentsection.appendChild(itemContainer)
            })
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
function makeListsView(data){
    console.log('makeListsView');
    //tøm conrentsection
    console.log(contentsection);
    
    contentsection.innerHTML='';

    data.list.forEach((list,index) => {

        console.log(list.listName);

        let listContainer=document.createElement('div')
//vis liste
listContainer.innerHTML=`<h2 onclick="listViewCallBack('ShowList',${index})">${list.listName}
</h2><button>edit</button>
</h2><button>Delete</button>`

contentsection.appendChild(listContainer)
 
    });


}

//BUTTONS

//DELETE BUTTON
function DeleteList(index) {
    if (!confirm("Are you sure?")) {
        currentData.list.splice(index, 1)
        saveData(currentData)
        makeListsView(currentData)
    }
}
//#endregion view code


