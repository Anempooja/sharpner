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
    const token=localStorage.getItem('token')
    axios.get("http://localhost:4000/expense/getExpense",{headers:{'Authorization':token}})
    .then(response=>{
        console.log(response.user)
        if(response.user.ispremiumuser){
            x()
        }
        
            for(var i=0;i<response.Expenses.length;i++){
            showUserOnScreen(response.Expenses[i])
        
        
    }})
    .catch(err=>console.log(err))
})
document.getElementById('premium').onclick=async function(e){
    try{
    
    const token=localStorage.getItem('token')
    const response=await axios.get("http://localhost:4000/purchase/membership",{headers:{'Authorization':token}})
    
    console.log(response)
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
function showUserOnScreen(user){
    console.log('showscreen',user.id,user.amount,user.description,user.category)
    const parentNode=document.getElementById('listOfExpenses')
    const childHTML=`<li id=${user.id}> ${user.amount}-${user.description}-${user.category}
        <button onclick="deleteUser('${user.id}')">DeleteUser</button>
        <button onclick="editUser('${user.id}','${user.amount}','${user.description}','${user.category}')">editUser</button>
        </li>`
        console.log('deleted',childHTML)
        parentNode.innerHTML=parentNode.innerHTML+childHTML
        document.getElementById('amount').value=''
        document.getElementById('description').value=''
        document.getElementById('category').value=''
        
}
function editUser(id,amount,description,category){
    console.log('edit')
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
    console.log(leaderBoard)
    

    leaderBoard.forEach((y)=>{
        console.log(y)
        const parent =document.getElementById('leaderBoardEle')
        const childHTML=`<li>name:${y.name}-total cost:${y.total_cost}</li>`
        parent.innerHTML=parent.innerHTML+childHTML
    });                   

}

document.getElementById('leaderboard').appendChild(btn)
// const shownTable=document.createElement('input')
// shownTable.type='button'
// shownTable.value='show table'
// document.getElementById('leaderboard').appendChild(shownTable)
// shownTable.onclick=async()=>{window.location.href='./expenditureTable.html'}
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
        console.log(response)
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
