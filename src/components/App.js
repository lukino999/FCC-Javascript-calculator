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
      <footer>
        FreeCodeCamp Javascript Calculator &copy;&nbsp;Luca&nbsp;M&nbsp;-&nbsp;
        <a href='https://github.com/lukino999/FCC-JavaScript-calculator' target='_blank'>source</a>
      </footer>
    </div>
  );
}

export default App;