import './css/Overlay.css'
import React, { useState } from 'react';
import SelectGroup from './SelectGroup';

function Overlay(prop) {
  return (
    <div>
      {prop.isVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Välkommen, <span className='Theme-Nollan'>N0llan</span>!</h2>
            <p>Välj din klass för en anpassad upplevelse.</p>
            <SelectGroup/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overlay;