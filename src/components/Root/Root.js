import { useState, useEffect, useRef } from 'react';

import styles from './Root.module.scss';

import Form from '../Form/Form';
import List from '../List/List';

function Root() {

  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('artist');
  const [data, setData] = useState(null);
  const [type, setType] = useState('');
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
    fetch(`https://api.spotify.com/v1/search?q=${inputValue}&type=${selectValue}`, {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        for (let key in data) {
          setData(data[key].items)
          setType(key);
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
      {data && <List data={data} type={type} />}
    </div>
  );
}

export default Root;
