let form = document.querySelector("form");
let table = document.querySelector("#tableData");
let search = document.querySelector("#search");


display();//loacal storage already contains employee data.without this table would remain empty.

form.addEventListener("submit",function(event)
{
    event.preventDefault();// HTML refresh after every form submission,if it happens everything disappears.it prevent this.
    
    let employee = { 
        name: empName.value,
        id: empId.value,
        email: email.value,
        department: department.value,
        training: training.value, 
        rating: rating.value,
        comment: comment.value,
        date:new Date().toLocaleString()
    };

    for(let key in employee)
    {
        if(employee[key] =="")
        {
            alert("please fill all fields");
            return;
        }

    }
    let list = JSON.parse(localStorage.getItem("employees")) || [];
    list.push(employee);
    localStorage.setItem("employees",JSON.stringify(list));
    form.reset();
    display();
}
);

function display(){

    let list = JSON.parse(localStorage.getItem("employees")) || [];
    table.innerHTML ="";
    document.getElementById("count").innerHTML = list.length;
   
    let total=0;
    list.forEach(emp => {
       total += parseInt(emp.rating);
       
    });
    let avg= list.length ? (total/list.length).toFixed(1) : 0;
    document.getElementById("avgRating").innerHTML = avg;


    list.forEach((emp,index) =>
    {
        table.innerHTML += `
        <tr>
        <td>${emp.name}</td>
        <td>${emp.id} </td>
        <td>${emp.email}</td>

        <td>${emp.department} </td>
        <td>${emp.training} </td>
        <td>${emp.rating} </td>
        <td>${emp.comment} </td>
        <td>${emp.date} </td>
        
        <td>
        <button class="edit"onclick="editData(${index})">
        Edit
        </button>
        <button class="delete" onclick="deleteData(${index})"> Delete</button> 
        </td>
        </tr>
         `;
    });
}

function deleteData(index){
    let list = JSON.parse(localStorage.getItem("employees")) || [];
    list.splice(index,1);
    localStorage.setItem("employees",JSON.stringify(list));
    display();
    
}

function editData(index){

    let list = JSON.parse(localStorage.getItem("employees")) || [];
    let emp = list[index];

    empName.value=emp.name;
    empId.value=emp.id;
    email.value=emp.email;
    department.value=emp.department;
    training.value=emp.training;
    rating.value=emp.rating;
    comment.value=emp.comment;

    list.splice(index,1);
    localStorage.setItem("employees", JSON.stringify(list));
    display();
    
}

search.addEventListener("keyup",function()
{
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#tableData tr");
    rows.forEach(row =>
    {
        row.style.display = row.innerText.toLowerCase().includes(filter) ? "" : "none";
    }
    );
});





    

