import React from 'react';
import { connect } from 'react-redux';
import './css/Keypad.css';
import keyMapping from '../mapping/keyMapping';
import { keypress } from '../actions';

function KeyPad(props) {


  const renderKeys = () => {
    let keys = [];
    for (let i = 0; i < 17; i++) {
      const { id, text, action } = keyMapping[i];
      keys.push(
        <div key={id} className='key-container'>
          <div
            id={id}
            className='key'
            onClick={() => props.keypress(action, text)}
          >
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

export default connect(null, { keypress })(KeyPad);