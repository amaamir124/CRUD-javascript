let submitBtn = document.querySelector("#submitBtn");
let table= document.querySelector('#contentTable');
const url = "http://127.0.0.1:5500/Edit.html?";



const getInput=()=>{
    let name= document.getElementById("fName").value;
    let email= document.getElementById("email").value;
    let city= document.getElementById("city").value;
    let salary= document.getElementById("salary").value;
    return {name , email, city, salary};
    
}


submitBtn.onclick= ()=>
{   
    let {name,email,city,salary}= getInput();
    addRow(name,email,city,salary);

    //Clearing the input text areas after submitting 
    let ins= document.getElementsByClassName("fName");
    for(let i = 0; i< ins.length ; i++)
    {
        ins[i].value='';
    }
}

 const addRow=(name,email,city,salary)=>{
    let newRow= table.insertRow();
    let uniqueId = Date.now() ; // Generate unique ID
    newRow.setAttribute('data-id', uniqueId);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    cell1.innerHTML= name;
    cell2.innerHTML= email;
    cell3.innerHTML= salary;
    cell4.innerHTML= city;
    cell5.innerHTML= '<button id="delBtn" class="delete">Delete</button> <button id="editBtn" class="edit">Edit</button>';

        // Save row data to local storage
        let rowData = getDataFromStorage();
        rowData.push({
            name: name,
            email: email,
            city: city,
            salary: salary,
            'data-id': uniqueId
        });
        saveDataToStorage(rowData);
 }

 
 table.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("delete")) {
        let row = e.target.closest("tr");
        let rowId=getRowId(e);
       
        row.remove(); 
        deleteDataFromStorage(rowId);
        


    }

    if (e.target && e.target.classList.contains("edit")) {

        let rowId= getRowId(e);

        let queryString=setQueryString(rowId);
         window.location.href =url+ queryString;


       
    }
});


const getRowId=(e)=>{
    let row = e.target.closest("tr");
    let rowId= row.getAttribute('data-id');
    console.log("Row Id:" , rowId);
    return rowId

}

const setQueryString = (rowId) => {
    const searchParams = new URLSearchParams({ id: rowId }); 
    const queryString = searchParams.toString(); 
    return queryString; 
}

const saveDataToStorage= (data)=>{
    localStorage.setItem('rowData', JSON.stringify(data));
}

const getDataFromStorage=()=>{
    let data= localStorage.getItem('rowData');
    return data ? JSON.parse(data) : [];
}

const deleteDataFromStorage=(rowId)=>{ 
    let rowData = getDataFromStorage();
    let index = rowData.findIndex(row => row['data-id'] == rowId);
    if (index !== -1) {
        rowData.splice(index, 1); 
        saveDataToStorage(rowData); 
    }
}



// Setting Starting values from Local Storage when page is reloaded

const onLoad=()=>{      
    let rowData = getDataFromStorage();
    rowData.forEach((row)=>{
        let newRow= table.insertRow();
        let uniqueId = Date.now() ; // Generate unique ID
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