import { Link } from "react-router-dom";
import icon from '../assets/icon-home.svg';

const Sidebar = () =>{
    const logo = "https://www.sb.gob.do/media/wejckxdm/logo-sb-footer.svg";

    return (
        <>
            <div className='Aside-content'>
              <header>
              <img src={logo} className="App-logo" alt="logo" />
              </header>
              <ul>
                  <li>
                      <Link className="nav-link"to="/">
                      <img className="icon-home" src={icon} alt="icon" /> Inicio
                      </Link>
                  </li>
                  <li>
                  <Link className="nav-link"to="/listar">Government</Link>
                  </li>
                  <li>
                  <Link className="nav-link"to="/crear">Crear registro</Link>
                  </li>
              </ul>
            </div>
        </>
      );
}

export default Sidebar;