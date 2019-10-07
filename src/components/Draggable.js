import React from 'react';
import './Draggable.css';
var selected = null, // Object of the element to be moved
  x_pos = 0,
  y_pos = 0, // Stores x & y coordinates of the mouse pointer
  x_elem = 0,
  y_elem = 0; // Stores top, left values (edge) of the element

function draggable(onStartDragging, onStopDragging) {
  let elem = document.getElementById('dragable');
  if (elem)
    elem.onmousedown = function() {
      _drag_init(this);
      return false;
    };
  document.onmousemove = e => {
    onStartDragging();
    _move_elem(e);
  };
  document.onmouseup = e => {
    onStopDragging();
    _destroy(e);
  };
}

// Will be called when user starts dragging an element
function _drag_init(elem) {
  // Store the object of the element which needs to be moved
  selected = elem;
  x_elem = x_pos - selected.offsetLeft;
  y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
  x_pos = document.all ? window.event.clientX : e.pageX;
  y_pos = document.all ? window.event.clientY : e.pageY;
  if (selected !== null) {
    selected.style.left = x_pos - x_elem + 'px';
    selected.style.top = y_pos - y_elem + 'px';
  }
}

// Destroy the object when we are done
function _destroy() {
  selected = null;
}

function startDraggable(onStartDragging, onStopDragging) {
  setTimeout(() => {
    draggable(onStartDragging, onStopDragging);
  }, 2000);
}

/**
 * Draggeble
 */
export default class Draggable extends React.Component {
  state = {
    isZoom: false
  };
  componentDidMount() {
    const { onStartDragging, onStopDragging, isDraggable } = this.props;

    if (isDraggable) {
      startDraggable(onStartDragging, onStopDragging);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isZoom !== this.state.isZoom) {
      if (!nextProps.isZoom) {
        let elem = document.getElementById('dragable');
        elem.style = null;
      }
      this.setState({
        isZoom: nextProps.isZoom
      });
    }
  }
  componentWillUnmount() {
    document.onmouseup = null; //("onmouseup", onmouseup)
    document.onmousemove = null; //("onmousemove", onmousemove)
  }
  render() {
    return (
      <div id="dragable" className="dragable" style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
