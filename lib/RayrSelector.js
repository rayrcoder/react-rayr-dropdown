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
// import RayrToggle from './lib/RayrToggle';


function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

var RayrSelector = function (_React$Component) {
    _inherits(RayrSelector, _React$Component);

    function RayrSelector(props) {
        _classCallCheck(this, RayrSelector);

        var _this = _possibleConstructorReturn(this, (RayrSelector.__proto__ || Object.getPrototypeOf(RayrSelector)).call(this, props));

        _this.state = {
            selected: _this.props.selected,
            optsions: [],
            mapOptions: new Map(),
            isActive: false,
            selectIndex: -1
        };
        return _this;
    }

    _createClass(RayrSelector, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.processData(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            // 外部参数改变,就再重新更新数据，重新渲染
            this.processData(newProps);
            // if(newProps.selected !== this.props.selected){
            //     let selected = newProps.selected;
            //     [...this.state.mapOptions].map((item) => {
            //         if(selected.label === item[1].label && selected.value === item[1].value){
            //             this.setState({
            //                 selectIndex: item[0]
            //             });
            //         }
            //     });
            // }
        }
    }, {
        key: 'processData',
        value: function processData(props) {
            // 预处理数据
            var originOpts = props.options || [];
            var optionsMap = new Map();
            var selected = props.selected || this.state.selected;
            var selectIndex = -1;

            originOpts.map(function (item, index) {
                optionsMap.set(index, item);
                if (selected && selected.label == item.label && selected.value == item.value) {
                    // 暂时用非全等
                    selectIndex = index;
                }
            });

            this.setState({
                mapOptions: optionsMap,
                selectIndex: selectIndex
            });
        }
    }, {
        key: 'inputClick',
        value: function inputClick(e) {
            var box = document.querySelector('.drop-main-selector');
            var visible = getStyleFn(box, 'display');
            this.setState({
                isActive: !this.state.isActive
            });
        }
    }, {
        key: 'itemClick',
        value: function itemClick(item, index) {
            this.props.onChange(item);
            this.setState({
                selectIndex: index
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var mainTransform = { fontSize: 'normal' };
            var selected = this.state.mapOptions.get(this.state.selectIndex);
            return _react2.default.createElement(
                _reactRayrToggle.RayrToggle,
                { className: 'selector-wrapper' },
                _react2.default.createElement(
                    _reactRayrToggle.RayrToggle.Top,
                    null,
                    _react2.default.createElement(
                        'div',
                        { key: "radio_first", ref: "dropHeader", className: 'drop-header' },
                        _react2.default.createElement('input', { onClick: this.inputClick.bind(this), type: 'text', value: selected ? selected.label : '', placeholder: this.props.placeholder || '请选择', readOnly: 'true' }),
                        _react2.default.createElement('span', { className: 'dropdown-select-icon' })
                    )
                ),
                _react2.default.createElement(
                    _reactRayrToggle.RayrToggle.Box,
                    { className: 'drop-main-selector' },
                    _react2.default.createElement(
                        'div',
                        { key: "radio_two", ref: "dropMain", className: 'drop-main', style: mainTransform },
                        _react2.default.createElement(
                            'ul',
                            { className: 'drop-list' },
                            [].concat(_toConsumableArray(this.state.mapOptions)).map(function (item, index) {
                                var itemCls = index == _this2.state.selectIndex ? 'selected' : '';
                                return _react2.default.createElement(
                                    'li',
                                    { key: 'radio_' + index, className: '' + itemCls, onClick: _this2.itemClick.bind(_this2, item[1], index), index: index, value: item[1].value },
                                    item[1].label
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return RayrSelector;
}(_react2.default.Component);

exports.default = RayrSelector;
module.exports = exports['default'];