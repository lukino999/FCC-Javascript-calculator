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
  buffer: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ONE:
    case TWO:
    case THREE:
    case FOUR:
    case FIVE:
    case SIX:
    case SEVEN:
    case EIGHT:
    case NINE:
      return {
        ...state,
        buffer: state.buffer + action.text
      }

    default:
      return state;
  }
}