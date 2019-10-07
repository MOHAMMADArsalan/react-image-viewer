import React from 'react';
import { PlusIcon, Minimize, MinusIcon } from '../Icons';

const ZoomSlider = ({
  scale,
  isZoom,
  zoomOut,
  onChangeSlider,
  zoomIn,
  zoomReset
}) => {
  return (
    <div className="zoom-control">
      <span alt="Plus icon" className="zoom-icon icon" onClick={zoomOut}>
        <MinusIcon fill="#fff" />
      </span>
      <input
        type="range"
        className="p-zoom__slider"
        max="2"
        min="0.5"
        step="0.1"
        delay="150"
        onChange={onChangeSlider}
        value={scale}
      />

      <span alt="Plus icon" className="zoom-icon icon" onClick={zoomIn}>
        <PlusIcon fill="#fff" />
      </span>
      {isZoom && (
        <span alt="Plus icon" className="zoom-icon icon" onClick={zoomReset}>
          <Minimize />
        </span>
      )}
    </div>
  );
};

export default ZoomSlider;
