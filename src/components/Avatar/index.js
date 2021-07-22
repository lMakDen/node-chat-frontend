import React from 'react'
import PropTypes from 'prop-types'
import { generateAvatarFromHash } from "../../utils/helpers"

import './Avatar.scss'

const Avatar = ({ user }) => {
  if( user.avatar ){
    return <img src={user.avatar} alt={`${user.fullName} avatar`}/>
  } else {
    const { color, colorLighten } = generateAvatarFromHash(user._id);
    debugger
    const firstChar = user.fullName[0].toUpperCase();
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
        }}
        className="avatar avatar--symbol"
      >
        {firstChar}
      </div>
    );
  }
}

Avatar.propTypes = {
  className: PropTypes.string
}

export default Avatar