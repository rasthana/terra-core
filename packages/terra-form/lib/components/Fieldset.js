'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('terra-base/lib/baseStyles');

require('./Field.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable react/jsx-boolean-value, jsx-a11y/label-has-for */


var propTypes = {
  /**
   * Children the Field contains
   */
  children: _propTypes2.default.node,
  /**
   * Error message for when the input is invalid
   */
  error: _propTypes2.default.node,
  /**
   * Help element to display with the input
   */
  help: _propTypes2.default.node,
  /**
   * The value for the htmlFor property on the label
   */
  htmlFor: _propTypes2.default.string,
  /**
   * Determines whether the field in an inline field
   */
  isInline: _propTypes2.default.bool,
  /**
   * Legend for the input group
   */
  legend: _propTypes2.default.string
};

var defaultProps = {
  children: null,
  error: null,
  help: null,
  htmlFor: null,
  isInline: false,
  legend: null
};

var Fieldset = function Fieldset(_ref) {
  var children = _ref.children,
      error = _ref.error,
      help = _ref.help,
      htmlFor = _ref.htmlFor,
      isInline = _ref.isInline,
      legend = _ref.legend,
      customProps = _objectWithoutProperties(_ref, ['children', 'error', 'help', 'htmlFor', 'isInline', 'legend']);

  var fieldsetClasses = (0, _classnames2.default)('terra-Form-field', { 'terra-Form-field--inline': isInline }, customProps.className);

  return _react2.default.createElement(
    'fieldset',
    _extends({}, customProps, { className: fieldsetClasses }),
    legend && _react2.default.createElement(
      'legend',
      { className: 'terra-Form-legend' },
      legend
    ),
    children,
    help && _react2.default.createElement(
      'small',
      { className: 'terra-Form-helpText' },
      help
    ),
    error && _react2.default.createElement(
      'small',
      { className: 'terra-Form-error', tabIndex: '-1' },
      error
    )
  );
};

Fieldset.propTypes = propTypes;
Fieldset.defaultProps = defaultProps;

exports.default = Fieldset;