import * as React from 'react';

import styles from './InputRow.module.css';



export interface IInputRowProps {
  extraClassName?: string;
}

export const InputRow: React.SFC<IInputRowProps> = props => (
  <div className={`${styles.inputRow} ${props.extraClassName || ''}`}>
    {props.children}
  </div>
);
