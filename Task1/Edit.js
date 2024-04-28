let submitBtn = document.querySelector("#submitBtn");
let table= document.querySelector('#contentTable');
const url = "http://127.0.0.1:5500/App.html";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id'); //  Returns id of row from


const getInput=()=>{
    let name= document.getElementById("fName").value;
    let email= document.getElementById("email").value;
    let city= document.getElementById("city").value;
    let salary= document.getElementById("salary").value;
    return {name , email, city, salary};
    
}

const setEditFields=()=>{
    currentRow = getRowById(id);
    document.getElementById("fName").value=currentRow.name
    document.getElementById("email").value=currentRow.email
    document.getElementById("city").value=currentRow.city
    document.getElementById("salary").value=currentRow.salary

}


submitBtn.onclick= ()=>
{   
    let {name,email,city,salary}= getInput();
    editRow(name,email,city,salary);
    //Clearing the input text areas after submitting 
    let ins= document.getElementsByClassName("fName");
    for(let i = 0; i< ins.length ; i++)
    {
        ins[i].value='';
    }
    window.location.href =url;
}

 const editRow=(name,email,city,salary)=>{
   let rowData = getDataFromStorage();
   let index = rowData.findIndex(row => row['data-id'] == id);
    console.log(index);
    if (index !== -1) {
        rowData[index].name = name;
        rowData[index].email = email;
        rowData[index].city = city;
        rowData[index].salary = salary;
        
        saveDataToStorage(rowData);
    }

 }

const saveDataToStorage= (data)=>{
    localStorage.setItem('rowData', JSON.stringify(data));
}

const getDataFromStorage=()=>{
    let data= localStorage.getItem('rowData');
    return data ? JSON.parse(data) : [];
}


const getRowById = (rowId) => {
    let rowData = getDataFromStorage();
    let foundRow= rowData.find((row) => {
       return row['data-id'] == id;
    });

    return foundRow};


const onLoad=()=>{
    
    let rowData = getDataFromStorage();
    rowData.forEach((row)=>{
        let newRow= table.insertRow();
        newRow.setAttribute('data-id', row['data-id']);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        cell1.innerHTML= row.name;
        cell2.innerHTML= row.email;
        cell3.innerHTML= row.salary;
        cell4.innerHTML= row.city;
        cell5.innerHTML= '<button id="delBtn" class="delete">Delete</button> <button id="editBtn" class="edit">Edit</button>';
        
    })
    
}
onLoad();
setEditFields();

