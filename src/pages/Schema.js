import './css/Schema.css'
import { useState, useEffect } from 'react';

import { FaTicketAlt, FaBeer, FaInfoCircle, FaMapMarkerAlt, FaUtensils } from "react-icons/fa";

import data from '../dummy.json';

import Parser from 'html-react-parser';

function replaceWords(string) {
    let str = string.replace(/N0llan/g, "<span className=\"Theme-Nollan\">N0llan</span>");
    str = str.replace(/n0llan/g, "<span className=\"Theme-Nollan\">N0llan</span>");
    str = str.replace(/Gudfadderiet/g, "<span className=\"Theme\">Gudfadderiet</span>");
    return str;
}

function Schema() {
    const [events, setEvents] = useState([])
    const [group, setGroup] = useState("")

    const [activeFilter, setActiveFilter] = useState("Alla event")
    
    const linkMap = {
        "BIO1A": "https://calendar.google.com/calendar/embed?src=c_5d744707eb67f720031843e7429e3045e3ed044082b3d0e0e3785bf5dbec3ebd%40group.calendar.google.com&ctz=Europe%2FStockholm",
        "BIO1B": "https://calendar.google.com/calendar/embed?src=c_7d9c59aaaccd08d8127c1d7ed6ec3f1a193436dec945451b8df82fbad91f1a25%40group.calendar.google.com&ctz=Europe%2FStockholm",
        "MAT1": "https://calendar.google.com/calendar/embed?src=c_bdda60e56118b37fe9a32daff980304ccda71cf405df87caa529db98cb2f8ef8%40group.calendar.google.com&ctz=Europe%2FStockholm",
        "KEM1": "https://calendar.google.com/calendar/embed?src=c_a00c7cf218fe6401a2e868568ceb677afaeb6c0f94c3dace243429ca6bb7bd6a%40group.calendar.google.com&ctz=Europe%2FStockholm",
        "DJP1": "https://calendar.google.com/calendar/embed?src=c_825f05df6b0aea2bb1edd1299276e38cb369b97e86f45c82d2a992c139030890%40group.calendar.google.com&ctz=Europe%2FStockholm"
    };

    function filterEventsByDateRange(data, startDate, endDate) {
        const filteredEvents = {};
        Object.keys(data).forEach((date) => {
          const itemDate = new Date(date);
          itemDate.setHours(0,0,0,0);
          if (itemDate >= startDate && itemDate <= endDate) {
            filteredEvents[date] = data[date];
          }
        });
        return filteredEvents;
    }

    function filterData(data) {
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        const yearLater = new Date();
        yearLater.setDate(currentDate.getDate() + 365);

        const weekLater = new Date();
        weekLater.setDate(currentDate.getDate() + 7);

        switch(activeFilter) {
            case "Alla kommande event":
                return filterEventsByDateRange(data, currentDate, yearLater);
            case "Event kommande sju dagar":
                return filterEventsByDateRange(data, currentDate, weekLater);
            case "Dagens event":
                return filterEventsByDateRange(data, currentDate, currentDate);
            case "Alla event":
            default:
                return data;
        }
    }

    function getEventString() {
        switch(activeFilter) {
            case "Alla kommande event":
                return "Det finns inga kommande event"
            case "Event kommande sju dagar":
                return "Inga event äger rum de kommande sju dagarna"
            case "Dagens event":
                return "Inga event äger rum idag"
            case "Alla event":
            default:
                return "Det finns inga event"
        }
    }

    function restructureData(data) {
        const newData = {};
        data.forEach((event) => {
          const date = event.start.dateTime.slice(0, 10);
          if (newData[date]) {
            newData[date].push(event);
          } else {
            newData[date] = [event];
          }
        });
        return newData;
    }

    useEffect(() => {
        setGroup(JSON.parse(localStorage.getItem("group")));
        
        let objects = data.items;
        objects.sort(function(a, b) {
            var timestampA = new Date(a.start.dateTime);
            var timestampB = new Date(b.start.dateTime);
            return timestampA - timestampB;
        });

        objects = restructureData(objects);
        console.log(objects);
        setEvents(objects);
    }, []);

    const stripTimestamp = (timestamp) => {
        var t = new Date(timestamp)

        var hours = t.getHours();
        var minutes = t.getMinutes();

        var formattedHours = hours < 10 ? "0" + hours : hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

        var formattedTime = formattedHours + ":" + formattedMinutes;
        return formattedTime;
    }

    const stripContent = (content) => {
        var strippedContent = content.replace(/<u>[\s\S]*$/, '</span>');
        return strippedContent;
    }

    const eventContains = (event, string) => {
        if (event.description && event.description.includes(string)) {
            return true;
        }
        return false;
    }

    return (
      <div className="Schema">
        {
        group &&
        <div>
            <div className='App-Section'>
                <h1>{group}-<span class="Theme">N0llan</span>s Schema</h1>
                <i className='Group-Small'>Inte {group}-<span className='Theme-Nollan'>N0llan</span>? Klicka <b onClick={() => {localStorage.removeItem("group");document.location.reload();}}><a href="#">här</a></b> för att återställa sidan.</i>
            </div>
            <div className='App-Section'>
                <p>Här finner <span className='Theme-Nollan'>N0llan</span> sitt schema för mottagningen, om <span className='Theme-Nollan'>N0llan</span> vill så kan <span className='Theme-Nollan'>N0llan</span> även lägga in schemat i sin kalender genom att klicka <a href={linkMap[group]}>här</a>.</p>
            </div>
            <div className="Schema-Filter">
                <select id="filter" name="filter" onChange={e => setActiveFilter(e.target.value)}>
                    <option value="" disabled selected>Filter</option>
                    <option value="Alla event">Alla event</option>
                    <option value="Alla kommande event">Alla kommande event</option>
                    <option value="Event kommande sju dagar">Event kommande sju dagar</option>
                    <option value="Dagens event">Dagens event</option>
                </select>
            </div>
            {
                Object.entries(filterData(events)).length > 0 ?
                <>
                {
                Object.entries(filterData(events)).map(([key, value]) => (
                    <>
                        <h2>{key}</h2>
                        {
                            value.map((event) =>
                            <>
                            <div className='Event-Wrapper'>
                                <div className='Event-Title'><h2>{event.summary}</h2> <p className='Yellow'>kl {stripTimestamp(event.start.dateTime)} - {stripTimestamp(event.end.dateTime)}</p></div>
                                <hr/>
                                {
                                event.description &&
                                <p className='Event-Desc'><span className='Yellow'><FaInfoCircle/></span> {Parser(stripContent(replaceWords(event.description)))}</p>
                                }
                                {
                                event.location && 
                                <p className='Event-Location'><span className='Yellow'><FaMapMarkerAlt/></span> {event.location}</p>
                                }
                                {
                                eventContains(event, "Mat:</b> Ja") && 
                                <p className='Event-Alcohol'><span className='Yellow'><FaUtensils/></span> <span className='Theme-Nollan'>N0llan</span> får mat</p>
                                }
                                {
                                eventContains(event, "Alkohol:</b> Ja") && 
                                <p className='Event-Alcohol'><span className='Yellow'><FaBeer/></span> Det här är ett alkoholevent</p>
                                }
                                {
                                event.ticket &&
                                <p className='Event-Ticket'><span className='Yellow'><FaTicketAlt/></span> Biljett krävs</p>
                                }
                            </div>
                            </>
                            )
                        }
                    </>
                ))
                }
                </>
                :
                <>
                    <h2>{getEventString()}...</h2>
                </>
                /* 
                events.map((event) =>
                <>
                <div className='Event-Wrapper'>
                    <div className='Event-Title'><h2>{event.summary}</h2> <p className='Yellow'>kl {stripTimestamp(event.start.dateTime)} - {stripTimestamp(event.end.dateTime)}</p></div>
                    <hr/>
                    {
                    event.description &&
                    <p className='Event-Desc'><span className='Yellow'><FaInfoCircle/></span> {Parser(stripContent(replaceWords(event.description)))}</p>
                    }
                    {
                    event.location && 
                    <p className='Event-Location'><span className='Yellow'><FaMapMarkerAlt/></span> {event.location}</p>
                    }
                    {
                    eventContains(event, "Mat:</b> Ja") && 
                    <p className='Event-Alcohol'><span className='Yellow'><FaUtensils/></span> <span className='Theme-Nollan'>N0llan</span> får mat</p>
                    }
                    {
                    eventContains(event, "Alkohol:</b> Ja") && 
                    <p className='Event-Alcohol'><span className='Yellow'><FaBeer/></span> Det här är ett alkoholevent</p>
                    }
                    {
                    event.ticket &&
                    <p className='Event-Ticket'><span className='Yellow'><FaTicketAlt/></span> Biljett krävs</p>
                    }
                </div>
                </>
                )
                */
            }
        </div>
        }
      </div>
    );
}
  
export default Schema;