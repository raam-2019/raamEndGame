import * as React from 'react';

import styles from './LiveGraphWrapper.module.css';



export interface ILiveGraphWrapperProps {
  title: string;
  width?: string;
  height?: string;

  extraClassName?: string;
}

export const LiveGraphWrapper: React.FC<ILiveGraphWrapperProps> = props => (
  <div
    className={`${styles.root} ${props.extraClassName || ''}`}
    style={{
      width: props.width,
      height: props.height
    }}>
    {props.title}
  </div>
);
