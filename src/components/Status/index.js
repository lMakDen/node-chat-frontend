import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Status.scss'

const Status = ({ online, fullName }) => {
  return <div className="chat__dialog-header-center">
    <b className="chat__dialog-header-username">{ fullName }</b>
    <div className="chat__dialog-header-status">
      <span className={classNames('status', { 'status status--online': online })}>
        {online ? 'онлайн' : 'офлайн'}
      </span>
    </div>
  </div>
}

Status.propTypes = {
  online: PropTypes.bool,
}

export default Status