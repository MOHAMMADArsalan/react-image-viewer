import React, { Component } from 'react';
import './ImageViewer.css';
import ImageViewer from './ImageViewer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    };
  }

  onHide = () => {
    this.setState({
      isActive: false
    });
  };

  onShow = () => {
    this.setState({
      isActive: true
    });
  };
  render() {
    const { isActive } = this.state;
    return (
      <div>
        <button onClick={this.onShow}>show</button>
        <ImageViewer
          isActive={isActive}
          onHide={this.onHide}
          isDraggable={true}
          images={[
            'http://www.pakistan.gov.pk/images/Pakistan_day2.jpg',
            'http://www.pakistan.gov.pk/images/Pakistan_day2.jpg'
          ]}
        />
      </div>
    );
  }
}

export default App;
