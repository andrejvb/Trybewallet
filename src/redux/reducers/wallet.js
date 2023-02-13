import { CURRENCY, EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return {
      ...state, currencies: action.coins,
    };
  case EXPENSES:
    return {
      ...state, expenses: [...state.expenses, action.expenses] };
  default: return state;
  }
};

export default wallet;
