import * as React from 'react';


function SVGWrap({
  size,
  children,
  viewBox,
}) {
  size = size || 15;
  viewBox = viewBox || "0 0 15 15"
  return (
    <svg width={`${size}px`} height={`${size}px`} viewBox={viewBox} version="1.1">
      {children}
    </svg>
  );
}

export default SVGWrap;
