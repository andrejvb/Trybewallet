import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';
import { saveCurrency } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const coins = Object.keys(await fetchCurrency());
    dispatch(saveCurrency(coins));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  submitExpenses = () => {
    const { dispatch } = this.props;
    dispatch(...this.state);
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categori = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          Moeda:
          { currencies.map((coin) => (
            <option key={ coin } value={ coin }>
              { coin }
            </option>
          ))}
        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          Metodo:
          { methods.map((metodo) => (
            <option key={ metodo } value={ metodo }>
              { metodo }
            </option>
          ))}
        </select>
        <select
          id="tag"
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          Categoria:
          {categori.map((categoria) => (
            <option key={ categoria } value={ categoria }>
              {categoria}
            </option>
          ))}
        </select>
        <button type="button" onClick={ this.submitExpenses }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
