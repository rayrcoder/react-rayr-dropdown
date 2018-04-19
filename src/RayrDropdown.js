/*
* Dropdown组件
* */

import React from 'react';
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
        this.resizeEvent = this.resizeEvent.bind(this);
        this.onWindowClick = this.onWindowClick.bind(this);
    }

    componentWillMount() {
        // 请求数据
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeEvent);
        window.addEventListener('scroll', this.resizeEvent);
        window.addEventListener('click', this.onWindowClick);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeEvent);
        window.removeEventListener('scroll', this.resizeEvent);
        window.removeEventListener('click', this.onWindowClick);
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
        let offset = 4;
        if((winHeight - bottom) > (mainHeight + 10)){// 预留10px的位置
            posY = headerHeight + offset;
        }else{
            posY = -(mainHeight + offset);
        }
        return posY;
    }

    itemClick(e) {
        let value = e.target.value;
        let index = e.target.getAttribute('index');// 利用index标示当前选中的选项
        let label = e.target.innerHTML;
        this.props.onChange(this.props.options[index]);// 调用回调
        this.setState({
            value: label,
            isActive: !this.state.isActive,
            selectIndex: index
        });
    }

    inputClick(e) {
        let posY = this.getTranslateY();
        this.setState({
            isActive: !this.state.isActive,
            posY: posY
        });
    }

    // 处理input输入时候的监控
    handleChange(e) {
        let value = e.target.value;
        let posY = this.getTranslateY();
        this.props.onTypeChange(value);

        if(value === ''){
            // 输入为空的时候
            this.setState({
                value: value,
                isActive: false
            });
        }else{
            this.setState({
                value: value,
                isActive: true,
                posY: posY
            });
        }
        
    }

    initMain() {
        //  根据type的值来进行渲染
        let mainCls = this.state.isActive ? 'active' : 'hidden';
        let selectIndex = this.state.selectIndex;
        let {posY} = this.state;
        

        if(this.props.type === 'radio'){
            let mainTransform = {
                transform: `translate(0px, ${posY}px)`
            };
            // 选择框
            return ([
                <div ref={"dropHeader"} className="drop-header">
                    <input onClick={this.inputClick.bind(this)} type="text" value={this.state.value} placeholder={this.props.placeholder || '请选择'} readOnly="true"/>
                </div>,
                <div ref={"dropMain"} className={`drop-main ${mainCls}`} style={mainTransform}>
                <ul className="drop-list">
                    {
                        this.props.options.map((item, index) => {
                            let itemCls = index == selectIndex ? 'selected' : '';
                            return (
                                <li key={item.value} className={`${itemCls}`} onClick={this.itemClick.bind(this)} index={index} value={item.value}>{item.label}</li>
                            );
                        })
                    }
                </ul>
            </div>]);
        }else{
            // 输入框
            let mainTransform = {
                transform: `translate(0px, ${posY}px)`
            };
            return ([
                <div ref={"dropHeader"} className="drop-header">
                    <input  type="text" value={this.state.value || ''} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder || '请选择'} />
                </div>,
                <div ref={"dropMain"} className={`drop-main ${mainCls}`} style={mainTransform}>
                {
                    this.props.options == null || this.props.options.length <= 0 ? <div className="drop-empty-result">无搜索结果</div> : 
                    <ul className="drop-list">
                    {
                        this.props.options.map((item, index) => {
                            let itemCls = '';
                            return (
                                <li key={item.value} className={`${itemCls}`} onClick={this.itemClick.bind(this)} index={index} value={item.value}>{item.label}</li>
                            );
                        })
                    }
                    </ul>
                }
            </div>]);
        }
    }

    render() {
        return (
            <div className="dropdown">
                {
                    this.initMain()
                }
            </div>
        );
    }
}

export default Dropdown;
