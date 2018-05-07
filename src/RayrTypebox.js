import React from 'react';
import RayrToggle from './lib/RayrToggle';

function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

class RayrTypebox extends React.Component {
    constructor() {
        super();
        this.state = {};
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

    render() {
        return (
            <RayrToggle className="type-box">
                <RayrToggle.Top className="drop-header">
                    <input  type="text" value={this.state.value || ''} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder || '请选择'} />
                    <span className="dropdown-search-icon"></span>
                </RayrToggle.Top>
                <RayrToggle.Box className="drop-main">
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
                </RayrToggle.Box>
            </RayrToggle>
        );
    }
}

export default RayrTypebox;