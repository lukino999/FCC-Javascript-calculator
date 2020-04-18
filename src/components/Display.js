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

export const logState = (state) => {
  console.log('\nstate', state);
  const text = state.stack.map(o => `\n| ${o.type}: ${o.value}`).toString();
  console.log('++stack+++++++', text, '\n++stack_end+++');

  const { buffer, stack, ...rest } = { ...state }
  console.log('buffer:', buffer);
  console.log('flags: ', rest);

  console.log('\n');

}

const mapState = (state) => {
  logState(state);
  return {
    buffer: state.buffer
  }
}
export default connect(mapState)(Display);