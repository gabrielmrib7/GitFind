import './styles.css';
import { Header } from "../../components/Header";
import background from '../../assets/background.png'
function App() {
  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app"/>
        <div className="info">
          <div >
              <input name="usuario" placeholder="@usuario"/>
              <button>Buscar</button>
          </div>
          <div className="perfil">
            <img src="https://avatars.githubusercontent.com/u/115052146?v=4" className="profile" alt="perfil"></img>
            <div>
               <h3>Gabriel</h3>
               <span>@gabrielmrib7</span>
               <p>Desc</p>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}

export default App;
