import 'react-rayr-dropdown/src/RayrDropdown.scss';
import 'react-rayr-dropdown/src/demo.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDropdown} from 'react-rayr-dropdown';

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

function App() {
    return (
        <div className="dropd-demo">
            <h1>Dropdown页面组件demo页面</h1>
            <div className="dropd-demo-box">
                <div className="dropd-wrapper">
                    <h4>上方弹出</h4>
                    <RayrDropdown
                        titleCom={<Title />}
                        contentCom={<Content />}
                        pos={"top"}
                        contentClick={(e)=>{
                            console.log(e);
                        }}
                    />
                </div>
                <div className="dropd-wrapper">
                    <h4>下方弹出</h4>
                    <RayrDropdown
                        titleCom={<Title />}
                        contentCom={<Content />}
                        pos={"bottom"}
                    />
                </div>
                <div className="dropd-wrapper">
                    <h4>左边弹出</h4>
                    <RayrDropdown
                        titleCom={<Title />}
                        contentCom={<Content />}
                        pos={"left"}
                    />
                </div>
                <div className="dropd-wrapper">
                    <h4>右边弹出</h4>
                    <RayrDropdown
                        titleCom={<Title />}
                        contentCom={<Content />}
                        pos={"right"}
                    />
                </div>
                <div className="dropd-wrapper">
                    <h4>自适应弹出</h4>
                    <RayrDropdown
                        titleCom={<Title />}
                        contentCom={<Content />}
                        pos={"auto"}
                    />
                </div>
            </div>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
