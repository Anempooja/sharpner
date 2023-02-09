
const userName=localStorage.getItem('userName')
const userId= localStorage.getItem('userId')


async function savechat(event){try{
    event.preventDefault();
    const message=event.target.message.value;
    const token=localStorage.getItem('token')
    const childHTML=`<li>${userName}:${message}</li>`
    const ul=document.getElementById('ul')
    ul.innerHTML+=childHTML
    await axios.get(`http://localhost:3000/chat/message/${message}`,{headers:{'Authorization':token}})
    .then(async(respose)=>{
        
        document.getElementById('message').value=''
        console.log(respose)
    })
    .catch((err)=>console.log(err))}
    catch(err){console.log(err)}
    }
window.addEventListener('DOMContentLoaded',async()=>{
        try{
            await axios.get(`http://localhost:3000/chat/display`)
            .then(async(response)=>{
                const chats=response.chats
                //const parentNode=document.getElementById('ul')
            
                chats.forEach((chat)=>{
                    if(chat.groupId==null){
                        const parentNode=document.getElementById('ul')
                        const  childHTML=`<li>${chat.name} : ${chat.message}</li>`
                         parentNode.innerHTML+=childHTML
                    }
                    
                
                })    
                console.log('chats',response)
                //console.log('userid',userId)
               const groups=await axios.get(`http://localhost:3000/group/findGroup/${userId}`)
               if(groups){
                console.log('groups',groups)
                const groupName=groups.groupName
                console.log(groupName)
                const div=document.createElement('div')
                
                for(var i=0;i<groupName.length;i++){
                    const parentNode=document.createElement('div')
                    const childHTML=`<button id=${groupName[i].id} onclick='groupChat(${groupName[i].id},"${groupName[i].name}","${groupName[i].createdBy}")'>${groupName[i].name}</button>`
                    parentNode.innerHTML=childHTML
                    div.append(parentNode)
                }
                
                document.body.appendChild(div)
               }
               else{
                console.log('no groups')
               }
            
            })
            .catch((err)=>console.log(err))
        }
        catch(err){console.log(err)}
    })
    
async function showCreateGroupForm(event){
    event.preventDefault()
    const create=document.getElementById('createGroup')
    create.remove()
    const members=await getusers()
    console.log(members)
    const select=document.createElement('select')
    select.setAttribute("multiple", "multiple");
    select.setAttribute("id", "selectUsers");
    select.innerText="users"
    for (var i=0;i<members.length;i++){
        var option = document.createElement("option");
        option.innerText="users"
        option.setAttribute("id", `${members[i].id}`)
        option.setAttribute('value',`${members[i].name}${members[i].id}`)
        option.innerText=`${members[i].name}`
        select.add(option)
    }
    const parentNode=document.getElementById('groupnames')
    parentNode.appendChild(select)
    // document.body.appendChild(select);
    
    const childHTML=`<input id="groupName" placeholder="group name" required/> 
    
    <button onclick="createGroup(event)">create</button>`
    parentNode.innerHTML+=(childHTML)
}
async function getusers(){
    const users=await axios.get("http://localhost:3000/user/users")
    return users.users
}
async function createGroup(event){
    event.preventDefault()
    const groupName = document.getElementById("groupName").value;
    const user = [];
    const userIds = [];
    const createdBy = userName
    //createdBy.push(userName);
    for (var option of document.getElementById("selectUsers").options) {
        if (option.selected) {
          user.push(option.value.slice(0, -1));
          userIds.push(option.value.slice(-1));
        }}
        const obj = {
            groupName: groupName,
            user,
            userIds,
            createdBy
           
          };
          console.log(obj);
 await axios.post("http://localhost:3000/group/createGroup",obj)
 .then((response)=>{
    console.log(response)
 })
 .catch((err)=>{console.log(err)})
}


async function groupChat(groupId,groupname,createdBy){
    try{
        
        var form=document.getElementById('groups')
        form.innerHTML=""
        var divChat=document.createElement(`form`)
        divChat.setAttribute('id',`div${groupId}`)
        if(createdBy==userName){
            const admin=`<button id="addUser" onclick="addUsers(event,${groupId},'${groupname}')">add users</button>
            <button id="removeUser" onclick="removeUsers(event,${groupId})">remove users</button>`
            divChat.innerHTML+=admin
            form.append(divChat)
        }
        const childHTML=`<form id="chatForm"  >
        <h2>${groupname}</h2>
        <input id="chatMessage" placeholder="enter message" required/>
        <button onclick="groupMessage(event,${groupId})" >send</button>
        </form>`
        divChat.innerHTML+=childHTML
        form.append(divChat)
        const groupchat=await axios.get(`http://localhost:3000/group/groupChat/${groupId}`)
        if(groupchat){
            
            for(var i=0;i<groupchat.chat.length;i++){
                const childHTML=`<li>${groupchat.chat[i].name}:${groupchat.chat[i].message}</li>`
                divChat.innerHTML+=childHTML
                
            }
            form.append(divChat)
        }
        console.log(groupchat)
    }
    catch(err){console.log(err)}
}
async function groupMessage(event,groupId){
    event.preventDefault()
    console.log(groupId)
    const message=document.getElementById('chatMessage').value
    document.getElementById('chatMessage').value=''
    const childHTML=`<li>${userName}:${message}</li>`
    const divChat=document.getElementById(`div${groupId}`)
    divChat.innerHTML+=childHTML
    const token=localStorage.getItem('token')
    await axios.get(`http://localhost:3000/chat/groupChat/${groupId}/${message}`,{headers:{'Authorization':token}})
}

