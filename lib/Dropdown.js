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

var Dropdown = function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

        _this.state = {
            isOpen: false,
            position: props.pos || 'auto',
            bodyPos: null,
            offset: 10,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            value: '',
            type: props.type
        };
        _this._onWindowClick = _this._onWindowClick.bind(_this); // 非常重要
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('click', this._onWindowClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this._onWindowClick);
        }
    }, {
        key: '_onWindowClick',
        value: function _onWindowClick(event) {
            var dropdownEle = (0, _reactDom.findDOMNode)(this);
            var isActive = this.isActive();
            if (event.target !== dropdownEle && !dropdownEle.contains(event.target) && this.isActive()) {
                this.hide();
            }
        }
    }, {
        key: 'handleHeaderClick',
        value: function handleHeaderClick() {
            console.log('handle header click');

            var posStyle = this.setPosition();
            this.setState({
                bodyPos: posStyle,
                isOpen: !this.state.isOpen
            });
        }
    }, {
        key: 'handleBodyClick',
        value: function handleBodyClick(e) {}
    }, {
        key: 'isActive',
        value: function isActive() {
            return this.state.isOpen;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({
                isOpen: false
            });
        }
    }, {
        key: 'changeValue',
        value: function changeValue(data) {
            this.setState({
                value: data,
                isOpen: false
            });
        }
    }, {
        key: 'setPosition',
        value: function setPosition() {
            // 设置点击后显示的位置
            var titleDom = (0, _reactDom.findDOMNode)(this.refs.dropTitle);
            var contentDom = (0, _reactDom.findDOMNode)(this.refs.dropContent);
            var titleRect = titleDom.getBoundingClientRect();
            var contentRect = contentDom.getBoundingClientRect();
            var horOffset = titleRect.width; // 水平偏移量
            var verOffset = titleRect.height; // 垂直偏移量
            var contentWid = contentRect.width;
            var contentHei = contentRect.height;
            var posStyle = {};
            switch (this.state.position) {
                case 'top':
                    posStyle = {
                        'top': -(parseInt(contentHei) + this.state.offset) + 'px',
                        'left': 0
                    };
                    break;
                case 'bottom':
                    posStyle = {
                        'top': parseInt(verOffset) + this.state.offset + 'px',
                        'left': 0
                    };
                    break;
                case 'left':
                    posStyle = {
                        'top': 0,
                        'left': -(parseInt(contentWid) + this.state.offset) + 'px'
                    };
                    break;
                case 'right':
                    posStyle = {
                        'top': 0,
                        'left': parseInt(horOffset) + this.state.offset + 'px'
                    };
                    break;
                default:
                    // auto的情况
                    if (this.state.winHeight - titleRect.bottom < contentHei + this.state.offset) {
                        // 上方显示
                        posStyle = {
                            'top': -(parseInt(contentHei) + this.state.offset) + 'px',
                            'left': 0
                        };
                    } else {
                        // 下方显示
                        posStyle = {
                            'top': parseInt(verOffset) + this.state.offset + 'px',
                            'left': 0
                        };
                    }
                    break;
            }
            return posStyle;
        }
    }, {
        key: 'render',
        value: function render() {
            var body = this.props.body;
            var header = this.props.header;

            return _react2.default.createElement(
                'div',
                { className: 'dropdown-wrapper' },
                _react2.default.cloneElement(header, {
                    onClick: this.handleHeaderClick.bind(this),
                    ref: 'dropTitle',
                    value: this.state.value,
                    type: this.props.type
                }),
                _react2.default.cloneElement(body, {
                    onClick: this.handleBodyClick.bind(this),
                    isopen: this.state.isOpen,
                    ref: 'dropContent',
                    style: this.state.bodyPos,
                    changeValue: this.changeValue.bind(this)
                })
            );
        }
    }]);

    return Dropdown;
}(_react2.default.Component);

exports.default = Dropdown;
module.exports = exports['default'];