'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./RayrToggle.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rayrEmitter = new _events.EventEmitter();

function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

var Box = function (_React$Component) {
    _inherits(Box, _React$Component);

    function Box() {
        _classCallCheck(this, Box);

        return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).apply(this, arguments));
    }

    _createClass(Box, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'rayr-toggle-box ' + this.props.className },
                this.props.children
            );
        }
    }]);

    return Box;
}(_react2.default.Component);

Box.propTypes = {
    className: _propTypes2.default.string
};
Box.defaultProps = {
    className: ''
};

var Top = function (_React$Component2) {
    _inherits(Top, _React$Component2);

    function Top() {
        _classCallCheck(this, Top);

        return _possibleConstructorReturn(this, (Top.__proto__ || Object.getPrototypeOf(Top)).apply(this, arguments));
    }

    _createClass(Top, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'rayr-toggle-top ' + this.props.className },
                this.props.children
            );
        }
    }]);

    return Top;
}(_react2.default.Component);

Top.propTypes = {
    className: _propTypes2.default.string
};
Top.defaultProps = {
    className: ''
};

var RayrToggle = function (_React$Component3) {
    _inherits(RayrToggle, _React$Component3);

    function RayrToggle() {
        _classCallCheck(this, RayrToggle);

        var _this3 = _possibleConstructorReturn(this, (RayrToggle.__proto__ || Object.getPrototypeOf(RayrToggle)).call(this));

        _this3.oTop = null;
        _this3.oBox = null;
        _this3.oPar = null;
        _this3.mounted = true;
        _this3.handleDocumentClick = _this3.handleDocumentClick.bind(_this3);
        return _this3;
    }

    _createClass(RayrToggle, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            document.addEventListener('click', this.handleDocumentClick, false);
            this.handleInitClick();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.mounted = false;
            document.removeEventListener('click', this.handleDocumentClick, false);
        }
    }, {
        key: 'handleDocumentClick',
        value: function handleDocumentClick(e) {
            // this.mounted && rayrEmitter.emit('click.rayr.hide.all');
            var thisDom = (0, _reactDom.findDOMNode)(this);
            var _visiable = getStyleFn(this.oBox, 'display');
            if (e.target !== thisDom && !thisDom.contains(e.target) && _visiable === 'block') {
                this.oBox.style.display = 'none';
            }
        }
    }, {
        key: 'handleInitClick',
        value: function handleInitClick() {
            var _this4 = this;

            this.oTop = this.refs.rayrToggle.children[0];
            this.oBox = this.refs.rayrToggle.children[1];

            this.oTop.addEventListener('click', function (e) {
                // e.stopPropagation();
                var _visiable = getStyleFn(_this4.oBox, 'display');
                rayrEmitter.emit('click.rayr.hide.all');
                if (_visiable === 'none') {
                    _this4.oBox.style.display = 'block';
                }
            }, false);

            this.oBox.addEventListener('click', function (e) {
                if (_this4.oBox.contains(e.target)) {
                    rayrEmitter.emit('click.rayr.hide.all');
                }

                // if (e.target === this.oBox) {
                //     rayrEmitter.emit('click.rayr.hide.all');
                // }
            }, false);

            rayrEmitter.on('click.rayr.hide.all', function () {
                // console.log('emmiter trigger');
                _this4.oBox.style.display = 'none';
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                _extends({}, this.props, { className: 'rayr-toggle ' + this.props.className, ref: 'rayrToggle' }),
                this.props.children
            );
        }
    }]);

    return RayrToggle;
}(_react2.default.Component);

RayrToggle.propTypes = {
    className: _propTypes2.default.string
};
RayrToggle.defaultProps = {
    className: ''
};
RayrToggle.Box = Box;
RayrToggle.Top = Top;
exports.default = RayrToggle;
module.exports = exports['default'];