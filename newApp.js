document.addEventListener("DOMContentLoaded", ()=>{

let formArea =  document.getElementById("expense-form")
let expenseNameInput =  document.getElementById("expense-name")
let expenseAmountInput =  document.getElementById("expense-amount")
let expenseList =  document.getElementById("expense-list")
let totalAmount =  document.getElementById("total-amount")

let expenses = JSON.parse(localStorage.getItem("expenses")) ||[]
expenses.forEach(expense=>{

    renderExpenses()
})
let total =0
// console.log(total)

// console.log(expenses)

formArea.addEventListener("submit",(e)=>{

    e.preventDefault()
   let expenseName = expenseNameInput.value.trim()
   let expenseAmount = parseFloat(expenseAmountInput.value.trim())
   if(expenseName !== "" && !isNaN(expenseAmount) && expenseAmount>0){
   let expenseString ={
    id: Date.now(),
    expenseName,
    expenseAmount
   }
   expenses.push(expenseString)
   saveToLocalStorage()
   renderExpenses()
//    UpdateTotal()
//    UpdateTotal()
}

  expenseAmountInput.value = ""
  expenseNameInput.value = ""

})

// function renderExpenses() {
//     expenseList.innerHTML = ""; // Clear the list before rendering to avoid duplicates
//     expenses.forEach(expense => {
//         let li = document.createElement("li"); // Create a new <li> for each expense
//         li.innerHTML = `<span>${expense.expenseName}</span> <span>${expense.expenseAmount}</span>`;
//         expenseList.appendChild(li); // Append each <li> to the expense list
//     });
// }

function renderExpenses(){
    expenseList.innerHTML = "";

//  li.classList.add("")
 expenses.forEach(expense=>{
     let li = document.createElement("li")
    li.innerHTML = `<span>${expense.expenseName}</span><span> ${expense.expenseAmount}</span> <button data-id=${expense.id}>Delete</button>`

    
expenseList.appendChild(li)
 })
 

}

expenseList.addEventListener("click",(e)=>{
    let click = e.target.tagName
    if(click === "BUTTON"){
        let dataId =e.target.getAttribute("data-id")
        const index = expenses.findIndex(expenses => expenses.id === parseInt(dataId))
        if (index !== -1){
        // console.log(index)
        expenses.splice(index,1)
        // console.log(expenses)
        }
    }
    saveToLocalStorage()
    renderExpenses()
    // UpdateTotal()

})

function saveToLocalStorage(){
    localStorage.setItem("expenses",JSON.stringify(expenses))
}
function UpdateTotal(){
    expenses.forEach(expense => {
        total+= expense.expenseAmount
        // console.log(total)
        totalAmount.textContent =total
    });
}



})