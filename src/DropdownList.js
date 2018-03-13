import React from 'react';
import PropTypes from 'react-dom';
import classnames from 'classnames';

class DropdownList extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        console.log(this.props);
        return (
            <ul className="dropdown-list"
                onClick = {this.props.onClick.bind(this)}
            >
                {
                    this.props.list.map((item, index)=>{
                        return (
                            <li key={`dp-list-${index}`}
                                value={item.value}
                                label={item.label}
                                onClick = {(e)=>{
                                    console.log('点击选项');
                                    console.log(e.target);
                                    
                                }}
                            >
                                {item.label}
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

export default DropdownList;