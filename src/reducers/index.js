// for debugging only
import { logState } from '../components/Display'

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
  opIsAllowed: true,
  immediateExecutionLogic: true
};


export default (state = INITIAL_STATE, action) => {

  const {
    buffer,
    stack,
    zeroIsAllowed,
    decimalIsAllowed,
    bufferToBeResetted,
    opIsAllowed
  } = state;

  // temp var
  let flags = {};
  let bufferOld = '';

  switch (action.type) {

    //
    case CLEAR:
      return INITIAL_STATE;




    ////////////////////////////////////////////////////////////////////////////////////////////////
    case ONE:
    case TWO:
    case THREE:
    case FOUR:
    case FIVE:
    case SIX:
    case SEVEN:
    case EIGHT:
    case NINE:
      bufferOld = buffer === '0' ? '' : buffer;

      if (bufferToBeResetted) {
        bufferOld = '';
        flags = { bufferToBeResetted: false, decimalIsAllowed: true, opIsAllowed: true }
      }

      return {
        ...state,
        ...flags,
        buffer: bufferOld + action.text,
        zeroIsAllowed: true
      }




    ////////////////////////////////////////////////////////////////////////////////////////////////
    case ZERO:
      if (bufferToBeResetted) {
        return {
          ...INITIAL_STATE,
          stack: stack
        }
      };
      if (zeroIsAllowed) {
        return {
          ...state,
          buffer: buffer + '0'
        }
      }
      return state;




    ////////////////////////////////////////////////////////////////////////////////////////////////
    case DECIMAL:
      if (decimalIsAllowed && bufferToBeResetted) {
        return {
          ...state,
          buffer: '0.',
          bufferToBeResetted: false,
          decimalIsAllowed: false,
          opIsAllowed: true
        }
      }
      if (decimalIsAllowed && !bufferToBeResetted) {
        return {
          ...state,
          buffer: buffer + '.',
          decimalIsAllowed: false,
          opIsAllowed: true
        }
      }
      return state;




    ////////////////////////////////////////////////////////////////////////////////////////////////
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      if (opIsAllowed && !bufferToBeResetted) {
        console.log('opIsAllowed && !bufferToBeResetted');
        return {
          ...state,
          stack: [
            ...stack,
            { type: VAL, value: buffer },
            { type: OP, value: action.type }
          ],
          zeroIsAllowed: true,
          bufferToBeResetted: true,
          hasBufferBeenReset: false,
          opIsAllowed: false,
          decimalIsAllowed: true
        }
      }

      if (opIsAllowed && bufferToBeResetted) {
        console.log('opIsAllowed && bufferToBeResetted');
        return {
          ...state,
          stack: stack.pop().push(
            { type: VAL, value: buffer },
            { type: OP, value: action.type }
          )
        }
      }

      return state;




    ////////////////////////////////////////////////////////////////////////////////////////////////
    // test
    case EQUALS:
    //return calculate(state);




    ////////////////////////////////////////////////////////////////////////////////////////////////
    default:
      return state;
  }
}
