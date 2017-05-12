'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  content: _react.PropTypes.element,
  contentRef: _react.PropTypes.func,
  target: _react.PropTypes.element,
  targetRef: _react.PropTypes.func,
  parentId: _react.PropTypes.string,
  placement: _react.PropTypes.string
};

var defaultProps = {
  target: undefined,
  targetRef: undefined,
  popupFrame: undefined,
  parentId: undefined,
  placement: 'bottom-start'
};

var PopperLoader = function (_React$Component) {
  _inherits(PopperLoader, _React$Component);

  function PopperLoader(props) {
    _classCallCheck(this, PopperLoader);

    var _this = _possibleConstructorReturn(this, (PopperLoader.__proto__ || Object.getPrototypeOf(PopperLoader)).call(this, props));

    _this.state = { data: { offsets: { popper: { top: 0, left: 0 } } } };
    return _this;
  }

  _createClass(PopperLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.targetNode = this.props.targetRef;
      this.popupFrameNode = this.props.contentRef;
      this.updatePopper();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updatePopper();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyPopper();
    }
  }, {
    key: 'destroyPopper',
    value: function destroyPopper() {
      if (this.elementParentNode) {
        this.elementParentNode.removeChild(this.popupFrameNode);
      }

      if (this.popper) {
        this.popper.destroy();
      }

      this.elementParentNode = null;
      this.popper = null;
    }
  }, {
    key: 'updatePopper',
    value: function updatePopper() {
      var _this2 = this;

      var content = this.props.content;


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

      _reactDom2.default.unstable_renderSubtreeIntoContainer(this, content, this.elementParentNode, function () {
        _this2.createPopper();
      });
    }
  }, {
    key: 'createPopper',
    value: function createPopper() {
      var boundingElement = document.getElementById(this.props.parentId) || 'scrollParent';

      var configuration = {
        placement: 'bottom-start',
        modifiers: {
          preventOverflow: {
            boundariesElement: boundingElement
          }
        }
      };

      // create a new popper.js instance
      this.popper = new _popper2.default(this.targetNode(), this.popupFrameNode(), configuration);
      // schedule the first update after the component has been fully rendered
      window.requestAnimationFrame(function () {
        popper.update();
      });
      // on each popper.js update, update the state
      popper.onUpdate(function (data) {
        this.setState({ data: data });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var css = {
        transform: 'translate3d(' + this.state.data.offsets.popper.left + 'px, ' + this.state.data.offsets.popper.top + 'px, 0)',
        position: 'absolute',
        top: 0,
        left: 0
      };

      return this.props.target;
    }
  }]);

  return PopperLoader;
}(_react2.default.Component);

PopperLoader.propTypes = propTypes;
PopperLoader.defaultProps = defaultProps;

exports.default = PopperLoader;