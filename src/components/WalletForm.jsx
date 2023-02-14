import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { startFetchCurrency, startFetchRate } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startFetchCurrency(this.state));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  submitExpenses = () => {
    const { dispatch } = this.props;
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
    dispatch(startFetchRate(this.state));
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
        <label htmlFor="value-a">
          Valor:
          <input
            type="text"
            id="value-a"
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
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  dispatch: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
