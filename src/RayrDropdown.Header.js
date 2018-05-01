
import React from 'react';

class DropdownHeader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log(this.props.key);

        return (
            <div key={this.props.key} ref={this.props.headerRef} onClick={this.props.onHeaderClick} className="drop-header">
                {
                    React.Children.map(this.props.children, (child)=> {
                        return child;
                    })
                }
            </div>
        );
    }
}

export default DropdownHeader;
