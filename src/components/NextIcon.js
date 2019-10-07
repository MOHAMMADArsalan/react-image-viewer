import React from 'react';

import { Icon } from '.';
import { RightArrow } from '../Icons';
const NextIcon = ({ onClick }) => {
  return (
    <div className="nextIcon change-image-icon-wrapper" onClick={onClick}>
      <Icon>
        <RightArrow />
      </Icon>
    </div>
  );
};

export default NextIcon;
