'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRayrToggle = require('react-rayr-toggle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RayrMulSelector = function (_React$Component) {
    _inherits(RayrMulSelector, _React$Component);

    function RayrMulSelector(props) {
        _classCallCheck(this, RayrMulSelector);

        var _this = _possibleConstructorReturn(this, (RayrMulSelector.__proto__ || Object.getPrototypeOf(RayrMulSelector)).call(this, props));

        _this.state = {
            selectedList: _this.props.selectedList || [],
            selectIndex: [],
            mapOptions: new Map(),
            placeholder: _this.props.placeholder || '请选择'
        };
        return _this;
    }

    _createClass(RayrMulSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.processData(this.props);
            this.refs.checkBox.addEventListener('click', function (e) {
                var target = e.target;
                if (target.className === 'item-delete') {
                    e.stopPropagation();
                    var index = target.getAttribute('index');
                    var selectList = _this2.state.selectIndex;
                    if (selectList.indexOf(parseInt(index)) !== -1) {
                        // 删除
                        selectList.splice(selectList.indexOf(parseInt(index)), 1);
                    }
                    _this2.setState({
                        selectIndex: selectList
                    });
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.processData(newProps);
        }
    }, {
        key: 'processData',
        value: function processData(props) {
            var originOpts = props.options; // 原始选项数组
            var optionsMap = new Map();
            var selectedList = props.selectedList || []; // 被选中的list
            var selectIndexList = [];

            originOpts.map(function (item, index) {
                optionsMap.set(index, item);
                selectedList.map(function (newItem) {
                    if (item.label === newItem.label && item.value === newItem.value) {
                        selectIndexList.push(index);
                    }
                });
            });
            this.setState({
                mapOptions: optionsMap,
                selectIndex: selectIndexList,
                selectedList: selectedList
            });
        }
    }, {
        key: 'chkItemClick',
        value: function chkItemClick(item) {
            var _this3 = this;

            var selectList = this.state.selectIndex;
            if (this.state.selectIndex.indexOf(parseInt(item[0])) !== -1) {
                // 删除
                selectList.splice(selectList.indexOf(parseInt(item[0])), 1);
            } else {
                // 添加
                selectList.push(parseInt(item[0]));
            }
            this.setState({
                selectIndex: selectList
            }, function () {
                var selected = _this3.state.selectIndex.map(function (item, index) {
                    return _this3.state.mapOptions.get(item);
                });
                _this3.props.onChange(selected);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var mainTransform = { fontSize: 'normal' };
            return _react2.default.createElement(
                _reactRayrToggle.RayrToggle,
                { className: 'checkbox-wrapper' },
                _react2.default.createElement(
                    _reactRayrToggle.RayrToggle.Top,
                    null,
                    _react2.default.createElement(
                        'div',
                        { key: "checkbox_first", ref: "dropHeader", className: 'drop-header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'checkbox-value', ref: 'checkBox' },
                            this.state.selectIndex.length <= 0 ? _react2.default.createElement(
                                'div',
                                { className: 'chk-placeholder' },
                                this.state.placeholder
                            ) : this.state.selectIndex.map(function (item, index) {
                                var selected = _this4.state.mapOptions.get(item);
                                return _react2.default.createElement(
                                    'span',
                                    { key: 'checkitem_' + index, className: 'selected-item' },
                                    selected ? selected.label : '',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'item-delete', index: item },
                                        '\xD7'
                                    )
                                );
                            }),
                            _react2.default.createElement('span', { className: 'dropdown-select-icon' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactRayrToggle.RayrToggle.Box,
                    { className: 'drop-main-selector' },
                    _react2.default.createElement(
                        'div',
                        { key: "checkbox_two", ref: "dropMain", className: '', style: mainTransform },
                        _react2.default.createElement(
                            'ul',
                            { className: 'drop-list drop-checkbox-list' },
                            [].concat(_toConsumableArray(this.state.mapOptions)).map(function (item, index) {
                                var itemCls = _this4.state.selectIndex.indexOf(index) !== -1 ? 'selected' : '';
                                return _react2.default.createElement(
                                    'li',
                                    { key: 'radio_' + index, className: '' + itemCls, onClick: _this4.chkItemClick.bind(_this4, item), index: index, value: item[1].value },
                                    item[1].label
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return RayrMulSelector;
}(_react2.default.Component);

exports.default = RayrMulSelector;
module.exports = exports['default'];