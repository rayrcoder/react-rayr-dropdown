import React from 'react';
import PropTypes from 'react-dom';
import classnames from 'classnames';

class DropdownBody extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    setValue(e) {
        console.log('set value');
        console.log(e.target);
        let value = e.target.innerHTML;
        this.props.changeValue(value);
    }

    render() {
        let cls = this.props.isopen ? 'show' : 'hide';

        return (
            <div 
                className={`dropdown-body ${cls}`}
                style={this.props.style}
                onClick={this.props.onClick}
            >
                {
                    React.cloneElement(this.props.children, {
                        onClick: this.setValue.bind(this)
                    })
                }
            </div>
        );
    }
}

export default DropdownBody;