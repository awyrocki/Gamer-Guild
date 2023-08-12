import React, { useEffect } from 'react'

function Pin({ pinMessage, unpin, messageId, setSent, sent }) {
    let body = {
        pinned: true
    }
    function pinNewMessage() {
        const url = `http://localhost:4000/message/update/${messageId}`
        
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
            "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            setSent(!sent)
        })
    }

    useEffect(() => {
        if (pinMessage === true) {
            body = {
                pinned: true
            }
            pinNewMessage()
        } 
    }, [pinMessage])

    useEffect(() => {
        if (unpin === true) {
            body = {
                pinned: false
            }
            pinNewMessage()
        } 
    }, [unpin])

    return (
    <>
    </>
    )
}

export default Pin