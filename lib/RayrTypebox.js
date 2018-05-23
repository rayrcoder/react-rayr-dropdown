'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRayrToggle = require('react-rayr-toggle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

var RayrTypebox = function (_React$Component) {
    _inherits(RayrTypebox, _React$Component);

    function RayrTypebox() {
        _classCallCheck(this, RayrTypebox);

        var _this = _possibleConstructorReturn(this, (RayrTypebox.__proto__ || Object.getPrototypeOf(RayrTypebox)).call(this));

        _this.state = {
            value: ''
        };
        return _this;
    }

    _createClass(RayrTypebox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // console.log(this.refs.typeInput);
            this.refs.typeInput.addEventListener('click', function () {
                _this2.inputClick();
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            console.log(newProps);
        }
    }, {
        key: 'getTranslateY',
        value: function getTranslateY(header, body) {
            // 计算 主体内容的显示位置，位移
            var headerDom = this.refs.dropHeader || header;
            var bodyDom = this.refs.dropMain || body;
            var winHeight = window.innerHeight;
            var headerRect = headerDom.getBoundingClientRect();
            var mainRect = bodyDom.getBoundingClientRect();
            var bottom = headerRect.bottom;
            var headerHeight = headerRect.height;
            var mainHeight = mainRect.height;
            var posY = 0;
            var offset = 4;
            if (winHeight - bottom > mainHeight + 10) {
                // 预留10px的位置
                posY = headerHeight + offset;
            } else {
                posY = -(mainHeight + offset);
            }
            return posY;
        }

        // 处理input输入时候的监控

    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            console.log('input something!');
            var value = e.target.value;
            this.props.onTypeChange(value);
            if (value === '') {
                // 输入为空的时候
                this.setState({
                    value: value,
                    isActive: false
                });
            } else {
                this.setState({
                    value: value,
                    isActive: true
                });
            }
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
        value: function inputClick() {
            console.log('input click');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var options = this.props.options || [];

            return _react2.default.createElement(
                _reactRayrToggle.RayrToggle,
                { className: 'type-box' },
                _react2.default.createElement(
                    _reactRayrToggle.RayrToggle.Top,
                    { className: 'drop-header' },
                    _react2.default.createElement('input', { ref: 'typeInput', type: 'text', onClick: this.inputClick.bind(this), value: this.state.value || '', onChange: this.handleChange.bind(this), placeholder: this.props.placeholder || '请选择' }),
                    _react2.default.createElement('span', { className: 'dropdown-search-icon' })
                ),
                _react2.default.createElement(
                    _reactRayrToggle.RayrToggle.Box,
                    { className: 'drop-main' },
                    (options == null || options.length <= 0) && this.state.value.length > 0 ? _react2.default.createElement(
                        'div',
                        { className: 'drop-empty-result' },
                        '\u65E0\u641C\u7D22\u7ED3\u679C'
                    ) : _react2.default.createElement(
                        'ul',
                        { className: 'drop-list' },
                        options.map(function (item, index) {
                            var itemCls = '';
                            return _react2.default.createElement(
                                'li',
                                { key: 'input_' + index, className: '' + itemCls, onClick: _this3.itemClick.bind(_this3), index: index, value: item.value },
                                item.label
                            );
                        })
                    )
                )
            );
        }
    }]);

    return RayrTypebox;
}(_react2.default.Component);

exports.default = RayrTypebox;
module.exports = exports['default'];