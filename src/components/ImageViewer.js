import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageViewer.css';
import { calculateAspectRatioFit } from '../utils/helper';
import { PreviousIcon, NextIcon, ZoomSlider, Draggable, CloseIcon } from '.';

// ImageViewer
class ImageViewer extends Component {
  unmount = false;
  constructor(props) {
    super(props);
    this.state = {
      scale: 0.5,
      scaleY: 0.5,
      initialScale: 0.4,
      isZoom: false,
      currentImage: props.activePhotoIndex,
      style: {},
      isDragging: false
    };
  }
  componentDidMount() {
    this.imageOrientation();
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  // Check image aspect ratio and fix width and height
  imageOrientation() {
    let { currentImage } = this.state;
    const { images, maxHeight, maxWidth } = this.props;
    var scaleY = 0.5,
      img = new Image(),
      scale = 0.5;
    img.src = images[currentImage];

    img.onload = () => {
      const { width, height } = calculateAspectRatioFit(
        img.naturalWidth,
        img.naturalHeight,
        maxWidth,
        maxHeight
      );
      img.width = width;
      img.height = height;
      if (img.naturalWidth < img.naturalHeight) {
        scaleY = 0.23;
        scale = 0.3;
      }
      this.setState({
        scaleY: scaleY,
        scale,
        isZoom: false,
        initialScale: scale
      });
    };
  }

  // call when user start dragging image
  onStartDragging = () => {
    if (this.unmount) {
      return;
    }
    this.setState({
      isDragging: true
    });
  };

  // call when user stop dragging image

  onStopDragging = () => {
    if (this.unmount) {
      return;
    }
    this.setState({
      isDragging: false
    });
  };

  // show previous image
  showPreviousImage = e => {
    e.stopPropagation();

    if (this.state.currentImage === 0) {
      this.setState({
        currentImage: this.props.images.length - 1
      });
    } else {
      this.setState({
        currentImage: this.state.currentImage - 1
      });
    }
    this.zoomReset();
  };

  // show next image
  showNextImage = e => {
    e.stopPropagation();

    if (this.state.currentImage === this.props.images.length - 1) {
      this.setState({
        currentImage: 0
      });
    } else {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    }
    this.zoomReset();
  };

  // reset image zoom and fix image aspect ratio
  zoomReset = e => {
    if (e) {
      e.stopPropagation();
    }

    this.setState(
      {
        isZoom: false
      },
      () => this.imageOrientation()
    );
  };

  // call when click on image zoom in
  zoomIn = e => {
    e.persist();
    e.stopPropagation();
    if (this.state.scale >= 2 || this.state.isDragging) {
      return;
    }
    this.setState(prevState => ({
      scale: prevState.scale ? prevState.scale + 0.2 : 0.5,
      scaleY: prevState.scaleY + 0.2,
      isZoom: true
    }));
  };

  // call when click on image zoom out

  zoomOut = e => {
    e.stopPropagation();

    if (this.state.scale <= 0.4) {
      return;
    }
    this.setState(prevState => ({
      scale: prevState.scale - 0.2,
      scaleY: prevState.scaleY - 0.2,

      isZoom: true
    }));
  };

  // call when user change zoom by slider
  onChangeSlider = e => {
    e.stopPropagation();

    this.setState({
      scale: parseFloat(e.target.value),
      scaleY: parseFloat(e.target.value),
      isZoom: true
    });
  };

  render() {
    const { scale, isZoom, currentImage, scaleY, initialScale } = this.state;
    const { images, isActive, onHide, isDraggable} = this.props;
    let _style = {
      transform: `scale(${scale},${scaleY})`,
      cursor: scale >= 2 ? 'zoom-out' : 'zoom-in'
    };
    if (!isActive || !images || !images.length) {
      return null;
    }
    return (
      <div className="viewer">
        <div className="image-preview-container">
          <div className="p-image_viewer">
            <CloseIcon onHide={onHide} />
            {images.length > 1 && (
              <div className="image-change-container">
                {currentImage > 0 && (
                  <PreviousIcon onClick={this.showPreviousImage} />
                )}
                {images.length - 1 !== currentImage && (
                  <NextIcon onClick={this.showNextImage} />
                )}
              </div>
            )}
            <Draggable
              isDraggable={isDraggable}
              onStartDragging={this.onStartDragging}
              onStopDragging={this.onStopDragging}
              isZoom={isZoom}
            >
              <img
                src={images[currentImage]}
                alt=""
                className="p-image_viewer__image"
                ref={this.imagePreview}
                style={_style}
                onClick={
                  scale === 2
                    ? this.zoomReset
                    : e => this.zoomIn(e, 'imageClick')
                }
              />
            </Draggable>
            <ZoomSlider
              scale={scale}
              isZoom={isZoom}
              onChangeSlider={this.onChangeSlider}
              zoomIn={this.zoomIn}
              zoomOut={this.zoomOut}
              zoomReset={this.zoomReset}
              initialScale={initialScale}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Set default props
ImageViewer.defaultProps = {
  images: [],
  onHide: function(){},
  isActive: false,
  Draggable: false,
  maxWidth: 300,
  maxHeight: 300,
  activePhotoIndex: 0
};
ImageViewer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onHide: PropTypes.func,
  isActive: PropTypes.bool,
  Draggable: PropTypes.bool,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  activePhotoIndex: PropTypes.number
};

export default ImageViewer;
