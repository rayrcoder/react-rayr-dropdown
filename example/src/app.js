
import './index.scss';
import 'react-rayr-dropdown/src/RayrDropdown.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDropdown} from 'react-rayr-dropdown';

function App() {
    // 测试数据
    let list = [
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
    ];


    return (
        <div className="dropd-demo">
            <h1>Dropdown组件页面</h1>
            <div className="dropd-demo-box">
                {/*<h3>Demo-1</h3>*/}
                <RayrDropdown options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
            </div>

            <div className="dropd-demo-box">
                {/*<h3>Demo-1</h3>*/}
                <RayrDropdown options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
            </div>

            <div className="dropd-demo-box" style={{position: 'relative', top: '1000px'}}>
                {/*<h3>Demo-1</h3>*/}
                <RayrDropdown options={list} placeholder={`请点击此处进行选择`} onChange={(item)=>{console.log(item)}} />
            </div>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
