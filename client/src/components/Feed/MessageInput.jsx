import React, { useState } from 'react'

function MessageInput({ GuildName, setSent }) {
    const [ message, setMessage ] = useState("")
    
    function createMessage() {
        
        const user = localStorage.getItem("user-name")

        const url = "http://127.0.0.1:4000/message/create"

        const send = {
            user: user,
            guild: GuildName,
            body: message
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(send),
            headers: new Headers({
                "Content-Type": "application/json"
                // ! session token
            })
        })
        .then(res => res.json())
        .then(data => setSent(data)) //triggers useState to render messages
        .catch(err => console.log(err))
    }
    return (
    <>
    <div id='input-container'>
    <form action="" id='message-form'>
        <input type="text" id='message-input' vaule={message} onChange={e => setMessage(e.target.value)}/>
        <button id='send' onClick={e => {
            e.preventDefault()
            e.target.previousSibling.value = ""
            createMessage()
        }}>Send</button>
    </form>
    </div>
    </>
    )
}

export default MessageInput