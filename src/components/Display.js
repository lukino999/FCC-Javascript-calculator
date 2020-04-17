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


const mapState = (state) => {
  return {
    buffer: state.buffer.buffer
  }
}
export default connect(mapState)(Display);