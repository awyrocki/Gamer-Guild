import React, { useEffect, useState } from 'react'
import MessageInput from './MessageInput'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import mod from "./user.jpg"
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVert from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import MessageEditDelete from './MessageEditDelete';


function GuildPage({ GuildName }) {
    const [messages, setMessages ] = useState([])
    // to trigger fetch
    const [ sent, setSent ] = useState("")
    const [ messageId, setMessageId ] = useState("")
    const [ delMessage, setDelMessage ] = useState(false)
    const [ editMessage, setEditMessage ] = useState(false)
    const [ newMessage, setNewMessage ] = useState("")
    //flag for edit input
    const [ edit, setEdit ] = useState(false)
    const userName = localStorage.getItem("userName")


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

    // for message cards
    const [ anchorElement, setAnchorElement ] = useState(null)
    const handleMenuClick = e => {
        setMessageId(e.target.id)
        setAnchorElement(e.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorElement(null)
    }


    // change to input field when edit is selected
    function renderEdit(message) {
        if (edit && messageId === message._id && userName === message.user){
        return <>
        <input type="text" name="message edit" id="" placeholder={message.body} onChange={e => {
            e.preventDefault()
            setNewMessage(e.target.value)
        }}/>
        <button onClick={e => {
            e.preventDefault()
            setEditMessage(true)
        }}>Save</button>
        <button onClick={e => {
            e.preventDefault()
            setMessageId("")
            setEdit(false)
            setNewMessage("")
        }}>Cancel</button>
        </>
        } else {
            return <>{message.body}</>
        }
    }

    function render() {

        return <>
        <div id='guild-container'>
        <div>
        {messages.map((message, i) => (
        <div key={i} className='message-list' >
        <Card sx={{width:"25em"}}>
            <CardHeader
            titleTypographyProps={{variant:'h7'}}
            avatar={<Avatar src={mod} ></Avatar>}
                // change the avatar to the avatar of the user?
            action={<IconButton
            aria-label="settings"
            onClick={handleMenuClick}
            aria-haspopup="true"
            aria-controls='demo-positioned-menu'
            ><MoreVert id={message._id} sx={{color:"#B3B3B3"}}/>
            </IconButton>}
            title={message.user}
            // Could add a user nickname
            sx={{color:"White", bgcolor:"#121212", fontSize:"20px"}}
            />
            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleCloseMenu}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        >
            {/* functionality for the menu items goes here */}
        <MenuItem>
            <ListItemIcon>
                <PushPinIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Pin
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <EditIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            <p onClick={e => {
            e.preventDefault()
            setEdit(true)
        }}>Edit</p>
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <DeleteIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Delete
        </MenuItem>
        </Menu>
            <CardContent sx={{bgcolor:"#121212"}}>
                <Typography sx={{wordBreak:"break-word"}} variant="h8" color="#B3B3B3" bgcolor={"#121212"}>
                {renderEdit(message)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{bgcolor:"#121212"}}>
                <IconButton aria-label="add to favorites">
                <Checkbox icon={<FavoriteBorder sx={{color:"#B3B3B3"}}/>} checkedIcon={<Favorite sx={{color: "#B3B3B3"}}/>} />
                </IconButton>
                <IconButton aria-label="share" sx={{color:"#B3B3B3"}}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
            </div>
        ))}
            </div>
            </div>
            </>
    }

    function Leave() {
        return <></>
    }

    // renders messages
    return (
    <>
    <div id='guild-name'>{GuildName} {Leave()}</div>
        {render()}
        <div id='input-container'>
        <MessageInput GuildName={GuildName} setSent={setSent}/>
        </div>
        <div id='leave-container'>
        <button id='leave-guild'>Leave Guild</button>
        </div>
        <MessageEditDelete GuildName={GuildName} delMessage={delMessage} editMessage={editMessage} messageId={messageId} newMessage={newMessage}/>
    </>
    )
}

export default GuildPage