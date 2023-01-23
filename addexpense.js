function saveExpense(event){
    event.preventDefault()
    const amount=event.target.amount.value
    const description=event.target.description.value
    const category=event.target.category.value
    const obj={
        amount,
        description,
        category
    }
   
    const token=localStorage.getItem('token')
    axios.post("http://localhost:4000/expense/addExpense",obj,{headers:{'Authorization':token}})
    .then(response=>{
        console.log(response.expense)
        
        showUserOnScreen(response.expense);}
        
    )
    .catch(err=>console.log(err))
}
window.addEventListener('DOMContentLoaded',()=>{
    // const token=localStorage.getItem('token')
    // axios.get("http://localhost:4000/expense/getExpense",{headers:{'Authorization':token}})
    // .then(response=>{
    //     console.log(response.user)
    //     if(response.user.ispremiumuser){
    //         x()
    //     }
        
    //         for(var i=0;i<response.Expenses.length;i++){
    //         showUserOnScreen(response.Expenses[i])
        
        
    // }})
    // .catch(err=>console.log(err))
    
    let page=1;
    getProducts(page)
})

async function getProducts(page){
    //console.log(page)
    const token=localStorage.getItem('token')
    await axios.get(`http://localhost:4000/expense/getExpense?page=${page}`,{headers:{'Authorization':token}})
    .then((response)=>{
        
        showUserOnScreen(response)
        showPagination(response.data)
    })
}
function showPagination(pageDetails){
    
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    console.log(pageDetails)

    if (pageDetails.hasPreviousPage) {
      const button1 = document.createElement("button");
      button1.innerHTML = pageDetails.previousPage;
      button1.addEventListener(
        "click",
        async () =>
          await getProducts(pageDetails.previousPage).then((res) => {
            console.log(res);
          })
      );
      pagination.appendChild(button1);
    }
  
    const button2 = document.createElement("button");
    button2.classList.add("current");
    button2.innerText = pageDetails.currentPage
    

    button2.addEventListener(
      "click",
      async () =>
        await getProducts(pageDetails.currentPage).then((res) => {
          console.log(res);
        })
    );
    pagination.appendChild(button2);
    if (pageDetails.hasNextPage) {
      const button3 = document.createElement("button");
      button3.innerText = pageDetails.nextPage;
      button3.addEventListener("click", async () => {
        
        await getProducts(pageDetails.nextPage).then((result) => {
          console.log(result);
        });
      });
      pagination.appendChild(button3);
    }
  
    if (pageDetails.currentPage != pageDetails.lastPage && (pageDetails.currentPage+1)!=pageDetails.lastPage) {
      const button4 = document.createElement("button");
      button4.innerText = pageDetails.lastPage;
      button4.addEventListener(
        "click",
        async () =>
          await getProducts(pageDetails.lastPage).then((res) => {
            console.log(res);
          })
      );
      pagination.appendChild(button4);
    }
  }


document.getElementById('premium').onclick=async function(e){
    try{
    
    const token=localStorage.getItem('token')
    const response=await axios.get("http://localhost:4000/purchase/membership",{headers:{'Authorization':token}})
    
    
    var options={
        'key_id':response.key_id,
        'order_id':response.order.id,
        'handler':async function(response){
            axios.post("http://localhost:4000/purchase/updateTransactionStatus",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{'Authorization':token}})
            alert('You are a premium user now')
            onclick(x())
        }
    };
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',function(response){
        console.log(response)
        alert('something went wrong')
    });

    }
    catch(err){
        console.log(err)
    }

}
function showUserOnScreen(data){
    var parentNode = document.getElementById("addExpenses");
  var datas = document.createElement("div");
  datas.innerText = "Expenses";
  data.expenses.forEach((data) => {
   
    const childHTML=`<li id=${data.id}> ${data.amount}-${data.description}-${data.category}
        <button onclick="deleteUser('${data.id}')">DeleteExpense</button>
        <button oncick="editUser('${data.id}','${data.amount}','${data.description}','${data.category}')">Edit Expense</button>
        </li>`
        datas.innerHTML += childHTML})
        parentNode.innerHTML = datas.innerHTML;
        
        document.getElementById('amount').value=''
        document.getElementById('description').value=''
        document.getElementById('category').value=''
        
}
function editUser(id,amount,description,category){
    
document.getElementById('amount').value=amount
document.getElementById('description').value=description
document.getElementById('category').value=category
deleteUser(id)
}
async function deleteUser(id){
const childNodeToBeDeleted=document.getElementById(id)
if(childNodeToBeDeleted){
    const token=localStorage.getItem('token')
    
    await axios.delete(`http://localhost:4000/expense/${id}`,{headers:{'Authorization':token}})
    .then((response)=>{
        if(response.status===400){
            throw new Error(response.message)
        }
        else if(response.status===200){
            removeFromScreen(id)
            console.log(response.message)
        }

    })
    .catch(err=>console.log(err))
}
}
function removeFromScreen(id){
let parent=document.getElementById('listOfExpenses')
let childToBeRemoved=document.getElementById(id)
parent.removeChild(childToBeRemoved)
}
function x(){try{

const deletebtn=document.getElementById('premium')
deletebtn.remove()    
const parent=document.getElementById('leaderboard')
parent.innerHTML=`You are a premium user`
const btn = document.createElement("input");
btn.type="button"
btn.value = "leader Board";

btn.onclick=async()=>{
    const token=localStorage.getItem('token')
    const leaderBoard= await axios.get("http://localhost:4000/purchase/leaderboard",{headers:{'Authorization':token}})
    
    

    leaderBoard.forEach((y)=>{
        
        const parent =document.getElementById('leaderBoardEle')
        const childHTML=`<li>name:${y.name}-total cost:${y.total_cost}</li>`
        parent.innerHTML=parent.innerHTML+childHTML
    });                   

}


        }
    catch(err){
        console.log(err)
    }
    }
async function downloadFile(event){
    try{
    event.preventDefault()
    const token=localStorage.getItem('token')
    await axios.get("http://localhost:4000/expense/download",{headers:{'Authorization':token}})
    .then((response)=>{
        
        if(response.success){
            var a=document.createElement("a")
            a.href=response.fileURL;
            a.download='myexpense.csv';
            a.click()
        }
        else{
            console.log('something gone wrong')
        }
    })
}
catch(err)
{
    console.log(err)
}
}
