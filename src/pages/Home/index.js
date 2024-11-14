import './styles.css';
import {useState} from 'react';
import { Header } from "../../components/Header";
import background from '../../assets/background.png';
import ItemList from '../../components/itemList';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    console.log(newUser);

    if(newUser.login)
    {
      var erro = document.getElementById('erro');
      erro.style.visibility = 'hidden';
      erro.style.padding = '0';
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      
      if(newRepos.length)
      {
        setRepos(newRepos);
        
      }

    }
    else
    {
      var erro = document.getElementById('erro');
      erro.innerText = newUser.message;
      erro.style.visibility = 'visible';
      erro.style.padding = '.75rem 1.25rem';
    }
    
  }

  return (
    <div className="App">
      <Header />
      <div class="alert alert-dark m-2" id="erro" role="alert">
               
      </div>
      <div className="conteudo">
        <img src={background} className="background" alt="background app"/>
        <div className="info">
          <div className="buscar">
              <input name="usuario" placeholder="@usuario" value={user} onChange={event => setUser(event.target.value)}/>
              <button class="desktopButton" onClick={handleGetData}>Buscar</button>
              <button className='mobileButton' onClick={handleGetData}><svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title><desc id="desc">
                A magnifying glass icon.</desc><g class="search-path" fill="none" stroke="#848F91">
                  <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/><circle cx="8" cy="8" r="7"/></g></svg></button>
        
          </div>
          {currentUser?.login ? ( <>
              <div className="perfil">
              <img src={currentUser.avatar_url} className="profile" alt="perfil"></img>
              <div>
                 <h3>{currentUser.name}</h3>
                 <span>@{currentUser.login}</span>
                 <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr></hr>
            </>
          ): null}
          {repos?.length ? (
          <div className="repositorios">
            <h4>Repositórios</h4>
            {repos.map(repo => (
              <a href={repo.html_url} target="_blank">
              <ItemList title={repo.name} description={repo.description}/>            
              </a>
            ))}
          </div>
              ): null}
        </div>
      </div>
    </div>
  );
}

export default App;
