
import React from 'react';
import RayrToggle from './lib/RayrToggle';

class RayrCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedList: this.props.selectedList || [],
            selectIndex: [],
            mapOptions: new Map(),
            isActive: false,
            placeholder: this.props.placeholder || '请选择'
        };
    }

    componentDidMount() {
        this.processData();
    }

    componentWillReceiveProps(newProps) {}

    processData() {
        let originOpts = this.props.options;
        let optionsMap = new Map();
        let selectedList = this.state.selectedList;
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
            selectIndex: selectIndexList
        });
    }

    inputClick() {
        console.log('checkbox input click');
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
        console.log('check item click!');
    }



    render() {
        let mainTransform = {fontSize: 'normal'};
        let iconTrans = {transform: 'rotate(180deg)'};

        return (
            <RayrToggle className="checkbox-wrapper">
                <RayrToggle.Top>
                    <div key={"checkbox_first"} ref={"dropHeader"} className="drop-header">
                        <div className="checkbox-value" onClick={this.inputClick.bind(this)}>
                            {
                                this.state.selectIndex.length <= 0 ? this.state.placeholder :
                                this.state.selectIndex.map((item, index) => {
                                    let selected = this.state.mapOptions.get(item);

                                    return (
                                        <span key={`checkitem_${index}`} className="selected-item">{selected ? selected.label: ''}
                                            <span className="item-delete" onClick={this.chkItemClick.bind(this)}>&times;</span>
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
                    </div>
                </RayrToggle.Top>
                <RayrToggle.Box className="drop-main-selector">
                    <div key={"checkbox_two"} ref={"dropMain"} className={``} style={mainTransform}>
                        <ul className="drop-list drop-checkbox-list">
                            {
                                [...this.state.mapOptions].map((item, index) => {
                                    // console.log(item);
                                    let itemCls = this.state.selectIndex.indexOf(index) !== -1 ? 'selected' : '';
                                    let cls = this.state.selectedList.indexOf(index.toString()) !== -1 ? 'selected' : '';
                                    return (
                                        <li key={`radio_${index}`} className={`${cls}`} onClick={this.chkItemClick.bind(this, item)} index={index} value={item[1].value}>{item[1].label}</li>
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