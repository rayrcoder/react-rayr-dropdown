import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'react-dom';
import classnames from 'classnames';

class Dropdown extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isOpen: false,
            position: props.pos || 'auto',
            bodyPos: null,
            offset: 10,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            value: '',
            type: props.type
        };
        this._onWindowClick = this._onWindowClick.bind(this);// 非常重要
    }

    componentDidMount() {
        window.addEventListener('click', this._onWindowClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._onWindowClick);
    }

    _onWindowClick(event) {
        const dropdownEle = findDOMNode(this);
        let isActive = this.isActive();
        if(event.target !== dropdownEle && !dropdownEle.contains(event.target) && this.isActive()){
            this.hide();
        }
    }

    handleHeaderClick() {
        console.log('handle header click');

        let posStyle = this.setPosition();
        this.setState({
            bodyPos: posStyle,
            isOpen: !this.state.isOpen
        });
    }

    handleBodyClick(e) {
    }

    isActive() {
        return this.state.isOpen;
    }

    hide() {
        this.setState({
            isOpen: false
        });
    }

    changeValue(data) {
        this.setState({
            value: data,
            isOpen: false
        });
    }

    setPosition() {
        // 设置点击后显示的位置
        let titleDom = findDOMNode(this.refs.dropTitle);
        let contentDom = findDOMNode(this.refs.dropContent);
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

    render() {
        const body = this.props.body;
        const header = this.props.header;

        return (
            <div className="dropdown-wrapper">
                {React.cloneElement(header, {
                    onClick: this.handleHeaderClick.bind(this),
                    ref: 'dropTitle',
                    value: this.state.value,
                    type: this.props.type
                })}
                {React.cloneElement(body, {
                    onClick: this.handleBodyClick.bind(this),
                    isopen: this.state.isOpen,
                    ref: 'dropContent',
                    style: this.state.bodyPos,
                    changeValue: this.changeValue.bind(this)
                })}
            </div>
        );
    }
}

export default Dropdown;