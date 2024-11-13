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

    if(newUser.name)
    {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      
      if(newRepos.length)
      {
        setRepos(newRepos);
        console.log(newRepos);
        
      }

    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app"/>
        <div className="info">
          <div >
              <input name="usuario" placeholder="@usuario" value={user} onChange={event => setUser(event.target.value)}/>
              <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? ( <>
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
              <a href={repo.html_url}>
              <ItemList title={repo.name} description={repo.description}/>            
              </a>
            ))}
          </div>
              ):null}
        </div>
      </div>
    </div>
  );
}

export default App;
