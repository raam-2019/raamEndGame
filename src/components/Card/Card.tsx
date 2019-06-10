import * as React from 'react';

import styles from './Card.module.css';



export interface ICardProps {
  extraClassName?: string;
}

export const Card: React.SFC<ICardProps> = props => (
  <div className={`${styles.root} ${props.extraClassName || ''}`}>
    {props.children}
  </div>
);
