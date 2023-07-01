import './css/Index.css'
import { useState, useEffect } from 'react';

import { FaFacebookF, FaInstagram, FaTiktok, FaInfoCircle, FaUserGraduate, FaBook } from "react-icons/fa";

function Index() {
  const [group, setGroup] = useState("");

  const codeMap = {
    "BIO1A": "6kbio",
    "BIO1B": "6kbio",
    "MAT1": "6kmat",
    "KEM1": "6kkem",
    "DJP1": "6kdjp"
  };

  useEffect(() => {
    setGroup(JSON.parse(localStorage.getItem("group")))
  }, []);

  return (
    <main className="App-Content">
      {
        group &&
        <div>
          <div className='App-Section'>
            <h1>Välkommen, {group}-<span className='Theme'>N0llan</span>!</h1>
            <i className='Group-Small'>Inte {group}-<span className='Theme-Nollan'>N0llan</span>? Klicka <b onClick={() => {localStorage.removeItem("group");document.location.reload();}}><a href="#">här</a></b> för att återställa sidan.</i>
          </div>
          <div className='App-Section'>
            <p>
              <span className='Theme'>Gudfadderiet</span> vill välkomna <span className='Theme-Nollan'>N0llan</span> till Linköpings Universitet. Grattis till antagningen, <span className='Theme-Nollan'>N0llan</span>! 
              <span className='Theme'> Gudfadderiet</span> hoppas att <span className='Theme-Nollan'>N0llan</span> kommer att trivas här på LiU, tillsammans med de andra <span className='Theme-Nollan'>N0llan</span>.
            </p>
          </div>
          <div className='App-Section'>
            <h2>Programspecifikt för {group}-<span className='Theme'>N0llan</span>!</h2>
            <hr/>
            <p>
              Här finner {group}-<span className='Theme-Nollan'>N0llan</span> information som kan vara användbar för just {group}-<span className='Theme-Nollan'>N0llan</span>.
            </p>
            <p><a href={"https://liu.se/utbildning/antagen/" + codeMap[group] + "-antagen"}><FaInfoCircle/> Information från LiU för nyantagna</a></p>
            <p><a href={"https://liu.se/utbildning/program/" + codeMap[group]}><FaBook/> Programinformation från LiU</a></p>
            <p><a href={"https://studieinfo.liu.se/program/" + codeMap[group]}><FaUserGraduate/> Utbildnings- och programplan</a></p>
          </div>
          <div className='App-Section'>
            <h2>Kontakt</h2>
            <hr/>
            <p>
              Har <span className='Theme-Nollan'>N0llan</span> några frågor kan <span className='Theme-Nollan'>N0llan</span> alltid skicka digital post till <span className='Theme'>Gudfadderiet</span> på <a href="mailto:gf@gudfadderiet.se">gf@gudfadderiet.se</a>, eller kolla in
              <span className='Theme'> Gudfadderiet</span>s sociala medier nedan.
            </p>
            <div className='App-Section'>
              <div className='IconWrapper'><a href="https://www.facebook.com/Gudfadderiet/"><FaFacebookF className='Icon'/></a></div>
              <div className='IconWrapper'><a href="https://www.instagram.com/gudfadderiet/"><FaInstagram className='Icon'/></a></div>
              <div className='IconWrapper'><a href="https://www.tiktok.com/@gudfadderiet"><FaTiktok className='Icon'/></a></div>
            </div>
          </div>
        </div>
      }
    </main>
  );
}

export default Index;