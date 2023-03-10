import './css/NavBar.css'

import { Link } from 'react-router-dom'

function NavBar({activePage, setPage}) {
  const ids = ["Hem", "Information", "Schema", "Dokument"]

  function changeActive(e) {
    setPage(e.target.id)
  }

  return (
    <div className="NavBar">
        <ul>
            {ids.map((id) => id.toLowerCase() === activePage ? 
            <li key={id.toLowerCase()}><Link to={'/' + id.toLowerCase()} id={id.toLowerCase()} onClick={changeActive} className='active'>{id}</Link></li> : 
            <li key={id.toLowerCase()}><Link to={'/' + id.toLowerCase()} id={id.toLowerCase()} onClick={changeActive}>{id}</Link></li>)}
        </ul>
    </div>
  );
}

export default NavBar;