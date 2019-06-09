import * as _ from 'lodash';
import * as React from 'react';

import styles from './Paragraph.module.css';



export interface IParagraphProps {
  theme?: 'dark' | 'light';
  extraClassName?: string;

  useMargin?: boolean;
}

export const Paragraph: React.SFC<IParagraphProps> = props => (
  <p
    className={`${styles.root} ${props.theme ? styles[props.theme] : ''} ${props.extraClassName || ''}`}
    style={{margin: !_.isUndefined(props.useMargin) && !props.useMargin ? 0 : undefined}}>
    {props.children}
  </p>
);
