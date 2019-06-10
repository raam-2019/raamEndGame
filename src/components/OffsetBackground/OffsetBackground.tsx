import * as React from 'react';

import styles from './OffsetBackground.module.css';



export interface IOffsetBackgroundProps {
  backgroundColor: string;
  offsetPx: number;
}

export const OffsetBackground: React.FC<IOffsetBackgroundProps> = props => (
  <div
    className={styles.root}
    style={{
      backgroundColor: props.backgroundColor,
      top: props.offsetPx
    }} />
);
