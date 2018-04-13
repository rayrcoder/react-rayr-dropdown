import React from 'react';
import emitter from './events';

class DropContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {
        console.log(emitter);

        this.eventEmitter = emitter.addListener('toggleContent', (toggle) => {
            console.log(toggle);
            this.setState({
                isOpen: toggle
            });
        });
    }

    componentWillUnmount() {
        // 单独删除某个自定义事件的绑定，不能删除成功，有bug
        // emitter.removeListener('toggleContent', ()=>{
        //     console.log('toggle content callback');
        // });
        emitter.removeAllListeners();
    }

    clickContent(e) {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
            emitter.emit('changeStatus', this.state.isOpen);
        });
    }

    render() {
        let cls = this.state.isOpen ? 'active' : '';
        return (
            <div className={`dp-content ${cls}`} onClick={this.clickContent.bind(this)}>
                {
                    React.Children.map(this.props.children, (child) => {
                        return child;
                    })
                }
            </div>
        );
    }

}

export default DropContent;
