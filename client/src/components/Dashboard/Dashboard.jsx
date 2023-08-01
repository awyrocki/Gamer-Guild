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

  return (
    <>
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
      <ScreenWidth maxWidth={700}>
        <BottomNav />
      </ScreenWidth>
      <Footer />
    </>
  )
}

export default Dashboard