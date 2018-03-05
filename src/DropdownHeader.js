import React from 'react';
import PropTypes from 'react-dom';
import classnames from 'classnames';

class DropdownHeader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    renderInput() {
        return (
            <input 
                value={this.props.value}
                onChange={this.onChange.bind(this)}
                placeholder="请选择" />
        );
    }

    onChange(data) {
        console.log('input change');
        console.log(data);
    }

    renderSimple() {
        return (
            React.cloneElement(this.props.children, {
                params: ''
            })
        );
    }

    renderHeader() {
        switch (this.props.type){
            case 'simple':
                return this.renderSimple.bind(this);
            case 'selector':
                return this.renderInput.bind(this);
            case 'input':
                return this.renderInput.bind(this);
            default:
                return null;
        }
    }

    render() {
        let renderFnc = this.renderHeader();
        console.log(renderFnc);

        return (
            <div 
                className="dropdown-header"
                onClick = {this.props.onClick}
            >
                {
                    renderFnc()
                }
            </div>
        );
    }
}

export default DropdownHeader;