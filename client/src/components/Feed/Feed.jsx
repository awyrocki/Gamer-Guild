import React from 'react'
import "./Feed.css"
import GuildPage from './GuildPage'


function Feed() { 
  const queryParameters = new URLSearchParams(window.location.search)
  const GuildName = queryParameters.get("GuildName")

  function display() {
    if(GuildName) {
      return <GuildPage GuildName={GuildName}/>
    } else {
      return <><h1 id='feed-placeholder'>Gamer Guild</h1>
      <span id='feed-content-placeholder'>Welcome to Gamer Guild
      <p>Discover new games and friends to play with</p>
      <p>Start by selecting a guild and joining</p>
      <p>Great! now you can get right into discussing your favorite games</p>
      <p>Be kind</p>
      <p>Be respectful</p>
      <p>BE YOU</p>
      </span>
      </>
    }
  }

  return (
    <>
    <div id='center-container'>
    <div id='feed-container'>
    {display()}
    </div>
    
    </div>
    </>
  )
}

export default Feed