async function addUsers(event,groupId,groupName){
    try{
        event.preventDefault()
        console.log(groupId)
        var adduserbtn=document.getElementById('addUser')
        adduserbtn.style.visibility='hidden'
        var form=document.getElementById(`div${groupId}`)
        var addUserForm=document.createElement('form')
        addUserForm.setAttribute('id','addUserForm')
        form.append(addUserForm)
        var search=`<form id="addUserForm">
        <input id="search" placeholder="enter user details to add" required/>
        <button onclick="addMember(event,${groupId})">add</button>
        </form>`
        addUserForm.innerHTML+=search
    }
    catch(err){console.log(err)}
}
async function addMember(event,groupId,groupName){
    event.preventDefault()
    const searchDetails=document.getElementById('search').value
    document.getElementById('search').value=""
    var usersInGroup=await axios.get(`http://localhost:3000/group/findUsers/${groupId}`)
    const members=await getusers()
    var member=[]
    console.log('members...',members)
    for(var i=0;i<members.length;i++){
        if(members[i].name.toLowerCase()==searchDetails.toLowerCase() || members[i].email.toLowerCase()==searchDetails.toLowerCase() || members[i].phonenumber.toLowerCase()==searchDetails.toLowerCase()){
            member.push(members[i])
        }
    }
    if(member.length>0){
        console.log(member[0].id)
        if( usersInGroup.userIds.includes(member[0].id)){
            const childHTML=`<li>User already exists</li>`
            document.getElementById('addUserForm').innerHTML+=childHTML
            setTimeout(() => {
                var form=document.getElementById('addUserForm')
                form.remove()
                document.getElementById('addUser').style.visibility='visible'
            }, 1000);
        }
        else{
            const userIds=[]
            userIds.push(member[0].id)
            const obj={
                groupName:groupName,
                createdBy:userName,
                userIds
            }
            await axios.post("http://localhost:3000/group/createGroup",obj)
            .then((response)=>{
                console.log(response)
                const childHTML=`<li>User added successfully</li>`
                document.getElementById('addUserForm').innerHTML+=childHTML
                setTimeout(() => {
                    var form=document.getElementById('addUserForm')
                    form.remove()
                    document.getElementById('addUser').style.visibility='visible'
                }, 2000);

            })
            console.log('x',member)
        }
        
    }
    else{
        const childHTML=`<li>User not found</li>`
                document.getElementById('addUserForm').innerHTML+=childHTML
                setTimeout(() => {
                    var form=document.getElementById('addUserForm')
                    form.remove()
                    document.getElementById('addUser').style.visibility='visible'
                }, 1000);
               
    }
}

async function removeUsers(event,groupId){
    event.preventDefault()
    var usersInGroup=await axios.get(`http://localhost:3000/group/findUsers/${groupId}`)

    const users=usersInGroup.user
    console.log('users',users)
    var userDetails=[]
    const members=await getusers()

    console.log(members,'members')
    for(var i=0;i<users.length;i++){
        for(var j=0;j<members.length;j++){
            if(members[j].id==users[i].userId){
                userDetails.push(members[j])
            }
        }
        
    }
    console.log(userDetails,'userDetails')
    const select=document.createElement('select')
    
    select.setAttribute("id", "selectUser");
    select.innerText="user"
    for (var i=0;i<userDetails.length;i++){
        var option = document.createElement("option");
        option.innerText="users"
        option.setAttribute("id", `${userDetails[i].id}`)
        option.setAttribute('value',`${userDetails[i].name}${userDetails[i].id}`)
        option.innerText=`${userDetails[i].name}`
        select.add(option)
    }
    const remove=`<button onclick="deleteUser(event,${groupId})">remove</button>`
    const parentNode=document.getElementById(`div${groupId}`)
    parentNode.appendChild(select)
    parentNode.innerHTML+=remove
    
}
async function deleteUser(event,groupId){
    event.preventDefault()
    const optionValue=document.getElementById("selectUser").value.slice( -1)
    console.log(optionValue)
    await axios.get(`http://localhost:3000/group/deleteusers/${groupId}/${optionValue}`)
}

async function sendImage(e) {
    e.preventDefault();
   
    const message =
      "../images/imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.jpg";
      const token=localStorage.getItem('token')
      const childHTML=`<li>${userName}:image sent</li>`
      const ul=document.getElementById('ul')
      ul.innerHTML+=childHTML
      await axios.get(`http://localhost:3000/chat/message/${message}`,{headers:{'Authorization':token}})
    
  
    
  }