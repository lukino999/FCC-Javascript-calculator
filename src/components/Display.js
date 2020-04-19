import './css/Display.css';
import React from 'react';
import { connect } from 'react-redux';

const Display = (props) => {
  return (
    <div className='display__container'>
      <div className='display'>
        <p id='display' className='display-text'>
          {props.display}
        </p>
      </div>
    </div>
  );
}

export const logState = (state) => {

  const { display, temp, stack, ...rest } = { ...state };

  const text = stack.map(o => `\n| ${o.type}: ${o.value}`).toString();

  console.log('\n state: ', state,
    '\n', '\n', '++stack+++++++', text, '\n ++stack_end+++\n ',
    '\n', 'flags: ', rest,
    '\n \n '
  );

}

const mapState = (state) => {
  logState(state);
  return {
    display: state.display
  }
}
export default connect(mapState)(Display);