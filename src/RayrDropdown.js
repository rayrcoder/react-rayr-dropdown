import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class RayrDropdown extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            position: props.pos || 'auto',// 默认值为auto，其他几个值是left,right,top,bottom
            titleComponent: props.titleCom || '',
            contentComponent: props.contentCom || '',
            contentPos: null,
            showContent: false,
            offset: 10,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        };
        this._onWindowClick = this._onWindowClick.bind(this);
        
    }

    componentDidMount() {
        window.addEventListener('click', this._onWindowClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._onWindowClick);
    }

    _onWindowClick(event) {
        const dropdownEle = findDOMNode(this);
        let isAc = this.isActive();
        // 当点击了组件以外的区域，关闭本组件显示出来的选项框
        if(event.target !== dropdownEle && !dropdownEle.contains(event.target) && this.isActive()){
            this.hide();
        }
    }

    isActive() {
        return this.state.showContent;
    }

    hide() {
        this.setState({
            showContent: false
        });
    }

    setPosition() {
        // 设置点击后显示的位置
        let titleDom = this.refs.dropTitle;
        let contentDom = this.refs.dropContent;
        let titleRect = titleDom.getBoundingClientRect();
        let contentRect = contentDom.getBoundingClientRect();
        let horOffset = titleRect.width;// 水平偏移量
        let verOffset = titleRect.height;// 垂直偏移量
        let contentWid = contentRect.width;
        let contentHei = contentRect.height;
        let posStyle = {};

        switch(this.state.position){
            case 'top':
                posStyle = {
                    'top': -(parseInt(contentHei) + this.state.offset) + 'px',
                    'left': 0
                }
                break;
            case 'bottom':
                posStyle = {
                    'top': (parseInt(verOffset) + this.state.offset) + 'px',
                    'left': 0
                }
                break;
            case 'left':
                posStyle = {
                    'top': 0,
                    'left': -(parseInt(contentWid) + this.state.offset) + 'px'
                }
                break;
            case 'right':
                posStyle = {
                    'top': 0,
                    'left': (parseInt(horOffset) + this.state.offset) + 'px'
                }
                break;
            default:
                // auto的情况
                if((this.state.winHeight - titleRect.bottom) < (contentHei + this.state.offset)){
                    // 上方显示
                    posStyle = {
                        'top': -(parseInt(contentHei) + this.state.offset) + 'px',
                        'left': 0
                    }
                }else{
                    // 下方显示
                    posStyle = {
                        'top': (parseInt(verOffset) + this.state.offset) + 'px',
                        'left': 0
                    }
                }
                break;
        }
        return posStyle;
    }

    titleClick(e) {
        this.setPosition();

        let style = this.setPosition();
        this.setState({
            contentPos: style,
            showContent: !this.state.showContent
        });
    }

    contentClick(e) {
        let node = findDOMNode(this);
        // 利用 findDomNode 来检测点击的是否为本组件
        if(this.props.contentClick){
            // 回调函数
            this.props.contentClick(this);
        }
    }

    render() {
        let titleCls = this.state.showContent ? 'show' : 'hide';
        return (
            <div className="rayr-dropd">
                <div ref={"dropTitle"} className="rayr-d-title" onClick={this.titleClick.bind(this)}>
                    {this.state.titleComponent}
                </div>
                <div ref={"dropContent"} className={`rayr-d-content ${titleCls}`} onClick={this.contentClick.bind(this)} style={this.state.contentPos}>
                    {this.state.contentComponent}
                </div>
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default RayrDropdown;
