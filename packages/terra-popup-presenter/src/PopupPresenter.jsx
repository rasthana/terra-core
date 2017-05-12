import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom'
import onClickOutside from 'react-onclickoutside'
import PopupFrame from './PopupFrame'
import TetherComponent from './TetherComponent'
import PopperLoader from './PopperLoader'
import { Manager, Target, Popper, Arrow } from 'react-popper'
import './PopupPresenter.scss';

const propTypes = {
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  content: PropTypes.element,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  target: PropTypes.element.isRequired,
  targetRef: PropTypes.func,
};

const defaultProps = {
  isOpen: false,
};

const WrappedPopupFrame = onClickOutside(PopupFrame);

class PopupPresenter extends React.Component {

  constructor(props) {
    super(props);
    this.setContentNode = this.setContentNode.bind(this);
  }

  setContentNode(node) {
    if (node === null) { return; } // Ref callbacks happen on mount and unmount, element will be null on unmount
    this.contentNode = node;
  }

  render () {
    const {
      closeOnEsc,
      closeOnOutsideClick,
      content,
      isOpen,
      onRequestClose,
      target,
      targetRef,
      ...customProps 
    } = this.props; // eslint-disable-line no-unused-vars

    let wrappedContent;
    if (isOpen && content) {
      const frameProps = {
        closeOnEsc,
        closeOnOutsideClick,
        onRequestClose,
        showArrow: false,
        ref: this.setContentNode,
      };

      wrappedContent = (
        <WrappedPopupFrame {...frameProps}>
          {content}
        </WrappedPopupFrame>
      );
    }

    const contentRef = () => {
      return this.contentNode;
    };

    const popperOptions = {
      content: wrappedContent,
      contentRef,
      target,
      targetRef,
      isOpen,
    };
    
    return <PopperLoader {...popperOptions} />;
  }
}

PopupPresenter.propTypes = propTypes;
PopupPresenter.defaultProps = defaultProps;

export default PopupPresenter;
