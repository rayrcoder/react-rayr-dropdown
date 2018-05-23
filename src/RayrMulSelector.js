import React from 'react';
import {RayrToggle} from 'react-rayr-toggle';

class RayrMulSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedList: this.props.selectedList || [],
            selectIndex: [],
            mapOptions: new Map(),
            placeholder: this.props.placeholder || '请选择'
        };
    }

    componentDidMount() {
        this.processData(this.props);
        this.refs.checkBox.addEventListener('click', (e)=>{
            let target = e.target;
            if(target.className === 'item-delete'){
                e.stopPropagation();
                let index = target.getAttribute('index');
                let selectList = this.state.selectIndex;
                if(selectList.indexOf(parseInt(index)) !== -1){
                    // 删除
                    selectList.splice(selectList.indexOf(parseInt(index)), 1);
                }
                this.setState({
                    selectIndex: selectList
                });
            }
        });
    }
    
    componentWillUnmount() {
    }

    componentWillReceiveProps(newProps) {
        this.processData(newProps);
    }

    processData(props) {
        let originOpts = props.options;// 原始选项数组
        let optionsMap = new Map();
        let selectedList = props.selectedList || [];// 被选中的list
        let selectIndexList = [];

        originOpts.map((item, index) => {
            optionsMap.set(index, item);
            selectedList.map((newItem) => {
                if(item.label === newItem.label && item.value === newItem.value){
                    selectIndexList.push(index);
                }
            });

        });
        this.setState({
            mapOptions: optionsMap,
            selectIndex: selectIndexList,
            selectedList: selectedList
        });
    }

    chkItemClick(item) {
        let selectList = this.state.selectIndex;
        if(this.state.selectIndex.indexOf(parseInt(item[0])) !== -1){
            // 删除
            selectList.splice(selectList.indexOf(parseInt(item[0])), 1);
        }else{
            // 添加
            selectList.push(parseInt(item[0]));
        }
        this.setState({
            selectIndex: selectList
        },()=>{
            this.props.onChange(this.state.selectIndex);
        });
    }

    render() {
        let mainTransform = {fontSize: 'normal'};
        return (
            <RayrToggle className="checkbox-wrapper">
                <RayrToggle.Top>
                    <div key={"checkbox_first"} ref={"dropHeader"} className="drop-header">
                        <div className="checkbox-value" ref="checkBox">
                            {
                                this.state.selectIndex.length <= 0 ? <div className="chk-placeholder">{this.state.placeholder}</div> :
                                this.state.selectIndex.map((item, index) => {
                                    let selected = this.state.mapOptions.get(item);
                                    return (
                                        <span key={`checkitem_${index}`} className="selected-item">{selected ? selected.label: ''}
                                            <span className="item-delete" index={item}>&times;</span>
                                        </span>
                                    )
                                })
                            }
                            <span className="dropdown-select-icon"></span>
                        </div>
                    </div>
                </RayrToggle.Top>
                <RayrToggle.Box className="drop-main-selector">
                    <div key={"checkbox_two"} ref={"dropMain"} className={``} style={mainTransform}>
                        <ul className="drop-list drop-checkbox-list">
                            {
                                [...this.state.mapOptions].map((item, index) => {
                                    let itemCls = this.state.selectIndex.indexOf(index) !== -1 ? 'selected' : '';
                                    return (
                                        <li key={`radio_${index}`} className={`${itemCls}`} onClick={this.chkItemClick.bind(this, item)} index={index} value={item[1].value}>{item[1].label}</li>
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

export default RayrMulSelector;