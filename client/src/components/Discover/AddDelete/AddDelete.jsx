import React, { useState } from 'react'
import "./AddDelete.css"
import { Button, TextField, Box } from "@mui/material"

function AddDelete() {

    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ create, setCreate ] = useState(true) 
    // function that presents input fields after clicking 'create new guild'
    const handleCreate = () => {
        return create ? <a id='create' onClick={e => setCreate(!create)}>Create a new Guild</a>
        : <>
        <div id='create-guild-form'>
            <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                id="create-guild-field"
                multiline
                sx={{bgcolor:"#E4EFE7", borderRadius:"5px", width:"100%", color:"var(--text_color)"}}
                color='primary'
                maxRows={1}
                placeholder='Enter Guild name'
                variant="filled"
                />
            <TextField
                value={description}
                onChange={e => setDescription(e.target.value)}
                id='create-guild-field'
                multiline
                sx={{bgcolor:"#E4EFE7", borderRadius:"5px", width:"100%", color:"var(--text_color)"}}
                color='primary'
                maxRows={1}
                placeholder='Guild description'
                variant='filled'
            />
            <div id='create-cancel'>
                <Button
                    onClick={e => {
                        e.preventDefault()
                        setName("")
                        setDescription("")
                        setCreate(!create)
                    }}
                    variant='text'
                    size='small'
                    color='error'
                >Cancel</Button>
                <Button
                    onClick={e => {
                        e.preventDefault()
                        createGuild()
                        setName("")
                        setDescription("")
                        setCreate(!create)
                    }}
                    variant="text"
                    size="small"
                >Create</Button>
            </div>
        </div>
        </>
    }
    // grabs the id of the user making the guild
    const createdBy = localStorage.getItem("id")
    // handle the input creation form
    const createGuild = () => {
        const url = "http://127.0.0.1:4000/guild/create"

        const body = {
            "name": name,
            "description": description,
            "addUsers": [],
            "createdBy": createdBy
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json",
                // ! auth token goes here!
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message === "Guild created" ) {
                setTimeout(() => window.location = (`http://localhost:3000/?GuildName=${name}`), 1000 )
            } 
            // ! possibly add an error message for already created guilds
        })
        .catch(err => console.log(err))
    }

  return (
    <>
    <form action="" id='create-form'>
        {handleCreate()}
    </form>
    </>
  )
}

export default AddDelete