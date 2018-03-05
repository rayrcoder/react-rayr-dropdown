import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {RayrDropdown} from 'react-rayr-dropdown';

class RayrDropdown_Select extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            selected: {
                label: '',
                value: ''
            }
        };
    }

    handleChange(event) {
        console.log('onchange...');
        console.log(event.target);
        this.setState({
            value: event.target.value
        });
    }

    header(props) {
        console.log(props);
        console.log(this);

        return (
            <div className={`rayr-select-header`}>
                <input
                    readOnly="readonly"
                    className="select-header-input"
                    placeholder={this.props.placeholder || '请选择'}
                    value = {this.state.selected.label}
                    type="text"
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    itemClick(e) {
        let label = e.target.innerText;
        let value = e.target.getAttribute('value');
        this.setState({
            selected: {
                label: label,
                value: value
            }
        });
        // this.handleChange();
        console.log(value);
        console.log(this.state);
    }

    main(opts) {
        let _this = this;
        console.log(_this);

        return (
            <ul className={`rayr-select-main`}>
                {
                    opts.map((item, index)=>{
                        return (
                            <li className="rayr-select-item" key={'selectItem'+index}
                                value={item.value}
                                onClick={this.itemClick.bind(_this)}
                            >
                            {item.label}
                            </li>
                        )
                    })
                }
            </ul>
        );
    }



    render() {
        console.log(this.props.children);

        return (
            <div className="rayr-drop-select">
                <RayrDropdown
                    titleCom={this.header(this.state)}
                    contentCom={this.main(this.props.list)}
                    contentClick={(thisCom)=>{
                        thisCom.hide();
                    }}
                >

                    <div>{this.state.selected.label}</div>
                    <div className={`rayr-select-header`}>
                        <input
                            readOnly="readonly"
                            className="select-header-input"
                            placeholder={this.props.placeholder || '请选择'}
                            value = {this.state.selected.label}
                            type="text"
                            onChange={this.handleChange}
                        />
                    </div>
                </RayrDropdown>
                
            </div>
        );
    }
}

export default RayrDropdown_Select;