import React, { useEffect, useState } from 'react'
import MessageInput from './MessageInput'

function GuildPage({ GuildName }) {

    const [messages, setMessages ] = useState([])
    // to trigger fetch
    const [ sent, setSent ] = useState("")

    function fetchMessages() {
        const url = `http://localhost:4000/message/guild/${GuildName}`
        
    fetch(url, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            authorization: ""
            })
        })
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.log(err))
    }


useEffect(() => {
    fetchMessages()
    }, [sent])

    function render() {
            return <>
            <div id='guild-container'>
            <div>
            {messages.map((message, i) => (
            <div key={i} className='message-list'>
            <h3 id="user">{message.user}</h3>
            <p>{message.body}</p>
            </div>
        ))}
            </div>
            </div>
            
            </>
            
        
    }

    // renders messages
    return (
    <>
    <div id='guild-name'>{GuildName}</div>
        {render()}
        <div id='input-container'>
            <MessageInput GuildName={GuildName} setSent={setSent}/>
        </div>
    </>
    )
}

export default GuildPage