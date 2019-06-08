import * as React from 'react';

import styles from './ResponsiveContainer.module.css';



export interface IResponsiveContainerProps {}

export const ResponsiveContainer: React.FC<IResponsiveContainerProps> = props => (
  <div className={styles.root}>
    {props.children}
  </div>
);
