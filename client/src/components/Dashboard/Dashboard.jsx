import React, { useState, useEffect } from 'react'
import User from '../User/User';
import Guildlist from '../Guildlist/Guildlist';
import Feed from '../Feed/Feed';
import Discover from '../Discover/Discover';
import Footer from '../Footer/Footer';
import AddDelete from '../Discover/AddDelete/AddDelete';
import UserList from '../Discover/UserList/UserList';
import ScreenWidth from '../Mobile/ScreenWidth'
import BottomNav from '../Mobile/BottomNav';
import ScreenWidthMin from '../Mobile/ScreenWidthMin';

function Dashboard({ logout }) {
  // grabs guild name from url params
  const queryParameters = new URLSearchParams(window.location.search)
  const GuildName = queryParameters.get("GuildName")

  // adds/ removes user list
  function renderUsers() {
    if(!GuildName) {
        return <></>
    } else {
        return <UserList GuildName={GuildName}/>
    }
  }

  let [ left, setLeft ] = useState(false)
  let [ feed, setFeed ] = useState(true)
  let [ right, setRight ] = useState(false)

  function renderMobile() {
    if(feed === true) {
      return <Feed GuildName={GuildName}/>
    } else if (left === true) {
      return <>
      <div id='left-columns'>
      <User logout={logout}/>
      <Guildlist />
      </div>
      </>
    } else if (right === true) {
      return <>
        <div id='discover-create'>
          {renderUsers()}
          <Discover />
          <AddDelete />
        </div>
      </>
    }
  }

  return (
    <>
    <ScreenWidthMin minWidth={701}>
      <div id='container'>
        <div id='left-columns'>
          <User logout={logout}/>
          <Guildlist />
        </div>
        <Feed GuildName={GuildName}/>
        <div id='discover-create'>
          {renderUsers()}
          <Discover />
          <AddDelete />
        </div>
      </div>
      </ScreenWidthMin>
      <ScreenWidth maxWidth={700}>
        <div id='container'>
          {renderMobile()}
        </div>
        <BottomNav left={left} setLeft={setLeft} feed={feed} setFeed={setFeed} right={right} setRight={setRight} />
      </ScreenWidth>
      <Footer />
    </>
  )
}

export default Dashboard