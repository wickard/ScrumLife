import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button } from 'semantic-ui-react';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="authContainer">
      <div id="authForm">
        <div id="authFields">
        <h1>Scrum Life</h1>
        <form onSubmit={handleSubmit} name={name}>
        <div id="form-inputs">
          <div className="inputs">
            <input name="email" placeholder="Email" type="text" />
          </div>
          <div className="inputs">
            <input name="password" placeholder="Password" type="password" />
          </div>
          <div className="inputs">
            <Button type="submit" fluid color="instagram" > {displayName} </Button>
          </div>
          <div className="inputs">
            <Button href="/auth/google" fluid color="google plus" >{displayName} with Google</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
