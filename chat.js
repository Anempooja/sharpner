const chatArray=[]

async function savechat(event){try{
    event.preventDefault();
    const message=event.target.message.value;
    const token=localStorage.getItem('token')
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
            const id=-1
            
            await axios.get(`http://localhost:3000/chat/display/${id}`)
            .then((response)=>{
                const chats=response.chats
                const chatArray=[]
                if(chatArray){
                for (var i=0;i<10;i++){
                    chatArray[i]=chats[i]
                    console.log(chatArray)
                }}
                
               localStorage.setItem('chat',`${chatArray}`)
                console.log(chatArray)
                const parentNode=document.getElementById('ul')
            
                chats.forEach((chat)=>{
                    
                       const  childHTML=`<li>${chat.name} : ${chat.message}</li>`
                        parentNode.innerHTML+=childHTML
                
                })
    
                console.log('chats',response)
            })
            .catch((err)=>console.log(err))
        }
        catch(err){console.log(err)}
    })
    
// setInterval(() => {
//     load()
// }, 1000);