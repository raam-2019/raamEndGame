import React from 'react';

import styles from './PageTemplate.module.css';



export interface IPageTemplateProps {}

export const PageTemplate: React.FC<IPageTemplateProps> = props => (
  <div className={styles.root}>
    {props.children}
  </div>
);
