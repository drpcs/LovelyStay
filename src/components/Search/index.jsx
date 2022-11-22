import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search() {

  const navigate = useNavigate();
  let [userName, setUserName] = useState('');
  let [error,setError] = useState('');

  const onSearch = () => {
    if(userName.trim() == ''){
      setError(`Search field can't be blank`);
    } else if(!userName.match("^[A-Za-z0-9_-]*$")) {
      setError(`Please type only letters and numbers`);
    } else {
      navigate('/view/' + userName);
    }
  }

  const onChange = event => {
    setUserName(event.target.value);
  }

  const onKeyDown = event => {
    if(event.key === 'Enter'){
      navigate('/view/' + userName);
    }
  }

  return (
    <div className="Search">
        <div className={'Search-container'}>
          <h2>Search GitHub profile by Username</h2>
          <input 
            className={'Search-input'} 
            placeholder="Type the username" 
            type='text' onChange={onChange} 
            onKeyDown={onKeyDown}
          /> 
          <button 
            name="search"
            className={'Search-button'}  
            onClick={onSearch}
           >
            Search
          </button>
          <p className={'Search-error'}>{error}</p>
        </div>
    </div>
  );
}

export default Search;
