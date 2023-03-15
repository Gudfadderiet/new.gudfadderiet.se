import './App.css';

import Header from './components/Header';
import Index from './pages/Index';
import Error from './pages/Error';

import Information from './pages/Information';
import Schema from './pages/Schema';
import Dokument from './pages/Dokument';
import Form from './pages/Form';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [page, setPage] = useState("hem")

  return (
    <div className="App">
      {
      /*
      Allmän TODO
      ===========
      - Gör Temaenlig
      - Få in länkar till sociala medier på bättre sätt, förslagsvis en kontakt-rubrik
      - Som fadder ska man kunna ta sig till Fadderjobb-sidan
      */
      }
      <BrowserRouter>
        <Header page={page} setPage={setPage}/>
        <Routes>
          <Route path="/"    element={<Index/>}/>
          <Route path="/hem" element={<Index/>}/>
          <Route path="/information" element={<Information/>}/>
          <Route path="/schema" element={<Schema/>}/>
          <Route path="/dokument" element={<Dokument/>}/>
          <Route path="/nolleenkat" element={<Form/>}/>
          <Route path="/*"   element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
