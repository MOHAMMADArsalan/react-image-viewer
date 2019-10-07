import React from 'react';
import { Icon } from '.';
import { CloseIcon } from '../Icons';
const Close = ({ onHide }) => {
  return (
    <div className="closeIcon" onClick={onHide}>
      <Icon>
        <CloseIcon fill="#fff" />
      </Icon>
    </div>
  );
};

export default Close;
