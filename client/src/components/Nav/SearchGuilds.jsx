import React, { useEffect, useState } from 'react'
import './Nav.css'

function SearchGuilds({ search }) {
const [allGuilds, setAllGuilds ] = useState([])
const [ filteredGuilds, setFilteredGuilds ] = useState([])

const fetchGuild = () => {
    const url = "http://127.0.0.1:4000/guild/"

    fetch(url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
            // Render all guilds regardless of authorization
        })
    })
    .then(res => res.json())
    .then(data => setAllGuilds(data))
    .catch(err => console.log(err))
}

// get initial list of guilds
useEffect(() => {
    fetchGuild()
}, [])

useEffect(() => {
    setFilteredGuilds(allGuilds.filter(guild => guild.name.toLowerCase().includes(search.toLowerCase())))
}, [search])

function renderSearch() {
    return <>
    {filteredGuilds.map((guild, i) => {
        return<p key={i} id='single-search-guild' onClick={e => {
            e.preventDefault()
            setTimeout(() => window.location = (`http://localhost:3000/?GuildName=${guild.name}`), 200 )
        }}>{guild.name}</p>
    })}
    </>
}
function displaySearch() {
    if (search !== "") {
        return <>
        <div id='search-results'>
        {renderSearch()}
        </div>
        </>
    } 
}

    return (
    <>
    {displaySearch()}
    </>
    )
}

export default SearchGuilds