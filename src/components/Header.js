import './css/Header.css'
import NavBar from './NavBar';

import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <>
    <div className="Header">
        <Link to={'/'}>
          <img src={'/GF-logga.png'}/>
          <h1 className='GF-Text'>Gudfadderiet</h1>
        </Link>
    </div>
    <NavBar activePage={props.page}/>
    </>
  );
}

export default Header;