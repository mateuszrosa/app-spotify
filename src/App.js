import { useState, useEffect, useRef } from 'react';
import dotenv from 'dotenv';

dotenv.config();

function App() {

  const [inputValue, setInputValue] = useState('');
  const [token, setToken] = useState('');
  const inputEl = useRef(null);

  const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;


  useEffect(async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: {
        Authorization: "Basic MTJlYTYzNGJmMzM1NGQ1MzkyMTI1ZmJiNjdmOGQ2NmE6MjU3YjFmODE0YTg4NDBmNjllZWExMmEwNDhkZWI1MDI=",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(res => res.json()).then(data => data.access_token);
    setToken(result);
    console.log('once');
  }, [])


  const handleChange = () => {
    setInputValue(inputEl.current.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/search?q=${inputValue}&type=artist`, {
      method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const img = document.querySelector('img');
        img.setAttribute('src', data.artists.items[0].images[0].url)
        console.log(data.artists.items[0].images[0].url)
      });
  }

  return (
    <div className="App">
      <form onSubmit={(e) => handleClick(e)}>
        <input type="text" ref={inputEl} onChange={handleChange} />
        <input type="submit" value="Send" />
      </form>
      <img src="" alt="" />
    </div>
  );
}

export default App;
