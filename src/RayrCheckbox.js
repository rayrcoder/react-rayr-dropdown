import React from 'react';
import {RayrToggle} from 'react-rayr-toggle';

class RayrCheckbox extends React.Component {
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
        this.processData();
    }

    componentWillReceiveProps(newProps) {
        
    }

    processData() {
        let originOpts = this.props.options;// 原始选项数组
        let optionsMap = new Map();
        let selectedList = this.state.selectedList;// 被选中的list
        let selectIndexList = [];

        originOpts.map((item, index) => {
            optionsMap.set(index, item);
            selectedList.map((newItem) => {
                console.log(newItem);
                console.log(item);
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
        console.log(item);
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
        });
    }

    closeItem(item) {
        console.log('click item close btn!');
    }

    render() {
        let mainTransform = {fontSize: 'normal'};
        return (
            <RayrToggle className="checkbox-wrapper">
                <RayrToggle.Top>
                    <div key={"checkbox_first"} ref={"dropHeader"} className="drop-header">
                        <div className="checkbox-value">
                            {
                                this.state.selectIndex.length <= 0 ? <div className="chk-placeholder">{this.state.placeholder}</div> :
                                this.state.selectIndex.map((item, index) => {
                                    let selected = this.state.mapOptions.get(item);
                                    return (
                                        <span key={`checkitem_${index}`} className="selected-item">{selected ? selected.label: ''}
                                            <span className="item-delete" onClick={this.closeItem.bind(this)}>&times;</span>
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

export default RayrCheckbox;