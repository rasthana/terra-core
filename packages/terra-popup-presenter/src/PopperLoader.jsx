import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  targetRef: PropTypes.func,
  popupFrameRef: PropTypes.func,
  parentId: PropTypes.string,
  placement: PropTypes.string,
};

const defaultProps = {
  targetRef: undefined,
  popupFrameRef: undefined,
  parentId: undefined,
  placement: 'bottom-start',
};


class PopperLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: { offsets: { popper: { top: 0, left: 0 } } } };
  }

  // componentDidMount() {
  //   this._targetNode = ReactDOM.findDOMNode(this);
  //   this._update();
  // }

  // componentWillUnmount() {
  //   this._destroy();
  // }

  componentDidMount() {
    const boundingElement = document.getElementById(this.props.parentId) || scrollParent;

    const configuration = {
      placement: 'bottom-start',
      modifiers: {
        preventOverflow: {
            boundariesElement: boundingElement,
        },
      },
    };

    // create a new popper.js instance
    const popper = new Popper(
      this.props.targetRef,
      this.refs.popupFrameRef,
      configuration,
    );
    // schedule the first update after the component has been fully rendered
    window.requestAnimationFrame(function() {
      popper.update();
    });
    // on each popper.js update, update the state
    popper.onUpdate(function(data) {
      _this.setState({data: data});
    });
  }

  render() {
    const css = {
      transform: 'translate3d(' + this.state.data.offsets.popper.left + 'px, ' + this.state.data.offsets.popper.top + 'px, 0)',
      position: 'absolute',
      top: 0,
      left: 0
    }
    return <div>
      <this.props.popper ref="popper" text="pop" style={css}/>
      <this.props.reference ref="reference" text="ref"/>
    </div>;
  }
}

PopperLoader.propTypes = propTypes;
PopperLoader.defaultProps = defaultProps;

export default PopperLoader;
