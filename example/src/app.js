import 'react-rayr-dropdown/src/Dropdown.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Dropdown, DropHeader, DropContent} from 'react-rayr-dropdown';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="dropdown-title">
                <h4>Doprdown-Header</h4>
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="dropdown-content">
                <h5>Dropdown详细信息</h5>
                <div className="details">
                    <div className="de-info">
                        <span>详细信息_1：</span>
                        <span>详细信息内容xxxxxxx</span>
                    </div>
                    <div className="de-info">
                        <span>详细信息_2：</span>
                        <span>详细信息内容xxxxxxx</span>
                    </div>
                </div>
            </div>
        );
    }
}

function itemClick() {

}

function App() {
    let list = [
        {
            value: 0,
            label: '苹果'
        },{
            value: 1,
            label: '香蕉'
        },{
            value: 2,
            label: '凤梨'
        }];


    return (
        <div className="dropd-demo">
            <h1>Dropdown页面组件demo页面</h1>
            <div className="dropd-demo-box">
                <div>
                    <Dropdown>
                        <DropHeader>
                            <h3>Header</h3>
                        </DropHeader>
                        <DropContent>
                            <ul>
                                <li>content1</li>
                                <li>content2</li>
                                <li>content3</li>
                            </ul>
                        </DropContent>
                    </Dropdown>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
