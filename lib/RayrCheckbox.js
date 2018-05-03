'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RayrToggle = require('./lib/RayrToggle');

var _RayrToggle2 = _interopRequireDefault(_RayrToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RayrCheckbox = function (_React$Component) {
    _inherits(RayrCheckbox, _React$Component);

    function RayrCheckbox(props) {
        _classCallCheck(this, RayrCheckbox);

        var _this = _possibleConstructorReturn(this, (RayrCheckbox.__proto__ || Object.getPrototypeOf(RayrCheckbox)).call(this, props));

        _this.state = {
            selectedList: _this.props.selectedList || [],
            selectIndex: [],
            mapOptions: new Map(),
            isActive: false,
            placeholder: _this.props.placeholder || '请选择'
        };
        return _this;
    }

    _createClass(RayrCheckbox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.processData();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {}
    }, {
        key: 'processData',
        value: function processData() {
            var originOpts = this.props.options;
            var optionsMap = new Map();
            var selectedList = this.state.selectedList;
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
                selectIndex: selectIndexList
            });
        }
    }, {
        key: 'inputClick',
        value: function inputClick() {
            console.log('checkbox input click');
        }
    }, {
        key: 'chkItemClick',
        value: function chkItemClick(item) {
            console.log(item);
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
            });
            console.log('check item click!');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var mainTransform = { fontSize: 'normal' };
            var iconTrans = { transform: 'rotate(180deg)' };

            return _react2.default.createElement(
                _RayrToggle2.default,
                { className: 'checkbox-wrapper' },
                _react2.default.createElement(
                    _RayrToggle2.default.Top,
                    null,
                    _react2.default.createElement(
                        'div',
                        { key: "checkbox_first", ref: "dropHeader", className: 'drop-header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'checkbox-value', onClick: this.inputClick.bind(this) },
                            this.state.selectIndex.length <= 0 ? this.state.placeholder : this.state.selectIndex.map(function (item, index) {
                                var selected = _this2.state.mapOptions.get(item);

                                return _react2.default.createElement(
                                    'span',
                                    { key: 'checkitem_' + index, className: 'selected-item' },
                                    selected ? selected.label : '',
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'item-delete', onClick: _this2.chkItemClick.bind(_this2) },
                                        '\xD7'
                                    )
                                );
                            }),
                            this.state.isActive ? _react2.default.createElement('span', { className: 'dropdown-select-icon', style: iconTrans }) : _react2.default.createElement('span', { className: 'dropdown-select-icon' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _RayrToggle2.default.Box,
                    { className: 'drop-main-selector' },
                    _react2.default.createElement(
                        'div',
                        { key: "checkbox_two", ref: "dropMain", className: '', style: mainTransform },
                        _react2.default.createElement(
                            'ul',
                            { className: 'drop-list drop-checkbox-list' },
                            [].concat(_toConsumableArray(this.state.mapOptions)).map(function (item, index) {
                                console.log(item);
                                var itemCls = _this2.state.selectIndex.indexOf(index) !== -1 ? 'selected' : '';
                                var cls = _this2.state.selectedList.indexOf(index.toString()) !== -1 ? 'selected' : '';
                                return _react2.default.createElement(
                                    'li',
                                    { key: 'radio_' + index, className: '' + cls, onClick: _this2.chkItemClick.bind(_this2, item), index: index, value: item[1].value },
                                    item[1].label
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return RayrCheckbox;
}(_react2.default.Component);

exports.default = RayrCheckbox;
module.exports = exports['default'];