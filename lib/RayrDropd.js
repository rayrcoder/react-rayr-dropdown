'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RayrDropd = function (_React$Component) {
    _inherits(RayrDropd, _React$Component);

    function RayrDropd(props) {
        _classCallCheck(this, RayrDropd);

        var _this = _possibleConstructorReturn(this, (RayrDropd.__proto__ || Object.getPrototypeOf(RayrDropd)).call(this, props));

        _this.state = {
            position: props.pos || 'auto', // 默认值为auto，其他几个值是left,right,top,bottom
            titleComponent: props.titleCom || '',
            contentComponent: props.contentCom || '',
            contentPos: null,
            showContent: false,
            offset: 10,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        };
        return _this;
    }

    _createClass(RayrDropd, [{
        key: 'setPosition',
        value: function setPosition() {
            // 设置点击后显示的位置
            var titleDom = this.refs.dropTitle;
            var contentDom = this.refs.dropContent;
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
        key: 'titleClick',
        value: function titleClick(e) {

            console.log('title click');
            this.setPosition();

            var style = this.setPosition();
            this.setState({
                contentPos: style,
                showContent: !this.state.showContent
            });
        }
    }, {
        key: 'contentClick',
        value: function contentClick(e) {
            console.log('content click');
            if (this.props.contentClick) {
                // 回调函数
                this.props.contentClick(this);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var titleCls = this.state.showContent ? 'show' : 'hide';

            return _react2.default.createElement(
                'div',
                { className: 'rayr-dropd' },
                _react2.default.createElement(
                    'div',
                    { ref: "dropTitle", className: 'rayr-d-title', onClick: this.titleClick.bind(this) },
                    this.state.titleComponent
                ),
                _react2.default.createElement(
                    'div',
                    { ref: "dropContent", className: 'rayr-d-content ' + titleCls, onClick: this.contentClick.bind(this), style: this.state.contentPos },
                    this.state.contentComponent
                )
            );
        }
    }]);

    return RayrDropd;
}(_react2.default.Component);

RayrDropd.propTypes = {};
RayrDropd.defaultProps = {};
exports.default = RayrDropd;
module.exports = exports['default'];