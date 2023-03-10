import './App.css';

import Header from './components/Header';
import Index from './pages/Index';
import Error from './pages/Error';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [page, setPage] = useState("hem")

  return (
    <div className="App">
      <BrowserRouter>
        <Header page={page} setPage={setPage}/>
        <Routes>
          <Route path="/"    element={<Index/>}/>
          <Route path="/hem" element={<Index/>}/>
          <Route path="/*"   element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      {
        /* 
        TODO
        ====
        - Gör Temaenlig
        - Karta
        - Se Aktuella Nolleuppdrag
        - Nollehandbok mer lättnavigerad
        - Få in länkar till sociala medier på bättre sätt
        - Snyggare kalender
        - Fadderjobb
        - Nolleenkät
        - Förbättra informationssidan
        */
      }
    </div>
  );
}

export default App;
