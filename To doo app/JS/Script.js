
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
// dummy data husk at tømme lister inden deplayment
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
//#endregion view code


