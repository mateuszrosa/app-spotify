import { useState, useEffect, useRef } from 'react';

import styles from './Root.module.scss';

import Form from '../Form/Form';
import Card from '../Card/Card';

function Root() {

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('artist');
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

  const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;

  const getToken = refreshToken => {
    return fetch("https://accounts.spotify.com/api/token", {
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: {
        Authorization: "Basic MTJlYTYzNGJmMzM1NGQ1MzkyMTI1ZmJiNjdmOGQ2NmE6MjU3YjFmODE0YTg4NDBmNjllZWExMmEwNDhkZWI1MDI=",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(data => data.access_token)
      .catch(err => {
        console.log(err);
      })
  }


  useEffect(async () => {
    const result = await getToken(refreshToken);
    setToken(result);
    console.log('once');
  }, [])


  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.target.children[0].value = "";
    console.log(inputValue);
    fetch(`https://api.spotify.com/v1/search?q=${inputValue}&type=${selectValue}`, {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.hasOwnProperty('artists')) {
          setData([...data.artists.items, { type: 'artists' }]);
        } else if (data.hasOwnProperty('albums')) {
          setData({ 'albums': { ...data.albums.items } });
        } else if (data.hasOwnProperty('tracks')) {
          setData({ 'tracks': [...data.tracks.items] });
        } else {
          setData({ 'playlists': { ...data.playlists.items } });
        }
      })
      .catch(err => {
        console.log(err);
        getToken(refreshToken);
        handleClick(e);
      })
  }

  return (
    <div className={styles.root}>
      <h1>Spotify APP</h1>
      <Form handleChange={handleChange} handleClick={handleClick} handleSelect={handleSelect} />
      {data && data.map((record) => {
        if (index < 5) {
          return <Card data={data} artist key={1} />
        }
      })}
      {data.tracks && data.tracks.map((track, index) => {
        if (index < 5) {
          return <Card data={track} track key={track.id} />
        }
      })}
    </div>
  );
}

export default Root;
