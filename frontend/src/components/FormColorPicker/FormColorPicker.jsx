import React from 'react';
import { Field } from 'redux-form';
import { ChromePicker } from 'react-color';
import onClickOutside from 'react-onclickoutside';

import './FormColorPicker.scss';

class FormColorPicker extends React.Component {
    state = {
        pickerVisible: false
    };
    handleClickOutside() {
        this.setState({ pickerVisible: false});
    }
    render() {
        const onTogglePicker = () => {
            this.setState({ pickerVisible: !this.state.pickerVisible });
        };
        const { input: { value, onChange, name } } = this.props;

        return (
            <div>
                <div className="colorpicker">
                    <Field
                        onClick={ onTogglePicker }
                        name={name}
                        component="input"
                        type="text"
                        autoComplete="off"
                        className="input"
                    />
                    <div className="preview-color" style={{ backgroundColor: `${value ? value : null}` }}></div>
                </div>
                { this.state.pickerVisible && (
                    <ChromePicker
                        style={{ position: 'absolute' }}
                        color={ value ? value : '#ffffff'}
                        disableAlpha={true}
                        onChange={ color => onChange(color.hex) }
                    />
                )}
            </div>
        );
    }
}
export default onClickOutside(FormColorPicker);