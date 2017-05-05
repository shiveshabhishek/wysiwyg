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

var TextButton = function (_React$Component) {
  _inherits(TextButton, _React$Component);

  function TextButton() {
    _classCallCheck(this, TextButton);

    return _possibleConstructorReturn(this, (TextButton.__proto__ || Object.getPrototypeOf(TextButton)).apply(this, arguments));
  }

  _createClass(TextButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'text_fields',
        pathNode: _react2.default.createElement('path', { d: 'M0.885894243,0.00892858207 L0,0.0178571641 L0,3.4375041 C0.142180558,3.58928999 0.415604707,3.73214731 0.612470094,3.83036171 C1.26868805,3.79464738 1.26868805,2.00893097 1.79366242,1.71428776 C2.11083443,1.52678753 3.28108979,1.37500164 3.68575753,1.37500164 C3.87168595,1.37500164 5.30442849,1.34821589 5.45754602,1.48214462 C5.58878961,1.60714477 5.54504175,2.25000268 5.54504175,2.41071716 L5.54504175,3.45536126 C5.54504175,5.25893484 5.61066354,7.06250842 5.61066354,8.866082 C5.61066354,9.42858267 5.64347444,11.8482284 5.40286119,12.2857289 C4.71383233,12.6160865 3.21546799,12.6250151 2.79986329,13.1696586 L2.79986329,13.2500158 C2.79986329,13.4018017 2.82173722,13.5625162 2.83267419,13.7143021 C3.93730775,13.7143021 5.04194131,13.5535876 6.14657487,13.5535876 C7.71056101,13.5535876 9.24173624,13.7500164 10.7947854,13.7143021 L11.1666423,13.7053735 C11.1885162,13.6160877 11.1994532,13.5268018 11.1994532,13.4464446 C11.1994532,13.2946587 11.1666423,13.1428728 11.1447683,13.0000155 C10.291685,12.6875151 9.30735804,12.6339436 8.47614863,12.2857289 C8.23553537,11.6250139 8.36677897,10.9017987 8.36677897,10.2142979 C8.36677897,7.70536633 8.33396807,5.19643477 8.3230311,2.6875032 C8.31209414,2.28571701 8.355842,1.86607365 8.41052683,1.47321604 C9.39485377,1.37500164 10.4338655,1.41071597 11.4291294,1.41071597 C11.7681754,1.41071597 12.0197256,1.36607306 12.2494019,1.59821619 C12.2712758,1.61607336 12.533763,2.82143193 12.6103218,3.00000358 C12.7743763,3.39286119 12.9493677,3.7857188 13.2009179,4.14286208 C13.4524681,4.11607634 13.7040184,4.05357626 13.9446316,3.9821476 C14.0102534,3.66964723 13.9993164,3.32143253 13.9993164,3.00893216 C13.9993164,2.00893097 13.9993164,1.00892977 13.9774425,0.00892858207 C13.8790098,0.00892858207 13.7696402,0 13.6712075,0 L13.2118549,0.00892858207 C12.9165568,0.348214701 12.6650066,0.267857462 12.227528,0.267857462 L9.02299692,0.267857462 C8.23553537,0.267857462 7.45901079,0.25892888 6.67154924,0.25892888 C5.70909624,0.25892888 4.74664323,0.294643208 3.78419023,0.294643208 C3.55451394,0.294643208 1.55304917,0.276786044 1.47649041,0.250000298 L0.885894243,0.00892858207 Z' }),
        viewBox: '0 0 14 14'
      }, this.props));
    }
  }]);

  return TextButton;
}(_react2.default.Component);

exports.default = TextButton;