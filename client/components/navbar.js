import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import { Menu, Icon } from 'semantic-ui-react';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Menu inverted={true}>
      <Menu.Item as={Link} to="/" name="home" >
          Scrum Life
        </Menu.Item>

        <Menu.Menu position="right">

        {!this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/signup" name="signup">
            Sign Up
          </Menu.Item>
        }

        {!this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/login" name="login">
            Login
          </Menu.Item>
        }

        {this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/profile" name="profile">
            Profile
          </Menu.Item>
        }

        {this.props.isLoggedIn &&
        <Menu.Item as={Link} to="/login" name="logout" onClick={this.props.handleClick}>
          Logout
        </Menu.Item>
        }
        </Menu.Menu>
      </Menu>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
