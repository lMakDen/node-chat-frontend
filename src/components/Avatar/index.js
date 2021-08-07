import React from 'react'
import PropTypes from 'prop-types'
import {generateAvatarFromHash} from "../../utils/helpers"

import './Avatar.scss'

const Avatar = props => {
  let {user} = props;
  if (!user) {
    return null
  }
  if (user && user.avatar) {
    return <img src={user.avatar} alt={`${user.fullName} avatar`}/>
  } else {
    const {color, colorLighten} = generateAvatarFromHash(user && user._id);
    const firstChar = user && user.fullName[0].toUpperCase();

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
};

Avatar.propTypes = {
  className: PropTypes.string
}

export default Avatar