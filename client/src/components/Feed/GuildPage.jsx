import React, { useEffect, useRef, useState } from 'react'
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
import LeaveGuild from './LeaveGuild';
import Pin from './Pin';
import { set } from 'mongoose';

function GuildPage({ GuildName }) {
    const [messages, setMessages ] = useState([])
    // to trigger fetch
    const [ sent, setSent ] = useState(false)
    const [ messageId, setMessageId ] = useState(null)
    const [ editMessage, setEditMessage ] = useState(false)
    const [ delMessage, setDelMessage ] = useState(false)
    const [ newMessage, setNewMessage ] = useState("")
    const [ pinMessage, setPinMessage ] = useState(false)
    const [ unpin, setUnpin ] = useState(false)
    // to render only pinned messages
    const [ onlyPin, setOnlyPin ] = useState(false);
    // flag for pin 
    const [ pinFlag, setPinFlag ] = useState(false)
    // flag for edit input
    const [ edit, setEdit ] = useState(false)
    // flag for delete input
    const [ deleteFlag, setDeleteFlag ] = useState(false)
    // leave guild flag
    const [ leaveFlag, setLeaveFlag ] = useState(false)
    // flag to grab user profile pics
    const [ picGo, setPicGo ] = useState(false)

    const userName = localStorage.getItem("userName")
    const token = localStorage.getItem("token")

    // grabs messages by guild name
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
        .then(data => {
            setMessages(data)
            setPicGo(!picGo)
        })
        .catch(err => console.log(err))
    }

    // filters pinned messages 
    function filterPin() {
        if (onlyPin === true) {
            let pinnedMessages = messages.filter(message => message.pinned == true)
            setMessages(pinnedMessages);
        }
    }

    useEffect(() => {
        if (onlyPin === true) {
            filterPin()
        }
    }, [onlyPin])

    useEffect(() => {
        fetchMessages()
        setMessageId(null)
        setDelMessage(false)
        setDeleteFlag(false)
        setPinMessage(false)
        setUnpin(false)
        setPinFlag(false)
        setEditMessage(false)
        setEdit(false)
        }, [sent])

    // for message cards
    const [ anchorElement, setAnchorElement ] = useState(null)
    const handleMenuClick = e => {
        setAnchorElement(e.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorElement(null)
    }

    // for pinned message button
    function showPinned() {
        if( onlyPin === false) {
            return <>
            <button className='pinned-button' onClick={e => {
            e.preventDefault()
            setOnlyPin(true)
            }}>Pinned Messages</button>
            </>
        } else {
            return  <>
            <button className='pinned-button' onClick={e => {
            e.preventDefault()
            setOnlyPin(false)
            setSent(!sent)
            }}>All Messages</button>
        </>
        }
    }
    // Pin the message function
    function renderPin(message) {
        if (pinFlag && messageId === message._id && userName === message.user && message.pinned === true) {
            return <>
            <p>Unpin Message?</p>
            <div id='delete-message-buttons'>
            <button className='message-buttons' onClick={e => {
                e.preventDefault()
                setUnpin(true)
            }}> &emsp; Unpin &emsp; </button>
            <button className='message-buttons' onClick={e => {
                e.preventDefault()
                setMessageId(null)
                setDelMessage(false)
                setDeleteFlag(false)
                setPinMessage(false)
                setEditMessage(false)
                setPinFlag(false)
                setEdit(false)
            }}>Cancel</button>
            </div>
            </>
        } else if (pinFlag && messageId === message._id && userName === message.user) {
            return <>
            <p>Pin Message?</p>
            <div id='delete-message-buttons'>
            <button className='message-buttons' onClick={e => {
                e.preventDefault()
                setPinMessage(true)
            }}> &emsp; Pin &emsp; </button>
            <button className='message-buttons' onClick={e => {
                e.preventDefault()
                setMessageId(null)
                setDelMessage(false)
                setDeleteFlag(false)
                setPinMessage(false)
                setEditMessage(false)
                setPinFlag(false)
                setEdit(false)
            }}>Cancel</button>
            </div>
            </>
        }
    }

    // change to input field when edit is selected
    function renderEdit(message) {
        if (edit && messageId === message._id && userName === message.user){
        return <>
        <div id='message-body-conatiner'>
        <img src={message.gifUrl} alt=""  width={'250px'} id='message-gif'/>
        <input type="text" name="message edit" id="new-message"  placeholder={message.body} onChange={e => {
            e.preventDefault()
            setNewMessage(e.target.value)
        }}/>
        <div id='edit-buttons'>
        <button className='message-buttons'  onClick={e => {
            e.preventDefault()
            setEditMessage(true)
        }}>Save</button>
        <button className='message-buttons' onClick={e => {
            e.preventDefault()
            setMessageId(null)
            setEdit(false)
            setDeleteFlag(false)
            setPinMessage(false)
            setPinFlag(false)
            setNewMessage("")
        }}>Cancel</button>
        </div>
        </div>
        </>
        } else {
            return <>
            <div id='message-body-conatiner'>
            <img src={message.gifUrl} alt=""  width={'250px'} id='message-gif'/>
            <p>{message.body}</p>
            </div>
            </>
        }
    }

    // renders delete choice
    function renderDelete(message) {
        if (deleteFlag && messageId === message._id && userName === message.user) {
            return <>
            <p>Delete message?</p>
            <div id='delete-message-buttons'>
            <button className='message-buttons' onClick={e => {
                e.preventDefault()
                setDelMessage(true)
            }}>Delete</button>
            <button className='message-buttons' onClick={e => {
                e.preventDefault()
                setMessageId(null)
                setDelMessage(false)
                setDeleteFlag(false)
                setPinMessage(false)
                setPinFlag(false)
                setEdit(false)
            }}>Cancel</button>
            </div>
            </>
        }
    }

    // grabs profile pic
    const [ profilePic, setProfilePic ] = useState([])
    function fetchPic() {
        messages.forEach(message => {
            const url = `http://localhost:4000/user/username/${message.user}`
            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json",
                "authorization": token
                })
            })
            .then(res => res.json())
            .then(data => {
                {setProfilePic(oldProfiles => [...oldProfiles, data])}
            })
            .catch(err => console.log(err))
        })
    }
    
    // returns the correct avatar for message
    function renderAvatar(message, profilePic) {
        let singlePic = profilePic.filter(user => user.userName === message.user)
        if(singlePic.length !== 0 ) {
            return <Avatar src={`${singlePic[0].profilePic}`} ></Avatar>
        } else {
            return <Avatar ></Avatar>
        }
    }

    useEffect(() => {
            fetchPic() 
    }, [picGo])

    function render() {
        return <>
        <div id='guild-container'>
        <div>
        {messages.map((message, i) => (
        <div key={i} className='message-list' >
        <Card sx={{width:"100%"}}>
            <CardHeader
            titleTypographyProps={{variant:'h7'}}
            avatar={renderAvatar(message, profilePic)}
            subheader={message.createdAt.slice(0, 10)}
            subheaderTypographyProps={{color:"var(--subtext_color)"}}
            action={<IconButton
            aria-label="settings"
            onClick={handleMenuClick}
            aria-haspopup="true"
            aria-controls='demo-positioned-menu'
            ><MoreVert id={message._id} sx={{color:"var(--subtext_color)", padding: "5px"}} onClick={e => {
                setMessageId(e.target.id)
            }}/>
            </IconButton>}
            title={message.user}
            // Could add a user nickname
            sx={{mb:"-1em", color:"var(--text_color)", bgcolor:"var(--body_color)", fontSize:"20px"}}
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
        <div onClick={e => {
            e.preventDefault()
            setPinFlag(true)
        }}>
        <MenuItem>
            <ListItemIcon>
                <PushPinIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Pin
        </MenuItem>
        </div>
        <div onClick={e => {
            e.preventDefault()
            setEdit(true)
        }}>
        <MenuItem>
            <ListItemIcon>
                <EditIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Edit
        </MenuItem>
        </div>
        <div onClick={e => {
            e.preventDefault()
            setDeleteFlag(true)
        }}>
        <MenuItem>
            <ListItemIcon>
                <DeleteIcon fontSize='small' sx={{color:"black"}}/>
            </ListItemIcon>
            Delete
        </MenuItem>
        </div>
        </Menu>
            <CardContent sx={{bgcolor:"var(--body_color)"}}>
                <Typography sx={{wordBreak:"break-word"}} variant="h8" color="var(--text_color)" bgcolor={"var(--body_color)"}>
                {renderEdit(message)}
                {renderDelete(message)}
                {renderPin(message)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{bgcolor:"var(--body_color)"}}>
                <IconButton aria-label="add to favorites">
                <Checkbox icon={<FavoriteBorder sx={{color:"var(--subtext_color)"}}/>} checkedIcon={<Favorite sx={{color: "var(--subtext_color)"}}/>} />
                </IconButton>
                <IconButton aria-label="share" sx={{color:"var(--subtext_color)"}}>
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
    // renders messages
    return (
    <>    
    <div id='guild-name'>{GuildName}</div>
        <div id='pinned-container'>
        {showPinned()}
        </div>
        {render()}
        <div id='input-container'>
        <MessageInput GuildName={GuildName} setSent={setSent} sent={sent}/>
        </div>
        <div id='leave-container'>
        <button id='leave-guild' onClick={e => {
            e.preventDefault()
            setLeaveFlag(true)
        }}>Leave Guild</button>
        </div>
        <MessageEditDelete GuildName={GuildName} delMessage={delMessage} editMessage={editMessage} messageId={messageId} newMessage={newMessage} setSent={setSent} sent={sent}/>
        <LeaveGuild leaveFlag={leaveFlag}/>
        <Pin pinMessage={pinMessage} unpin={unpin} messageId={messageId} setSent={setSent} sent={sent}/>
    </>
    )
}

export default GuildPage