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
  bufferHasToBeReset: false,
  opIsAllowed: true,
  lastEntryWasOp: false,
  immediateExecutionLogic: true
};


export default (state = INITIAL_STATE, action) => {

  const {
    buffer,
    stack,
    zeroIsAllowed,
    decimalIsAllowed,
    bufferHasToBeReset,
    opIsAllowed,
    lastEntryWasOp
  } = state;

  // temp var
  let flags = {};
  let bufferOld = '';
  let common = {};

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

      if (bufferHasToBeReset) {
        bufferOld = '';
        flags = { bufferHasToBeReset: false, decimalIsAllowed: true, opIsAllowed: true }
      }

      return {
        ...state,
        ...flags,
        buffer: bufferOld + action.text,
        zeroIsAllowed: true,
        lastEntryWasOp: false
      }




    ////////////////////////////////////////////////////////////////////////////////////////////////
    case ZERO:
      common = { lastEntryWasOp: false }
      if (bufferHasToBeReset) {
        return {
          ...INITIAL_STATE,
          stack: stack,
          ...common
        }
      };
      if (zeroIsAllowed) {
        return {
          ...state,
          buffer: buffer + '0',
          ...common
        }
      }
      return state;




    ////////////////////////////////////////////////////////////////////////////////////////////////
    case DECIMAL:
      common = {
        decimalIsAllowed: false,
        opIsAllowed: true,
        lastEntryWasOp: false
      }
      if (decimalIsAllowed && bufferHasToBeReset) {
        return {
          ...state,
          buffer: '0.',
          bufferHasToBeReset: false,
          ...common
        }
      }
      if (decimalIsAllowed && !bufferHasToBeReset) {
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
      if (opIsAllowed) {
        console.log('opIsAllowed && !bufferHasToBeReset');
        return {
          ...state,
          stack: [
            ...stack,
            { type: VAL, value: buffer },
            { type: OP, value: action.type }
          ],
          zeroIsAllowed: true,
          bufferHasToBeReset: true,
          opIsAllowed: false,
          decimalIsAllowed: true,
          lastEntryWasOp: true
        }
      }

      if (lastEntryWasOp && action.type === SUBTRACT) {
        return {
          ...state,
          buffer: '-',
          bufferHasToBeReset: false,
        }
      }

      if (lastEntryWasOp) {
        console.log('!opIsAllowed && lastEntryWasOp');
        return {
          ...state,
          stack: [...stack.slice(0, -1), { type: OP, value: action.type }]
        }
      }

      return state;




    ////////////////////////////////////////////////////////////////////////////////////////////////
    // test
    case EQUALS:
      return {
        ...INITIAL_STATE,
        bufferHasToBeReset: true,
        buffer: calculate(state)
      }




    ////////////////////////////////////////////////////////////////////////////////////////////////
    default:
      return state;
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
const calculate = (state) => {

  // return result

  console.log('\n--------------\n------- EQUALS');

  const stack = [...state.stack, { type: VAL, value: state.buffer }];

  if (state.immediateExecutionLogic) {
    console.log('immediateExecution');

    console.log('\nloop');
    while (stack.length > 1) {
      const firstOperand = parseFloat(stack.shift().value);
      const op = (stack.shift()).value;
      const secondOperand = parseFloat((stack.shift()).value);
      console.log(`${firstOperand}, ${op}, ${secondOperand}`);
      console.log('stack', stack);

      let res = 0;

      switch (op) {
        case ADD:
          res = firstOperand + secondOperand;
          break;

        case SUBTRACT:
          res = firstOperand - secondOperand;
          break;

        case MULTIPLY:
          res = firstOperand * secondOperand;
          break;

        case DIVIDE:
          res = firstOperand / secondOperand;
          break;

      }

      stack.unshift({ type: VAL, value: res })

    }
  }

  // unreacheble... remove!!
  return stack[0].value
}