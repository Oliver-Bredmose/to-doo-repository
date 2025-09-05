
// #region globals
const conrentsection = document.getElementById('mainContainer');
let currentData=null;
//#endregion globals

initapp()

// #region model code
function getData(){
    console.log('getData');
return JSON.parse(localStorage.getItem("toDooApp_v1")) 
}

function saveData(myData){
    console.log('saveData');
    let serializedData=JSON.stringify(myData)

    localStorage.setItem("toDooApp_v1", serializedData)
}
//#endregion model code

// #region controller code
function initapp(){
    console.log('initapp');
    
    //hent data

    //evaluer data 

}

//#endregion controller code

// #region view code

//#endregion view code


