import React from 'react';
import { Icon } from '.';
import { LeftArrow } from '../Icons';
const PreviousIcon = ({ onClick }) => {
  return (
    <div className="previousIcon change-image-icon-wrapper" onClick={onClick}>
      <Icon>
        <LeftArrow />
      </Icon>
    </div>
  );
};

export default PreviousIcon;
