import './css/Header.css'
import NavBar from './NavBar';

function Header({page, setPage}) {
  return (
    <div className="Header">
        <div className='Header-Img-Wrapper'>
            <img src={'logga.png'} alt='logga.png' className='GF-Logo'/>
            <img src={'Gudfadderiet.png'} alt="Gudfadderiet.png" className='GF-Img'/>
        </div>
        <NavBar activePage={page} setPage={setPage}/>
    </div>
  );
}

export default Header;