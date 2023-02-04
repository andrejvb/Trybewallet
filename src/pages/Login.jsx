import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationInputs);
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  validationInputs = () => {
    const { email, password } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const emailValid = regex.test(email);
    const min = 6;
    this.setState({
      disable: !(emailValid && password.length >= min),
    });
  };

  render() {
    const { password, email, disable } = this.state;
    return (
      <form className="Formlogin">
        <label htmlFor="userName" className="user">
          Email
          <input
            id="userName"
            type="text"
            data-testid="email-input"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
        </label>
        <label htmlFor="userPassword" className="user">
          Senha
          <input
            id="userPassword"
            type="text"
            data-testid="password-input"
            onChange={ this.handleChange }
            name="password"
            value={ password }
          />
        </label>
        <button
          disabled={ disable }
          type="button"
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
