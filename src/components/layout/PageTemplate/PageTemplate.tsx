import React from 'react';

import styles from './PageTemplate.module.css';
import {AppToolbar} from 'components/layout/PageTemplate/AppToolbar/AppToolbar';
import {RouteComponentProps} from 'react-router';



export interface IPageTemplateProps extends RouteComponentProps {}

export const PageTemplate: React.FC<IPageTemplateProps> = props => (
  <div className={styles.root}>
    <AppToolbar {...props} />
    {props.children}
  </div>
);
