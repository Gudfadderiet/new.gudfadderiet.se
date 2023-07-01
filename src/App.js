import './App.css';

import { useState, useEffect } from 'react';

import Header from './components/Header';
import Index from './pages/Index';
import Error from './pages/Error';

import Information from './pages/Information';
import Schema from './pages/Schema';
import Post from './pages/Post';
import Overlay from './components/Overlay';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [group, setGroup] = useState("");

  useEffect(() => {
    setGroup(JSON.parse(localStorage.getItem("group")))
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Overlay isVisible={!group}/>
        <Routes>
          <Route path="/"    element={<><Header page="hem" /><Index/></>}/>
          <Route path="/hem" element={<><Header page="hem" /><Index/></>}/>
          <Route path="/information" element={<><Header page="information" /><Information/></>}/>
          <Route path="/information/:id" element={<><Header page="information" /><Post/></>}/>
          <Route path="/schema" element={<><Header page="schema" /><Schema/></>}/>
          {
          /*
          <Route path="/dokument" element={<><Header page="dokument" /><Dokument/></>}/>
          */
          }
          <Route path="/*"   element={<><Header page="404" /><Error/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
