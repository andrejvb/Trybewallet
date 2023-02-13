import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  somValue = (expenses) => {
    if (expenses.length > 0) {
      const total = expenses.reduce(
        (acc, prev) => acc
        + Number(prev.value) * Number(prev.exchangeRates[prev.currency].ask),
        0,
      );
      return total.toFixed(2);
    }
    return 0;
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{this.somValue(expenses)}</p>
        <h5 data-testid="header-currency-field">BRL</h5>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    }),
  ).isRequired,
};
export default connect(mapStateToProps)(Header);
