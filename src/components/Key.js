import React from 'react'
import { connect } from 'react-redux';
import { keypress } from '../actions';


function Key(props) {

  const { id, text, action } = props.keyMapping
  let keyRef;

  // handleKeypress
  const handleKeypress = (action, text, ref) => {
    resetAnimation(ref)
    props.keypress(action, text)
  }

  //
  const resetAnimation = (ref) => {
    ref.classList.remove('bounceIn');
    setTimeout(() => {
      ref.classList.add('bounceIn');
    }, 1);
  }

  return (
    < div key={id} className='key-container' >
      <div
        id={id}
        className='key bounceIn'
        ref={ref => keyRef = ref}
        onClick={() => handleKeypress(action, text, keyRef)}

      >
        <p>
          {text}
        </p>
      </div>
    </div >
  )
}


export default connect(null, { keypress })(Key);
