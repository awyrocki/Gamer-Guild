import React, { useEffect, useState } from 'react';
import profilePic from "./default-profile.jpg";
import "./UserProfile.css";
import Footer from "../Footer/Footer";

function UserProfile() {
    const queryParameters = new URLSearchParams(window.location.search);
    const userName = queryParameters.get("User");
    const [profileID, setProfileID] = useState("");
    const [joinedGuilds, setJoinedGuilds] = useState([]);
    const [steamUser, setSteamUser] = useState(null);
    const token = localStorage.getItem("token");
    const [steamID, setSteamID] = useState("");
    const [user, setUser] = useState("");
    const [showAllGuilds, setShowAllGuilds] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    let id = localStorage.getItem("id");

    function fetchUser() {
        const url = `http://localhost:4000/user/userName/${userName}`;

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": token
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setSteamID(data.steamID);
            setProfileID(data.id);
        })
        .catch(err => console.log(err));
    }

    const fetchGuild = () => {
        const url = "http://127.0.0.1:4000/guild/";

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => {
            setJoinedGuilds(data); // Fetch all guilds, not just joined ones
        })
        .catch(err => console.log(err));
    };

    function fetchSteamUser() {
        const url = `http://localhost:4000/steamUser/${steamID}`;
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => setSteamUser(data.response.players[0]));
    }

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (steamID !== "") {
            fetchSteamUser();
        }
    }, [steamID]);

    useEffect(() => {
        if (profileID !== "") {
            fetchGuild();
        }
    }, [profileID]);

    function onlineStatus() {
        if (!steamUser) {
            return <p></p>;
        } else {
            return steamUser.personastate === 0
            ? <><p>Offline</p><span id='status-light-off'></span></>
            : steamUser.personastate === 1
            ? <><p>Online</p><span id='status-light-on'></span></>
            : <p></p>;
        }
    }

    function steamName() {
        if (!steamUser) {
            return <p></p>;
        } else {
            return (
                <>
                    <p> &emsp;({steamUser.personaname})</p>
                </>
            );
        }
    }

    const toggleFilter = () => {
        setShowAllGuilds((prevState) => !prevState);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div id='outer-profile'>
                <div id='inner-profile'>
                    <div id='profile-name-container'>
                        <p id='profile-name'>{user.userName}</p>
                        {steamName()}
                    </div>
                    <div id='pic-bio'>
                        <img id='user-pic' src={user.profilePic || profilePic} alt="profile pic" />
                        <div id='status'>{onlineStatus()}</div>
                        <p id='user-bio'> &emsp; {user.bio}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button className='show' onClick={toggleFilter}>
                            {showAllGuilds ? "Show Unjoined Guilds Only" : "Show All Guilds"}
                        </button>
                    </div>
                    <h2 id='profile-guild-title'>Joined Guilds</h2>
                    <div id='profile-guilds'>
                        {joinedGuilds
                            .filter((guild) => {
                                if (showAllGuilds) {
                                    return !guild.addedUsers.includes(id);
                                } else {
                                    return guild.addedUsers.includes(id);
                                }
                            })
                            .filter((guild) => {
                                const userName = (guild.userName || '').toLowerCase();
                                const query = searchQuery.toLowerCase();
                                return userName.includes(query);
                            })
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((guild, i) => (
                                <div key={i} id='single-guild'>
                                    <h3 id={guild._id}>{guild.name}</h3>
                                    <p id='profile-guild-description'>{guild.description || ''}</p>
                                    <hr id='guild-linebreak' />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserProfile;
