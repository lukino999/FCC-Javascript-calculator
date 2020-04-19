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

      return {
        ...state,
        display: display + '.',
        temp: display + '.',
        zeroIsAllowed: true
      }


    //
    case ZERO:
      if (!zeroIsAllowed) {
        return state;
      }

      if (lastEntryWasOp) {
        return {
          ...state,
          display: '0',
          temp: '0',
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

  logState({ ...state, stack });

  if (state.immediateExecutionLogic) {
    console.log('immediateExecution');

    while (stack.length > 1) {
      const firstOperand = stack.shift().value;
      const op = stack.shift().value;
      const secondOperand = stack.shift().value;
      console.log(`Operation: ${firstOperand}, ${op}, ${secondOperand}`);

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

      logState({ ...state, stack });


    }
  }

  // unreacheble... remove!!
  return stack[0].value
}