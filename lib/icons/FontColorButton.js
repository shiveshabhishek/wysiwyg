'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FontColorButton = function (_React$PureComponent) {
  _inherits(FontColorButton, _React$PureComponent);

  function FontColorButton() {
    _classCallCheck(this, FontColorButton);

    return _possibleConstructorReturn(this, (FontColorButton.__proto__ || Object.getPrototypeOf(FontColorButton)).apply(this, arguments));
  }

  _createClass(FontColorButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'font-color',
        pathNode: _react2.default.createElement('path', { d: 'M0,1.99508929 C0,0.893231902 0.892622799,0 1.99508929,0 L16.0049107,0 C17.1067681,0 18,0.892622799 18,1.99508929 L18,16.0049107 C18,17.1067681 17.1073772,18 16.0049107,18 L1.99508929,18 C0.893231902,18 0,17.1073772 0,16.0049107 L0,1.99508929 Z M6.61474609,14.612793 C7.63851423,14.562988 8.54329034,14.5380859 9.32910156,14.5380859 C10.0651078,14.5380859 10.969884,14.562988 12.043457,14.612793 L12.043457,13.9321289 C11.3793912,13.9099934 10.9837246,13.8643395 10.8564453,13.795166 C10.729166,13.7259925 10.646159,13.6194669 10.6074219,13.4755859 C10.5465492,13.2320951 10.5161133,12.5127013 10.5161133,11.3173828 L10.5161133,6.34521484 C10.5161133,5.02261708 10.524414,4.26448665 10.5410156,4.07080078 L11.7280273,4.07080078 C12.3644238,4.07080078 12.9095029,4.09293598 13.3632812,4.13720703 C13.5071622,4.14827479 13.595703,4.16764309 13.6289062,4.1953125 C13.6676434,4.23404967 13.7036131,4.35302635 13.7368164,4.55224609 C13.7976891,4.9451517 13.8336588,5.35741972 13.8447266,5.7890625 L14.5336914,5.7890625 C14.5502931,4.62141343 14.5613606,4.01546246 14.5668945,3.97119141 C14.5779623,3.71663284 14.6083982,3.4205746 14.6582031,3.08300781 L14.5751953,3 C14.3151029,3.02766941 14.0577812,3.04703771 13.8032227,3.05810547 C13.3328427,3.07470711 12.4003976,3.08300781 11.0058594,3.08300781 L7.65234375,3.08300781 C6.2965427,3.08300781 5.38069899,3.07470711 4.90478516,3.05810547 C4.61148942,3.04703771 4.33479948,3.02766941 4.07470703,3 L4,3.08300781 C4.03873717,3.36523579 4.06640617,3.62809123 4.08300781,3.87158203 C4.08854169,4.01546296 4.10237619,4.65461672 4.12451172,5.7890625 L4.81347656,5.7890625 C4.82454433,5.30761478 4.86604782,4.87321157 4.93798828,4.48583984 C4.96565769,4.32535727 4.99886048,4.22851579 5.03759766,4.1953125 C5.06526707,4.16764309 5.17040924,4.1455079 5.35302734,4.12890625 C5.80680565,4.09016908 6.33251654,4.07080078 6.93017578,4.07080078 L8.1171875,4.07080078 C8.13378915,4.23128335 8.14208984,4.98941379 8.14208984,6.34521484 L8.14208984,11.3173828 C8.14208984,12.5127013 8.11165395,13.2293282 8.05078125,13.4672852 C8.0065102,13.6222338 7.92211976,13.7329098 7.79760742,13.7993164 C7.67309508,13.865723 7.27881191,13.9099934 6.61474609,13.9321289 L6.61474609,14.612793 Z' }),
        viewBox: '0 0 18 18'
      }, this.props));
    }
  }]);

  return FontColorButton;
}(_react2.default.PureComponent);

exports.default = FontColorButton;