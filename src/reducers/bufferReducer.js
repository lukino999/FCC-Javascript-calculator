import {
  CLEAR,
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  DECIMAL,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUALS
} from '../actions/types';


// STACK CONSTANTS
const VAL = 'VAL';
const OP = 'OP';


//
const INITIAL_STATE = {
  buffer: '0',
  stack: [],
  zeroIsAllowed: false,
  decimalIsAllowed: true,
  bufferToBeResetted: false,
  addIsAllowed: true
};


export default (state = INITIAL_STATE, action) => {

  const {
    buffer,
    stack,
    zeroIsAllowed,
    decimalIsAllowed,
    bufferToBeResetted,
    addIsAllowed
  } = state;

  switch (action.type) {
    //
    case CLEAR:
      return INITIAL_STATE;


    //
    case ONE:
    case TWO:
    case THREE:
    case FOUR:
    case FIVE:
    case SIX:
    case SEVEN:
    case EIGHT:
    case NINE:
      let bufferOld;
      bufferOld = buffer === '0' ? '' : buffer;
      if (bufferToBeResetted) bufferOld = '';
      return {
        ...state,
        buffer: bufferOld + action.text,
        bufferToBeResetted: false,
        addIsAllowed: true
      }


    //
    case ZERO:
      if (zeroIsAllowed) return {
        ...state,
        buffer: buffer + action.text,
        addIsAllowed: true
      }
      else return state;


    //
    case DECIMAL:
      if (decimalIsAllowed) return {
        ...state,
        buffer: buffer + action.text,
        decimalIsAllowed: false,
        zeroIsAllowed: true,
        addIsAllowed: true
      }
      else return state


    //
    case ADD:
      if (addIsAllowed) return {
        ...state,
        stack: [
          ...stack,
          { type: VAL, value: buffer },
          { type: OP, value: action.type }
        ],
        zeroIsAllowed: false,
        decimalIsAllowed: true,
        bufferToBeResetted: true,
        addIsAllowed: false
      }
      else return state;


    //
    default:
      return state;
  }
}