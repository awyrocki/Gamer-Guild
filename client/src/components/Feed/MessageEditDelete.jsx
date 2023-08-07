import React, { useEffect } from 'react'

// edits message
function MessageEditDelete({ GuildName, delMessage, editMessage, messageId, newMessage, setSent, sent }) {
    function editMessages() {
            const url = `http://localhost:4000/message/update/${messageId}`
            const body = {
                body: newMessage
            }
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: new Headers({
                "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === "Message updated") {
                    setSent(!sent)
                }
            })
        
    }

    // deletes message
    function deleteMessages() {
        const url = `http://localhost:4000/message/delete/${messageId}`

        fetch(url, {
            method: "DELETE",
            headers: new Headers({
            "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "Message deleted") {
                setSent(!sent)
            }
        })
    
}

useEffect(() => {
if (delMessage === true) {
    deleteMessages()
}
}, [delMessage])

useEffect(() => {
if (editMessage === true) {
    editMessages()
    }
}, [editMessage])

    return (
    <></>
    )
}

export default MessageEditDelete