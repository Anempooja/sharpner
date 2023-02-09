
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
                    const childHTML=`<button id=${groupName[i].id} onclick='groupChat(${groupName[i].id},"${groupName[i].name}")'>${groupName[i].name}</button>`
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
    const parentNode=document.getElementById('groups')
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


async function groupChat(groupId,groupname){
    try{
        
const form=document.getElementById('groups')
        form.innerHTML=""
        const divChat=document.createElement(`form`)
        divChat.setAttribute('id',`div${groupId}`)
        const childHTML=`<form id="chatForm"  >
        <h2>${groupname}</h2>
        <input id="chatMessage" placeholder="enter message" required/>
        <button onclick="groupMessage(event,${groupId})" >send</button>
        </form>`
        divChat.innerHTML=childHTML
        form.append(divChat)
        const groupchat=await axios.get(`http://localhost:3000/group/groupChat/${groupId}`)
        if(groupchat){
            console.log('xxxxxxxx',groupchat.chat[0].name)
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