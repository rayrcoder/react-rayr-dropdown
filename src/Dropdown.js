/*
* Dropdown组件
* */

import React from 'react';
import './Dropdown.scss';
import {findDOMNode} from "react-dom";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            options: [],
            value: '',
            placeholder: '',
            isActive: false,
            selectIndex: -1,
            posY: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeEvent.bind(this));
        window.addEventListener('scroll', this.resizeEvent.bind(this));
        window.addEventListener('click', this.onWindowClick.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeEvent.bind(this));
        window.removeEventListener('scroll', this.resizeEvent.bind(this));
        window.removeEventListener('click', this.onWindowClick.bind(this));
    }

    onWindowClick(e) {
        const dropdownEle = findDOMNode(this);
        let isAc = this.state.isActive;
        // 当点击了组件以外的部分 && 点击的目标不在本组件任何地方 && 本组件选项是打开的 就关闭本组件
        // 当点击了组件以外的区域，关闭本组件显示出来的选项框
        if(e.target !== dropdownEle && !dropdownEle.contains(e.target) && isAc){
            this.setState({
                isActive: false
            });
        }
    }

    resizeEvent() {
        let posY = this.getTranslateY();
        this.setState({
            posY: posY
        });
    }

    getTranslateY() {
        // 计算 主体内容的显示位置，位移
        let headerDom = this.refs.dropHeader;
        let winHeight = window.innerHeight;
        let headerRect = headerDom.getBoundingClientRect();
        let mainRect = this.refs.dropMain.getBoundingClientRect();
        let bottom = headerRect.bottom;
        let headerHeight = headerRect.height;
        let mainHeight = mainRect.height;
        let posY = 0;
        if((winHeight - bottom) > (mainHeight + 10)){// 预留10px的位置
            posY = headerHeight + 10;
        }else{
            posY = -(mainHeight + 10);
        }

        return posY;
    }

    itemClick(e) {
        let value = e.target.value;
        let label = e.target.innerHTML;
        this.props.onChange({value: value, label: label});// 调用回调
        this.setState({
            value: label,
            isActive: !this.state.isActive,
            selectIndex: value
        });
    }

    inputClick(e) {
        let posY = this.getTranslateY();

        this.setState({
            isActive: !this.state.isActive,
            posY: posY
        });
    }

    render() {
        let mainCls = this.state.isActive ? 'active' : 'hidden';
        let selectIndex = this.state.selectIndex;
        let {posY} = this.state;

        let mainTransform = {
            transform: `translate(0px, ${posY}px)`
        };

        return (
            <div className="dropdown">
                <div ref={"dropHeader"} className="drop-header">
                    <input onClick={this.inputClick.bind(this)} type="text" value={this.state.value} placeholder={this.props.placeholder} readOnly="true"/>
                </div>
                <div ref={"dropMain"} className={`drop-main ${mainCls}`} style={mainTransform}>
                    <ul className="drop-list">
                        {
                            this.props.options.map((item) => {
                                let itemCls = item.value === selectIndex ? 'selected' : '';
                                return (
                                    <li key={item.value} className={`${itemCls}`} onClick={this.itemClick.bind(this)} value={item.value}>{item.label}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dropdown;
