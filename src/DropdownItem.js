import React from 'react';
import PropTypes from 'react-dom';
import classnames from 'classnames';

class DropdownItem extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick(e) {
        console.log('handle click');
        let target = e.target;
        let value = target.innerHTML;
    }

    render() {
        console.log(this.props);
        return (
            <li
                value={this.props.value}
                label={this.props.label}
                onClick={this.handleClick.bind(this)}
            >
                {this.props.children}
            </li>
        );
    }
}

export default DropdownItem;