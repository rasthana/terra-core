import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Popper from 'popper.js'

const propTypes = {
  content: PropTypes.element,
  contentRef: PropTypes.func,
  target: PropTypes.element,
  targetRef: PropTypes.func,
  parentId: PropTypes.string,
  placement: PropTypes.string,
};

const defaultProps = {
  target: undefined,
  targetRef: undefined,
  popupFrame: undefined,
  parentId: undefined,
  placement: 'bottom-start',
};


class PopperLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { offsets: { popper: { top: 0, left: 0 } } } };
  }

  componentDidMount() {
    this.targetNode = this.props.targetRef;
    this.popupFrameNode = this.props.contentRef;
    this.updatePopper();
  }

  componentDidUpdate() {
    this.updatePopper();
  }

  componentWillUnmount() {
    this.destroyPopper();
  }

  destroyPopper() {
    if (this.elementParentNode) {
      this.elementParentNode.removeChild(this.popupFrameNode);
    }

    if (this.popper) {
      this.popper.destroy();
    }

    this.elementParentNode = null;
    this.popper = null;
  }

  updatePopper() {
    const { content } = this.props;

    if (!content) {
      if (this.popper) {
        this.destroyPopper();
      }
      return;
    }
    
    if (!this.elementParentNode) {
      this.elementParentNode = document.createElement('div');
      document.body.appendChild(this.elementParentNode);
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this, content, this.elementParentNode, () => {
        this.createPopper();
      }
    )
  }

  createPopper() {
    const boundingElement = document.getElementById(this.props.parentId) || 'scrollParent';

    const configuration = {
      placement: 'bottom-start',
      modifiers: {
        preventOverflow: {
            boundariesElement: boundingElement,
        },
      },
    };

    // create a new popper.js instance
    this.popper = new Popper(
      this.targetNode(),
      this.popupFrameNode(),
      configuration,
    );
    // schedule the first update after the component has been fully rendered
    window.requestAnimationFrame(function() {
      popper.update();
    });
    // on each popper.js update, update the state
    popper.onUpdate(function(data) {
      this.setState({data: data});
    });
  }

  render() {
    const css = {
      transform: 'translate3d(' + this.state.data.offsets.popper.left + 'px, ' + this.state.data.offsets.popper.top + 'px, 0)',
      position: 'absolute',
      top: 0,
      left: 0
    }
  
    return this.props.target;
  }
}

PopperLoader.propTypes = propTypes;
PopperLoader.defaultProps = defaultProps;

export default PopperLoader;
