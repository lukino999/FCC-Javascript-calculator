import React from 'react';
import './css/Keypad.css';
import keyMapping from '../mapping/keyMapping';
import Key from './Key';

function KeyPad(props) {


  //
  const renderKeys = () => {
    let keys = [];
    for (let i = 0; i < keyMapping.length; i++) {
      const keyMap = keyMapping[i];
      keys.push(
        <Key
          keyMapping={keyMap}
          key={keyMap.id}
        />
      );
    }
    return keys;
  }

  //
  return (
    <div className='keypad-container'>
      <div className='keys'>
        <div className='logo'>FCC CALC</div>
        {renderKeys()}
      </div>
    </div>
  )
}

// export default connect(null, { keypress })(KeyPad);
export default KeyPad;