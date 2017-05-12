import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PopupArrow from './PopupArrow'
import './PopupFrame.scss';

const arrowAlignments = [
  'Start',
  'Center',
  'End',
];

const arrowPositions = [
  'Top',
  'Bottom',
  'Start',
  'End',
];

const KEYCODES = {
  ESCAPE: 27,
};

const propTypes = {
  /**
   * The child elements passed to the component.
   */
  children: PropTypes.node,
  /**
   * Whether or not the using the escape key should also trigger the onClickOutside event.
   */
  closeOnEsc: PropTypes.bool,
  /**
   * Whether or not the using the escape key should also trigger the onClickOutside event.
   */
  closeOnOutsideClick: PropTypes.bool,
  /**
   * The function that should be triggered when a close is indicated.
   */
  onRequestClose: PropTypes.func,
  /**
   * The function that should be triggered when a close is indicated.
   */
  arrowAlignment: PropTypes.oneOf(arrowAlignments),
  /**
   * The function that should be triggered when a close is indicated.
   */
  arrowPosition: PropTypes.oneOf(arrowPositions),
  showArrow: PropTypes.bool,
  arrowPxOffset: PropTypes.number,
};

const defaultProps = {
  children: [],
  closeOnEsc: true,
  closeOnOutsideClick: true,
  onRequestClose: undefined,
  arrowAlignment: 'Center',
  arrowPosition: 'Top',
  showArrow: true,
};

class PopupFrame extends React.Component {
  static spacerFromOffset(offset, position) {
    const styleOffset = {};
    if (['Top','Bottom'].indexOf(position) >= 0) {
      styleOffset.width = offset.toString();
      styleOffset.maxWidth = 'calc(100% - 30px)';
    } else {
      styleOffset.height = offset.toString();
      styleOffset.maxHeight = 'calc(100% - 30px)';
    }
    return <div className="terra-PopupFrame-spacer" style={styleOffset} />;
  }

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  handleClickOutside(event) {
    if (this.props.closeOnOutsideClick && this.props.onRequestClose) {
      this.props.onRequestClose(event);
    }
  }

  handleKeydown(event) {
    if (event.keyCode === KEYCODES.ESCAPE && this.props.onRequestClose) {
      this.props.onRequestClose(event);
    }
  }

  render() {
    const { 
      children,
      closeOnEsc,
      closeOnOutsideClick,
      onRequestClose,
      enableOnClickOutside,
      disableOnClickOutside,
      arrowAlignment,
      arrowPosition,
      showArrow,
      arrowPxOffset,
      ...customProps,
    } = this.props;

    const frameClassNames = classNames([
      'terra-PopupFrame',
      { [`terra-PopupFrame--arrow${arrowPosition}`]: arrowPosition },
      customProps.className,
    ]);

    const arrowClassNames = classNames([
      'terra-PopupFrame-arrow',
      { [`terra-PopupFrame-arrow--align${arrowAlignment}`]: arrowAlignment },
    ]);

    let arrow;
    if (showArrow) {
      let offset = arrowPxOffset;
      if (arrowAlignment === 'Center') {
        offset *= 2;
      }

      arrow = (
        <div className={arrowClassNames}>
          {<PopupArrow position={arrowPosition} offset={offset} />}
        </div>
      );
    }

    return (
      <div {...customProps} className={frameClassNames}>
        {arrow}
        <div className="terra-PopupFrame-content">
          {children}
        </div>
      </div>
    );
  }
}

PopupFrame.propTypes = propTypes;
PopupFrame.defaultProps = defaultProps;

export default PopupFrame;
