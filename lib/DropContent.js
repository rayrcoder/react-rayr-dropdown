'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropContent = function (_React$Component) {
    _inherits(DropContent, _React$Component);

    function DropContent(props) {
        _classCallCheck(this, DropContent);

        var _this = _possibleConstructorReturn(this, (DropContent.__proto__ || Object.getPrototypeOf(DropContent)).call(this, props));

        _this.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(DropContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            console.log(_events2.default);

            this.eventEmitter = _events2.default.addListener('toggleContent', function (toggle) {
                console.log(toggle);
                _this2.setState({
                    isOpen: toggle
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // 单独删除某个自定义事件的绑定，不能删除成功，有bug
            // emitter.removeListener('toggleContent', ()=>{
            //     console.log('toggle content callback');
            // });
            _events2.default.removeAllListeners();
        }
    }, {
        key: 'clickContent',
        value: function clickContent(e) {
            var _this3 = this;

            this.setState({
                isOpen: !this.state.isOpen
            }, function () {
                _events2.default.emit('changeStatus', _this3.state.isOpen);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var cls = this.state.isOpen ? 'active' : '';
            return _react2.default.createElement(
                'div',
                { className: 'dp-content ' + cls, onClick: this.clickContent.bind(this) },
                _react2.default.Children.map(this.props.children, function (child) {
                    return child;
                })
            );
        }
    }]);

    return DropContent;
}(_react2.default.Component);

exports.default = DropContent;
module.exports = exports['default'];