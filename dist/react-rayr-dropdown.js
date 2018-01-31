!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],e):"object"==typeof exports?exports.ReactRayrDropdown=e(require("react"),require("prop-types")):t.ReactRayrDropdown=e(t.React,t.PropTypes)}("undefined"!=typeof self?self:this,function(t,e){return function(t){function e(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var o={};return e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RayrDropdown=void 0;var n=o(1),r=function(t){return t&&t.__esModule?t:{default:t}}(n);e.RayrDropdown=r.default},function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),c=o(2),f=n(c),p=o(3),u=(n(p),o(4)),l=(n(u),function(t){function e(t){r(this,e);var o=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.state={position:t.pos||"auto",titleComponent:t.titleCom||"",contentComponent:t.contentCom||"",contentPos:null,showContent:!1,offset:10,winWidth:window.innerWidth,winHeight:window.innerHeight},o}return s(e,t),a(e,[{key:"setPosition",value:function(){var t=this.refs.dropTitle,e=this.refs.dropContent,o=t.getBoundingClientRect(),n=e.getBoundingClientRect(),r=o.width,i=o.height,s=n.width,a=n.height,c={};switch(this.state.position){case"top":c={top:-(parseInt(a)+this.state.offset)+"px",left:0};break;case"bottom":c={top:parseInt(i)+this.state.offset+"px",left:0};break;case"left":c={top:0,left:-(parseInt(s)+this.state.offset)+"px"};break;case"right":c={top:0,left:parseInt(r)+this.state.offset+"px"};break;default:c=this.state.winHeight-o.bottom<a+this.state.offset?{top:-(parseInt(a)+this.state.offset)+"px",left:0}:{top:parseInt(i)+this.state.offset+"px",left:0}}return c}},{key:"titleClick",value:function(t){console.log("title click"),this.setPosition();var e=this.setPosition();this.setState({contentPos:e,showContent:!this.state.showContent})}},{key:"contentClick",value:function(t){console.log("content click"),this.props.contentClick&&this.props.contentClick(this)}},{key:"render",value:function(){var t=this.state.showContent?"show":"hide";return f.default.createElement("div",{className:"rayr-dropd"},f.default.createElement("div",{ref:"dropTitle",className:"rayr-d-title",onClick:this.titleClick.bind(this)},this.state.titleComponent),f.default.createElement("div",{ref:"dropContent",className:"rayr-d-content "+t,onClick:this.contentClick.bind(this),style:this.state.contentPos},this.state.contentComponent))}}]),e}(f.default.Component));l.propTypes={},l.defaultProps={},e.default=l,t.exports=e.default},function(e,o){e.exports=t},function(t,o){t.exports=e},function(t,e,o){var n,r;!function(){"use strict";function o(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=typeof n;if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n))t.push(o.apply(null,n));else if("object"===r)for(var s in n)i.call(n,s)&&n[s]&&t.push(s)}}return t.join(" ")}var i={}.hasOwnProperty;void 0!==t&&t.exports?t.exports=o:(n=[],void 0!==(r=function(){return o}.apply(e,n))&&(t.exports=r))}()}])});