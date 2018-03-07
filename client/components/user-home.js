import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div className="flex" id="home">
        <div className="Column"> <h1>Goals</h1> <hr width="70%" />
          <div className="cardholder">
            <div className="card"></div>
          </div>
        </div>
        <div className="Column"> <h1>Not Started</h1> <hr width="70%" /> </div>
        <div className="Column"> <h1>In Progress</h1> <hr width="70%" /> </div>
        <div className="Column"> <h1>Done</h1> <hr width="70%" /> </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
