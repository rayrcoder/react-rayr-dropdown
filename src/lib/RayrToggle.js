import './RayrToggle.scss'
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from "react-dom";
import {EventEmitter} from 'events';

const rayrEmitter = new EventEmitter();

function getStyleFn(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

class Box extends React.Component {

    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    render() {
        return (
            <div className={`rayr-toggle-box ${this.props.className}`}>
                {this.props.children}
            </div>
        );
    }
}

class Top extends React.Component {

    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    render() {
        return (
            <div className={`rayr-toggle-top ${this.props.className}`}>
                {this.props.children}
            </div>
        );
    }
}

class RayrToggle extends React.Component {

    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    static Box = Box;

    static Top = Top;

    constructor() {
        super()
        this.oTop = null;
        this.oBox = null;
        this.oPar = null;
        this.mounted = true;
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount() {

        document.addEventListener('click', this.handleDocumentClick, false);
        this.handleInitClick();
    }

    componentWillUnmount() {
        this.mounted = false
        document.removeEventListener('click', this.handleDocumentClick, false);
    }

    handleDocumentClick(e) {
        // this.mounted && rayrEmitter.emit('click.rayr.hide.all');
        const thisDom = findDOMNode(this);
        let _visiable = getStyleFn(this.oBox, 'display');
        if(e.target !== thisDom && !thisDom.contains(e.target) && _visiable === 'block'){
            this.oBox.style.display = 'none';
        }

    }

    handleInitClick() {

        this.oTop = this.refs.rayrToggle.children[0];
        this.oBox = this.refs.rayrToggle.children[1];

        this.oTop.addEventListener('click', (e) => {
            // e.stopPropagation();
            let _visiable = getStyleFn(this.oBox, 'display');
            rayrEmitter.emit('click.rayr.hide.all');
            if (_visiable === 'none') {
                this.oBox.style.display = 'block';
            }
        }, false);

        this.oBox.addEventListener('click', (e) => {
            if(this.oBox.contains(e.target)){
                rayrEmitter.emit('click.rayr.hide.all');
            }

            // if (e.target === this.oBox) {
            //     rayrEmitter.emit('click.rayr.hide.all');
            // }
        }, false);

        rayrEmitter.on('click.rayr.hide.all', () => {
            // console.log('emmiter trigger');
            this.oBox.style.display = 'none';
        });
    }

    render() {
        return (
            <div {...this.props} className={`rayr-toggle ${this.props.className}`} ref="rayrToggle">
                {this.props.children}
            </div>
        );
    }
}

export default RayrToggle;
