'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
        key: 'render',
        value: function render() {
            var opts = this.props.opts;
            var mainCls = opts.isActive ? 'active' : 'hidden';
            var posY = opts.posY;
            var mainTransform = {
                transform: 'translate(0px, ' + posY + 'px)'
            };
            console.log(opts);
            console.log(mainTransform);

            console.log(this.props);
            return _react2.default.createElement(
                'div',
                { key: this.props.key, className: 'drop-main ' + mainCls, style: mainTransform },
                _react2.default.Children.map(this.props.children, function (child) {
                    return child;
                })
            );
        }
    }]);

    return DropdownBody;
}(_react2.default.Component);

exports.default = DropdownBody;
module.exports = exports['default'];