'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Dropdown组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * */

var Dropdown = function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            options: [],
            value: '',
            placeholder: '',
            isActive: false,
            selectIndex: -1,
            posY: 0
        };
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 请求数据
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('resize', this.resizeEvent.bind(this));
            window.addEventListener('scroll', this.resizeEvent.bind(this));
            window.addEventListener('click', this.onWindowClick.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.resizeEvent.bind(this));
            window.removeEventListener('scroll', this.resizeEvent.bind(this));
            window.removeEventListener('click', this.onWindowClick.bind(this));
        }
    }, {
        key: 'onWindowClick',
        value: function onWindowClick(e) {
            var dropdownEle = (0, _reactDom.findDOMNode)(this);
            var isAc = this.state.isActive;
            // 当点击了组件以外的部分 && 点击的目标不在本组件任何地方 && 本组件选项是打开的 就关闭本组件
            // 当点击了组件以外的区域，关闭本组件显示出来的选项框
            if (e.target !== dropdownEle && !dropdownEle.contains(e.target) && isAc) {
                this.setState({
                    isActive: false
                });
            }
        }
    }, {
        key: 'resizeEvent',
        value: function resizeEvent() {
            var posY = this.getTranslateY();
            this.setState({
                posY: posY
            });
        }
    }, {
        key: 'getTranslateY',
        value: function getTranslateY() {
            // 计算 主体内容的显示位置，位移
            var headerDom = this.refs.dropHeader;
            var winHeight = window.innerHeight;
            var headerRect = headerDom.getBoundingClientRect();
            var mainRect = this.refs.dropMain.getBoundingClientRect();
            var bottom = headerRect.bottom;
            var headerHeight = headerRect.height;
            var mainHeight = mainRect.height;
            var posY = 0;
            if (winHeight - bottom > mainHeight + 10) {
                // 预留10px的位置
                posY = headerHeight + 10;
            } else {
                posY = -(mainHeight + 10);
            }

            return posY;
        }
    }, {
        key: 'itemClick',
        value: function itemClick(e) {
            var value = e.target.value;
            var index = e.target.getAttribute('index'); // 利用index标示当前选中的选项
            var label = e.target.innerHTML;
            this.props.onChange(this.props.options[index]); // 调用回调
            this.setState({
                value: label,
                isActive: !this.state.isActive,
                selectIndex: index
            });
        }
    }, {
        key: 'inputClick',
        value: function inputClick(e) {
            var posY = this.getTranslateY();

            this.setState({
                isActive: !this.state.isActive,
                posY: posY
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var mainCls = this.state.isActive ? 'active' : 'hidden';
            var selectIndex = this.state.selectIndex;
            var posY = this.state.posY;


            var mainTransform = {
                transform: 'translate(0px, ' + posY + 'px)'
            };

            return _react2.default.createElement(
                'div',
                { className: 'dropdown' },
                _react2.default.createElement(
                    'div',
                    { ref: "dropHeader", className: 'drop-header' },
                    _react2.default.createElement('input', { onClick: this.inputClick.bind(this), type: 'text', value: this.state.value, placeholder: this.props.placeholder, readOnly: 'true' })
                ),
                _react2.default.createElement(
                    'div',
                    { ref: "dropMain", className: 'drop-main ' + mainCls, style: mainTransform },
                    _react2.default.createElement(
                        'ul',
                        { className: 'drop-list' },
                        this.props.options.map(function (item, index) {
                            var itemCls = index == selectIndex ? 'selected' : '';
                            return _react2.default.createElement(
                                'li',
                                { key: item.value, className: '' + itemCls, onClick: _this2.itemClick.bind(_this2), index: index, value: item.value },
                                item.label
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Dropdown;
}(_react2.default.Component);

exports.default = Dropdown;
module.exports = exports['default'];