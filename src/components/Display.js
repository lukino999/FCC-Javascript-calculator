import './css/Display.css';
import React from 'react';
import { connect } from 'react-redux';

const Display = (props) => {
  return (
    <div className='display__container'>
      <div className='display'>
        <p id='display' className='display-text'>
          {props.buffer}
        </p>
      </div>
    </div>
  );
}

const logState = (state) => {
  const text = state.buffer.stack.map(o => `\n${o.type}: ${o.value}`).toString();
  console.log('stack --------', text);

  const { buffer, stack, ...rest } = { ...state.buffer }
  console.log('buffer:', buffer);
  console.log('flags: ', rest);

  console.log('\n');

}

const mapState = (state) => {
  logState(state);
  return {
    buffer: state.buffer.buffer
  }
}
export default connect(mapState)(Display);