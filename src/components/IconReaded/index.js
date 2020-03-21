import React from 'react'
import PropTypes from 'prop-types'
import readed from '../../assets/img/readed.svg'
import noreaded from '../../assets/img/noreaded.svg'

import './IconReaded.scss'

const IconReaded = ({ isMe, isReaded }) => {
  return isMe ? <img
    src={isReaded ? readed : noreaded}
    alt="readed"
    className="message__icon--readed"
  /> : null
}

IconReaded.propTypes = {
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool
}

export default IconReaded