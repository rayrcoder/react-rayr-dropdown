import 'react-rayr-dropdown/src/RayrDropdown.scss';
import 'react-rayr-dropdown/src/demo.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDropdown, RayrDropdown_Select, Grid, Game, Dropdown} from 'react-rayr-dropdown';

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
                {/* <div className="dropd-wrapper">
                    <h4>上方弹出</h4>
                    <RayrDropdown
                        titleCom={<Title />}
                        contentCom={<Content />}
                        pos={"top"}
                        contentClick={(thisCom)=>{
                            console.log(thisCom);
                            // 从内部传入了 本组件实例
                            // 可以直接调用内部方法
                            // thisCom.hide();
                        }}
                    >
                        <div name="dropdown-header"></div>
                        <div name="dropdown-content"></div>
                    </RayrDropdown>
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
                <div className="dropd-wrapper">
                    <h4>下拉选择框</h4>
                    <RayrDropdown_Select
                        selected={{}}
                        list={list}
                    />
                </div>
                <div className="demo-zone">
                        <Grid>
                            <div>Hello This is a row</div>
                            <RayrDropdown_Select
                                selected={{}}
                                list={list}
                            />
                        </Grid>
                </div>
                <div>
                    <Game />
                </div> */}
                <div>
                    {/* 简单版的dropdown */}
                    <Dropdown
                        pos="auto"
                        type="simple"
                        header={(
                            <Dropdown.Header>
                                <div className="dp-headerbox">
                                    BOX
                                </div>
                            </Dropdown.Header>
                        )}
                        body={(
                            <Dropdown.Body>
                                <div className="dp-bodybox">
                                    BOX-2
                                </div>
                            </Dropdown.Body>
                        )}
                        
                    />
                </div>

                <div>
                    {/* 选择框dropdown */}
                    <Dropdown
                        pos="auto"
                        type="selector"
                        header={(
                            <Dropdown.Header>
                            </Dropdown.Header>
                        )}
                        body={(
                            <Dropdown.Body>
                                <Dropdown.List
                                    list={list}
                                    onChange={(data)=>{
                                        console.log(data);
                                    }}
                                />
                            </Dropdown.Body>
                        )}
                        
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
