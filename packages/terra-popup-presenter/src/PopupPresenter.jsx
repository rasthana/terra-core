import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom'
import onClickOutside from 'react-onclickoutside'
import PopupFrame from './PopupFrame'
import TetherComponent from './TetherComponent'
import { Manager, Target, Popper, Arrow } from 'react-popper'
import './PopupPresenter.scss';

const propTypes = {
  /**
   * The children list items passed to the component.
   */
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  content: PropTypes.element,
  contentAttachment: PropTypes.oneOf(TetherComponent.attachmentPositions).isRequired,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  renderElementTo: PropTypes.any,
  showArrow: PropTypes.bool,
  target: PropTypes.element.isRequired,
  targetAttachment: PropTypes.oneOf(TetherComponent.attachmentPositions),
};

const defaultProps = {
  isOpen: false,
  showArrow: false,
};

const WrappedPopupFrame = onClickOutside(PopupFrame);

class PopupPresenter extends React.Component {
  static arrowAlignmentFromAttachment(contentAttachment) {
    const parsedAttachment = PopupPresenter.parseStringPosition(contentAttachment);

    if (parsedAttachment.vertical === 'middle' || parsedAttachment.horizontal === 'center') {
      return 'Center';
    } else if (parsedAttachment.horizontal === 'left') {
      return 'Start';
    } else {
      return 'End';
    }
  }

  static arrowPositionFromAttachment(contentAttachment) {
    const parsedAttachment = PopupPresenter.parseStringPosition(contentAttachment);

    if (parsedAttachment.vertical === 'top') {
      return 'Top';
    } else if (parsedAttachment.vertical === 'middle') {
      if (parsedAttachment.horizontal === 'left') {
        return 'Start';
      }
      return 'End';
    } else {
      return 'Bottom';
    }
  }

  static parseOffset(value) {
    const parsedValue = PopupPresenter.parseStringPosition(value);
    return {vertical: parseFloat(parsedValue.vertical), horizontal: parseFloat(parsedValue.horizontal)};
  }

  static parseStringPosition(value) {
    const [vertical, horizontal] = value.split(' ');
    return {vertical, horizontal};
  }

  static shouldDisplayArrow(showArrow, contentAttachment) {
    if (showArrow === true && contentAttachment === 'middle center') {
      return false;
    }
    return showArrow;
  }

  static calculateArrowOffest(position, contentOffset, targetOffset) {
    const parsedContentValue = PopupPresenter.parseOffset(contentOffset); // {verticalPx, horizontalPx}
    const parsedTargetValue = PopupPresenter.parseOffset(targetOffset); // {verticalPx, horizontalPx}

    if (['Top','Bottom'].indexOf(position) >= 0) {
      return parsedContentValue.horizontal + parsedTargetValue.horizontal;
    }
    return parsedContentValue.vertical + parsedTargetValue.vertical;
  }

  static caculateContentOffset(contentAttachment, targetAttachment) {
    return '0 0';
  }

  render () {
    const {
      className, 
      closeOnEsc,
      closeOnOutsideClick,
      content,
      contentAttachment,
      isOpen,
      onRequestClose,
      renderElementTo,
      target,
      targetAttachment,
      showArrow,
      ...customProps 
    } = this.props; // eslint-disable-line no-unused-vars

    let wrappedContent;
    const contentOffset = PopupPresenter.caculateContentOffset(contentAttachment, targetAttachment);
    const constraints = [
      {
        to: 'scrollParent',
        // attachment: 'together',
        pin: true
      },
      {
        to: 'window',
        // attachment: 'together',
        pin: true
      }
    ];

    if (isOpen && content) {
      const arrowAlignment = PopupPresenter.arrowAlignmentFromAttachment(contentAttachment);
      const arrowPosition = PopupPresenter.arrowPositionFromAttachment(contentAttachment);
      const arrowPxOffset = PopupPresenter.calculateArrowOffest(arrowPosition, contentOffset, '0 0');

      const frameProps = {
        className,
        closeOnEsc,
        closeOnOutsideClick,
        onRequestClose,
        arrowAlignment,
        arrowPosition,
        showArrow: PopupPresenter.shouldDisplayArrow(showArrow, contentAttachment),
        arrowPxOffset,
      };

      wrappedContent = (
        <WrappedPopupFrame {...frameProps}>
          {content}
        </WrappedPopupFrame>
      );
    }

    // const tetherOptions = {
    //   contentAttachment,
    //   isEnabled: true,
    //   target,
    // };
    // 
    // //Optional parameters
    // if (wrappedContent) {
    //   tetherOptions.content = wrappedContent;
    // }
    // if (constraints) {
    //   tetherOptions.constraints = constraints;
    // }
    // if (contentOffset) {
    //   tetherOptions.offset = contentOffset;
    // }
    // // if (targetOffset) {
    // //   tetherOptions.targetOffset = targetOffset;
    // // }
    // if (targetAttachment) {
    //   tetherOptions.targetAttachment = targetAttachment;
    // }
    // if (renderElementTo) {
    //   tetherOptions.renderElementTo = renderElementTo;
    // }

    // tetherOptions.classes = {
    //   element: 'terra-PopupPresenter'
    // };

    // //kasper check here if parent node is a modal.... this is going to get messy
    // //Portal or ModalContent
    // return <TetherComponent {...tetherOptions} />;

    const reference = document.querySelector('.my-button');
    const popper = document.querySelector('.my-popper');
    const superPopper = new Popper(reference, popper, {
        onCreate: (data) => {
            // data is an object containing all the informations computed
            // by Popper.js and used to style the popper and its arrow
            // The complete description is available in Popper.js documentation
        },
        onUpdate: (data) => {
            // same as `onCreate` but called on subsequent updates
        }
    });

    return createElement(
      tag,
      {
        ...restProps,
        ref: node => {
          popperRef(node)
          if (typeof innerRef === 'function') {
            innerRef(node)
          }
        },
        style: {
          ...restProps.style,
          ...popperStyle,
        },
        'data-placement': popperPlacement,
      },
      children
    )
  }
}

PopupPresenter.propTypes = propTypes;
PopupPresenter.defaultProps = defaultProps;

export default PopupPresenter;
