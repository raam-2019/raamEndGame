import * as React from 'react';

import styles from './Line.module.css';



export interface ILineProps {}

export const Line: React.FC<ILineProps> = props => (
  <div className={styles.root} />
);
