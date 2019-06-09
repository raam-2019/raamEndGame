import * as React from 'react';

import styles from './Heading.module.css';



export interface IHeadingProps {
  extraClassName?: string;
}

export const Heading: React.FC<IHeadingProps> = props => (
  <h1 className={`${styles.heading} ${props.extraClassName || ''}`}>
    {props.children}
  </h1>
);



export const SubHeading: React.FC<IHeadingProps> = props => (
  <h2 className={`${styles.subheading} ${props.extraClassName || ''}`}>
    {props.children}
  </h2>
);
