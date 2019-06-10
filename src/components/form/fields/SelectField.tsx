import * as _ from 'lodash';
import * as React from 'react';

import styles from './Generic.module.css';



export interface IOption {
  id: string;
  displayValue: string;
}

export interface ISelectFieldProps {
  options: IOption[];
  noOptionText?: string;
  selectedId?: string;
  disabled?: boolean;
  extraClassName?: string;
  overrideClassName?: string;

  onChange: (selectedId: string) => void;
}

export class SelectField extends React.Component<ISelectFieldProps> {

  private __refInput: React.RefObject<HTMLSelectElement>;



  constructor(props: ISelectFieldProps) {
    super(props);
    this.__refInput = React.createRef();
  }



  public setCustomValidity = (message: string) => {
    if (this.__refInput.current) {
      this.__refInput.current.setCustomValidity(message);
    }
  };



  public render() {
    let className = `${styles.root} ${this.props.extraClassName || ''}`;
    if (this.props.overrideClassName) {
      className = this.props.overrideClassName;
    }

    let opts = this.__genOptions();
    if (this.props.noOptionText) {
      opts = _.concat([
        <option key="emptyText" value="">
          {this.props.noOptionText}
        </option>], opts);
    }

    return (
      <select
        ref={this.__refInput}
        className={className}
        disabled={this.props.disabled}
        placeholder={this.props.noOptionText}
        value={this.props.selectedId}
        onChange={this.__handleChange}>
        {opts}
      </select>
    );
  }



  private __genOptions = () =>
    _.map(this.props.options, opt => (
      <option
        key={opt.id}
        value={opt.id}>
        {opt.displayValue}
      </option>
    ));



  private __handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    this.props.onChange(ev.currentTarget.value);

}
