import React from 'react';
import {RayrToggle} from 'react-rayr-toggle';

function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

class RayrSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            optsions: [],
            mapOptions: new Map(),
            isActive: false,
            selectIndex: -1
        };
    }
    componentDidMount() {
        this.processData(this.props);
    }

    componentWillReceiveProps(newProps) {
        // 外部参数改变,就再重新更新数据，重新渲染
        this.processData(newProps);
    }

    processData(props) {
        // 预处理数据
        let originOpts = props.options || [];
        let optionsMap = new Map();
        let selected = props.selected || this.state.selected;
        let selectIndex = -1;

        originOpts.map((item, index) => {
            optionsMap.set(index, item);
            if(selected && selected.label == item.label && selected.value == item.value){
                // 暂时用非全等
                selectIndex = index;
            }
        });

        this.setState({
            mapOptions: optionsMap,
            selectIndex: selectIndex
        });
    }

    itemClick(item, index) {
        this.props.onChange(item);
        this.setState({
            selectIndex: index
        });
    }

    render() {
        let mainTransform = {fontSize: 'normal'};
        let selected = this.state.mapOptions.get(this.state.selectIndex);
        return (
            <RayrToggle className="selector-wrapper">
                <RayrToggle.Top>
                    <div key={"radio_first"} ref={"dropHeader"} className="drop-header">
                        <input type="text" value={selected ? selected.label : ''} placeholder={this.props.placeholder || '请选择'} readOnly="true"/>
                        <span className="dropdown-select-icon"></span>
                    </div>
                </RayrToggle.Top>
                <RayrToggle.Box className={`drop-main-selector`}>
                    <div key={"radio_two"} ref={"dropMain"} className={`drop-main`} style={mainTransform}>
                        <ul className="drop-list">
                            {
                                [...this.state.mapOptions].map((item, index)=>{
                                    let itemCls = index == this.state.selectIndex ? 'selected' : '';
                                    return (
                                        <li key={`radio_${index}`} className={`${itemCls}`} onClick={this.itemClick.bind(this, item[1], index)} index={index} value={item[1].value}>{item[1].label}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </RayrToggle.Box>
            </RayrToggle>
        );
    }
}

export default RayrSelector;