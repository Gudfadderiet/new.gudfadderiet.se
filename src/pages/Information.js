import './css/Information.css'
import { useState, useEffect } from 'react';

import NewsPreview from '../components/NewsPreview';
import data from '../posts.json';

function Information() {
    const [posts, setPosts] = useState([])
    const [group, setGroup] = useState("")

    useEffect(() => {
        setGroup(JSON.parse(localStorage.getItem("group")))

        const currentDate = new Date();
        const filteredData = data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate <= currentDate;
        });

        setPosts(filteredData)
    }, []);

    return (
      <div className="Information">
        {
            group &&
            <div>
                <div className='App-Section'>
                    <h1>Nyheter för {group}-<span class="Theme">N0llan</span></h1> 
                    <i className='Group-Small'>Inte {group}-<span className='Theme-Nollan'>N0llan</span>? Klicka <b onClick={() => {localStorage.removeItem("group");document.location.reload();}}><a href="#">här</a></b> för att återställa sidan.</i>
                </div>
                <div className='App-Section'>
                    <p>Här kan <span className='Theme-Nollan'>N0llan</span> finna de senaste nyheterna levererade direkt från <span className='Theme'>Gudfadderiet</span>.</p>
                </div>
                <div className='Post-Wrapper'>
                {
                    posts.length > 0 ?
                    <>{posts.map((post) =><NewsPreview post={post}/>)}</>
                    :
                    <h2>Det finns inga nyheter just nu...</h2>
                }
                </div>
            </div> 
        }
      </div>
    );
}
  
export default Information;