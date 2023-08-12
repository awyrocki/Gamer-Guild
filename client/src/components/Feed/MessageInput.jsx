import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GifIcon from '@mui/icons-material/Gif';
import Button from '@mui/material/Button';
import EmojiPicker from 'emoji-picker-react';
import GifPicker from 'gif-picker-react';


function MessageInput({ GuildName, setSent, sent }) {
    const [ emojiShow, setEmojiShow ] = useState(false)
    const [ gifShow, setGifShow ] = useState(false)
    const [ emoji, setEmoji ] = useState(null)
    const [ gif, setGif ] = useState(null)
    const [gifURL , setGifURL ] = useState("")
    const [ input, setInput ] = useState("")
    const textFieldRef = useRef()
    const mode = localStorage.getItem("selectedTheme")

    // adds emoji to input along with text
    function addEmoji() {
        setInput(input + emoji.emoji)
        textFieldRef.current.value = input
        setEmoji(null)
    }

    // calls the function to add emoji to input line when clicked
    useEffect(() => {
        if (emoji !== null) {
            addEmoji()
            setEmojiShow(!emojiShow)
        }
    }, [emoji])

    // sets gif url
    const [gifGo, setGifGo ] = useState(false)
    useEffect(() => {
        if (gif !== null) {
            setGifURL(gif.url)
            setInput(" ")
            setGifShow(!gifShow)
            setGifGo(true)
        }
    }, [gif])

    // triggers the message to send gif
    useEffect(() => {
        if (gifGo === true && gifURL !== "") {
            setGifGo(false)
            createMessage()
            setGifURL("")
            setInput("")
        }
    }, [gifGo])

    // displays the emoji picker
    function renderEmoji() {
        if (emojiShow === true) {
        return <>
            <EmojiPicker theme={`${mode}`} onEmojiClick={setEmoji} />
        </>
        } else {
            return <></>
        }
    }

    function renderGif() {
        if (gifShow === true) {
        return <>
            <GifPicker theme={mode} tenorApiKey={process.env.REACT_APP_TENOR_KEY}  onGifClick={setGif}/>
        </>
        } else {
            return <></>
        }
    }

    // opens file explorer
    const inputFile = useRef(null)
    function file() {
        inputFile.current.click()
    }

    function createMessage() {
        const user = localStorage.getItem("userName")
        const url = "http://127.0.0.1:4000/message/create"
        const send = {
            user: user,
            guild: GuildName,
            body: input,
            gifUrl: gifURL
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
        .then(data => setSent(!sent)) //triggers useState to render messages
        .catch(err => console.log(err))
    }

    return (
    <>
        <div id='emoji-picker'>{renderEmoji()}</div>
        <div id='gif-picker'>{renderGif()}</div>
        <div id='input-container'>
        <form action="" id='message-form'>
        <Box sx={{width:"95%"}}>
            <TextField
                value={input}
                inputProps={{ ref: textFieldRef }}
                onChange={e => setInput(e.target.value)}
                id="standard-multiline-flexible"
                multiline
                sx={{bgcolor:"#E4EFE7", borderRadius:"5px", width:"100%", color:"var(--text_color)"}}
                color='primary'
                maxRows={4}
                placeholder='Create new post'
                variant="standard"
                />
            <Stack direction="row" gap={1} mt={1} mb={1}>
                <AddCircleIcon onClick={file} sx={{color:"var(--text_color)"}}/>
                <EmojiEmotionsIcon onClick={ e => {
                    e.preventDefault()
                    setEmojiShow(!emojiShow)
                }} sx={{color:"var(--text_color)"}}/>
                <AddPhotoAlternateIcon onClick={file} sx={{color:"var(--text_color)"}}/>
                <GifIcon onClick={e => {
                    e.preventDefault()
                    setGifShow(!gifShow)
                }} sx={{color:"var(--text_color)"}}/>
                <Button
                id='send' 
                onClick={e => {
                e.preventDefault()
                createMessage()
                textFieldRef.current.value=''
                setEmoji(null)
                setInput("")
                }}
                >Post</Button>
            </Stack>
        </Box>
    </form>
    </div>
    <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
    </>
    )
}

export default MessageInput