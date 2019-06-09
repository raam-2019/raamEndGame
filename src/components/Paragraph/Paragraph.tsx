import * as React from 'react';

import styles from './Paragraph.module.css';



export interface IParagraphProps {
  theme?: 'dark' | 'light';
  extraClassName?: string;
}

export const Paragraph: React.SFC<IParagraphProps> = props => (
  <p className={`${styles.root} ${props.theme ? styles[props.theme] : ''} ${props.extraClassName || ''}`}>
    {props.children}
  </p>
);
