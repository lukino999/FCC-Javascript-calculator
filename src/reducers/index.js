// for debugging only
import { logState } from '../components/Display'

import {
  MODE,
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


// CONSTANTS
const VAL = 'VAL';
const OP = 'OP';
const PRECISION = 16

//
const INITIAL_STATE = {
  display: '0',
  temp: '',
  stack: [],
  zeroIsAllowed: false,
  lastEntryWasOp: false,
  immediateExecutionLogic: true
};


export default (state = INITIAL_STATE, action) => {

  console.log('Action: ', action.type);

  const {
    temp,
    stack,
    display,
    lastEntryWasOp,
    zeroIsAllowed
  } = state;

  switch (action.type) {
    case MODE:
      return {
        ...state,
        immediateExecutionLogic: !state.immediateExecutionLogic
      }

    //
    case CLEAR:
      return INITIAL_STATE;

    //
    case EQUALS:
      let res = calculate(state);
      return {
        ...INITIAL_STATE,
        display: res
      }

    //
    case SUBTRACT:
      if (lastEntryWasOp && (stack[stack.length - 1] === SUBTRACT)) {
        return state;
      }
      if (lastEntryWasOp) {
        return {
          ...state,
          temp: '-'
        }
      }

      if (display === '0') {
        return {
          ...state,
          temp: '-',
          display: '-'
        }
      }

    //
    case ADD:
    case MULTIPLY:
    case DIVIDE:
    case SUBTRACT:
      let tempStack;
      if (lastEntryWasOp) {
        tempStack = [...stack];
        tempStack.pop();
      } else {
        if (temp === '-') {
          return state;
        }
        tempStack = [...stack, { type: VAL, value: parseFloat(display) }]
      }

      return {
        ...state,
        temp: '',
        stack: [...tempStack, { type: OP, value: action.type }],
        lastEntryWasOp: true
      }


    //
    case DECIMAL:
      if (isTooLong(temp)) return state;

      if (lastEntryWasOp) {
        return {
          ...state,
          display: temp + '0.',
          temp: temp + '0.',
          lastEntryWasOp: false,
          zeroIsAllowed: true
        }
      }

      if (display.includes('.')) {
        return state;
      }

      if (display === '0') {
        return {
          ...state,
          display: '0.',
          temp: '0.',
          zeroIsAllowed: true
        }
      }

      if (display === '-') {
        return {
          ...state,
          display: '-0.',
          temp: '-0.',
          zeroIsAllowed: true
        }
      }

      return {
        ...state,
        display: display + '.',
        temp: display + '.',
        zeroIsAllowed: true
      }


    //
    case ZERO:
      if (isTooLong(temp)) return state;

      if (!zeroIsAllowed) {
        return state;
      }

      if (lastEntryWasOp) {
        return {
          ...state,
          display: '0',
          zeroIsAllowed: false
        }
      }

      return {
        ...state,
        display: temp + '0',
        temp: temp + '0'
      }



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
      if (isTooLong(temp)) return state;

      if (lastEntryWasOp) {
        return {
          ...state,
          display: temp + action.text,
          temp: temp + action.text,
          lastEntryWasOp: false,
          zeroIsAllowed: true
        }
      }

      return {
        ...state,
        display: temp + action.text,
        temp: temp + action.text,
        zeroIsAllowed: true
      }

    //
    default:
      return state;
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
const calculate = (state) => {

  // return result

  console.log('EQUALS');

  const stack = [...state.stack, { type: VAL, value: parseFloat(state.display) }];

  logState({ stack });

  if (state.immediateExecutionLogic) {
    // immediate execution logic:
    // the operation are executed in the order they've been entered
    console.log('immediateExecution');

    while (stack.length > 2) {
      const firstOperand = stack.shift().value;
      const op = stack.shift().value;
      const secondOperand = stack.shift().value;
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
      logState({ stack });
    }
  } else {
    // formula logic:

    // first execute all MULTIPLYs and DIVIDEs
    let i = 1
    while (stack.length > i) {
      let res;
      const op = stack[i].value;
      if ((op === MULTIPLY) || (op === DIVIDE)) {
        const firstOperand = stack[i - 1].value;
        const secondOperand = stack[i + 1].value;

        res = (op === MULTIPLY) ? (firstOperand * secondOperand) : (firstOperand / secondOperand);
        console.log(`Operation: ${firstOperand} ${op} ${secondOperand} = ${res} `);
        stack.splice(i - 1, 3, { type: VAL, value: res });
      } else {
        i += 2;
      }
      logState({ i: i, stack });
    }

    // now execute all ADDs and SUBTRACTs
    while (stack.length >= 3) {
      let res;
      const firstOperand = stack[0].value;
      const op = stack[1].value;
      const secondOperand = stack[2].value;
      res = (op === ADD) ? (firstOperand + secondOperand) : (firstOperand - secondOperand);
      stack.splice(0, 3, { type: VAL, value: res });
      logState({ stack });
    }
  }

  // 
  return stack[0].value
}


function isTooLong(string) {
  let temp = string[0] === '-' ? string.split('-')[1] : string;
  const [integer, decimal] = (temp).split('.');
  let digits = decimal ? integer.length + decimal.length : integer.length;
  digits = integer === '0' ? digits - 1 : digits;
  return digits >= PRECISION;
}
