import fetchCurrency from '../../services/api';

export const USER_LOGIN = 'USER_LOGIN';

export const CURRENCY = 'CURRENCY';

export const EXPENSES = 'EXPENSES';

export const DELETE = 'DELETE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const saveCurrency = (coins) => ({
  type: CURRENCY,
  coins: coins.filter((coin) => coin !== 'USDT'),
});

export const saveExpenses = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE,
  id,
});

export const startFetchCurrency = () => async (dispatch) => {
  const coins = Object.keys(await fetchCurrency());
  dispatch(saveCurrency(coins));
};

export const startFetchRate = (despesas) => async (dispatch) => {
  const rates = await fetchCurrency();
  despesas.exchangeRates = rates;
  dispatch(saveExpenses(despesas));
};
