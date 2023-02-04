export const USER_LOGIN = 'USER_LOGIN';

export const CURRENCY = 'CURRENCY';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const currency = (coins) => ({
  type: CURRENCY,
  payload: coins.filter((coin) => coin !== 'USDT'),
});
