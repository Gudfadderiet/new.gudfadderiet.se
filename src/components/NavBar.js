import './css/NavBar.css'

import { Link } from 'react-router-dom'

function NavBar(props) {
  const ids = ["Hem", "Information", "Schema"/*, "Dokument" */]

  return (
    <div className="NavBar">
        <ul>
            {ids.map((id) => id.toLowerCase() === props.activePage ? 
            <li key={id.toLowerCase()}><Link to={'/' + id.toLowerCase()} id={id.toLowerCase()} className='active'>{id}</Link></li> : 
            <li key={id.toLowerCase()}><Link to={'/' + id.toLowerCase()} id={id.toLowerCase()} >{id}</Link></li>)}
        </ul>
    </div>
  );
}

export default NavBar;