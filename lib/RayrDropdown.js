'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _RayrDropdown = require('./RayrDropdown.Header');

var _RayrDropdown2 = _interopRequireDefault(_RayrDropdown);

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
            selectedList: [],
            posY: 0
        };
        _this.resizeEvent = _this.resizeEvent.bind(_this);
        _this.onWindowClick = _this.onWindowClick.bind(_this);
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
            window.addEventListener('resize', this.resizeEvent);
            window.addEventListener('scroll', this.resizeEvent);
            window.addEventListener('click', this.onWindowClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.resizeEvent);
            window.removeEventListener('scroll', this.resizeEvent);
            window.removeEventListener('click', this.onWindowClick);
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
            var header = e.currentTarget;
            var body = e.currentTarget.nextElementSibling;
            var posY = this.getTranslateY(header, body);
            var target = e.target;
            console.log(target.className);
            if (target.className == 'item-delete') {
                // 点击了复选框删除按钮
                this.setState({
                    isActive: true,
                    // selectedList: [],
                    posY: posY
                });
            } else {
                this.setState({
                    isActive: !this.state.isActive,
                    posY: posY
                });
            }
        }
    }, {
        key: 'chkItemClick',
        value: function chkItemClick(e) {
            var index = e.target.getAttribute('index'); // 利用index标示当前选中的选项
            var label = e.target.innerHTML;
            this.props.onChange(this.state.selectedList); // 调用回调
            var selectedList = this.state.selectedList;

            // 遍历selectedList 到options里面去对比，看是否被选中了
            if (this.state.selectedList.indexOf(index) === -1) {
                // 没有就往里面添加
                selectedList.push(index);
            } else {
                // 有就从里面删除
                selectedList.splice(selectedList.indexOf(index), 1);
            }

            this.setState({
                selectedList: selectedList
            });
        }
    }, {
        key: 'chkClose',
        value: function chkClose(e) {}

        // 处理input输入时候的监控

    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var value = e.target.value;
            var posY = this.getTranslateY();
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
                    isActive: true,
                    posY: posY
                });
            }
        }
    }, {
        key: 'initMain',
        value: function initMain() {
            var _this2 = this;

            //  根据type的值来进行渲染
            var mainCls = this.state.isActive ? 'active' : 'hidden';
            var selectIndex = this.state.selectIndex;
            var posY = this.state.posY;

            var iconTrans = { transform: 'rotate(180deg)' };

            if (this.props.type === 'radio') {
                var mainTransform = {
                    transform: 'translate(0px, ' + posY + 'px)'
                };
                // 选择框
                return [_react2.default.createElement(
                    'div',
                    { key: "radio_first", ref: "dropHeader", className: 'drop-header' },
                    _react2.default.createElement('input', { onClick: this.inputClick.bind(this), type: 'text', value: this.state.value, placeholder: this.props.placeholder || '请选择', readOnly: 'true' }),
                    this.state.isActive ? _react2.default.createElement('span', { className: 'dropdown-select-icon', style: iconTrans }) : _react2.default.createElement('span', { className: 'dropdown-select-icon' })
                ), _react2.default.createElement(
                    'div',
                    { key: "radio_two", ref: "dropMain", className: 'drop-main ' + mainCls, style: mainTransform },
                    _react2.default.createElement(
                        'ul',
                        { className: 'drop-list' },
                        this.props.options.map(function (item, index) {
                            var itemCls = index == selectIndex ? 'selected' : '';
                            return _react2.default.createElement(
                                'li',
                                { key: 'radio_' + index, className: '' + itemCls, onClick: _this2.itemClick.bind(_this2), index: index, value: item.value },
                                item.label
                            );
                        })
                    )
                )];
            } else if (this.props.type === 'input') {
                // 输入框
                var _mainTransform = {
                    transform: 'translate(0px, ' + posY + 'px)'
                };
                return [_react2.default.createElement(
                    'div',
                    { key: "input_first", ref: "dropHeader", className: 'drop-header' },
                    _react2.default.createElement('input', { type: 'text', value: this.state.value || '', onChange: this.handleChange.bind(this), placeholder: this.props.placeholder || '请选择' }),
                    _react2.default.createElement('span', { className: 'dropdown-search-icon' })
                ), _react2.default.createElement(
                    'div',
                    { key: "input_second", ref: "dropMain", className: 'drop-main ' + mainCls, style: _mainTransform },
                    this.props.options == null || this.props.options.length <= 0 ? _react2.default.createElement(
                        'div',
                        { className: 'drop-empty-result' },
                        '\u65E0\u641C\u7D22\u7ED3\u679C'
                    ) : _react2.default.createElement(
                        'ul',
                        { className: 'drop-list' },
                        this.props.options.map(function (item, index) {
                            var itemCls = '';
                            return _react2.default.createElement(
                                'li',
                                { key: 'input_' + index, className: '' + itemCls, onClick: _this2.itemClick.bind(_this2), index: index, value: item.value },
                                item.label
                            );
                        })
                    )
                )];
            } else {
                // 多选
                var _mainTransform2 = {
                    transform: 'translate(0px, ' + posY + 'px)'
                };
                return [_react2.default.createElement(
                    'div',
                    { key: "checkbox_first", ref: "dropHeader", className: 'drop-header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'checkbox-value', onClick: this.inputClick.bind(this) },
                        this.state.selectedList.map(function (item, index) {
                            return _react2.default.createElement(
                                'span',
                                { key: 'checkitem_' + index, className: 'selected-item' },
                                _this2.props.options[parseInt(item)].label,
                                _react2.default.createElement(
                                    'span',
                                    { className: 'item-delete', index: item, onClick: _this2.chkItemClick.bind(_this2) },
                                    '\xD7'
                                )
                            );
                        }),
                        this.state.isActive ? _react2.default.createElement('span', { className: 'dropdown-select-icon', style: iconTrans }) : _react2.default.createElement('span', { className: 'dropdown-select-icon' })
                    )
                ), _react2.default.createElement(
                    'div',
                    { key: "checkbox_two", ref: "dropMain", className: 'drop-main ' + mainCls, style: _mainTransform2 },
                    _react2.default.createElement(
                        'ul',
                        { className: 'drop-list drop-checkbox-list' },
                        this.props.options.map(function (item, index) {
                            var itemCls = index == selectIndex ? 'selected' : '';
                            var cls = _this2.state.selectedList.indexOf(index.toString()) !== -1 ? 'selected' : '';

                            return _react2.default.createElement(
                                'li',
                                { key: 'radio_' + index, className: '' + cls, onClick: _this2.chkItemClick.bind(_this2), index: index, value: item.value },
                                item.label
                            );
                        })
                    )
                )];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'dropdown' },
                this.initMain()
            );
        }
    }]);

    return Dropdown;
}(_react2.default.Component);

exports.default = Dropdown;
module.exports = exports['default'];