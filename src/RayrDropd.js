import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class RayrDropd extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            position: props.pos || 'auto',// 默认值为auto，其他几个值是left,right,top,bottom
            titleComponent: props.titleCom || '',
            contentComponent: props.contentCom || '',
            contentPos: null,
            showContent: false,
            offset: 10,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        };
    }

    setPosition() {
        // 设置点击后显示的位置
        let titleDom = this.refs.dropTitle;
        let contentDom = this.refs.dropContent;
        let titleRect = titleDom.getBoundingClientRect();
        let contentRect = contentDom.getBoundingClientRect();
        let horOffset = titleRect.width;// 水平偏移量
        let verOffset = titleRect.height;// 垂直偏移量
        let contentWid = contentRect.width;
        let contentHei = contentRect.height;
        let posStyle = {};

        switch(this.state.position){
            case 'top':
                posStyle = {
                    'top': -(parseInt(contentHei) + this.state.offset) + 'px',
                    'left': 0
                }
                break;
            case 'bottom':
                posStyle = {
                    'top': (parseInt(verOffset) + this.state.offset) + 'px',
                    'left': 0
                }
                break;
            case 'left':
                posStyle = {
                    'top': 0,
                    'left': -(parseInt(contentWid) + this.state.offset) + 'px'
                }
                break;
            case 'right':
                posStyle = {
                    'top': 0,
                    'left': (parseInt(horOffset) + this.state.offset) + 'px'
                }
                break;
            default:
                // auto的情况
                if((this.state.winHeight - titleRect.bottom) < (contentHei + this.state.offset)){
                    // 上方显示
                    posStyle = {
                        'top': -(parseInt(contentHei) + this.state.offset) + 'px',
                        'left': 0
                    }
                }else{
                    // 下方显示
                    posStyle = {
                        'top': (parseInt(verOffset) + this.state.offset) + 'px',
                        'left': 0
                    }
                }
                break;
        }
        return posStyle;
    }

    titleClick(e) {

        console.log('title click');
        this.setPosition();

        let style = this.setPosition();
        this.setState({
            contentPos: style,
            showContent: !this.state.showContent
        });
    }

    contentClick(e) {
        console.log('content click');
        if(this.props.contentClick){
            // 回调函数
            this.props.contentClick(this);
        }
    }

    render() {
        let titleCls = this.state.showContent ? 'show' : 'hide';

        return (
            <div className="rayr-dropd">
                <div ref={"dropTitle"} className="rayr-d-title" onClick={this.titleClick.bind(this)}>
                    {this.state.titleComponent}
                </div>
                <div ref={"dropContent"} className={`rayr-d-content ${titleCls}`} onClick={this.contentClick.bind(this)} style={this.state.contentPos}>
                    {this.state.contentComponent}
                </div>
            </div>
        );
    }
}

export default RayrDropd;
