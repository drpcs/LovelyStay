import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { searchByUserName, getRepositoriesByUserName } from '../../services/github/github';
import { useNavigate } from 'react-router-dom';
import Table from "../Table";
import './View.css';

function View() {
  const navigate = useNavigate();
  let [userInfo, setUserInfo] = useState({});
  let [repositories, setRepositories] = useState([]);
  let [rendering, setRendering] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    (async () => {
      const user = await searchByUserName(username);
      const repositories = await getRepositoriesByUserName(username);
      setUserInfo(user);
      setRepositories(repositories);
      setRendering(false);
     })();
  },[username]);

  const goBack = () => {
    navigate('/');
  }
  
  const renderUserInfo = () => {
    if(rendering){
      return (
        <div className="View-loading">Loading...</div>
      )
    } else if (!userInfo.name){
      return (
        <>
          <div className="View-loading">User not found</div>
          <div className="View-container-button" >
            <button className="View-button" onClick={goBack}>Go Back</button>
          </div>
        </>
      )
    } else {
      let repositoriesList = <div> 0 repository</div>;
      if(userInfo.public_repos>0){
        const columns = [
          {title: 'Name', column: 'name'},
          {title: 'Description', column: 'description'},
        ]
        repositoriesList = <Table columns={columns} data={repositories} rowsPerPage={5}/>
      } 
      return (
        <div className="View">
            <div>
              <div className="View-info">
                <img className="View-foto" src={userInfo.avatar_url}/>
              </div>
              <div className="View-info">
                <ul className="View-user-details">
                  <li>{userInfo.name}</li>
                  <li>
                    <b>{userInfo.public_repos}</b> {userInfo.public_repos>1?'repositories':'repository'}
                  </li>
                </ul>
              </div>
              <div className="View-repositories">
                <h3>Repositories</h3>
                <div>
                  {repositoriesList}
                </div>
                <div className="View-container-button" >
                  <button name="goback" className="View-button" onClick={goBack}>Go Back</button>
                </div>
              </div>
            </div>
        </div>
      )
    }
  }
  return (
    <>
      {renderUserInfo()}
    </>
  );
}

export default View;
