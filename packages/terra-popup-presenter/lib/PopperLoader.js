'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  targetRef: _react.PropTypes.func,
  popupFrameRef: _react.PropTypes.func,
  parentId: _react.PropTypes.string,
  placement: _react.PropTypes.string
};

var defaultProps = {
  targetRef: undefined,
  popupFrameRef: undefined,
  parentId: undefined,
  placement: 'bottom-start'
};

var PopperLoader = function (_React$Component) {
  _inherits(PopperLoader, _React$Component);

  function PopperLoader(props) {
    _classCallCheck(this, PopperLoader);

    var _this2 = _possibleConstructorReturn(this, (PopperLoader.__proto__ || Object.getPrototypeOf(PopperLoader)).call(this, props));

    _this2.state = { data: { offsets: { popper: { top: 0, left: 0 } } } };
    return _this2;
  }

  // componentDidMount() {
  //   this._targetNode = ReactDOM.findDOMNode(this);
  //   this._update();
  // }

  // componentWillUnmount() {
  //   this._destroy();
  // }

  _createClass(PopperLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var boundingElement = document.getElementById(this.props.parentId) || scrollParent;

      var configuration = {
        placement: 'bottom-start',
        modifiers: {
          preventOverflow: {
            boundariesElement: boundingElement
          }
        }
      };

      // create a new popper.js instance
      var popper = new Popper(this.props.targetRef, this.refs.popupFrameRef, configuration);
      // schedule the first update after the component has been fully rendered
      window.requestAnimationFrame(function () {
        popper.update();
      });
      // on each popper.js update, update the state
      popper.onUpdate(function (data) {
        _this.setState({ data: data });
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
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(this.props.popper, { ref: 'popper', text: 'pop', style: css }),
        _react2.default.createElement(this.props.reference, { ref: 'reference', text: 'ref' })
      );
    }
  }]);

  return PopperLoader;
}(_react2.default.Component);

PopperLoader.propTypes = propTypes;
PopperLoader.defaultProps = defaultProps;

exports.default = PopperLoader;