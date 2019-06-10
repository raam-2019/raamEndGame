import * as React from 'react';

import styles from './Generic.module.css';



export type IRequiredMode = 'notRequired' | 'required';

export interface IInputFieldProps {
  type: 'email' | 'text' | 'password' | 'number';
  fieldName?: string;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
  extraClassName?: string;
  overrideClassName?: string;
  autoComplete?: boolean;
  required?: boolean;
  disableValidateOnChange?: boolean;
  disabled?: boolean;
}

/**
 * Intended to be a generic text field control that is simply used as a partial
 * implementation of other controls that require a text input control.
 */
export class InputField extends React.Component<IInputFieldProps> {

  private __refInput = React.createRef<HTMLInputElement>();



  public setCustomValidity = (errorMessage: string) => {
    if (this.__refInput.current) {
      this.__refInput.current.setCustomValidity(errorMessage);
    }
  };



  public render() {
    let className = `${styles.root} ${this.props.extraClassName || ''}`;
    if (this.props.overrideClassName) {
      className = this.props.overrideClassName;
    }

    let autoComplete = 'on';
    if (this.props.hasOwnProperty('autoComplete')) {
      autoComplete = this.props.autoComplete ? 'on' : 'invalid';
    }

    return (
      <input
        ref={this.__refInput}
        type={this.props.type}
        className={className}
        name={this.props.fieldName}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.__handleChange}
        autoComplete={autoComplete}
        required={this.props.required}
        disabled={this.props.disabled} />
    );
  }



  private __handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange(event.currentTarget.value);

}
