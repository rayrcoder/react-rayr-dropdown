import React from 'react';
import {RayrToggle} from 'react-rayr-toggle';

function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

class RayrTypebox extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        console.log(this.refs.typeInput);
        this.refs.typeInput.addEventListener('click', ()=>{
            this.inputClick();
        });
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
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

    // 处理input输入时候的监控
    handleChange(e) {
        console.log('input something!');
        let value = e.target.value;
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
                isActive: true
            });
        }
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

    inputClick() {
        console.log('input click');
    }

    render() {
        let options = this.props.options || [];

        return (
            <RayrToggle className="type-box">
                <RayrToggle.Top className="drop-header">
                    <input ref="typeInput" type="text" onClick={this.inputClick.bind(this)} value={this.state.value || ''} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder || '请选择'} />
                    <span className="dropdown-search-icon"></span>
                </RayrToggle.Top>
                <RayrToggle.Box className="drop-main">
                    {
                        (options == null || options.length <= 0) && this.state.value.length>0 ? <div className="drop-empty-result">无搜索结果</div> :
                        <ul className="drop-list">
                        {
                            options.map((item, index) => {
                                let itemCls = '';
                                return (
                                    <li key={`input_${index}`} className={`${itemCls}`} onClick={this.itemClick.bind(this)} index={index} value={item.value}>{item.label}</li>
                                );
                            })
                        }
                        </ul>
                    }
                </RayrToggle.Box>
            </RayrToggle>
        );
    }
}

export default RayrTypebox;