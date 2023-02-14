import { screen, within } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
// import userEvent from '@testing-library/user-event';

describe('Testes Wallet', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  it('Exiba o e-mail da pessoa usuária que fez login', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { state: { user: { email: 'andre@andre.com.br' } } },
    );
    const typeEmail = screen.getByTestId('email-field').textContent;
    expect(typeEmail).toContain(store.getState().user.email);
  });
  it('deve haver um formulário com os campos de valor, moeda, método de pagamento, descrição e tag', () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const tagImput = screen.getByTestId('tag-input');
    expect(tagImput).toBeInTheDocument();
    const currencyImput = screen.getByTestId('currency-input');
    expect(currencyImput).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
  it('Lista de moedas providas por uma api', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const currencyImput = screen.getByTestId('currency-input');
    const currencyOption = await screen.findByRole('option', { name: 'USD' });
    const currencyOptions = await within(currencyImput).findAllByRole('option');
    expect(currencyOption).toBeInTheDocument();
    expect(currencyOptions.length).toBe(15);
  });
});
