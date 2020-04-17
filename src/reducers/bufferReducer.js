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
import keyMapping from '../mapping/keyMapping';

const INITIAL_STATE = {
  buffer: '0',
  zeroIsAllowed: false,
  decimalIsAllowed: true
};

export default (state = INITIAL_STATE, action) => {
  const { buffer, zeroIsAllowed, decimalIsAllowed } = state;
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
      let existing = buffer == '0' ? '' : buffer;
      return {
        ...state,
        buffer: existing + action.text,
        zeroIsAllowed: true
      }

    //
    case ZERO:
      if (zeroIsAllowed) {
        if (!buffer) return {
          ...state,
          buffer: buffer + action.text,
          zeroIsAllowed: false
        }
        else return {
          ...state,
          buffer: buffer + action.text,
        }
      }

    //
    case DECIMAL:
      if (decimalIsAllowed) return {
        ...state,
        buffer: buffer + action.text,
        decimalIsAllowed: false,
        zeroIsAllowed: true
      }


    default:
      return state;
  }
}