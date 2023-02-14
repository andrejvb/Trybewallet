import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tetes Login', () => {
  it('Rota para esta página deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Local para que a pessoa usuária insira seu e-mail e senha validos', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText('Email');
    expect(email).toBeInTheDocument();
    const senha = screen.getByLabelText('Senha');
    expect(senha).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
    userEvent.type(email, 'andr.com');
    userEvent.type(senha, 'and');
    expect(button).toBeDisabled();
    userEvent.type(email, 'andre@andre.com');
    userEvent.type(senha, 'andre1');
    expect(button).toBeEnabled();
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const savedEmail = store.getState().user.email;
    expect(savedEmail).toEqual('andre@andre.com');
  });
});
