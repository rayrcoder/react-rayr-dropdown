/*
* Dropdown组件
* */

import React from 'react';
import { findDOMNode } from 'react-dom';
import './Dropdown.scss';

class Dropdown extends React.Component {
    constructor(props) {
        super();
        this.state = {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        };
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
        return (
            <div className="dropdown">
                {
                    React.Children.map(this.props.children, (child) => {
                        return child;
                    })
                }
            </div>
        );
    }
}

export default Dropdown;
