'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownBody = function (_React$Component) {
    _inherits(DropdownBody, _React$Component);

    function DropdownBody() {
        _classCallCheck(this, DropdownBody);

        var _this = _possibleConstructorReturn(this, (DropdownBody.__proto__ || Object.getPrototypeOf(DropdownBody)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(DropdownBody, [{
        key: 'setValue',
        value: function setValue(e) {
            console.log('set value');
            console.log(e.target);
            var value = e.target.innerHTML;
            this.props.changeValue(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var cls = this.props.isopen ? 'show' : 'hide';

            return _react2.default.createElement(
                'div',
                {
                    className: 'dropdown-body ' + cls,
                    style: this.props.style,
                    onClick: this.props.onClick
                },
                _react2.default.cloneElement(this.props.children, {
                    onClick: this.setValue.bind(this)
                })
            );
        }
    }]);

    return DropdownBody;
}(_react2.default.Component);

exports.default = DropdownBody;
module.exports = exports['default'];