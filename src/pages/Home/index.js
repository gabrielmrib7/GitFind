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
        </div>
      </div>
    </div>
  );
}

export default App;
