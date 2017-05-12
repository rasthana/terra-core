import React from 'react';
import PopupPresenter from 'terra-popup-presenter';
import Button from 'terra-button';

class DummyApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setTargetNode = this.setTargetNode.bind(this);
    this.state = {open: false};
  }

  handleButtonClick(event) {
    this.setState({open: true});
  }

  handleRequestClose(event) {
    this.setState({open: false});
  }

  setTargetNode(node) {
    if (node === null) { return; } // Ref callbacks happen on mount and unmount, element will be null on unmount
    this.targetNode = node;
  }

  render() {
    const contentSection = <p style={{height: '200px', width: '200px'}}>i'm popup content, hear me roar!</p>;

    const targetRef = () => {
      return this.targetNode;
    };

    return (
      <PopupPresenter 
        content={contentSection}
        isOpen={this.state.open}
        showArrow
        target={<Button text="popup button launcher" onClick={this.handleButtonClick} ref={this.setTargetNode} />}
        targetRef={targetRef}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

export default DummyApp;

