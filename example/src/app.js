
import './index.scss';
import 'react-rayr-dropdown/src/RayrDropdown.scss';
import 'react-rayr-dropdown/src/lib/RayrToggle.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDropdown, RayrSelector, RayrCheckbox, RayrTypebox} from 'react-rayr-dropdown';
import {RayrBtn} from 'react-rayr-btn';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selectOpts: [
                {
                    value: null,
                    label: '拼车'
                },{
                    value: 1,
                    label: '快车'
                },{
                    value: 2,
                    label: '优享'
                }
            ],
            checkOpts: [
                {
                    value: null,
                    label: '拼车'
                },{
                    value: 1,
                    label: '快车'
                },{
                    value: 2,
                    label: '优享'
                },
                {
                    value: 3,
                    label: '专车'
                },
                {
                    value: 4,
                    label: ' 小巴'
                },
                {
                    value: 5,
                    label: '共享汽车'
                }
            ],
            inputOpts: [],
            optMap: {
                '广州': [{value: 0, label: '广州市'},{value: 1, label: '广州市海珠区'},{value: 2, label: '广州大学城'}],
                '北京': [{value: 0, label: '北京西单'},{value: 1, label: '北京三里屯'},{value: 2, label: '北京五道口'}],
                '上海': []
            },
            selectedItme: {value: 2, label: '优享'}
        };
    }

    inputChange(value) {
        let str = value.split('');
        let opts = [];

        let searchOpts = this.state.optMap[value];
        str.map((item, index) => {
            opts.push({
                value: index,
                label: item
            });
        });

        this.setState({
            inputOpts: searchOpts
        });
    }

    refresh(){
        this.setState({
            selectedItme: {value: null, label: '刘备'},
            selectOpts: [
                {
                    value: null,
                    label: '刘备'
                },{
                    value: 1,
                    label: '曹操'
                },{
                    value: 2,
                    label: '孙权'
                },
                {
                    value: 3,
                    label: '诸葛孔明'
                },
                {
                    value: 4,
                    label: '庞统'
                },
                {
                    value: 5,
                    label: '贾诩'
                }
            ],
            checkOpts: [
                {
                    value: null,
                    label: '刘备'
                },{
                    value: 1,
                    label: '曹操'
                },{
                    value: 2,
                    label: '孙权'
                },
                {
                    value: 3,
                    label: '诸葛孔明'
                },
                {
                    value: 4,
                    label: '庞统'
                },
                {
                    value: 5,
                    label: '贾诩'
                }
            ]
        })
    }

    reset() {
        let selector = this.refs.selector_second;
        selector.testFnc('外部传参!');
    }

    render() {
        return (
            <div className="dropd-demo">
                <h1>Dropdown</h1>
                <div className="show-box">
                    <h3>Selector选择器</h3>
                    <div className="show-content">
                        <div className="md-box">
                            <RayrSelector key={"1"} options={this.state.selectOpts} selected={this.state.selectedItme} placeholder={``} onChange={(item)=>{console.log(item)}} />
                        </div>

                        <div className="lg-box">
                            <RayrSelector ref="selector_second" key={"1"} options={this.state.selectOpts} selected={{}} placeholder={``} onChange={(item)=>{console.log(item)}} />
                        </div>

                        <div className="lg-box">
                            <RayrBtn type="primary" onClick={this.refresh.bind(this)}>更新数据</RayrBtn>
                            {/* <RayrBtn type="primary" onClick={this.reset.bind(this)}>重置组件</RayrBtn> */}
                        </div>
                    </div>
                </div>

                <div className="show-box">
                    <h3>MulSelector基础多选</h3>
                    <div className="show-content">
                        <div className="md-box">
                            <RayrCheckbox options={this.state.checkOpts} placeholder={`请选择（多选）`} selectedList={[this.state.selectedItme]} onChange={(item)=>{console.log(item)}} />
                        </div>
                    </div>
                </div>

                <div className="show-box">
                    <h3>TypeBox搜索框</h3>
                    <div className="show-content">
                        <div className="md-box">
                            <RayrTypebox options={this.state.inputOpts} placeholder={`点击此处进行输入`} onChange={(item)=>{console.log(item)}} onTypeChange={this.inputChange.bind(this)} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
