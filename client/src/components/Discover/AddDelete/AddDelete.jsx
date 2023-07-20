import React, { useState } from 'react'
import "./AddDelete.css"

function AddDelete({ setGuildName }) {

    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ users, setUsers ] = useState([])
    const [ create, setCreate ] = useState(true) 
    // function that presents input fields after clicking 'create new guild'
    const handleCreate = () => {
        return create ? <a id='create' onClick={e => setCreate(!create)}>Create a new Guild</a>
        : <>
        <input 
            type="text"
            className='input'
            id='new-guild-name'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter Guild name'
        />
        <input 
            type="text" 
            className='input'
            id='new-guild-description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Describe the Guild'
        />
        <span id='create-cancel'>
            <button id='create' onClick={e => {
                e.preventDefault()
                createGuild()
                setName("")
                setDescription("")
                setCreate(!create)
                setGuildName(name)
            }}>Create</button>
            <a id='cancel' onClick={e => {
                e.preventDefault()
                setName("")
                setDescription("")
                setCreate(!create)
            }}>Cancel</a>
            </span>
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
            "addUsers": users,
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