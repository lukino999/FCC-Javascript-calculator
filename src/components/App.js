import './css/App.css';
import React from 'react';
import Display from './Display';
import Keypad from './Keypad';

const App = () => {
  return (
    <div className='outer-container'>
      <div className='calculator'>
        <Display />
        <Keypad />
      </div>
    </div>
  );
}

export default App;