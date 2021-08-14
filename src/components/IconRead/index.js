import React from 'react'
import PropTypes from 'prop-types'
import isReadIcon from '../../assets/img/isRead.svg'
import noReadIcon from '../../assets/img/noRead.svg'

import './IconRead.scss'

const IconRead = ({ isRead }) => {
  return <img
    src={isRead ? isReadIcon : noReadIcon}
    alt="read"
    className="message__icon--read"
  />
}

IconRead.propTypes = {
  isRead: PropTypes.bool
}

export default IconRead