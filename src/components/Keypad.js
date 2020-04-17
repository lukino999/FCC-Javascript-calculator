import './css/Keypad.css';
import React from 'react';
import keyMapping from '../mapping/keyMapping';

export default function KeyPad(props) {

  const renderKeys = () => {
    let keys = [];
    for (let i = 0; i < 17; i++) {
      const { id, text } = keyMapping[i];
      keys.push(
        <div key={id} className='key-container'>
          <div id={id} className='key'>
            <p>
              {text}
            </p>
          </div>
        </div>
      );
    }
    return keys;
  }

  return (
    <div className='keypad-container'>
      <div className='keys'>
        <div className='logo'>Logo</div>
        {renderKeys()}
      </div>
    </div>
  )
}
