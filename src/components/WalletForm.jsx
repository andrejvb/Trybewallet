import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';
import { saveCurrency } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const coins = Object.keys(await fetchCurrency());
    dispatch(saveCurrency(coins));
  }

  render() {
    const { currency } = this.props;

    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categori = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="text" id="value" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" id="description" data-testid="description-input" />
        </label>
        <select data-testid="currency-input">
          Moeda:
          { currency.map((coin) => (
            <option key={ coin } value={ coin }>
              { coin }
            </option>
          ))}
        </select>
        <select data-testid="method-input">
          Metodo:
          { method.map((metodo) => (
            <option key={ metodo } value={ metodo }>
              { metodo }
            </option>
          ))}
        </select>
        <select data-testid="tag-input">
          Categoria:
          {categori.map((categoria) => (
            <option key={ categoria } value={ categoria }>
              {categoria}
            </option>
          ))}
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
