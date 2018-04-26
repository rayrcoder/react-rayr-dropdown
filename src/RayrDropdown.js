/*
* Dropdown组件
* */

import React from 'react';
import {findDOMNode} from "react-dom";
import RayrDropdownHeader from './RayrDropdown.Header';

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
            selectedList: [],
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

    getTranslateY(header, body) {
        // 计算 主体内容的显示位置，位移
        let headerDom = this.refs.dropHeader || header;
        let bodyDom = this.refs.dropMain || body;
        let winHeight = window.innerHeight;
        let headerRect = headerDom.getBoundingClientRect();
        let mainRect = bodyDom.getBoundingClientRect();
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
        let header = e.currentTarget;
        let body = e.currentTarget.nextElementSibling;
        let posY = this.getTranslateY(header, body);
        let target = e.target;
        console.log(target.className);
        if(target.className == 'item-delete'){
            // 点击了复选框删除按钮
            this.setState({
                isActive: true,
                // selectedList: [],
                posY: posY
            });
        }else{
            this.setState({
                isActive: !this.state.isActive,
                posY: posY
            });
        }
    }

    chkItemClick(e) {
        let index = e.target.getAttribute('index');// 利用index标示当前选中的选项
        let label = e.target.innerHTML;
        this.props.onChange(this.state.selectedList);// 调用回调
        let selectedList = this.state.selectedList;

        // 遍历selectedList 到options里面去对比，看是否被选中了
        if(this.state.selectedList.indexOf(index) === -1){
            // 没有就往里面添加
            selectedList.push(index);
        }else{
            // 有就从里面删除
            selectedList.splice(selectedList.indexOf(index), 1);
        }

        this.setState({
            selectedList: selectedList
        });
    }

    chkClose(e) {

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
        let iconTrans = {transform: 'rotate(180deg)'};


        if(this.props.type === 'radio'){
            let mainTransform = {
                transform: `translate(0px, ${posY}px)`
            };
            // 选择框
            return ([
                <div key={"radio_first"} ref={"dropHeader"} className="drop-header">
                    <input onClick={this.inputClick.bind(this)} type="text" value={this.state.value} placeholder={this.props.placeholder || '请选择'} readOnly="true"/>
                    {
                        this.state.isActive ? <span className="dropdown-select-icon" style={iconTrans}></span> : <span className="dropdown-select-icon"></span>
                    }
                </div>,
                <div key={"radio_two"} ref={"dropMain"} className={`drop-main ${mainCls}`} style={mainTransform}>
                    <ul className="drop-list">
                        {
                            this.props.options.map((item, index) => {
                                let itemCls = index == selectIndex ? 'selected' : '';
                                return (
                                    <li key={`radio_${index}`} className={`${itemCls}`} onClick={this.itemClick.bind(this)} index={index} value={item.value}>{item.label}</li>
                                );
                            })
                        }
                    </ul>
                </div>]);
        }else if(this.props.type === 'input'){
            // 输入框
            let mainTransform = {
                transform: `translate(0px, ${posY}px)`
            };
            return ([
                <div key={"input_first"} ref={"dropHeader"} className="drop-header">
                    <input  type="text" value={this.state.value || ''} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder || '请选择'} />
                    <span className="dropdown-search-icon"></span>
                </div>,
                <div key={"input_second"} ref={"dropMain"} className={`drop-main ${mainCls}`} style={mainTransform}>
                    {
                        this.props.options == null || this.props.options.length <= 0 ? <div className="drop-empty-result">无搜索结果</div> :
                        <ul className="drop-list">
                        {
                            this.props.options.map((item, index) => {
                                let itemCls = '';
                                return (
                                    <li key={`input_${index}`} className={`${itemCls}`} onClick={this.itemClick.bind(this)} index={index} value={item.value}>{item.label}</li>
                                );
                            })
                        }
                        </ul>
                    }
                </div>]);
        }else{
            // 多选
            let mainTransform = {
                transform: `translate(0px, ${posY}px)`
            };
            return([
                <div key={"checkbox_first"} ref={"dropHeader"} className="drop-header">
                    {/*<input onClick={this.inputClick.bind(this)} type="text" value={this.state.value} placeholder={this.props.placeholder || '请选择'} readOnly="true"/>*/}
                    <div className="checkbox-value" onClick={this.inputClick.bind(this)}>
                        {
                            this.state.selectedList.map((item, index) => {
                                return (
                                    <span key={`checkitem_${index}`} className="selected-item">{this.props.options[parseInt(item)].label}
                                        <span className="item-delete" index={item} onClick={this.chkItemClick.bind(this)}>&times;</span>
                                    </span>
                                )
                            })
                        }
                        {/*{*/}
                            {/*this.state.selectedList.length > 0 ? (<span className="check-close" onClick={this.chkClose.bind(this)}>&times;</span>) : null*/}
                        {/*}*/}
                        {
                            this.state.isActive ? <span className="dropdown-select-icon" style={iconTrans}></span> : <span className="dropdown-select-icon"></span>
                        }
                    </div>
                </div>,
                <div key={"checkbox_two"} ref={"dropMain"} className={`drop-main ${mainCls}`} style={mainTransform}>
                    <ul className="drop-list drop-checkbox-list">
                        {
                            this.props.options.map((item, index) => {
                                let itemCls = index == selectIndex ? 'selected' : '';
                                let cls = this.state.selectedList.indexOf(index.toString()) !== -1 ? 'selected' : '';

                                return (
                                    <li key={`radio_${index}`} className={`${cls}`} onClick={this.chkItemClick.bind(this)} index={index} value={item.value}>{item.label}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            ]);
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
