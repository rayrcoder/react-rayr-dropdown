import React from 'react';
import emitter from './events';

class DropHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
    }

    componentDidMount() {
        this.eventEmitter = emitter.addListener('changeStatus', (status) => {
            this.setState({
                toggle: status
            });
        });
    }

    componentWillUnmount() {
        emitter.removeAllListeners();
    }

    toggle() {
        let toggle = !this.state.toggle;
        emitter.emit('toggleContent', toggle);
        this.setState({
            toggle: toggle
        });
    }

    render() {
        return (
            <div className="dp-trigger" onClick={this.toggle.bind(this)}>
                {
                    React.Children.map(this.props.children, (child) => {
                        return child;
                    })
                }
            </div>
        );
    }

}

export default DropHeader;
