import './css/Schema.css'
import { useState, useEffect } from 'react';

import { FaTicketAlt, FaBeer, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";

function Schema() {
    const [events, setEvents] = useState([])
    {
    /*
    TODO
    ====
    - Göra en snyggare kanlender som hämtar event från Django som i sin tur har hämtat från Google Calender och gjort om till JSON. 
    - Möjlighet att prenumerera på Google Calendar Schema.
    */
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/cal/events/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setEvents(data.results)
        });
    }, []);

    return (
      <div className="Schema">
        {/* 
        <select id="klasser" name="klasser">
            <option value="bio-a">Biologi a</option>
            <option value="bio-b">Biologi b</option>
            <option value="mat">Matematik</option>
            <option value="kem">Kemi</option>
            <option value="djp">Djurpsykologi</option>
        </select>
        */}
        <h1>Dagens Schema <br/>(BIO1A-N0llan)</h1>
        {
            events.map((event) =>
            <div className='Event-Wrapper'>
                <div className='Event-Title'><h2>{event.title}</h2> <p>kl {event.start_time.substring(0, 5)} - {event.end_time.substring(0, 5)}</p></div>
                <hr/>
                <p className='Event-Desc'><FaInfoCircle/> {event.description}...</p>
                {
                event.place && 
                <p className='Event-Location'><FaMapMarkerAlt/> {event.place}</p>
                }
                {
                event.alcohol && 
                <p className='Event-Alcohol'><FaBeer/> Det här är ett alkoholevent</p>
                }
                {
                event.ticket &&
                <p className='Event-Ticket'><FaTicketAlt/> Biljett krävs</p>
                }
            </div>
            )
        }
      </div>
    );
}
  
export default Schema;