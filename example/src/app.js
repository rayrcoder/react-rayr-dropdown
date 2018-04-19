
import './index.scss';
import 'react-rayr-dropdown/src/RayrDropdown.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDropdown} from 'react-rayr-dropdown';

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
            }
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

    render() {
        return (
            <div className="dropd-demo">
                <h1>Dropdown组件页面</h1>
                
                <div className="dropd-demo-box">
                    <h4>单选框</h4>
                    <RayrDropdown type="radio" options={this.state.selectOpts} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
                </div>
    
                <div className="dropd-demo-box">
                    <h4>复选框</h4>
                    <RayrDropdown type="radio" options={this.state.selectOpts} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
                </div>
    
                <div className="dropd-demo-box">
                    <h4>输入框</h4>
                    <RayrDropdown type="input" options={this.state.inputOpts} placeholder={`点击此处进行输入`} onTypeChange={this.inputChange.bind(this)} onChange={(item)=>{console.log(item)}} />
                </div>

                <div className="dropd-demo-box" style={{position: 'relative', top: '1000px'}}>
                    <h4>输入框</h4>
                    <RayrDropdown type="input" options={this.state.inputOpts} placeholder={`点击此处进行输入`} onTypeChange={this.inputChange.bind(this)} onChange={(item)=>{console.log(item)}} />
                </div>
            </div>
        )
    }
}

// function App() {
//     // 测试数据
//     let list = [
//         {
//             value: null,
//             label: '拼车'
//         },{
//             value: 1,
//             label: '快车'
//         },{
//             value: 2,
//             label: '优享'
//         },
//         {
//             value: 3,
//             label: '专车'
//         },
//         {
//             value: 4,
//             label: ' 小巴'
//         },
//         {
//             value: 5,
//             label: '共享汽车'
//         }
//     ];


//     return (
//         <div className="dropd-demo">
//             <h1>Dropdown组件页面</h1>
            
//             <div className="dropd-demo-box">
//                 <h4>单选框</h4>
//                 <RayrDropdown type="radio" options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
//             </div>

//             <div className="dropd-demo-box">
//                 <h4>复选框</h4>
//                 <RayrDropdown type="checkbox" options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
//             </div>

//             <div className="dropd-demo-box">
//                 <h4>输入框</h4>
//                 <RayrDropdown type="input" options={[]} placeholder={`点击此处进行输入`} onChange={(item)=>{console.log(item)}} />
//             </div>

//             <div className="dropd-demo-box" style={{position: 'relative', top: '1000px'}}>
//                 <h4>单选框</h4>
//                 <RayrDropdown type="simple" options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
//             </div>
//         </div>
//     )
// }

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
