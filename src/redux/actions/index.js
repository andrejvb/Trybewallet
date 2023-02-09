export const USER_LOGIN = 'USER_LOGIN';

export const CURRENCY = 'CURRENCY';

export const EXPENSES = 'EXPENSES';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const saveCurrency = (coins) => ({
  type: CURRENCY,
  payload: coins.filter((coin) => coin !== 'USDT'),
});

export const saveExpenses = (despesas) => ({
  type: EXPENSES,
  expenses: despesas,
});
