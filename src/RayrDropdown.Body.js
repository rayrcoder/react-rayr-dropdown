
import React from 'react';

class DropdownBody extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        let opts = this.props.opts;
        let mainCls = opts.isActive ? 'active' : 'hidden';
        let posY = opts.posY;
        let mainTransform = {
            transform: `translate(0px, ${posY}px)`
        };
        console.log(opts);
        console.log(mainTransform);

        console.log(this.props);
        return (
            <div key={this.props.key} className={`drop-main ${mainCls}`} style={mainTransform}>
                {
                    React.Children.map(this.props.children, (child)=> {
                        return child;
                    })
                }
            </div>
        );
    }
}

export default DropdownBody;
