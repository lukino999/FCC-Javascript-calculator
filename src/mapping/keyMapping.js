import {
  CLEAR,
  SEVEN,
  EIGHT,
  NINE,
  DIVIDE,
  FOUR,
  FIVE,
  SIX,
  MULTIPLY,
  ONE,
  TWO,
  THREE,
  SUBTRACT,
  ZERO,
  DECIMAL,
  EQUALS,
  ADD
} from '../actions/types';

//
const keyMapping = [
  { id: 'clear', text: 'C', action: CLEAR },
  { id: 'seven', text: '7', action: SEVEN },
  { id: 'eight', text: '8', action: EIGHT },
  { id: 'nine', text: '9', action: NINE },
  { id: 'divide', text: '÷', action: DIVIDE },
  { id: 'four', text: '4', action: FOUR },
  { id: 'five', text: '5', action: FIVE },
  { id: 'six', text: '6', action: SIX },
  { id: 'multiply', text: 'x', action: MULTIPLY },
  { id: 'one', text: '1', action: ONE },
  { id: 'two', text: '2', action: TWO },
  { id: 'three', text: '3', action: THREE },
  { id: 'subtract', text: '-', action: SUBTRACT },
  { id: 'zero', text: '0', action: ZERO },
  { id: 'decimal', text: '.', action: DECIMAL },
  { id: 'equals', text: '=', action: EQUALS },
  { id: 'add', text: '+', action: ADD }
];

export default keyMapping;